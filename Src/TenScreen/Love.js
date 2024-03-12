import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const Love = () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
      "John 3:16: For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      "1 John 4:7: Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God.",
      "Romans 5:8: But God shows his love for us in that while we were still sinners, Christ died for us.",
      "Ephesians 5:2: And walk in love, as Christ loved us and gave himself up for us, a fragrant offering and sacrifice to God.",
      "1 John 4:19: We love because he first loved us.",
      "Romans 8:38-39: For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.",
      "John 15:13: Greater love has no one than this, that someone lay down his life for his friends.",
      "1 Peter 4:8: Above all, keep loving one another earnestly, since love covers a multitude of sins.",
      "1 Corinthians 16:14: Let all that you do be done in love."
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
      <View style={[styles.verseContainer, { backgroundColor: verseColors[index] || '#33C5BF' }]}>
        <TouchableHighlight
          onPress={() => handleVersePress(index)}
          underlayColor="transparent"
          style={styles.touchableHighlight}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableHighlight>
      </View>
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

export default Love;
