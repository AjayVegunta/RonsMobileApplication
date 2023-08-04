import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
const jsondata = require("../assets/data.json");

const Details = ({ route, navigation }) => {
  const { UID, PID, titles } = route.params;
  const [data, setData] = useState(null);

  const [prevFavorites, setpreFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = jsondata.find((item) => item.ID === PID);
        setData(item);
        const prevFav = await AsyncStorage.getItem("favor_" + UID);
        setpreFavorites(JSON.parse(prevFav));
        if (prevFav !== null && prevFav.includes(item.IPA.toString())) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [PID]);
  const playSound = (text) => {
    if (text) {
      Speech.speak(text);
    }
  };

  const handleFavorite = () => {
    if (data && data.IPA) {
      // Check if current data is already a favorite
      if (prevFavorites !== null) {
        const isFavorite = prevFavorites.some((item) => item.ID === data.ID);
        if (isFavorite) {
          // Remove from favorites
          const updatedFavorites = prevFavorites.filter(
            (item) => item.ID !== data.ID
          );
          setpreFavorites(updatedFavorites);
          AsyncStorage.setItem(
            "favor_" + UID,
            JSON.stringify(updatedFavorites)
          );
        } else {
          // Add to favorites
          const newFavorite = { ID: data.ID, IPA: data.IPA };
          setpreFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
          AsyncStorage.setItem(
            "favor_" + UID,
            JSON.stringify([...prevFavorites, newFavorite])
          );
        }
      } else {
        const newFavorite = { ID: data.ID, IPA: data.IPA };
        AsyncStorage.setItem("favor_" + UID, JSON.stringify([newFavorite]));
        setpreFavorites([newFavorite]);
      }
      setIsFavorite(!isFavorite);
    }
  };

  const handleNext = () => {
    if (data) {
      const index = titles.findIndex((item) => item.ID === data.ID);
      if (index < titles.length - 1) {
        const nextTitle = titles[index + 1];
        const nextItem = jsondata.find((item) => item.ID === nextTitle.ID);
        navigation.replace("Details", { PID: nextItem.ID, titles });
      }
    }
  };

  const handlePrevious = () => {
    if (data) {
      const index = titles.findIndex((item) => item.ID === data.ID);
      if (index > 0) {
        const previousTitle = titles[index - 1];
        const previousItem = jsondata.find(
          (item) => item.ID === previousTitle.ID
        );
        navigation.replace("Details", { PID: previousItem.ID, titles });
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack("PreviousScreenKey")}
        >
          <Ionicons name="caret-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Explanation</Text>
        <TouchableOpacity style={styles.backContainer} onPress={handleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={32}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.content}>
        {data ? (
          <View style={styles.detailsContainer}>
            <Text style={styles.ipa}>{data.IPA}</Text>
            <Text style={styles.explanation}>{data.Explanation}</Text>
            {data.Examples && (
              <View style={styles.examplesContainer}>
                <Text style={styles.examplesTitle}>Examples:</Text>
                {data.Examples.split(", ").map(
                  (example, index) =>
                    example && ( // Added check for undefined value
                      <TouchableOpacity
                        onPress={() => playSound(example)}
                        key={index}
                      >
                        <Text style={styles.example}>{example}</Text>
                      </TouchableOpacity>
                    )
                )}
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </SafeAreaView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={titles.findIndex((item) => item.ID === data?.ID) === 0}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={48}
            color={
              titles.findIndex((item) => item.ID === data?.ID) === 0
                ? "gray"
                : "black"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={
            titles.findIndex((item) => item.ID === data?.ID) ===
            titles.length - 1
          }
        >
          <Ionicons
            name="arrow-forward-circle-outline"
            size={48}
            color={
              titles.findIndex((item) => item.ID === data?.ID) ===
              titles.length - 1
                ? "gray"
                : "black"
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "black",
    height: Platform.OS === "ios" ? 110 : 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 24,
    color: "white",
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  backContainer: {
    marginTop: Platform.OS === "ios" ? 50 : 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    alignItems: "center",
  },
  ipa: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  explanation: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  examplesContainer: {
    width: "100%",
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  example: {
    fontSize: 16,
    marginBottom: 5,
    color: "blue",
    textDecorationLine: "underline",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
});

export default Details;
