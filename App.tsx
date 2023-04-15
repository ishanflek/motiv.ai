import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, Linking} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider, useTheme, BottomNavigation} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Phnscreen from './screens/Phnscreen';
import Newname from './screens/Newname';
import ToS from './screens/TOS';
import Pref from './screens/Preferences';
import Acc from './screens/Account';
import About from './screens/About';
import Help from './screens/Help';
import Home from './screens/Home';
import Genout from './screens/Genout';
import Genin from './screens/Genin';
import Genbet from './screens/Genbet';
import First from './screens/First';
import Editor from './screens/Editor';

import auth from '@react-native-firebase/auth';

import CustomIcon from './screens/CustomIcon';
/*
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
*/

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator barStyle={{backgroundColor: '#171817'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image source={require('./assets/home.png')} alt=""></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Genin}
        options={{
          tabBarIcon: () => (
            <Image source={require('./assets/plus-circle.png')} alt=""></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Genout}
        options={{
          tabBarIcon: () => (
            <Image source={require('./assets/user.png')} alt=""></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
} 

{/*
const MainTabNavigator = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'create', title: 'Create', icon: 'plus-circle' },
    { key: 'profile', title: 'Profile', icon: 'user' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    create: Genin,
    profile: Genout,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#171817' }}
      activeColor='#ff0000'
      inactiveColor='#0000ff'
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      labeled={false}
    />
  );
};
*/}


function App(): JSX.Element {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function SplashScreen() {
    return (
      <View>
        <Image source={require('./assets/243_2380.png')} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (initializing) {
    return <SplashScreen />;
  }

  if (!user) {
    return (
      <PaperProvider
        theme={{
          colors: {
            primary: '#121416',
            onPrimary: '#ffffff',
            primaryContainer: '#d8d8d8',
            onPrimaryContainer: '#050506',
            secondary: '#4e6355',
            onSecondary: '#ffffff',
            secondaryContainer: 'transparent',
            onSecondaryContainer: '#1D1D1D',
            tertiary: '#3c6471',
            onTertiary: '#ffffff',
            tertiaryContainer: '#dfe5e7',
            onTertiaryContainer: '#0f191c',
            error: '#ba1a1a',
            onError: '#ffffff',
            errorContainer: '#f4d9d9',
            onErrorContainer: '#2f0707',
            background: '#fcfcfc',
            onBackground: '#171817',
            surface: '#fcfcfc',
            onSurface: '#171817',
            surfaceVariant: '#e4e5e3',
            onSurfaceVariant: '#444841',
            outline: '#767b72',
            outlineVariant: '#c8cac7',
            onOutline: '#444841',
            onOutlineVariant: '#c8cac7',
            shadow: '#000000',
            scrim: '#000000',
            inversePrimary: '#b0b1b1',
            inverseSurface: '#171817',
            inverseOnSurface: '#e4e4e4',
            surfaceDisabled: '#17181731',
            onSurfaceDisabled: '#17181797',
            elevation: {
              level0: 'transparent',
              level1: '#12141613',
              level2: '#12141620',
              level3: '#12141628',
              level4: '#12141631',
              level5: '#12141636',
            },
          },
          roundness: 3,
        }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="splash" component={First} />
            <Stack.Screen name="first" component={First} />
            <Stack.Screen name="second" component={Phnscreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider
      theme={{
        colors: {
          primary: '#121416',
          onPrimary: '#ffffff',
          primaryContainer: '#d8d8d8',
          onPrimaryContainer: '#050506',
          secondary: '#4e6355',
          onSecondary: '#ffffff',
          secondaryContainer: 'transparent',
          onSecondaryContainer: '#1D1D1D',
          tertiary: '#3c6471',
          onTertiary: '#ffffff',
          tertiaryContainer: '#dfe5e7',
          onTertiaryContainer: '#0f191c',
          error: '#ba1a1a',
          onError: '#ffffff',
          errorContainer: '#f4d9d9',
          onErrorContainer: '#2f0707',
          background: '#fcfcfc',
          onBackground: '#171817',
          surface: '#fcfcfc',
          onSurface: '#171817',
          surfaceVariant: '#e4e5e3',
          onSurfaceVariant: '#444841',
          outline: '#767b72',
          outlineVariant: '#c8cac7',
          onOutline: '#444841',
          onOutlineVariant: '#c8cac7',
          shadow: '#000000',
          scrim: '#000000',
          inversePrimary: '#b0b1b1',
          inverseSurface: '#171817',
          inverseOnSurface: '#e4e4e4',
          surfaceDisabled: '#17181731',
          onSurfaceDisabled: '#17181797',
          elevation: {
            level0: 'transparent',
            level1: '#12141613',
            level2: '#12141620',
            level3: '#12141628',
            level4: '#12141631',
            level5: '#12141636',
          },
        },
        roundness: 3,
      }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
            name="main"
            component={MainTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="tos" component={ToS} />
          <Stack.Screen name="pref" component={Pref} />
          <Stack.Screen name="acc" component={Acc} />
          <Stack.Screen name="about" component={About} />
          <Stack.Screen name="help" component={Help} />
          <Stack.Screen name="edit" component={Editor} />
          <Stack.Screen name="genbet" component={Genbet} />
          <Stack.Screen name="nns" component={Newname} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    width: 150,
    marginTop: 100,
    marginHorizontal: 5,
    display: 'flex',
  },
  chk: {
    marginLeft: 40,
  },
  hltxt: {
    textDecorationLine: 'underline',
  },
  txt3: {
    marginLeft: 20,
    width: 250,
  },
  txt2: {
    textAlignVertical: 'center',
    width: 290,
    textAlign: 'center',
    marginBottom: 80,
    height: 55,
    paddingLeft: 80,
  },
  txt: {
    fontSize: 65,
    marginTop: 20,
    paddingTop: 70,
    paddingLeft: 80,
    paddingBottom: 40,
  },
  img: {
    width: 230,
    height: 226,
    left: 76,
    top: 81,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderRadius: 4,
    width: 340,
    height: 50,
    marginLeft: 23,
    marginTop: 30,
  },
  buttontext: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
