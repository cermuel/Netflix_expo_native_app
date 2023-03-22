import { View, Text, Linking, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import TextHeader from "../shared/TextHeader";

const Movie = ({ route, navigation }) => {
  const { id, title } = route.params;
  const [showInfo, setshowInfo] = useState(false);
  const API_KEY = "27f6baf417b8c57971b37fba2b1a14b2";
  const [movie, setMovie] = useState();
  const [SimilarMovies, setSimilarMovies] = useState();
  const [myId, setmyId] = useState();
  const [actors, setactors] = useState();
  let num = "7.123";

  useLayoutEffect(() => {
    setmyId(id);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${myId}?api_key=${API_KEY}&language=en-US`
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch(() => {});

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${myId}/similar?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => setSimilarMovies(response.data.results))
      .catch((err) => console.log(err));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${myId}/credits?api_key=${API_KEY}&language=en-US`
      )
      .then((response) => setactors(response.data.cast))
      .catch((err) => console.log(err));
  }, [myId]);
  return (
    <View className="w-full">
      <ScrollView>
        <Image
          className="w-full h-[60vh] object-contain bg-contain"
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
          }}
        />
        <View className="flex flex-row justify-around items-center mt-4 px-4">
          <View className="flex flex-row items-center justify-center bg-[#000000] rounded-md w-[40%] h-[45px]">
            <FontAwesome name="play" size={20} color="white" />
            <Text
              className="text-white text-lg font-medium mx-2"
              onPress={() => Linking.openURL("https://cermuel.vercel.app")}
            >
              Play
            </Text>
          </View>
          <View className="flex flex-row items-center justify-center bg-[#e4e1e1] rounded-md w-[40%] h-[45px]">
            <AntDesign name="infocirlceo" size={21} color="black" />
            <Text
              className="text-black text-lg font-medium mx-2"
              onPress={() => setshowInfo(!showInfo)}
            >
              {!showInfo ? "Get" : "Hide"} Info
            </Text>
          </View>
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
        {showInfo && (
          <View className="px-3 mt-5">
            <Text className="font-bold text-xl capitalize">
              {movie?.title}{" "}
            </Text>
            <View className="flex flex-row space-x-3 items-center">
              <Text
                className={`${
                  Number(movie?.vote_average) > 6.5
                    ? "text-green-500"
                    : Number(movie?.vote_average) > 5
                    ? "text-[#edac34]"
                    : "text-red-600"
                } text-base font-semibold`}
              >
                {movie?.vote_average?.toString().slice(0, 3) + " / 10"}
              </Text>
              <Text className="text-base font-semibold text-[#7890cd]">
                {movie?.spoken_languages[0].name}
              </Text>
            </View>
            <View className="flex flex-row">
              {movie?.genres?.map((genre) => (
                <Text className="text-[#232222] font-medium">
                  {genre.name}
                  {"   "}
                </Text>
              ))}
            </View>
            <View className="mt-1">
              <Text className="text-[#717070] font-medium text-base leading-5">
                {movie?.overview}
              </Text>
            </View>
          </View>
        )}
        {SimilarMovies?.length > 0 && (
          <View className="pl-2 mt-4 mb-2">
            <TextHeader text={"Similar Movies"} />
            <ScrollView horizontal={true}>
              {SimilarMovies?.map((similar) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setmyId(similar?.id);
                    }}
                  >
                    <View className="w-[180px] mx-2">
                      <Image
                        className="w-full h-80 object-contain bg-contain rounded-md"
                        source={{
                          uri: `https://image.tmdb.org/t/p/original/${similar?.poster_path}`,
                        }}
                      />
                      <Text className="text-black mx-2">{similar.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Movie;
