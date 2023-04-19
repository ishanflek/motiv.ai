import { Text, View, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';

function First({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  const [checked, setChecked] = React.useState(false);
  const { height,width } = Dimensions.get('window');

  const handleContinue = () => {
    if (!checked) {
      Alert.alert('Agreement Required', 'Please agree to the terms and conditions before continuing.');
      return;
    }
    navigation.navigate('second');
  };

  return (
      <ScrollView style={{backgroundColor: "#1c1c1cff"}} showVerticalScrollIndicator={false}>
        <View className="bg-stone-900 flex flex-col items-center " style={{paddingLeft: width*0.06, paddingRight: width*0.06, paddingTop: height/10, paddingBottom: height/13}}>
          <Image style={{marginTop: 70}}source={require("../assets/243_2380.png")} alt=""></Image>
          <Text className="text-white-0 text-left" style={{marginTop: height/92, fontSize: 57 / fs}}>motiv.ai</Text>
          <Text className="shrink text-white-0 text-center" style={{width: width*0.46, marginTop: height/42, fontSize: 12 / fs}}>Before you can start using our services, please read and agree to our terms and conditions.</Text>
          <View className="flex flex-row items-center justify-between w-full" style={{marginTop: height/7}}>
          <CheckBox
            disabled={false}
            value={checked}
            onValueChange={(newValue) => setChecked(newValue)}
            style={{marginLeft: width*0.07, marginRight: width*0.09}}
            />
            <Text className="shrink text-white-0 text-left" style={{marginTop:height/122, marginBottom: height/92, fontSize: 11 / fs}}>
              <Text className="text-white-0">I have read and agree to the </Text>
              <Text className="text-white-0 underline">terms and conditions.</Text>
            </Text>
          </View>
          <Button className="w-full" style={{marginTop: height/30}} onPress={handleContinue} mode="contained" labelStyle={{"padding":5}}>Continue</Button>
        </View>
      </ScrollView>
  );
}

export default First;
