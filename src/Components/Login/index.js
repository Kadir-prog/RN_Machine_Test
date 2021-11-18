import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, StatusBar, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import { Submit } from '../../API/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

const Login_component = ({ navigation }) => {

    //State
    //Start
    const [password, setpassword] = useState('');
    const [username, setusername] = useState('');
    const [sendingreq, setsendingreq] = useState(false);
    //end

    const submit = () => {
        // Validating
        // Start here
        if (username.trim() == '' || password.trim() == '') {
            ToastAndroid.showWithGravityAndOffset("Enter Username and password",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                30,
                50
            );
            return
        }
        const Password = password;
        const chars = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        const check = chars.test(Password);
        if (!check) {
            ToastAndroid.showWithGravityAndOffset("contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                30,
                50
            );
            return
        }
        //end here

        //API call
        //Start here
        setsendingreq(true);
        const file = new FormData();
        file.append('username', username);
        file.append('password', password)
        file.append('user_type', "2")
        file.append('ip_address', "0.0.0.0")
        file.append('otp_status', "1")
        file.append('platform_model', "Android")
        file.append('fcm_token', null)
        fetch(`https://nesen.in/new_era_school_testing/app-login`, {
            "method": "POST",
            "headers": {
                'Content-Type': 'multipart/form-data'
            },
            body: file
        }).then(res => res.json())
            .then(async data => {
                try {
                    ToastAndroid.showWithGravityAndOffset(data.message,
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                        30,
                        50
                    );
                    setsendingreq(false);
                    if (data.status == "200") {
                        await AsyncStorage.setItem('user', JSON.stringify(data));
                        await AsyncStorage.setItem('token', data.data.access_token);
                        navigation.replace('Home');
                        setsendingreq(false);
                    }
                    console.log(data);
                } catch (e) {
                    console.log("something is wrong", e);
                }

            }).catch((error) => {
                console.log(error);
                setsendingreq(false);
            })
        //end here
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar barStyle="dark-content" backgroundColor='#fff' />
                    <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0 }}>
                        <Text style={{ fontSize: 25, color: '#F05C22' }}>Login</Text>
                        <View style={{ borderWidth: 0.1, marginTop: '8%' }}>
                            <TextInput
                                value={username}
                                autoCapitalize={true}
                                maxLength={10}
                                onChangeText={(text) => setusername(text)}
                                placeholder="Username" style={{ borderWidth: 1, height: 60, borderRadius: 15, borderColor: '#707070', aspectRatio: 6, fontSize: 18, marginBottom: 18, paddingLeft: 15 }} />
                            <TextInput
                                value={password}
                                secureTextEntry
                                autoCapitalize={true}
                                onChangeText={(text) => setpassword(text)}
                                placeholder="Password" style={{ borderWidth: 1, height: 60, borderRadius: 15, borderColor: '#707070', aspectRatio: 6, fontSize: 18, paddingLeft: 15 }} />
                        </View>
                        <View style={{ marginTop: '10%' }}>
                            {!sendingreq ? <Button onPress={submit} title="Sign in" buttonStyle={{ aspectRatio: 5, backgroundColor: '#238CF8', height: 50, borderRadius: 15 }} titleStyle={{ fontSize: 20 }} /> : <ActivityIndicator size="large" color="#78B088" />}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>);
}

export default Login_component;