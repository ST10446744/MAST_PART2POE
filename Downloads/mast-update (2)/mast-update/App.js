// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DishProvider } from './context/DishContext';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import EditMenuScreen from './screens/EditMenuScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <DishProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Menu" component={MenuScreen} />
                    <Stack.Screen name="EditMenu" component={EditMenuScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </DishProvider>
    );
};

export default App;
