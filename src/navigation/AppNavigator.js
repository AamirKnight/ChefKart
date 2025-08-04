import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen';
import IngredientScreen from '../screens/IngredientScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{ title: 'Party Menu Selection' }}
        />
        <Stack.Screen 
          name="Ingredient" 
          component={IngredientScreen}
          options={{ title: 'Ingredients' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;