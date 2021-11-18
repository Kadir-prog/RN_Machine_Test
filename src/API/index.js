import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


var navigation = useNavigation();
export function Submit(username, password) {
    // Validating
    // Start here
    if (username.trim() == '' || password.trim() == '') {
        ToastAndroid.showWithGravityAndOffset("Enter Username and password",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            30,
            50
        );
        return
    }
    //end here

    //API call
    //Start here
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
                    ToastAndroid.BOTTOM,
                    30,
                    50
                );
                if (data.success == "200") {
                    await AsyncStorage.setItem('user', JSON.stringify(data));
                    await AsyncStorage.setItem('token', data.access_token);
                    navigation.replace('Home');
                }
                console.log(data);
            } catch (e) {
                console.log("something is wrong", e);
            }

        }).catch((error) => {
            console.log(error)
        })
    //end here
}

