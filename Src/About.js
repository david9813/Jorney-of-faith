import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';

function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.aboutMe}>This is who I am</Text>
      <Text style={styles.aboutText}>
        In the bustling city of Berlin, Germany, you'll find me, David Sapkota,
        a devoted father of two, originally from the picturesque landscapes of
        Nepal. My journey is an exploration of challenges in dynamic
        environments, fueled by a deep-seated desire for continuous growth and
        career advancement. A perpetual enthusiast, self-confident, and an
        eternal optimist. Resourcefulness defines me, coupled with a strong
        sense of responsibility. Proficient in the art of prioritizing work and
        eagerly embracing new challenges.
      </Text>


      <Text style={styles.aboutMe}> Contact me </Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/Davidsapkota123')}>
          <FontAwesome name="facebook-square" size={50} style={[styles.icon, { color: '#3b5998' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/david.sapkota.1/?igsh=aWV1bXFwd2pnb3V6')}>
          <FontAwesome5 name="instagram" size={50} style={[styles.icon, { color: '#c32aa3' }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/david-sapkota-5491372a1/')}>
          <Entypo name="linkedin" size={50} style={[styles.icon, { color: '#0077b5' }]} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F8F3D4',
    paddingVertical: 40,
  },
  aboutMe: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0077b5',


    textAlign: 'center',
   
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2

  },
  aboutText: {
    maxWidth: '90%',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  icon: {
    marginHorizontal: 20,
  },
});


export default About