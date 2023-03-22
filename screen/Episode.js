import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import TextHeader from "../shared/TextHeader";

const Episode = ({ navigation, route }) => {
  let { id, tv_id, season_number, episode_number } = route.params;
  const [episode, setepisode] = useState();
  const [videos, setvideos] = useState();

  useLayoutEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/episode/${episode_number}?api_key=27f6baf417b8c57971b37fba2b1a14b2&language=en-US`
      )
      .then((res) => setepisode(res.data))
      .catch((err) => alert(err));

    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos?api_key=27f6baf417b8c57971b37fba2b1a14b2&language=en-US`
      )
      .then((res) => setvideos(res.data.results))
      .catch((err) => alert(err));
  }, []);
  return (
    <ScrollView>
      <View className="w-full h-[26vh] relative">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${episode?.still_path}`,
          }}
          className="h-full w-full object-contain bg-contain"
        />
        <TouchableOpacity className="absolute top-[45%] shadow-xl shadow-[#ffffff] left-[44%] translate-x-[-50%] ">
          <FontAwesome
            name="youtube-play"
            size={50}
            color="white"
            onPress={() =>
              Linking.openURL(
                `https://www.youtube.com/watch?v=${videos[0]?.key}`
              )
            }
          />
        </TouchableOpacity>
      </View>
      <View className="p-4 pb-0">
        <TextHeader
          text={
            episode?.name +
            "  -  " +
            "s" +
            episode?.season_number +
            "e" +
            episode?.episode_number
          }
        />
      </View>
      <View className="flex my-1 flex-row px-4 items-center">
        <Text className="mr-2 font-semibold">{episode?.runtime}Mins</Text>
        <Text
          className={`${
            Number(episode?.vote_average) > 6.5
              ? "text-green-500"
              : Number(episode?.vote_average) > 5
              ? "text-[#edac34]"
              : "text-red-600"
          } text-sm font-bold`}
        >
          {episode?.vote_average?.toString().slice(0, 3) + " / 10"}
        </Text>
      </View>
      <Text className="px-4 font-medium text-base text-[#676565]">
        {episode?.overview}
      </Text>
      {episode?.guest_stars?.length > 0 ? (
        <ScrollView className="px-4 mt-3 w-full flex flex-row flex-wrap">
          <Text className="font-bold text-xl mb-2">Guest Stars</Text>
          {episode?.guest_stars?.map((guest) => {
            return (
              <View className="w-screen gap-2 h-[200px] flex flex-row items-center">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${guest?.profile_path}`,
                  }}
                  className="h-[80%] rounded-md w-[30%] object-contain bg-contain"
                />
                <View className="w-[70%] gap-1">
                  <Text className="font-semibold">
                    Character:{" "}
                    <Text className="text-xs font-normal">
                      {guest.character}
                    </Text>
                  </Text>
                  <Text className="font-semibold">
                    Name:{" "}
                    <Text className="text-xs font-normal">{guest.name}</Text>
                  </Text>
                  <Text className="font-semibold">
                    Known for:{" "}
                    <Text className="text-xs font-normal">
                      {guest.known_for_department}
                    </Text>
                  </Text>
                  <Text className="font-semibold">
                    Popularity:{" "}
                    <Text className="text-xs font-normal">
                      <Text
                        className={`${
                          Number(guest?.popularity) > 6.5
                            ? "text-green-500"
                            : Number(guest?.popularity) > 5
                            ? "text-[#edac34]"
                            : "text-red-600"
                        } text-sm font-bold`}
                      >
                        {guest?.popularity?.toString().slice(0, 3) + " / 10"}
                      </Text>
                    </Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View className="w-full h-20 flex items-center justify-center">
          <Text className="">No Guest Stars on this Episode</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Episode;
