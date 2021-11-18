import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
    const [loading, setloading] = useState(true); //for loading
    const [data, setdata] = useState([]); //for student details

    //get user details
    //start here

    //calling function on componentonmount
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            GetDetails();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    const GetDetails = async () => {
        let user = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(user);
        let access_token = parsed.data.access_token; // geting access token form async storage

        //sending http request for student details
        await fetch(`https://nesen.in/new_era_school_testing/student/api/student-profile`, {
            method: "GET",
            headers: {
                'Access-Token': access_token,
            },
        }
        )
            .then(res => res.json())
            .then((json) => {
                try {
                    console.log(json)
                    setdata(json.data.student_details) //updating or mounting state with response
                    setloading(false);
                }
                catch (e) {
                    console.log("error" + e);
                    setloading(false);
                }
            })
            .catch((error) => console.log(error))

    }
    console.log(data)
    //end here
    return (
        <>
            <Header style={{ backgroundColor: '#238CF8' }} androidStatusBarColor='#238CF8' >
                <Left>
                    <Button onPress={() => {
                        navigation.openDrawer();
                    }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        icon={
                            <Icon
                                name="bars"
                                style={{ fontSize: 24, color: '#fff' }}
                            />
                        }
                    >
                    </Button>
                </Left>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            {!loading ? <>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: 15 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Welcome {data.name}</Text>

                    <View style={{ flex: 1, marginTop: '2%' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Details</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: '2%' }}>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Academic Year: {data.academic_year}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Branch Name: {data.branch_name}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>City: {data.city}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Class Name: {data.class_name}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>DOB: {data.date_of_birth}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Division: {data.division}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Division id: {data.division_id}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Father Mobile No: {data.father_mobile_no}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>GR No: {data.gr_no}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Permanent Address: {data.permanent_address}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>State: {data.state}</Text>
                        <Text style={{ fontSize: 22, marginBottom: 5 }}>Teacher Name: {data.teacher_name}</Text>
                    </View>
                </ScrollView>
            </> :
                <>
                    <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0 }}>
                        <ActivityIndicator style={{ marginHorizontal: 20 }} size="large" color="#238CF8cc" />
                    </View>
                </>}
        </>
    );
}

export default HomeScreen;