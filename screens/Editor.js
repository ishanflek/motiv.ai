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
  Dimensions
} from 'react-native';

import { v4 as uuidv4 } from 'uuid';

import ViewShot, {captureRef} from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

function Editor({route, navigation}) {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(true);
  const imgurl = route.params.link
  const fs = Dimensions.get("window").fontScale;
  const pan = useRef(new Animated.ValueXY()).current;

  const viewRef = useRef();

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
      const cu = auth().currentUser;
      const uuid = cu.uid;
      const reference = storage().ref(`${uuid}/m.png`);
      //      const reference = storage().ref(`${uuid}/${imgname}`);
      //const imgname = Math.floor(Date.now() / 1000) + ".png";
      console.log(uri)
      const pathToFile = `${uri}`;
      const task = await reference.putFile(pathToFile);
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });
      
      task.then(() => {
        console.log('Image uploaded to the bucket!');
      });
      
      Alert.alert(
        '',
        'Image saved successfully.',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (error) {
      console.log('error', error);
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
        style={{height: "90%"}}
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
              {
                transform: [{translateX: 100}, {translateY:100}],
              },
            ]}
            {...panResponder.panHandlers}>
            {text}
          </Animated.Text>
          </View>
        </ImageBackground>
        </View>
        </ViewShot>
      <View style={{height: '10%', backgroundColor: '#000000', padding: 5}}>
        {editing ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Quote here"
              placeholderTextColor="gray"
              onChangeText={setText}
              onSubmitEditing={handleInputSubmit}
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
            <TouchableOpacity className="bg-[#141519] rounded-lg w-24 flex flex-col items-center p-2" onPress={downloadImage}>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    width: "70%",
    textAlign: 'center'
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 3,
  },
  input: {
    fontSize: 18,
    color: 'white',
    width: '100%',
    paddingHorizontal: 10,
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
});

export default Editor;
