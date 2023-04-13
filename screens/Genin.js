import {NavigationContainer} from '@react-navigation/native';
import {
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Appbar,
  Button,
  TextInput,
  Avatar,
  ProgressBar,
} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Genin({navigation}) {
  const fs = Dimensions.get('window').fontScale;
  const [selectedButton, setSelectedButton] = useState('');

  const [style, setStyle] = useState('');
  const [text, setText] = useState('');

  const handlefreq = async () => {
    let pr = text + style;
    let data = JSON.stringify({
      version:
        'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      input: {
        prompt: pr,
        num_outputs: 4,
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.replicate.com/v1/predictions',
      headers: {
        Authorization: 'Token 04890391d41e038f86c2e5f2e112e1e89b9efdcf',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    // const response = await axios.request(config);
    navigation.navigate('genbet', {
      // getreq: response.data.urls.get,
      getreq: {},
      tes: pr,
    });
  };

  const handleButtonPress = (id, name) => {
    setSelectedButton(id);
    setStyle(name);
  };

  useEffect(() => {}, [style]);

  return (
    <View
      className=" flex bg-stone-900 justify-center w-full"
      style={{paddingTop: 50}}>
      <Appbar.Header style={{backgroundColor: '#1D1D1D'}}>
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.navigate('home');
          }}></Appbar.BackAction>
        <Appbar.Content color="white" title="Create"></Appbar.Content>
      </Appbar.Header>
      <View
        className="overflow-hidden bg-stone-900 flex flex-col items-start justify-between w-full"
        style={{paddingLeft: 24, paddingRight: 22, paddingBottom: 42}}>
        <Text
          className="shrink text-white-0 text-left"
          style={{fontSize: 12 / fs}}>
          Generate original, realistic images and art from a text description
        </Text>
        <TextInput
          className="w-full"
          style={{marginTop: 22}}
          label="Input"
          mode="flat"
          value={text}
          onChangeText={setText}></TextInput>
        <Text
          className="text-white-0 text-left"
          style={{marginTop: 16, fontSize: 14 / fs}}>
          Styles
        </Text>
        <View
          className="flex flex-row items-start justify-center w-full"
          style={{marginTop: 20}}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={[
              {id: '1', name: ' in cartoon style', image: require('../assets/cartoon.png')},
              {id: '2', name: ' in anime style', image: require('../assets/anime.png')},
              {id: '3', name: ' in ultra realistic style', image: require('../assets/realistic.png')},
              {id: '4', name: ' in water style', image: require('../assets/water.png')},
              {id: '5', name: ' in sketch style', image: require('../assets/sketch.png')},
              {id: '6', name: ' in pop style', image: require('../assets/pop.png')},
              {id: '7', name: ' in oil style', image: require('../assets/oil.png')},
              {id: '8', name: ' in van gogh style', image: require('../assets/vangogh.png')},
            ]}
            numColumns={3}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleButtonPress(item.id, item.name)}
                style={[
                  styles.button,
                  selectedButton === item.id && styles.selectedButton,
                ]}>
                <Image
                  style={styles.image}
                  source={item.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <Button
          className="w-full"
          style={{marginLeft: 1, marginTop: 19}}
          onPress={handlefreq}
          mode="contained"
          labelStyle={{padding: 5}}>
          Create
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: '#ff6347',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Genin;
