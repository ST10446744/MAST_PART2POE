
// context/DishContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DishContext = createContext();

export const DishProvider = ({ children }) => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const loadDishes = async () => {
            const storedDishes = await AsyncStorage.getItem('dishes');
            if (storedDishes) {
                const parsedDishes = JSON.parse(storedDishes);
                // Ensure parsedDishes is an array
                if (Array.isArray(parsedDishes)) {
                    setDishes(parsedDishes);
                } else {
                    setDishes([]); // Fallback to empty array if data is corrupted
                }
            } else {
                setDishes([]); // Initialize to empty if nothing was stored
            }
        };
        loadDishes();
    }, []);

    const addDish = async (dish) => {
        const newDishes = [...dishes, dish];
        console.log("Adding Dish: ", dish);
        console.log("New Dishes Array: ", newDishes);
        setDishes(newDishes);
        await AsyncStorage.setItem('dishes', JSON.stringify(newDishes));
    };

    const removeDish = async (dishToRemove) => {
        const newDishes = dishes.filter(dish => dish.name !== dishToRemove.name);
        console.log("Removing Dish: ", dishToRemove);
        console.log("New Dishes Array After Removal: ", newDishes);
        setDishes(newDishes);
        await AsyncStorage.setItem('dishes', JSON.stringify(newDishes));
    };

    return (
        <DishContext.Provider value={{ dishes, addDish, removeDish }}>
            {children}
        </DishContext.Provider>
    );
};
