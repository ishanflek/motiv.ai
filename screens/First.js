import { Text, Alert,View, Image, ScrollView, Dimensions } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';

function First({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  const [checked, setChecked] = React.useState(false);

  const handleContinue = () => {
    if (!checked) {
      Alert.alert('Agreement Required', 'Please agree to the terms and conditions before continuing.');
      return;
    }
    navigation.navigate('second');
  };

  return (
      <ScrollView showVerticalScrollIndicator={false}>
        <View className="bg-stone-900 flex flex-col items-center " style={{paddingLeft: 24, paddingRight: 26, paddingTop: 50, paddingBottom: 142}}>
          <Image style={{marginTop: 70}}source={require("../assets/243_2380.png")} alt=""></Image>
          <Text className="text-white-0 text-left" style={{marginTop: 11, fontSize: 57 / fs}}>motiv.ai</Text>
          <Text className="shrink text-white-0 text-center" style={{width: 180, marginTop: 28, fontSize: 12 / fs}}>Before you can start using our services, please read and agree to our terms and conditions.</Text>
          <View className="flex flex-row items-center justify-between w-full" style={{marginTop: 185}}>
          <CheckBox
            disabled={false}
            value={checked}
            onValueChange={(newValue) => setChecked(newValue)}
            style={{marginLeft: 20, marginRight: 40}}
            />
            <Text className="shrink text-white-0 text-left" style={{marginTop: 8, marginBottom: 8, fontSize: 11 / fs}}>
              <Text className="text-white-0">I have read and agree to the </Text>
              <Text className="text-white-0 underline">terms and conditions.</Text>
            </Text>
          </View>
          <Button className="w-full" style={{marginTop: 19}} onPress={handleContinue} mode="contained" labelStyle={{"padding":5}}>Continue</Button>
        </View>
      </ScrollView>
  );
}

export default First;

{/**  return (
    <View>
    <Image 
    source={require('./mask1.png')}
    style={styles.img}/>
    <Text
    style={styles.txt}>
      motiv.ai
    </Text>
    <Text 
    style={styles.txt2}>
    Before you can start using our services, please read and agree to our terms and conditions.
    </Text>
    <View style={styles.con}>
      <CheckBox
      disabled={false}
      value={checked}
      onValueChange={(newValue) => setChecked(newValue)}
      style={styles.chk}
      />
      <Text
      style={styles.txt3}>I have read and agree to the 
      <Text
        style={styles.hltxt}
        onPress={() => {
          Linking.openURL('Put your terms and conditions');
        }}> terms and conditions.</Text>
      </Text>
    </View>
    <TouchableOpacity style={styles.button} 
      onPress={() => navigation.navigate('second')}>
    <Text style={styles.buttontext}>Continue</Text>
    </TouchableOpacity>
  </View>
  ) */}