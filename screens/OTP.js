import React, {useState, useEffect} from 'react';
import { View, Text,StyleSheet,Dimensions} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';

function OTP({route, navigation}) {
  const [code, setCode] = useState('');
  const fs = Dimensions.get("window").fontScale;
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    (async function() {
      const confirmation = await auth().signInWithPhoneNumber.confirm(route.params.verificationId);
      setConfirmation(confirmation);
    })();
  }, [route.params.verificationId]);

  async function confirmCode() {
    console.log(confirmation);
    try {
      await confirmation.confirm(code);
      console.log('Valid code')
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  function onAuthStateChanged(user) {
    if (user) {
      navigation.navigate('nns')
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

    return (
      <View className="overflow-hidden bg-stone-900 h-full flex flex-col justify-between w-full" style={{paddingLeft: 22, paddingRight: 24, paddingTop: 60, paddingBottom: 454}}>
        <Text className="shrink text-neutral-300 text-left" style={{paddingTop: 40, fontSize: 36 / fs}}>Code{'\n'}Confirmation</Text>
        <TextInput onChangeText={(value) => {setCode(value)}} className="w-full" style={{marginTop: 55}} label="Enter OTP" mode="flat"></TextInput>
        <Button className="w-full" style={{marginTop: 21}} onPress={confirmCode} mode="contained" labelStyle={{"padding":5}}>Next</Button>
      </View>
    );
}

export default OTP;
