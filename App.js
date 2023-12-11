import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

function App() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    apiCall();
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTljNzQ0YTlkMWQ2MDYxZGM0OWI5NDRiNDFjNzM2MSIsInN1YiI6IjY1NzQwMThiYTg0YTQ3MDBjNDIxODE4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x8omoYNh5rzzR6mGUD0JpAvHK4L5PdOmED4SiqDqWA0",
    },
  };

  const apiCall = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => response.json(setData(response.results)))
      .catch((err) => console.error(err));
  };
  const filterData = () => {
    if (data === null) {
      return [];
    }

    return data.filter((item) =>
      item.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        }}
        resizeMode="contain"
        style={styles.poster}
      />
      <Text style={styles.heading}>{item.original_title}</Text>
      <Text style={{ marginRight: "20%", fontSize: "bold", paddingBottom: 10 }}>
        {item.release_date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Movies</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>

        <FlatList
          data={filterData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity onPress={() => {}} style={buttonStyles.button}>
          <Text style={buttonStyles.text}>Load More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    height: 300,
    width: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 3,
    marginTop: 5,
    marginRight: "20%",
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "1em",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  searchContainer: {
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    width: "40%",
    marginLeft: "30%",
    marginVertical: 10,
    alignItems: "center",
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    marginHorizontal: "35%",
  },
  text: {
    color: "#fff",
    fontWeight: "500",
    padding: 8,
    textAlign: "center",
  },
});

export default App;
