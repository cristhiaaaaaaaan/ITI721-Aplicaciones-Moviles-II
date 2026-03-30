// Import libraries
use tokio::net::{TcpListener, TcpStream};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use sha1::{Sha1, Digest};
use base64::{engine::general_purpose, Engine as _};

// Import broadcasting support libraries
use std::sync::{Arc, Mutex};
use std::collections::HashMap;
use tokio::sync::mpsc;

// Create a data type for our subscriber list
type Clients = Arc<Mutex<HashMap<std::net::SocketAddr, mpsc::UnboundedSender<String>>>>;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let listener = TcpListener::bind("0.0.0.0:5000").await?;
	let clients: Clients = Arc::new(Mutex::new(HashMap::new()));
	println!("Servidor WebSocket escuchando en 0.0.0.0:5000");

	loop {
		let (socket, addr) = listener.accept().await?;
		let clients_ref = Arc::clone(&clients);

		tokio::spawn(async move {
			if let Err(e) = handle_connection(socket, addr, clients_ref).await {
				eprintln!("Error con {}: {}", addr, e);
			}
		});
	}
}

// Create web listener
async fn handle_connection(mut socket: TcpStream, addr: std::net::SocketAddr, clients: Clients) -> Result<(), Box<dyn std::error::Error>> {
	// Create the websocket buffer
	let mut buffer = [0; 2048];
	let n = socket.read(&mut buffer).await?;
	let request = String::from_utf8_lossy(&buffer[..n]);

	// Extract the 'Sec-WebSocket-Key' from the HTTP header
	if let Some(key) = request.lines()
		.find(|line| line.starts_with("Sec-WebSocket-Key:"))
		.map(|line| line.split(':').nth(1).unwrap_or("").trim()) {
		println!("Llave recibida: {}", key);

		// The "Magic String" defined in RFC 6455
		let magic_guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		let mut hasher = Sha1::new();
		hasher.update(format!("{}{}", key, magic_guid).as_bytes());

		// Create the Accept-Key (SHA1 -> Base64)
		let accept_key = general_purpose::STANDARD.encode(hasher.finalize());

		// Send Handshake Response
		let response = format!(
			"HTTP/1.1 101 Switching Protocols\r\n\
						 Upgrade: websocket\r\n\
						 Connection: Upgrade\r\n\
						 Sec-WebSocket-Accept: {}\r\n\r\n",
			accept_key
		);

		socket.write_all(response.as_bytes()).await?;
	}else {
		return Err("No se encontró Sec-WebSocket-Key".into());
	}

	// Broadcast register
	let (tx, mut rx) = mpsc::unbounded_channel::<String>();
	clients.lock().unwrap().insert(addr, tx);

	// Split socket, reader and writer
	let (mut reader, mut writer) = socket.split();

	println!("Nueva conexión establecida: {}", addr);

	// Main loop
	loop {
		let mut header = [0u8; 2];

		tokio::select! {
			// Receives customer data (WebSocket Frame)
			res = reader.read_exact(&mut header) => {
				if res.is_err() { break; } // El cliente cerró la conexión

				let byte1 = header[0];
				let byte2 = header[1];

				// Opcode verification (0x8), exit loop
				let opcode = byte1 & 0x0F;

				if opcode == 0x8 {
					println!("🔌 Cliente {} solicitó cierre.", addr);

					let close_frame = [0x88, 0x00]; // 0x88 = FIN (0x80) + Opcode Close (0x08)
					let _ = writer.write_all(&close_frame).await;

					break;
				}

				// Obtains length
				let mut payload_len = (byte2 & 0x7F) as usize;

				if payload_len == 126 {
					// Message up the 65,535 bytes (2 additional bytes)
					let mut extended_len = [0u8; 2];
					reader.read_exact(&mut extended_len).await?;
					payload_len = u16::from_be_bytes(extended_len) as usize;
				} else if payload_len == 127 {
					// Message up the 18 exabytes (8 additional bytes)
					let mut extended_len = [0u8; 8];
					reader.read_exact(&mut extended_len).await?;
					payload_len = u64::from_be_bytes(extended_len) as usize;
				}

				// Reading the mask (4 bytes)
				let mut mask = [0u8; 4];
				reader.read_exact(&mut mask).await?;

				// Read the masked payload
				let mut encoded = vec![0u8; payload_len];
				reader.read_exact(&mut encoded).await?;

				// Unmasking by applying the logical XOR operator (D_i = E_i ^ Mask_{i % 4})
				let mut decoded = vec![0u8; payload_len];
				for i in 0..payload_len {
					decoded[i] = encoded[i] ^ mask[i % 4];
				}

				let msg_str = String::from_utf8_lossy(&decoded).to_string();
				println!("[{}] dice: {}", addr, msg_str);

				// Broadcasting message
				let broadcast_msg = format!("Usuario {}: {}", addr, msg_str);
				let clients_guard = clients.lock().unwrap();
				for tx_client in clients_guard.values() {
					let _ = tx_client.send(broadcast_msg.clone());
				}
			}

			// The internal channel receives a message for this client.
			Some(msg) = rx.recv() => {
				// Uses the logic of sending frames without a mask (Server -> Client)
				if let Err(_) = send_message(&mut writer, &msg).await {
					break;
				}
			}
		}
	}

	clients.lock().unwrap().remove(&addr);
	println!("❌ Cliente desconectado: {}", addr);
	Ok(())
}

async fn send_message(writer: &mut tokio::net::tcp::WriteHalf<'_>, text: &str) -> Result<(), Box<dyn std::error::Error>> {
	let payload = text.as_bytes();
	let len = payload.len();

	let mut header = Vec::new();

	// Byte 0: FIN bit (1) + Opcode (1 to text) = 1000 0001 binary = 0x81 hex
	header.push(0x81);

	// Byte 1: Mask bit (0) + Payload len
	if len <= 125 {
		header.push(len as u8);
	} else if len <= 65535 {
		header.push(126);
		header.extend_from_slice(&(len as u16).to_be_bytes());
	} else {
		header.push(127);
		header.extend_from_slice(&(len as u64).to_be_bytes());
	}

	// Send Header and Payload (without mask)
	writer.write_all(&header).await?;
	writer.write_all(payload).await?;

	Ok(())
}
