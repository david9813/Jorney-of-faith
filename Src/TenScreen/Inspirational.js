import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share,TouchableOpacity, Alert, Platform, PermissionsAndroid, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';




const Inspirational = () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  const viewShotRef = useRef(null); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
      "Isaiah 40:31: But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    "Philippians 4:13: I can do all things through him who strengthens me.",
    "Joshua 1:9: Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
    "Psalm 46:5: God is within her, she will not fall; God will help her at break of day.",
    "Romans 8:28: And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    "Jeremiah 29:11: For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    "Proverbs 3:5-6: Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    "Matthew 11:28: Come to me, all who labor and are heavy laden, and I will give you rest.",
    "Romans 15:13: May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope.",
    "Psalm 34:17: When the righteous cry for help, the Lord hears and delivers them out of all their troubles.",
    "Isaiah 41:10: Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    "Psalm 37:4: Delight yourself in the Lord, and he will give you the desires of your heart.",
    "Psalm 23:4: Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
    "1 Corinthians 16:14: Let all that you do be done in love.",
    "Galatians 6:9: And let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
    "Hebrews 11:1: Now faith is the assurance of things hoped for, the conviction of things not seen.",
    "Matthew 6:34: Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.",
    "Romans 12:12: Rejoice in hope, be patient in tribulation, be constant in prayer.",
    "Psalm 16:8: I have set the Lord always before me; because he is at my right hand, I shall not be shaken.",
    "Deuteronomy 31:6: Be strong and courageous. Do not fear or be in dread of them, for it is the Lord your God who goes with you. He will not leave you or forsake you."
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
    paddingTop: 40,
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

export default Inspirational

