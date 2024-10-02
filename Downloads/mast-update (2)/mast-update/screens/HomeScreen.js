// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.title}>Christoffel Private Restaurant</Text>
            <Text style={styles.welcomeMessage}>Welcome to an exclusive dining experience!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.buttonText}>Welcome</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000', // Black background
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFD700', // Gold text
        textAlign: 'center',
        marginBottom: 20,
    },
    welcomeMessage: {
        fontSize: 20,
        color: '#FFD700', // Gold text
        textAlign: 'center',
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#FFD700', // Gold background for the button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFFFFF', // White border
    },
    buttonText: {
        color: '#000000', // Black text inside button
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;


