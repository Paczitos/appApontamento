// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import RegistroHorasScreen from './RegistroHorasScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Registrar Horas' }} />
        <Stack.Screen name="RegistroHoras" component={RegistroHorasScreen} options={{ title: 'Registros de Horas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
