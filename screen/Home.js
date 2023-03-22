import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import HomeCards from "../shared/HomeCards";
import TextHeader from "../shared/TextHeader";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const API_KEY = "27f6baf417b8c57971b37fba2b1a14b2";
  const [popularSeries, setPopularSeries] = useState();
  const [topRatedMovies, settopRatedMovies] = useState();
  const [topRatedSeries, settopRatedSeries] = useState();
  const [todaySeries, settodaySeries] = useState();
  const [todayMovies, settodayMovies] = useState();
  const FetchData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        setPopularSeries(res.data.results);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        settopRatedMovies(res.data.results);
      })
      .catch((err) => console.log(err));
    axios
      .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`)
      .then((res) => {
        settopRatedSeries(res.data.results);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        settodaySeries(res.data.results);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        settodayMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };
  useLayoutEffect(() => {
    FetchData();
  }, []);
  return (
    <View className="flex">
      <ScrollView>
        <View className="w-full h-[55vh]">
          {topRatedSeries?.length > 0 && (
            <View className="relative">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${topRatedSeries[4].poster_path}`,
                }}
                className="h-full w-full rounded-lg object-cover bg-cover"
              />
              <View className="absolute flex justify-center items-center w-full top-10">
                <Text className="text-sm text-white font-extrabold">
                  No #2 in the world this month
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Series", { id: 60625 })}
                >
                  <View className="rounded-md bg-white w-24 flex flex-row items-center justify-around px-4 h-10">
                    <FontAwesome name="play" size={20} color="black" />
                    <Text className="font-semibold text-lg">Play</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View className="ml-2 my-3">
          <TextHeader text={"Trending Series Today"} />
          <ScrollView horizontal={true}>
            {todaySeries?.map((series) => {
              return (
                <HomeCards
                  image={series?.poster_path}
                  action={() => navigation.navigate("Series", series)}
                />
              );
            })}
          </ScrollView>
        </View>
        <View className="ml-2 my-3">
          <TextHeader text={"Popular Series"} />
          <ScrollView horizontal={true}>
            {popularSeries?.map((series) => {
              return (
                <HomeCards
                  image={series?.poster_path}
                  action={() => navigation.navigate("Series", series)}
                />
              );
            })}
          </ScrollView>
        </View>
        <View className="ml-2 my-3">
          <TextHeader text={"Trending Movies Today"} />
          <ScrollView horizontal={true}>
            {todayMovies?.map((movie) => {
              return (
                <HomeCards
                  image={movie?.poster_path}
                  action={() => navigation.navigate("Movie", movie)}
                />
              );
            })}
          </ScrollView>
        </View>
        <View className="ml-2 my-3">
          <TextHeader text={"Top Rated Series"} />
          <ScrollView horizontal={true}>
            {topRatedSeries?.map((series) => {
              return (
                <HomeCards
                  image={series?.poster_path}
                  action={() => navigation.navigate("Series", series)}
                />
              );
            })}
          </ScrollView>
        </View>
        <View className="ml-2 my-3">
          <TextHeader text={"Top Rated Movies"} />
          <ScrollView horizontal={true}>
            {topRatedMovies?.map((movie) => {
              return (
                <HomeCards
                  image={movie?.poster_path}
                  action={() => navigation.navigate("Movie", movie)}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
