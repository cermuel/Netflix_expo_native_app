import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Profile from "./screen/Profile";
import Home from "./screen/Home";
import Search from "./screen/Search";
import Movie from "./screen/Movie";
import Header from "./shared/header";
import Series from "./screen/Series";
import Season from "./screen/Season";
import Episode from "./screen/Episode";
import * as LocalAuthentication from "expo-local-authentication";
import { useLayoutEffect } from "react";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const defaultOptions = {
  headerTitle: () => {
    return <Header />;
  },
};

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={defaultOptions} />
      <Stack.Screen name="Movie" component={Movie} options={defaultOptions} />
      <Stack.Screen name="Series" component={Series} options={defaultOptions} />
      <Stack.Screen name="Season" component={Season} options={defaultOptions} />
      <Stack.Screen
        name="Episode"
        component={Episode}
        options={defaultOptions}
      />
    </Stack.Navigator>
  );
}
function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={defaultOptions} />
      <Stack.Screen name="Series" component={Series} options={defaultOptions} />
      <Stack.Screen name="Movie" component={Movie} options={defaultOptions} />
    </Stack.Navigator>
  );
}

export default function App() {
  useLayoutEffect(() => {
    const authenticate = async () => {
      const result = await LocalAuthentication.authenticateAsync();
    };
    authenticate();
  }, []);
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
