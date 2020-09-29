import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const defaultStackNavOptions = 
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor,
    }
}


const MealsNavigator = createStackNavigator({


    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
        navigationOptions: {}
    },
    MealDetail: {
        screen: MealDetailScreen,
    },
}, defaultStackNavOptions);

const FavNavigator = createStackNavigator({
    Favourites: {
        screen: FavouritesScreen
    },
    MealDetail: {
        screen: MealDetailScreen
    }
}, defaultStackNavOptions);

const tabScreenConfig = 
{
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>;
            },
            tabBarColor: Colors.primaryColor
        }},
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>;
            },
            tabBarColor: Colors.secondaryColor
        }}
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, 
    {
        activeColor: 'white',
        shifting: true
    }) 
    : createBottomTabNavigator(tabScreenConfig,
    {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans'
            },
            activeTintColor: Colors.secondaryColor
    }
    });

const FiltersNavigator = createStackNavigator({
        Filters: {
            screen: FiltersScreen,
            navigationOptions: {},
        },
    }, 
        defaultStackNavOptions
    );


const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals'
    }},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);