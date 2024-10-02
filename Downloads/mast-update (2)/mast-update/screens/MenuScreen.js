import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DishContext } from '../context/DishContext';

const MenuScreen = ({ navigation }) => {
    const { dishes } = useContext(DishContext);
    const [filter, setFilter] = useState('All');

    const filterDishes = () => {
        if (filter === 'All') return dishes;
        return dishes.filter(dish => dish.course === filter);
    };

    const FilterButton = ({ label }) => (
        <TouchableOpacity
            style={[
                styles.filterButton,
                filter === label && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(label)}
        >
            <Text style={styles.filterButtonText}>{label}</Text>
        </TouchableOpacity>
    );

    if (!dishes) {
        return <Text>Loading...</Text>; // Handling loading state
    }

    const filteredDishes = filterDishes(); // Filter dishes and store in a variable for reuse

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <FilterButton label="All" />
                <FilterButton label="Starters" />
                <FilterButton label="Mains" />
                <FilterButton label="Desserts" />
            </View>

            {/* Dishes List */}
            <FlatList
                data={filteredDishes}
                keyExtractor={(item) => item.name} // Ensure unique key
                renderItem={({ item }) => (
                    item ? (
                        <View style={styles.itemContainer}>
                            {/* Display Image */}
                            {item.image && (
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                            )}
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text style={styles.itemPrice}>
                                ${item.price ? item.price.toFixed(2) : '0.00'}
                            </Text>
                        </View>
                    ) : null
                )}
            />

            {/* Dish Count Indicator */}
            <Text style={styles.dishCount}>
                {`Dishes available: ${filteredDishes.length}`}
            </Text>

            {/* Edit Menu Button */}
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditMenu')}
            >
                <Text style={styles.editButtonText}>Edit Menu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000000', // Black background
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFD700', // Gold text for title
        marginBottom: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#FFD700', // Gold border for filter buttons
        marginHorizontal: 5,
        borderRadius: 20,
    },
    activeFilterButton: {
        backgroundColor: '#FFD700', // Active button with gold background
    },
    filterButtonText: {
        color: '#FFFFFF', // White text for filter buttons
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD700', // Gold border for items
        marginBottom: 15, // Add margin for spacing
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for dish names
    },
    itemDescription: {
        fontSize: 16,
        color: '#CCCCCC', // Subtle grey for description
        marginVertical: 5,
    },
    itemPrice: {
        fontSize: 18,
        color: '#FFD700', // Gold text for price
    },
    itemImage: {
        width: '100%', // Set width to full for responsive design
        height: 150, // Set height for consistent display
        borderRadius: 10, // Rounded corners for images
        marginBottom: 10, // Space below the image
    },
    dishCount: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700', // Gold text for count indicator
        marginVertical: 10, // Space above the indicator
    },
    editButton: {
        backgroundColor: '#FFD700', // Gold button background
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 30,
    },
    editButtonText: {
        color: '#000000', // Black text inside button
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MenuScreen;


