import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import MainScreen from "./screens/main";
import ProductScreen from "./screens/product";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              title: "홈 화면",
            }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              title: "상품 화면",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
