import React, { useEffect } from "react";
import { Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Screens
import HomeScreen from "./Menu";
import ProfileScreen from "./profile";
import EditProfileScreen from "./editProfile";
import ChangePasswordScreen from "./changePassword";
import SettingsScreen from "./setting";
import YoutubeScreen from "./youtube";
import YouVidScreen from "./youVid";
import Favorites from "./Favorite";

// Screen names
const homeName = "Home";
const videoName = "Video";
const titleName = "Title";
const settingsName = "Settings";
const favoriteName = "Favorites";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const YoutubeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Youtube"
        component={YoutubeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YouVid"
        component={YouVidScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainScreen = ({ route }) => {
  const { UID, fname, lname, email } = route.params;

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarStyle: { height: Platform.OS === "ios" ? 100 : 70 },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === videoName) {
            iconName = focused ? "play" : "play-outline";
          } else if (rn === favoriteName) {
            iconName = focused ? "star" : "star-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={30}
              color={color}
              style={{ padding: 10, height: 70, marginTop: 30 }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
        initialParams={{ UID: UID, fname: fname, lname: lname, email: email }}
      />
      <Tab.Screen
        name={videoName}
        component={YoutubeStack}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
      <Tab.Screen
        name={favoriteName}
        component={Favorites}
        options={{ headerShown: false, unmountOnBlur: true }}
        initialParams={{ UID: UID }}
      />
      <Tab.Screen
        name={settingsName}
        component={SettingStack}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
