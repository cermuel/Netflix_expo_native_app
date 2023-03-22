import { View, Text, Linking } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className="w-full">
      <Text
        className="font-bold text-lg text-[#DB202C]"
        onPress={() => {
          Linking.openURL("https://cermuel.vercel.app");
        }}
      >
        NETFLIX
      </Text>
    </View>
  );
};

export default Header;
