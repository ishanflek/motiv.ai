import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Appbar, Button, TextInput, Avatar, ProgressBar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
function Acc({navigation}) {
  const fs = Dimensions.get("window").fontScale;
  async function signOutUser() {
    try {
      await auth().signOut();
      navigation.navigate('first');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
      <View className="bg-stone-900">
        <Appbar.Header style={{ backgroundColor: '#1D1D1D', width: '100%'}}>
          <Appbar.BackAction color='white' onPress={() => {navigation.navigate('pref');}} />
          <Appbar.Content title='Account' color='white' />
        </Appbar.Header>
          <View className="flex flex-col items-start justify-between w-full" style={{paddingLeft: 28, paddingRight: 20, paddingTop: 37, paddingBottom: 542}}>
            <TextInput className="w-full" label="Anshudweep Show" mode="flat" />
            <TextInput className="w-full" style={{marginTop: 16}} label="8697120705" mode="flat" />
            <TouchableOpacity onPress={signOutUser}>
            <View className="flex flex-row items-center justify-center w-full gap-4" style={{marginTop: 10}}>
              <Text className="text-white text-left" style={{marginTop: 2, marginBottom: 2, fontSize: 18 / fs, color: 'white'}}>Logout</Text>
              <Image source={require("../assets/logout.png")} alt="" />
            </View>
              </TouchableOpacity>
          </View>
      </View>
  );
}

export default Acc;
