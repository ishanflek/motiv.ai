import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Animated,
  Text,
  StyleSheet,
  PanResponder,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Dimensions,
  Share,
  ActivityIndicator
} from 'react-native';

import Slider from '@react-native-community/slider';

import ViewShot, {captureRef} from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { white } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

function Editor({route, navigation}) {
  const [text, setText] = useState(route.params.quote);
  const [editing, setEditing] = useState(true);
  const imgurl = route.params.link
  const fs = Dimensions.get("window").fontScale;
  const pan = useRef(new Animated.ValueXY({ x: Dimensions.get("window").width/2, y: Dimensions.get("window").height/2 })).current;
  const [sliderValue, setSliderValue] = useState(12);
  const viewRef = useRef();
  const [txtcolor, setTxtColor] = useState('#000000');
  const [loading, setLoading] = useState(false);
  const [hue, setHue] = useState(0);


  let isImageUploaded = false;
  let downloadUrl = ""

  function hsvToRgb(h, s, v) {
    const c = v * s;
    const hp = h / 60;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    const rgb1 = [c, x, 0];
    const rgb2 = [x, c, 0];
    const rgb3 = [0, c, x];
    const rgb4 = [0, x, c];
    const rgb5 = [x, 0, c];
    const rgb6 = [c, 0, x];
    const segments = [
      [rgb1, rgb6],
      [rgb2, rgb1],
      [rgb3, rgb1],
      [rgb1, rgb4],
      [rgb5, rgb1],
      [rgb1, rgb3],
    ];
    const segmentIndex = Math.floor(hp) % 6;
    const t = (hp % 1) * 2 - 1;
    const color1 = segments[segmentIndex][0];
    const color2 = segments[segmentIndex][1];
    return [
      (color1[0] + (color2[0] - color1[0]) * t) * 255,
      (color1[1] + (color2[1] - color1[1]) * t) * 255,
      (color1[2] + (color2[2] - color1[2]) * t) * 255,
    ];
  }
  


  const handleColorChange = (hue) => {
    setHue(hue);
    const [r, g, b] = hsvToRgb(hue, 65, 80);
    setTxtColor(`rgb(${r}, ${g}, ${b})`);
  };
  



  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  const shareImage = async () => {
    try {
      if (!isImageUploaded) {
        Alert.alert('Please upload an image first.');
        return;
      }
      await Share.share({
        message: downloadUrl,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
};

const downloadImage = async () => {
  try {
    setLoading(true); // set loading to true
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 0.8,
    });

    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        setLoading(false); // set loading to false
        return;
      }
    }

    console.log(uri);
    const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    const imgName = '1787.png';
    const reference = storage().ref().child(uid).child(imgName);
    const task = reference.putFile(uri);
    console.log(loading)
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      setLoading(false); 
      reference.getDownloadURL().then((url) => {
        console.log('Download URL:', url);
        downloadUrl = url
        isImageUploaded = true
      }).catch((e) => console.log('Error getting download URL => ', e));
    }).catch((e) => console.log('uploading image error => ', e));

    console.log(45)
  } catch (error) {
    console.log("The error is" + error);
  } 
};

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const handleInputSubmit = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <View style={styles.container}>
    <ViewShot
      style={{height: "70%"}}
      ref={viewRef}
      options={{
        fileName: 'Your-File-Name',
        format: 'jpg',
        quality: 0.9,
      }}>
      <View style={{width: '100%', height: '100%'}}>
        <ImageBackground source={{uri: route.params.image_url}}>
          <View style={{height: "100%"}}>
            <Animated.Text
              style={[
                styles.draggableText,
                {fontSize: sliderValue},
                {color: txtcolor},
                {
                  transform: [{translateX: pan.x}, {translateY: pan.y}],
                },
              ]}
              {...panResponder.panHandlers}>
              {text}
            </Animated.Text>
          </View>
        </ImageBackground>
      </View>
    </ViewShot>
    {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.overlayText}>Uploading Image...</Text>
        </View>
      )}
    <View style={{height: '30%', backgroundColor: '#000000', padding: 0, margin: 0}}>
      {editing ? (
        <View style={styles.inputContainer}>
          <Text style={{color: txtcolor, marginTop: 12}}>Font Size</Text>
          <View style={styles.slidercontainer}>
            <Slider thumbTintColor="white" minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="white" minimumValue={24} maximumValue={60} step={5} stepValue={1} onValueChange={(id) => setSliderValue(id)} sliderValue={sliderValue} />
          </View>
          <Text style={{color: txtcolor, marginTop: 22}}>Font Color</Text>
          <View style={styles.slidercontainer}>
             <Slider minimumValue={0} maximumValue={360} step={2} thumbTintColor={hsvToRgb(hue, 95, 20)} minimumTrackTintColor="red" maximumTrackTintColor="blue" onValueChange={handleColorChange}/>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Quote here"
            placeholderTextColor="gray"
            onChangeText={setText}
            onSubmitEditing={handleInputSubmit}
            value={text}
          />
        </View>
      ) : (
        <View className="flex flex-row justify-around items-center">
          <TouchableOpacity className="bg-[#141519] rounded-lg w-24 flex flex-col items-center p-2" onPress={handleEdit}>
            <Image source={require('../assets/edit.png')} />
            <Text style={{color: 'white'}}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#141519] rounded-lg w-24 flex flex-col items-center p-2" onPress={downloadImage}>
            <Image source={require('../assets/save.png')} />
            <Text style={{color: 'white'}}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#141519] rounded-lg w-24 flex flex-col items-center p-2" onPress={shareImage}>
            <Image source={require('../assets/share.png')} />
            <Text style={{color: 'white'}}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 18,
  },
  draggableBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  draggableText: {
    fontWeight: 'bold',
    color: 'black',
    width: "70%",
    textAlign: 'center'
  },
  inputContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 0, // add this to reduce the gap
    padding: 0, margin: 1
  },
  input: {
    fontSize: 18,
    color: 'white',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 45
  },

  slidercontainer: {
    flex: 1,
    color: 'white',
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tag: {
    fontSize: 14,
    paddingVertical: 10,
  },
  slider: {
    borderRadius: 50,
  }
});

export default Editor;
