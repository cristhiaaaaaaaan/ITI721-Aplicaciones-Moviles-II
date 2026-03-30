import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import style_01 from '../styles/style_01';
import NativeLocalStorage from '../../localStorage/NativeLocalStorage';

interface LoginProps {
    onLogin: (username: string, password: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
    const [localusername, setUsername] = useState('');
    const [localpassword, setPassword] = useState('');

    const handleLogin = () => {
        if ((localusername === 'admin') && (localpassword === 'parda99*')) {
            NativeLocalStorage?.setItem(localusername ?? '', 'username');
            NativeLocalStorage?.setItem(localpassword ?? '', 'password');
            onLogin(localusername, localpassword);
        } else {
            console.log('Invalid username or password');
        }
    };

    return (
        <View style={style_01.container}>
            <Text style={style_01.title}>Login Screen</Text>
            <View style={style_01.inputContainer}>
                <TextInput
                    style={style_01.inputFiled}
                    placeholder="Username"
                    value={localusername}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={style_01.inputContainer}>
                <TextInput
                    style={style_01.inputFiled}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={localpassword}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <View style={style_01.buttonContainer}>
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

export default Login;
