import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Share, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';





// for exit 

const Custommenu = ({ navigation }) => {

  const handleExit = () => {
    BackHandler.exitApp();
  };
  // for share app
  const shareApp = async () => {
    const appMessage = "Check out this amazing app! It's a great resource for exploring topics like Jesus, miracles, prayer, and more. Download it now! https://play.google.com/store/apps/details?id=com.davidsapkota.JourneyofFaith ";

    try {
      const result = await Share.share({
        message: appMessage,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {

          console.log('App shared successfully.');
        } else {

          console.log('Share was dismissed.');
        }
      } else if (result.action === Share.dismissedAction) {

        console.log('Share was dismissed.');
      }
    } catch (error) {
      console.error('Error sharing app:', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuItem}>
        <TouchableOpacity onPress={() => navigation.navigate('Journey of Faith')}>
          <Text style={styles.text}> My Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.seconditems}>
        <TouchableOpacity onPress={() => Linking.openURL('https://david-sapkota.netlify.app/')}>
          <Text style={styles.text}> My Website</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('About Me')} style={styles.touchableOpacity}>
          <Text style={styles.text}> About Me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Contact Me')} style={styles.touchableOpacity}>
          <Text style={styles.text}> Contact me </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/Davidsapkota123')}>
          <Text style={styles.text}> Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/david9813/Bible-Quiz')}>
          <Text style={styles.text}> Quiz</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.third}>



        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text 
        style = {{
          padding: 10,
          marginLeft: 10,
          marginBottom:-20
        }}
        >Share & Exit</Text>
        <TouchableOpacity onPress={shareApp} style={styles.touchableOpacity}>
          <Text style={styles.text}> Share <Feather name="share-2" size={24} color="black" /></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleExit} style={styles.touchableOpacity}>
          <Text style={styles.text}> Exit  <MaterialCommunityIcons name="exit-to-app" size={24} color="black" /></Text>
      
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({


  menuItem: {
    flex: 0.3,
    justifyContent: 'center',

    backgroundColor: '#EE6670',
    
  },
  text: {

    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    alignSelf: 'flex-start',
  },
  seconditems: {
  
    justifyContent: 'center',
    backgroundColor: '#F8F3D4',
    flex: 0.6,

   
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#562',
    fontSize: 20,
    fontWeight: 'bold'

  },
  third :{
    backgroundColor: '#F8F3D4',
    flex: 0.3,
  }




});

export default Custommenu;
