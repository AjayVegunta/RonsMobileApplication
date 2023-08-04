import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import localImage from "../assets/logo3.png";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          "https://sxu2906.uta.cloud/getSession.php",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json", // I added this line
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const value = await response.json();

        if (value.status === "success") {
          const id = value.user.id;
          const fname = value.user.fname;
          const lname = value.user.lname;
          const email = value.user.email;
          navigation.navigate("Main", {
            UID: id,
            fname: fname,
            lname: lname,
            email: email,
          });
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={localImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  image: {
    width: 332,
    height: 500,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 60,
  },
  button: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 170,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  button1: {
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 170,
    margin: 10,
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s, color 0.3s",
  },
  buttonText1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default HomeScreen;
