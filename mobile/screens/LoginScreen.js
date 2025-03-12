import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                contraseña: password,
            });
            Alert.alert('Inicio de sesión exitoso', response.data.message);
        } catch (err) {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };

    return (
        <View>
            <Text>Correo electrónico:</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Ingresa tu correo electrónico"
            />
            <Text>Contraseña:</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                secureTextEntry
            />
            <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
       
    );
};

export default LoginScreen;
