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
} from 'react-native';

import ViewShot, {captureRef} from 'react-native-view-shot';
// import CameraRoll from '@react-native-community/cameraroll';

function Editor({navigation, route}) {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(true);
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
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
        result: 'base64',
      });
      console.log(uri);
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      console.log(uri);
      // const image = CameraRoll.save(uri);
      // if (image) {
      //   Alert.alert(
      //     '',
      //     'Image saved successfully.',
      //     [{text: 'OK', onPress: () => {}}],
      //     {cancelable: false},
      //   );
      // }
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
      {/* <ViewShot
        ref={viewRef}
        options={{
          fileName: 'Your-File-Name',
          format: 'jpg',
          quality: 0.9,
          result: 'base64',
        }}> */}
      <ImageBackground source={{uri: route.params.image_url}}>
        <View style={{width: '100%', height: '90%'}}>
          <Animated.Text
            style={[
              styles.draggableText,
              {
                transform: [{translateX: pan.x}, {translateY: pan.y}],
              },
            ]}
            {...panResponder.panHandlers}>
            {text}
          </Animated.Text>
        </View>
      </ImageBackground>
      {/* </ViewShot> */}
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
