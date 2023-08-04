import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import RegisterScreen from "./screens/register";
import ForgotPasswordScreen from "./screens/forgotPassword";
import MenuScreen from "./screens/Menu";
import QuizScreen from "./screens/Quiz_page";
import SettingScreen from "./screens/setting";
import Titles from "./screens/consonants";
import VowTitles from "./screens/Vowels";
import Details from "./screens/Details";
import ProfileScreen from "./screens/profile";
import EditProfileScreen from "./screens/editProfile";
import ChangePasswordScreen from "./screens/changePassword";
import RSTitles from "./screens/Rsound";
import Favorites from "./screens/Favorite";
import MainScreen from "./screens/main";
import YoutubeScreen from "./screens/youtube";
import YouVidScreen from "./screens/youVid";
import QuizScoreScreen from "./screens/quizScore";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Phone" component={Titles} />
        <Stack.Screen name="Vow" component={VowTitles} />
        <Stack.Screen name="RS" component={RSTitles} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="QuizScore" component={QuizScoreScreen} />
        <Stack.Screen name="Youtube" component={YoutubeScreen} />
        <Stack.Screen name="YouVid" component={YouVidScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/* <Stack.Screen name="Video" component={VideoScreen} />*/
