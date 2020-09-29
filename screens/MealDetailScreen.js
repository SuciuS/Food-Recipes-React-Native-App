import React, { useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, Image, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavourite } from '../store/actions/meals';




const MealDetailScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavourite = useSelector(state => state.meals.favouriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler});
    }, [toggleFavouriteHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavourite});
    }, [currentMealIsFavourite]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                        <DefaultText>{selectedMeal.duration}m</DefaultText>
                        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            <View style={styles.list}>
                 {selectedMeal.ingredients.map(ingredient => <Text key={ingredient} >{'\u2022'} {ingredient}</Text>)}
            </View>
            <Text style={styles.title}>Steps</Text>
            <View style={styles.list}>
                 {selectedMeal.steps.map(step => <Text key={step} >{'\u2022'} {step}</Text>)}
            </View>
        </ScrollView>

    );
};

MealDetailScreen.navigationOptions = (navigationData) => {

    const mealTitle = navigationData.navigation.getParam('mealTitle');

    const toggleFavourite = navigationData.navigation.getParam('toggleFav');

    const isFavourite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Favourite' iconName={isFavourite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavourite} />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({

    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around"
    },

    image: {
        width: '100%',
        height: 200
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: "center",
        marginBottom: 15,
        marginTop: 10
    },
    list: {
        paddingHorizontal: 12
    }
});

export default MealDetailScreen;