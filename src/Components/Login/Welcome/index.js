import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Loading = ({ navigation }) => {
    const userData = async () => {
        const token = await AsyncStorage.getItem('token');
        token ?
            navigation.replace("Home")
            :
            navigation.replace("login")
        console.log(token);
    }
    useEffect(() => {
        userData();
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <View style={styles.preloader}>
                    <View style={{flexDirection:'row'}}>
                        <ActivityIndicator size="large" color="#F05C22" />
                        <Text style={{ textAlign: 'center', color: '#F05C22', fontFamily: 'Poppins-Bold', fontSize: 20,paddingLeft:15 }}>
                            Loading
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    font: {
        fontSize: 12
    },
    Login: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 60,
    },
    Logo: {
        fontWeight: 'bold',
        fontSize: 25
    },
    isLoading: {
        height: 100,
        padding: 20
    },
    preloader: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 50,
        right: 0,
        left: 0
    },
});

export default Loading;