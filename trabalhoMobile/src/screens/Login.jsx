import { Alert, SafeAreaView, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   


const verificarLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('O preenchimento dos campos é obrigatório');
    }
  };

     return (
        <SafeAreaView>
            <TextInput 
            placeholder="Email"
            style={styles.input}
            onChangeText= {setEmail}
            value = {email}
        />
        <TextInput 
        placeholder="Senha"
            style={styles.input}
            onChangeText= {setPassword}
            value = {password}
        />

        <TouchableOpacity style={styles.button} onPress={verificarLogin}>

            <Text>Entrar</Text>

        </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        fontSize: 16,
        margin: 40,
        marginTop: 40,
      },
      button: {
        backgroundColor: '#007BFF',
        color: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        fontSize: 16,
        margin: 155,
        marginTop: 40,
      },
  });

export default Login;