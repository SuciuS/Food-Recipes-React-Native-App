import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';



const FiltersScreen = props => {
    const { navigation } = props;
  
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();
  
    const saveFilters = useCallback(() => {
      const appliedFilters = {
        glutenFree: isGlutenFree,
        lactoseFree: isLactoseFree,
        vegan: isVegan,
        vegetarian: isVegetarian
      };

      dispatch(setFilters(appliedFilters));

    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
  
    useEffect(() => {
      navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <View style={styles.filterContainer}>
                <View style={styles.filterContainerToggle}>
                    <Text>Gluten-free</Text>
                    <Switch thumbColor='white' trackColor={{true: Colors.primaryColor}} value={isGlutenFree} onValueChange={newValue => setIsGlutenFree(newValue)}/>
                </View>

                <View style={styles.filterContainerToggle}>
                    <Text>Lactose-free</Text>
                    <Switch thumbColor='white'  trackColor={{true: Colors.primaryColor}}  value={isLactoseFree} onValueChange={newValue => setIsLactoseFree(newValue)}/>
                </View>

                <View style={styles.filterContainerToggle}>
                    <Text>Vegan</Text>
                    <Switch thumbColor='white'  trackColor={{true: Colors.primaryColor}}  value={isVegan} onValueChange={newValue => setIsVegan(newValue)}/>
                </View>

                <View style={styles.filterContainerToggle}>
                    <Text>Vegetarian</Text>
                    <Switch  thumbColor='white' trackColor={{true: Colors.primaryColor}}  value={isVegetarian} onValueChange={newValue => setIsVegetarian(newValue)}/>
                </View>
            </View>
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Filter Meals',
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={navData.navigation.getParam('save')}
          />
        </HeaderButtons>
      )
    };
  };

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: '80%'
    }, 

    filterContainerToggle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        width: '100%'
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: "center"
    }
});

export default FiltersScreen;