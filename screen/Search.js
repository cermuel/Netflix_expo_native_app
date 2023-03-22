import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import SearchCard from "../shared/SearchCard";
import SearchMovieCard from "../shared/SearchMovieCard";
import axios from "axios";
import TextHeader from "../shared/TextHeader";

const Search = ({ navigation }) => {
  const [searchText, setsearchText] = useState("");
  const API_KEY = "27f6baf417b8c57971b37fba2b1a14b2";
  const user = { id: 1, name: "samuel" };
  const image = "https://reactjs.org/logo-og.png";
  const [searchType, setsearchType] = useState("multi");

  const [data, setdata] = useState();

  const FetchData = () => {
    if (searchText == "") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          setdata(res.data.results);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchText}`
        )
        .then((res) => {
          setdata(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    FetchData();
  }, [searchText]);

  return (
    <TouchableWithoutFeedback>
      <View className="flex-1 w-full relative">
        <View className="w-full bg-[#C4C4C4] flex flex-row justify-between items-center px-4 py-4">
          <TextInput
            onChangeText={(e) => setsearchText(e)}
            placeholder={"Search for a movie"}
            className="text-base text-[#424242] font-medium py-0 my-0"
          />
          <Text className="cursor-pointer">
            <EvilIcons name="search" size={24} color="#424242" />
          </Text>
        </View>

        {!searchText ? (
          <ScrollView className="w-full">
            <View className="pl-2 pt-2">
              <TextHeader text={"Top Searches"} />
            </View>
            {data?.map((movie) => {
              return (
                <SearchCard
                  image={movie.poster_path}
                  name={movie.title}
                  action={() => {
                    navigation.navigate("Movie", movie);
                  }}
                />
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView className="w-full">
            <View className="pl-2 pt-2">
              <TextHeader text={"Movies and Series"} />
            </View>
            <View className="w-full flex flex-wrap flex-row justify-around">
              {data?.length > 0 ? (
                data?.map((movie) => {
                  if (movie.media_type == "tv") {
                    return (
                      <SearchMovieCard
                        image={movie.poster_path}
                        name={movie.title}
                        action={() => {
                          navigation.navigate("Series", movie);
                        }}
                      />
                    );
                  } else {
                    <SearchMovieCard
                      image={movie.poster_path}
                      name={movie.title}
                      action={() => {
                        navigation.navigate("Movie", movie);
                      }}
                    />;
                  }
                })
              ) : (
                <View className="pt-6 w-full flex justify-center items-center">
                  <Text className="font-bold text-base">
                    What you're searching for does not exist!
                  </Text>
                  <Text className=" w-full text-center text-[#706e6e] font-semibold">
                    Try searching something else!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
