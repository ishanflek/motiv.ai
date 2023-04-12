import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

function Phnscreen({ navigation }) {
  const [phn, setPhn] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');
  const fs = Dimensions.get("window").fontScale;

  // Handle the button press to send the OTP
  async function sendOTP() {
    console.log(phn)
    console.log(confirmation)
    const confirmation = await auth().signInWithPhoneNumber("+91" + phn);
    setConfirmationResult(confirmation);
  }

  // Handle the button press to confirm the OTP
  async function confirmCode() {
    try {
      await confirmationResult.confirm(code);
      console.log('Valid code')
      setConfirmationResult('')
      navigation.navigate('nns')
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  useEffect(() => {
    // Listen for changes in the authentication state
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('main')
      }
    });
  }, []);

  return (
    <View className="overflow-hidden bg-stone-900 h-full flex flex-col justify-between w-full" style={{ paddingLeft: 22, paddingRight: 24, paddingTop: 60, paddingBottom: 454 }}>
      {!confirmationResult ?
        <>
          <Text className="shrink text-neutral-300 text-left" style={{ paddingTop: 40, fontSize: 36 / fs }}>Great to see you today!</Text>
          <TextInput className="w-full" style={{ marginTop: 55 }} value={phn} onChangeText={(value) => { setPhn(value) }} label="Phone Number" mode="flat"></TextInput>
          <Button className="w-full" style={{ marginTop: 21 }} onPress={sendOTP} mode="contained" labelStyle={{ "padding": 5 }}>Next</Button>
        </>
        :
        <>
          <Text className="shrink text-neutral-300 text-left" style={{ paddingTop: 40, fontSize: 36 / fs }}>Code{'\n'}Confirmation</Text>
          <TextInput onChangeText={(value) => { setCode(value) }} className="w-full" style={{ marginTop: 55 }} label="Enter OTP" mode="flat"></TextInput>
          <Button className="w-full" style={{ marginTop: 21 }} onPress={confirmCode} mode="contained" labelStyle={{ "padding": 5 }}>Next</Button>
        </>
      }
    </View>
  );
}

export default Phnscreen;

