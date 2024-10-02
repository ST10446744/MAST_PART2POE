import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DishContext } from '../context/DishContext';
import * as ImagePicker from 'expo-image-picker';

const EditMenuScreen = () => {
    const { addDish, removeDish, dishes } = useContext(DishContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [course, setCourse] = useState('Mains');
    const [image, setImage] = useState(null);

    const handleAddDish = () => {
        if (name && description && price) {
            const newDish = { name, description, price: parseFloat(price), course, image };
            addDish(newDish);
            Alert.alert('Dish Added', `${name} has been added to the menu!`);
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
        } else {
            Alert.alert('Error', 'Please fill out all fields.');
        }
    };

    const pickImage = async () => {
        // Request permission to access the gallery
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        // Open the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Set the image URI
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Menu</Text>
            <TextInput
                placeholder="Dish Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
                style={styles.input}
            />
            <Picker selectedValue={course} onValueChange={itemValue => setCourse(itemValue)} style={styles.picker}>
                <Picker.Item label="Mains" value="Mains" />
                <Picker.Item label="Starters" value="Starters" />
                <Picker.Item label="Desserts" value="Desserts" />
            </Picker>
            <Button title="Pick an image from gallery" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}
            <Button title="Add to Menu" onPress={handleAddDish} />
            <Text style={styles.subtitle}>Current Dishes:</Text>
            <FlatList
                data={dishes}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.dishContainer}>
                        <Text style={styles.dishName}>{item.name}</Text>
                        {item.image && <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />}
                        <Button title="Remove" onPress={() => removeDish(item)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ecf0f1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2c3e50',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        width: 150,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    dishContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#bdc3c7',
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditMenuScreen;








