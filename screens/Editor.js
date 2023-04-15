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
  Share
} from 'react-native';

import Slider from '@react-native-community/slider';

import ViewShot, {captureRef} from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { white } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

function Editor({route, navigation}) {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(true);
  const imgurl = route.params.link
  const fs = Dimensions.get("window").fontScale;
  const pan = useRef(new Animated.ValueXY({ x: Dimensions.get("window").width/2, y: Dimensions.get("window").height/2 })).current;
  const [sliderValue, setSliderValue] = useState(12);
  const viewRef = useRef();
  const [txtcolor, setTxtColor] = useState('#000000');
  let isImageUploaded = false;
  let downloadUrl = ""


  const handleColorChange = (newColor) => {
    setColor(newColor);
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
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }
      console.log(uri);
      const currentUser = auth().currentUser;
      const uid = currentUser.uid;
      imgName= '1322211.png';
      let reference = storage().ref().child(uid).child(imgName);     
      let task = reference.putFile(uri);              
      Alert.alert('Uploading the image, wait till uploading finishes')
      task.then(() => {
        console.log('Image uploaded to the bucket!');
        reference.getDownloadURL().then((url) => {
            console.log('Download URL:', url);
            downloadUrl = url
            isImageUploaded = true
            Alert.alert('Image has been uploaded. You can share now')
          }).catch((e) => console.log('Error getting download URL => ', e));
      }).catch((e) => console.log('uploading image error => ', e));

      console.log(45)
      Alert.alert(
        '',
        'Image saved successfully.',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
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
      <View style={{height: '30%', backgroundColor: '#000000', padding: 0, margin: 0}}>
        {editing ? (
          <View style={styles.inputContainer}>
            <Text style={{color: 'white', marginTop: 12}}>Font Size</Text>
            <View style={styles.slidercontainer}>
              <Slider thumbTintColor="white" minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="white" minimumValue={24} maximumValue={60} step={5} stepValue={1} onValueChange={(id) => setSliderValue(id)} sliderValue={sliderValue} />
              <Slider style={styles.slider} minimumValue={0} maximumValue={10} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000" thumbTintColor={txtcolor} onValueChange={handleColorChange}/>
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
    padding: 0, margin: 0
  },
  input: {
    fontSize: 18,
    color: 'white',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 35
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingLeft: 320,
    alignItems: 'center',
  },
  editButton: {
    padding: 10,
    elevation: 3,
    opacity: 0.8,
  },
  editButtonText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    padding: 10,
    elevation: 3,
    opacity: 0.8,
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
});

export default Editor;
