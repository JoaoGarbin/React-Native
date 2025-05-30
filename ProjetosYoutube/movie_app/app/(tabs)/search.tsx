import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { SearchBar } from "react-native-screens";
import SearchBarComponents from "@/components/SearchBarComponents";
import { updateSearchCount } from "@/services/appwhite";

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: movie,
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({
        query: searchQuery,
    }), false)

    useEffect(() => {

        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery])

    useEffect(() => {
        if (movie?.length > 0 && movie?.[0]) {
            updateSearchCount(searchQuery, movie[0]);
        }
    }, [movie]);



    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

            <FlatList
                data={movie}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        <View className="my-5">
                            <SearchBarComponents
                                placeholder="Search movies ..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-03" />
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}

                        {!loading && !error && searchQuery.trim() && movie?.length > 0 && (
                            <Text className="text-xl text-white ">
                                Search Results for{' '}
                                <Text className="text-accent">{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim() ? 'No movies found' : 'Search'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}
export default Search