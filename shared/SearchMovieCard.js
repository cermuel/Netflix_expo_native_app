import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
const MovieCard = ({ image, action }) => {
  return (
    <View className="w-[49%] my-1 h-[280px]">
      <TouchableOpacity className="w-full" onPress={action}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original/${image}` }}
          className="h-full w-full rounded-lg object-cover bg-cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;
