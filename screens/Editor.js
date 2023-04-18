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

function Editor({route, navigation}) {
  const [text, setText] = useState(route.params.quote);
  const [editing, setEditing] = useState(true);
  const colors = ["red", "blue", "yellow", "lightgreen", "violet", "pink", "orange", "white", "black", "cyan"];
  const fs = Dimensions.get("window").fontScale;
  const pan = useRef(new Animated.ValueXY({ x: Dimensions.get("window").width/2, y: Dimensions.get("window").height/2 })).current;
  const [sliderValue, setSliderValue] = useState(12);
  const viewRef = useRef();
  const [txtcolor, setTxtColor] = useState('#000000');
  const [loading, setLoading] = useState(false);
  const [imguploaded, setImageUploaded] = useState(false);
  const [downloadUrl, setDownloadURL] = useState("")
 
  const handleColorChange = (color) => {
    setTxtColor(color);
  }

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
        Alert.alert(
          '',
          'Your permission is required to save images to your device',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
        return true;
      }
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  const shareImage = async () => {
    console.log(imguploaded)
    try {
      if (imguploaded === false) {
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
    const imgName = Math.floor(Date.now() / 1000) + ".png";
    const reference = storage().ref().child(uid).child(imgName);
    const task = reference.putFile(uri);
    console.log(loading)
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      setLoading(false); 
      reference.getDownloadURL().then((url) => {
        console.log('Download URL:', url);
        setDownloadURL(url)
        setImageUploaded(true)
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
      style={{height: "80%"}}
      ref={viewRef}
      options={{
        fileName: 'Your-File-Name',
        format: 'jpg',
        quality: 0.6,
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
    <View style={{height: '20%', backgroundColor: '#000000', padding: 0, margin: 0}}>
      {editing ? (
        <View style={styles.inputContainer}>
          <Text style={{color: "white", marginTop: 12}}>Font Size</Text>
          <View style={styles.slidercontainer}>
            <Slider thumbTintColor="white" minimumTrackTintColor="grey" maximumTrackTintColor="white" minimumValue={24} maximumValue={60} step={5} stepValue={1} onValueChange={(id) => setSliderValue(id)} sliderValue={sliderValue} />
          </View>
          <Text style={{color: "white", marginTop: 2, marginBottom: 8}}>Font Color</Text>
          <View style={styles.containr}>
            {colors.map((color) => (
              <TouchableOpacity 
                key={color} 
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => handleColorChange(color)}
              />
            ))}
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="Enter Quote here"
              placeholderTextColor="gray"
              onChangeText={setText}
              value={text}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleInputSubmit}
            >
              <Text style={{ color: 'white' }}>Done</Text>
            </TouchableOpacity>
          </View>
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
  doneButton: {
    backgroundColor: 'darkgrey',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 30,
    width: "20%",
    height: "60%"
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
    padding: 0,
    margin: 2
  },
  input: {
    fontSize: 18,
    color: 'white',
    width: '80%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 35
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  slider: {
    borderRadius: 50,
  },
  containr: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 0,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Editor;
