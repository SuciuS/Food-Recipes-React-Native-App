import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const FavouritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favouriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No Favourite meals found. Start adding some now!</DefaultText>
            </View>    
        )} else {
        return (
            <MealList listData={favMeals} navigation={props.navigation}/>
        )}
};


FavouritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favourites',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
             </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default FavouritesScreen;