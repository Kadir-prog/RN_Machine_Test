import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Header, Left, Body, Right, Title, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const About_us = ({ navigation }) => {
    return (
        <>
            <Header style={{backgroundColor:'#238CF8'}} androidStatusBarColor='#238CF8'>
                <Left>
                    <Button onPress={() => {
                        navigation.goBack();
                    }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        icon={
                            <Icon
                                name="long-arrow-alt-left"
                                style={{ fontSize: 24, color: '#fff' }}
                            />
                        }
                    >
                    </Button>
                </Left>
                <Body>
                    <Title>About us</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{margin:8,padding:5}}>
                    <Text style={{ fontSize: 18 }}>We believe effective online marketing plans are driven by your quantitative business goals and informed by data. Of course, these are best assessed while drinking freshly made French press coffee or a West Coast double IPA, depending on the time of day. Like brewing exceptional coffee or beer, online marketing is both a science and an art.

                        After decades of experience at marketing agencies and with in-house marketing teams, we’ve learned progress requires a plan, and a good plan rests on the ability to focus on important outcomes. That’s why we emphasize marketing strategy so much.</Text>
                </View>
            </View>
        </>
    );
}

export default About_us;