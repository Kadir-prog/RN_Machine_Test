import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackNavigator } from './src/Navigation/StackNavigation';

const Root=createStackNavigator();

const App=()=>{
  return(
    <NavigationContainer>
      <Root.Navigator screenOptions={{
        headerShown: false
      }}>
        <Root.Screen
          name='Root'
          component={AuthStackNavigator}
        >
        </Root.Screen>
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default App;