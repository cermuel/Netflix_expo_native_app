import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";

const HomeCards = ({ image, action }) => {
  return (
    <View className="w-[140px] mx-1 h-[220px]">
      <TouchableOpacity className="w-full" onPress={action}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original/${image}` }}
          className="h-full w-full rounded-lg object-cover bg-cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeCards;
