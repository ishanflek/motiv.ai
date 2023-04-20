import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

function Phnscreen({ navigation }) {
  const [phn, setPhn] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [pressed, setPressed] = useState(false)
  const [code, setCode] = useState('');
  const fs = Dimensions.get("window").fontScale;
  const { height,width } = Dimensions.get('window');

  // Handle the button press to send the OTP
  async function sendOTP() {

    const phoneRegex = /^\d{10}$/; // Regular expression for matching 10-digit phone numbers

    if (!phoneRegex.test(phn)) {
      Alert.alert("Invalid phone number"); // If phone number is not 10 digits, log an error message
      return;
    }

    setPressed(true)
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
      const subscriber = auth().onAuthStateChanged(user => {
        if (user) 
        { 
          if(user.metadata.creationTime === user.metadata.lastSignInTime) {
          navigation.navigate('nns');
        } else {
          navigation.navigate('main');
        }
      }
      else {
        navigation.navigate('first')
      }
      });
    } catch (error) {
      Alert.alert('Wrong code.');
      setPressed(false)
    }
  }

{/*}  useEffect(() => {
    // Listen for changes in the authentication state
    const subscriber = auth().onAuthStateChanged(user => {
      if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
        navigation.navigate('nns');
      } else {
        navigation.navigate('main');
      }
    });
  }, []);
*/}

  return (
    <View className="overflow-hidden bg-stone-900 h-full flex flex-col justify-between w-full" style={{ paddingLeft: width*0.07, paddingRight: width*0.08, paddingTop: height/9, paddingBottom: height/1.8}}>
      {!pressed ?
        <>
          <Text className="text-neutral-300 text-left" style={{ paddingTop: height/96, fontSize: 36 / fs }}>Great to see you today!</Text>
          <TextInput className="w-full" style={{ marginTop: height/21 }} value={phn} onChangeText={(value) => { setPhn(value) }} label="Phone Number" mode="flat"></TextInput>
          <Button className="w-full" style={{ marginTop: height/21 }} onPress={sendOTP} mode="contained" labelStyle={{ "padding": 5 }}>Next</Button>
        </>
        :
        <>
          <Text className="text-neutral-300 text-left" style={{ paddingTop: height/96, fontSize: 36 / fs }}>Code{'\n'}Confirmation</Text>
          <TextInput onChangeText={(value) => { setCode(value) }} className="w-full" style={{ marginTop: height/21 }} label="Enter OTP" mode="flat"></TextInput>
          <Button className="w-full" style={{ marginTop: height/21 }} onPress={confirmCode} mode="contained" labelStyle={{ "padding": 5 }}>Next</Button>
        </>
      }
    </View>
  );
}

export default Phnscreen;


