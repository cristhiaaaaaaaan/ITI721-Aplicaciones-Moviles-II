// Call react libraries
import React, { useState } from 'react';
import { View } from 'react-native';

// Call the Login and Welcome components (custom components)
import Login from './src/views/Login';
import Welcome from './src/views/Welcome';

import NativeLocalStorage from './localStorage/NativeLocalStorage';

const App = () => {
  const [localusername, setUsername] = useState('');
  const [localpassword, setPassword] = useState('');

  React.useEffect(() => {
    const user = NativeLocalStorage?.getItem('username');
    const pass = NativeLocalStorage?.getItem('password');
    setUsername(user ?? '');
    setPassword(pass ?? '');
  }, []);

  if((localusername.length > 0) && (localpassword.length > 0)){
    return <Welcome />;
  }else {
    return (
        <View>
          <Login onLogin={(username, password) => {
            console.log(username + ' - ' + password);
            setUsername(username);
            setPassword(password);
          } } />
        </View>
    );
  }
};

export default App;
