import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import AdicionarLembrete from '../screens/AdicionarLembrete/AdicionarLembrete';

export type RootStackParamList = {
  Home: undefined;
  AdicionarLembrete: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdicionarLembrete"
          component={AdicionarLembrete}
          options={{
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitle: "",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
