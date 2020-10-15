import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn, SignUp, Dashboard} from '../screens';
import {color} from '../utils';

const Stack = createStackNavigator();

function NavContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: true,
          headerStyle: {backgroundColor: color.DARK_GRAY},
          headerTintColor: color.WHITE,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerLeft: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavContainer;
