import { Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Appbar, Button, TextInput} from 'react-native-paper';

function Home({navigation}) {
  const fs = Dimensions.get("window").fontScale;

  return (
    <View>
      <ScrollView showVerticalScrollIndicator={false}>
        <View className="overflow-hidden bg-stone-900 relative" style={{height: 1485, width: '100%', paddingTop: 50}}>
          <View className="absolute flex flex-col items-start justify-between w-full" style={{width: '100%', marginTop: 70, paddingLeft: 24, paddingRight: 21}}>
              <View style={{flexDirection: 'row'}}>
              <Image style={{marginRight: 15, marginTop: 20}} source={require("../assets/247_1993.png")} alt=""></Image>
              <Text className="text-neutral-201 text-left" style={{ color: 'white', marginTop: 30, marginBottom: 13, fontSize: 33 / fs}}>Motiv.ai</Text>
              </View>
            <TextInput className="w-full" style={{marginLeft: 3, marginTop: 19}} label="Describe your thoughts" mode="flat"></TextInput>
            <View className="flex flex-row items-center justify-between w-full">
              <Text className="text-white text-left" style={{marginRight: 220, marginTop: 40, marginBottom: 2, fontSize: 14 / fs, color: 'white'}}>Recents</Text>
              <Image style={{marginTop: 30}}source={require("../assets/238_6397.png")} alt=""></Image>
            </View>
            
          </View>
        </View>        
      </ScrollView>
      </View>      
  );
}

export default Home;

{ /*<View className="absolute flex flex-col items-center justify-between w-full" style={{width: '100%', top: 487, paddingLeft: 21, paddingRight: 24, paddingTop: 78}}>
<View className="flex flex-row items-center justify-between w-full">
  <Text className="text-white text-left" style={{marginRight: 220, marginTop: 2, marginBottom: 2, fontSize: 14 / fs, color: 'white'}}>Top Picks</Text>
  <Image source={require("../assets/238_6397.png")} alt=""></Image>
</View>
<View className="flex flex-row flex-wrap items-start justify-between w-full" style={{marginTop: 24}}>
  <Image style={{marginRight: 12, marginBottom: 30,}} source={require("../assets/238_6403.png")} alt=""></Image>
  <Image style={{marginRight: 12, marginBottom: 30}} source={require("../assets/238_6419.png")} alt=""></Image>
  <Image style={{marginRight: 12, marginBottom: 30}} source={require("../assets/238_6415.png")} alt=""></Image>
  <Image style={{marginRight: 12, marginBottom: 30}} source={require("../assets/238_6416.png")} alt=""></Image>
  <Image style={{marginRight: 12}} source={require("../assets/238_6421.png")} alt=""></Image>
  <Image style={{marginRight: 12}} source={require("../assets/238_6418.png")} alt=""></Image>
</View>
</View> */}
