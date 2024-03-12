
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const Fear = () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
      "Now faith is the assurance of things hoped for, the conviction of things not seen. - Hebrews 11:1",
      "And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he rewards those who seek him. - Hebrews 11:6",
      "So faith comes from hearing, and hearing through the word of Christ. - Romans 10:17",
      "And Jesus answered them, “Have faith in God. - Mark 11:22",
      "For we walk by faith, not by sight. - 2 Corinthians 5:7",
      "And whatever you ask in prayer, you will receive, if you have faith. - Matthew 21:22",
      "For everyone who has been born of God overcomes the world. And this is the victory that has overcome the world—our faith. - 1 John 5:4",
      "Jesus said to him, “If you can believe, all things are possible to him who believes. - Mark 9:23",
      "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
    
      "Trust in the Lord with all your heart, and do not lean on your own understanding. - Proverbs 3:5",
      "He said to them, “Because of your little faith. For truly, I say to you, if you have faith like a grain of mustard seed, you will say to this mountain, ‘Move from here to there,’ and it will move, and nothing will be impossible for you. - Matthew 17:20",
      "And Jesus said to him, “Go your way; your faith has made you well.” And immediately he recovered his sight and followed him on the way. - Mark 10:52",
      "May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope. - Romans 15:13",
      "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God. - Ephesians 2:8",
      "Jesus said to her, “Did I not tell you that if you believed you would see the glory of God?” - John 11:40",
      "And Jesus said to him, “Go your way; your faith has made you well.” And immediately he recovered his sight and followed him on the way. - Mark 10:52",
      "And Jesus said to him, “Go your way; your faith has made you well.” And immediately he recovered his sight and followed him on the way. - Mark 10:52",
      "And Jesus said to him, “Go your way; your faith has made you well.” And immediately he recovered his sight and followed him on the way. - Mark 10:52",
      "And Jesus said to him, “Go your way; your faith has made you well.” And immediately he recovered his sight and followed him on the way. - Mark 10:52"
      ]};

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

export default Fear;

