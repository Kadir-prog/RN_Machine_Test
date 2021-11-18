import React,{useEffect} from 'react';
import { LogBox,View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login_component from '../Components/Login/index';
import HomeScreen from '../Components/Dashboard/index';
import Loading from '../Components/Login/Welcome/index';
import About_us from '../Components/About_us/index';

AuthStack = createStackNavigator();
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['warning:....']);

const Drawer = createDrawerNavigator();

const drawer = ({ navigation }) => {
    const logout = () => {
        useEffect(() => {
            const logout = () => {
                try {
                    AsyncStorage.getAllKeys()
                        .then(keys => AsyncStorage.multiRemove(keys))
                        .then(() => navigation.replace("login"));
                } catch (e) {
                    console.log(e);
                }
            }
            logout();
        }, [])
        return (
            <>
                <View style={{ flex: 1 }}>

                </View>
            </>
        );
    }
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Aboutus" component={About_us} />
            <Drawer.Screen name="Logout" component={logout} />
        </Drawer.Navigator>
    )
}
export function AuthStackNavigator() {
    return (
        <>
            <AuthStack.Navigator screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
                <AuthStack.Screen name="Loading" component={Loading}></AuthStack.Screen>
                <AuthStack.Screen name='login' component={Login_component} />
                <AuthStack.Screen name='Home' component={drawer}></AuthStack.Screen>
            </AuthStack.Navigator>
        </>
    );
}