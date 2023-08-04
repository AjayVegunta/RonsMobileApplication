import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const fetchUsername = async () => {
    try {
      const response = await fetch(
        "https://sxu2906.uta.cloud/getUsername.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.status === "success") {
        const { fname, lname, username, email, contact, dob } = data.user;
        setUsername(username);
        setEmail(email);
        setContact(contact);
        setDob(dob);
        setFname(fname);
        setLname(lname);
      } else {
        Alert.alert("Failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsername();
    }, [])
  );
  const editUsername = () => {
    navigation.navigate("EditProfile", { username });
  };
  const editEmail = () => {
    navigation.navigate("EditProfile", { email });
  };
  const editContact = () => {
    navigation.navigate("EditProfile", { contact });
  };
  const editDOB = () => {
    navigation.navigate("EditProfile", { dob });
  };
  const editFname = () => {
    navigation.navigate("EditProfile", { fname });
  };
  const editLname = () => {
    navigation.navigate("EditProfile", { lname });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="caret-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <View />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>First Name</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{fname}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Ionicons
            style={styles.editIcon}
            name="create-outline"
            size={30}
            onPress={editFname}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Last Name</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{lname}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Ionicons
            style={styles.editIcon}
            name="create-outline"
            size={30}
            onPress={editLname}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Username</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Ionicons
            style={styles.editIcon}
            name="create-outline"
            size={30}
            onPress={editUsername}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Email</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{email}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Ionicons
            style={styles.editIcon}
            name="create-outline"
            size={30}
            onPress={editEmail}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Contact</Text>
        <TouchableOpacity style={styles.arrowContainer}>
          <Text style={styles.dataText}>{contact}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editContainer}>
          <Ionicons
            style={styles.editIcon}
            name="create-outline"
            size={30}
            onPress={editContact}
          ></Ionicons>
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
  dataText: {
    color: "gray",
    top: 3,
  },
  editIcon: {
    top: 3,
    textAlign: "right",
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
  contactContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  editContainer: {
    top: -40,
    marginBottom: -20,
  },
  settingContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
  },
});
export default ProfileScreen;
