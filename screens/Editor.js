import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Animated,
  Text,
  StyleSheet,
  PanResponder,
  FlatList,
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
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
const { height,width } = Dimensions.get('window');

function Editor({route, navigation}) {
  const [text, setText] = useState("A very beautiful quote begins with ????");
  const [editing, setEditing] = useState(true);
  const fs = Dimensions.get("window").fontScale;
  const pan = useRef(new Animated.ValueXY({ x: Dimensions.get("window").width/2, y: Dimensions.get("window").height/2 })).current;
  const [sliderValue, setSliderValue] = useState(16);
  const [scale, setScale] = useState(1);
  const viewRef = useRef();
  const [loading, setLoading] = useState(false);
  const [imguploaded, setImageUploaded] = useState(false);
  const [downloadUrl, setDownloadURL] = useState("")
  const colors = [
    { id: '#EB5DDD', value: '#EB5DDD' },
    { id: '#5D63EB', value: '#5D63EB' },
    { id: '#5DD1EB', value: '#5DD1EB' },
    { id: '#5DEBB8', value: '#5DEBB8' },
    { id: '#C6EB5D', value: '#C6EB5D' },
    { id: '#EBA15D', value: '#EBA15D' },
    { id: '#EB5D5D', value: '#EB5D5D' },
    { id: '#000000', value: '#000000' },
    { id: '#FFFFFF', value: '#FFFFFF' },
  ];
  const [txtcolor, setTxtColor] = useState("#000000");


  const onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setScale(scale * event.nativeEvent.scale);
    }
  };
 
  const handlePress = (color) => {
    setTxtColor(color);
    // call your function here
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
    try {
 // set loading to true
  
      if (!imguploaded) {
        setLoading(true);
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
            setDownloadURL(url);
            setImageUploaded(true);
          }).catch((e) => console.log('Error getting download URL => ', e));
        }).catch((e) => console.log('uploading image error => ', e));
  
      } else {
        await Share.share({
          message: downloadUrl,
        });
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: item.value }]}
      onPress={() => handlePress(item.id)}
    />
  );

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
    console.log("hello")
    setEditing(true);
    console.log("editing:", editing);
  };

  return (
    <View style={styles.container}>
    <ViewShot
      style={{height: "85%"}}
      ref={viewRef}
      options={{
        fileName: 'Your-File-Name',
        format: 'jpg',
        quality: 0.6,
      }}>
      <View style={{width: '100%', height: '100%'}}>
        <ImageBackground source={{uri: route.params.image_url}}>
          <View style={{height: "100%"}}>
          <PinchGestureHandler
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}>
              <Animated.Text
                onPress={handleEdit}
                style={[
                  styles.draggableText,
                  { fontSize: sliderValue * scale },
                  { color: txtcolor },
                  {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                  },
                ]}
                {...panResponder.panHandlers}>
                {text}
              </Animated.Text>
            </PinchGestureHandler>
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
    <View style={{height: '15%', backgroundColor: '#1D1D1D', padding:0}}>
        <FlatList
            style={{paddingTop: height/62, marginLeft: width*0.065, marginBottom: height/52}}
            data={colors}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        <View className="justify-around items-center">
          <TouchableOpacity 
          style={{width: "90%", height: height/20, backgroundColor: '#AAAAAA24', borderRadius: 8, marginBottom: height/30}} 
          onPress={shareImage}
        >
          <Text style={{color: 'white',marginBottom: 14, paddingTop: "3%", paddingLeft: "43%"}}>Share</Text>
        </TouchableOpacity>
        </View>
    </View>
  </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overly: {

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
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 6,
  },
});

export default Editor;


