import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const Series = ({ navigation, route }) => {
  const API_KEY = "27f6baf417b8c57971b37fba2b1a14b2";
  const [showRating, setshowRating] = useState();
  const { id } = route.params;
  const [series, setSeries] = useState();
  const [actors, setactors] = useState();
  const [guestSession, setguestSession] = useState(
    "e3245da374e1b647e055d758deb7f11d"
  );
  const [rating, setrating] = useState();
  useLayoutEffect(() => {
    // axios
    //   .get(
    //     `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
    //   )
    //   .then((res) => setguestSession(res.data.guest_session_id))
    //   .catch((err) => alert(err));
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        setSeries(res.data);
      })
      .catch((err) => alert(err));

    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
      )
      .then((response) => setactors(response.data.cast))
      .catch((err) => console.log(err));
  }, []);

  const rateMovie = () => {
    if (rating <= 10 && guestSession) {
      const url = `https://api.themoviedb.org/3/tv/{tv_id}/rating`;
      const data = {
        value: Number(rating),
      };
      const headers = {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `'Bearer ' + ${API_KEY}`,
      };
      const config = {
        headers,
        params: {
          api_key: API_KEY,
          guest_session_id: guestSession,
        },
      };
      axios
        .post(url.replace("{tv_id}", id), data, config)
        .then((response) => {
          alert("success");
        })
        .catch((error) => {
          alert(error);
        });
    } else if (rating > 10) {
      alert("Value too high");
    } else {
      alert("Guest not available");
    }
  };
  if (series && guestSession) {
    return (
      <ScrollView>
        {/* {showRating && (
          <View className="absolute flex flex-row z-50 shadow-lg shadow-[#838282] rounded-md bg-white p-4 top-[20%] left-[15%]">
            <TextInput
              placeholder="Rating must be between 0 and 10.0"
              maxLength={4}
              onChangeText={(value) => setrating(value)}
            />
            <View className="ml-2 bg-slate-500 text-white text-xs rounded-sm h-10 p-0">
              <Button
                title="Rate"
                color={"white"}
                onPress={() => rateMovie()}
              />
            </View>
          </View>
        )} */}

        <View className="w-full h-[26vh]">
          <TouchableOpacity className="w-full">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${series?.poster_path}`,
              }}
              className="h-full w-full object-contain bg-contain"
            />
          </TouchableOpacity>
        </View>
        <View className="px-2 items-center mt-2 flex flex-row justify-between ">
          <Text className="font-bold text-[#444444] text-2xl">
            {series.name}
          </Text>
          <View>
            <EvilIcons
              name="like"
              size={28}
              color="black"
              onPress={() => setshowRating(!showRating)}
            />
            <Text
              className="text-xs"
              onPress={() => setshowRating(!showRating)}
            >
              Rate
            </Text>
          </View>
        </View>
        <View className="pl-2 flex flex-row space-x-3 items-center">
          <Text
            className={`${
              Number(series?.vote_average) > 6.5
                ? "text-green-500"
                : Number(series?.vote_average) > 5
                ? "text-[#edac34]"
                : "text-red-600"
            } text-base font-semibold`}
          >
            {series?.vote_average?.toString().slice(0, 3) + " / 10"}
          </Text>
          <Text className="text-base capitalize font-semibold text-[#7890cd]">
            {series?.original_language}
          </Text>
          <Text className="font-semibold text-base text-[#484747] underline">
            {series.number_of_seasons} Seasons
          </Text>
        </View>
        <View className="mt-4 px-2 w-full flex flex-row items-center">
          <Text className="text-lg font-semibold">Cast:</Text>
          <ScrollView horizontal={true}>
            {actors?.map((actor) => {
              return (
                <TouchableOpacity>
                  <Image
                    className="w-10 h-10 mx-2 rounded-full object-contain bg-contain"
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${actor?.profile_path}`,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View className="pl-2">
          <Text className="text-[#5e5c5c] font-medium text-lg leading-6 mt-2 tracking-tighter">
            {series.overview}
          </Text>
        </View>
        <View>
          {series.seasons?.map((season) => {
            const objToPass = {
              tv_id: id,
              id: season?.id,
              overview: season?.overview,
              name: series?.name,
              API_KEY,
              season_number: season?.season_number,
            };
            return (
              <View>
                <Text className="pl-2 mt-4 mb-1 text-base font-bold text-[#585656]">
                  {season.name}
                </Text>
                <View className="flex flex-row px-2 h-16 overflow-hidden">
                  <TouchableOpacity
                    className="w-[30%] mr-2"
                    onPress={() => navigation.navigate("Season", objToPass)}
                  >
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${season?.poster_path}`,
                      }}
                      className="h-full rounded-md w-full object-contain bg-contain"
                    />
                  </TouchableOpacity>
                  <Text className="mr-2 w-[67%] overflow-hidden truncate">
                    {season.overview}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
};

export default Series;
