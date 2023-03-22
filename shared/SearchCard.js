import { View, Text, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const SearchCard = ({ image, name, action }) => {
  return (
    <View className="w-full h-20 flex flex-row justify-between items-center my-1">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${image}` }}
        className="h-full w-[40%]"
      />
      <Text className="w-[40%] capitalize font-semibold text-lg text-[#202020]">
        {name}
      </Text>
      <Text className="w-[15%]" onPress={action}>
        <Feather name="play-circle" size={24} color="black" />
      </Text>
    </View>
  );
};

export default SearchCard;
