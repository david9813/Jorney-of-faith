import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share,TouchableOpacity, Alert, Platform, PermissionsAndroid, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';




const Miraculous = () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  const viewShotRef = useRef(null); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
  

    
        "John 2:11 (NIV): What Jesus did here in Cana of Galilee was the first of the signs through which he revealed his glory; and his disciples believed in him.",
        "John 11:43-44 (NIV): When he had said this, Jesus called in a loud voice, 'Lazarus, come out!' The dead man came out, his hands and feet wrapped with strips of linen, and a cloth around his face. Jesus said to them, 'Take off the grave clothes and let him go.'",
        "Matthew 9:27-30 (NIV): As Jesus went on from there, two blind men followed him, calling out, 'Have mercy on us, Son of David!' When he had gone indoors, the blind men came to him, and he asked them, 'Do you believe that I am able to do this?' 'Yes, Lord,' they replied. Then he touched their eyes and said, 'According to your faith let it be done to you'; and their sight was restored.",
        "Mark 5:41-42 (NIV): He took her by the hand and said to her, 'Talitha koum!' (which means 'Little girl, I say to you, get up!'). Immediately the girl stood up and began to walk around (she was twelve years old). At this they were completely astonished.",
        "Matthew 15:30-31 (NIV): Great crowds came to him, bringing the lame, the blind, the crippled, the mute and many others, and laid them at his feet; and he healed them. The people were amazed when they saw the mute speaking, the crippled made well, the lame walking and the blind seeing. And they praised the God of Israel.",
        "Luke 7:12-15 (NIV): As he approached the town gate, a dead person was being carried out—the only son of his mother, and she was a widow. And a large crowd from the town was with her. When the Lord saw her, his heart went out to her and he said, 'Don’t cry.' Then he went up and touched the bier they were carrying him on, and the bearers stood still. He said, 'Young man, I say to you, get up!' The dead man sat up and began to talk, and Jesus gave him back to his mother.",
        "Matthew 9:20-22 (NIV): Just then a woman who had been subject to bleeding for twelve years came up behind him and touched the edge of his cloak. She said to herself, 'If I only touch his cloak, I will be healed.' Jesus turned and saw her. 'Take heart, daughter,' he said, 'your faith has healed you.' And the woman was healed at that moment.",
        "Acts 3:6-8 (NIV): Then Peter said, 'Silver or gold I do not have, but what I do have I give you. In the name of Jesus Christ of Nazareth, walk.' Taking him by the right hand, he helped him up, and instantly the man’s feet and ankles became strong. He jumped to his feet and began to walk. Then he went with them into the temple courts, walking and jumping, and praising God.",
        "Mark 9:25-27 (NIV): When Jesus saw that a crowd was running to the scene, he rebuked the impure spirit. 'You deaf and mute spirit,' he said, 'I command you, come out of him and never enter him again.' The spirit shrieked, convulsed him violently and came out. The boy looked so much like a corpse that many said, 'He’s dead.' But Jesus took him by the hand and lifted him to his feet, and he stood up."

      
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
    

  },
  itemContainer: {
    marginBottom: 20,
  },
  verseContainer: {
    borderRadius: 10,
    padding: 20,
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

export default Miraculous

