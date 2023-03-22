import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import TextHeader from "../shared/TextHeader";

const Season = ({ navigation, route }) => {
  const { tv_id, id, name, API_KEY, season_number } = route.params;
  const [season, setSeason] = useState();

  useLayoutEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=27f6baf417b8c57971b37fba2b1a14b2&language=en-US`
      )
      .then((res) => {
        setSeason(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <ScrollView>
      <View className="w-full h-[26vh]">
        <TouchableOpacity className="w-full">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${season?.poster_path}`,
            }}
            className="h-full w-full object-contain bg-contain"
          />
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <TextHeader text={`${name} - ${season?.name}`} />
        <Text className="font-medium text-[#333333] my-2">
          Air Date: {season?.air_date}
        </Text>
        <Text className="font-medium text-base text-[#747373]">
          {season?.overview}
        </Text>
      </View>
      <View>
        {season?.episodes?.map((episode) => {
          return (
            <View>
              <Text className="pl-2 mt-4 mb-1 text-base font-semibold text-[#585656]">
                <Text className="text-black font-extrabold">
                  {episode.episode_number}:{" "}
                </Text>
                {episode.name}
              </Text>
              <View className="flex flex-row px-2 h-20 overflow-hidden">
                <TouchableOpacity
                  className="w-[30%] mr-2"
                  onPress={() =>
                    navigation.navigate("Episode", {
                      id: episode.id,
                      tv_id,
                      season_number,
                      episode_number: episode.episode_number,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${episode?.still_path}`,
                    }}
                    className="h-full rounded-md w-full object-contain bg-contain"
                  />
                </TouchableOpacity>
                <View className="h-full w-[67%] flex justify-around">
                  <Text className="mr-2 h-[75%] overflow-hidden truncate">
                    {episode.overview}
                  </Text>
                  <Text
                    className={`${
                      Number(episode?.vote_average) > 6.5
                        ? "text-green-500"
                        : Number(episode?.vote_average) > 5
                        ? "text-[#edac34]"
                        : "text-red-600"
                    } text-sm font-semibold`}
                  >
                    {episode?.vote_average?.toString().slice(0, 3) + " / 10"}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Season;
