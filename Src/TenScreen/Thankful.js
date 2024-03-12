import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share,TouchableOpacity, Alert, Platform, PermissionsAndroid, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';




const Thankful = () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  const viewShotRef = useRef(null); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
  

      "Psalm 100:4: Enter his gates with thanksgiving, and his courts with praise! Give thanks to him; bless his name!",
      "1 Thessalonians 5:18: Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
      "Colossians 3:15: And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful.",
      "Ephesians 5:20: Giving thanks always and for everything to God the Father in the name of our Lord Jesus Christ.",
      "Psalm 136:1: Give thanks to the Lord, for he is good, for his steadfast love endures forever.",
      "Philippians 4:6: Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
      "Psalm 118:1: Oh give thanks to the Lord, for he is good; for his steadfast love endures forever!",
      "Psalm 95:2: Let us come into his presence with thanksgiving; let us make a joyful noise to him with songs of praise!",
      "1 Chronicles 16:34: Oh give thanks to the Lord, for he is good; for his steadfast love endures forever!",
      "Psalm 9:1: I will give thanks to the Lord with my whole heart; I will recount all of your wonderful deeds.",
      "Psalm 106:1: Praise the Lord! Oh give thanks to the Lord, for he is good, for his steadfast love endures forever!",
      "Psalm 107:1: Oh give thanks to the Lord, for he is good, for his steadfast love endures forever!",
      "Psalm 118:29: Oh give thanks to the Lord, for he is good; for his steadfast love endures forever!",
      "1 Corinthians 15:57: But thanks be to God, who gives us the victory through our Lord Jesus Christ.",
      "2 Corinthians 2:14: But thanks be to God, who in Christ always leads us in triumphal procession, and through us spreads the fragrance of the knowledge of him everywhere.",
      "2 Corinthians 9:15: Thanks be to God for his inexpressible gift!",
      "Colossians 2:7: Rooted and built up in him and established in the faith, just as you were taught, abounding in thanksgiving.",
      "Colossians 4:2: Continue steadfastly in prayer, being watchful in it with thanksgiving.",
      "1 Timothy 4:4: For everything created by God is good, and nothing is to be rejected if it is received with thanksgiving.",
      "Revelation 7:12: Saying, 'Amen! Blessing and glory and wisdom and thanksgiving and honor and power and might be to our God forever and ever! Amen.'"
    ];
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  const handleVersePress = (index) => {
    const updatedColors = { ...verseColors };
    updatedColors[index] = generateRandomColor(); 
    setVerseColors(updatedColors); 
  };

  const copyVerse = (verse) => {
    Clipboard.setString(verse);
    Alert.alert('Copied', 'Verse copied to clipboard!');
  };



  const shareApp = async (verse) => {
    const appMessage = `${verse}`;
  
    try {
      const result = await Share.share({
        message: appMessage,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Verse shared successfully.');
        } else {
          console.log('Share was dismissed.');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share was dismissed.');
      }
    } catch (error) {
      console.error('Error sharing verse:', error.message);
    }
  };
  

  const downloadVerse = async (verse) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${verse.replace(/\s/g, '_')}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, verse);
      Alert.alert('Success', 'Verse downloaded successfully!');
    } catch (error) {
      console.error('Error downloading verse:', error.message);
      Alert.alert('Error', 'Failed to download verse');
    }
  };
  

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1 }}>
        <View style={[styles.verseContainer, { backgroundColor: verseColors[index] || '#33C5BF' }]}>
          <TouchableHighlight
            onPress={() => handleVersePress(index)}
            underlayColor="transparent"
            style={styles.touchableHighlight}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableHighlight>
        </View>
      </ViewShot>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => copyVerse(item)}>
          <Ionicons name="copy" size={24} color="#33C5BF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareApp(item)}>
          <Ionicons name="share-social" size={24} color="#33C5BF" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => downloadVerse(item)}>
          <Ionicons name="download" size={24} color="#33C5BF" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={verses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    
    },
  itemContainer: {
    marginBottom: 20,
    
  },
  verseContainer: {
    borderRadius: 10,
    padding: 30,
    marginBottom: 10,
  
  },
  touchableHighlight: {
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 15,
  },
});



export default Thankful
