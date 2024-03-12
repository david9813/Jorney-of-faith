import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share,TouchableOpacity, Alert, Platform, PermissionsAndroid, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';




const  Forgiveness= () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  const viewShotRef = useRef(null); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
      "Matthew 6:14-15: For if you forgive others their trespasses, your heavenly Father will also forgive you, but if you do not forgive others their trespasses, neither will your Father forgive your trespasses.",
      "Ephesians 4:32: Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
      "Colossians 3:13: Bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.",
      "Luke 6:37: Judge not, and you will not be judged; condemn not, and you will not be condemned; forgive, and you will be forgiven.",
      "Mark 11:25: And whenever you stand praying, forgive, if you have anything against anyone, so that your Father also who is in heaven may forgive you your trespasses.",
      "Psalm 103:12: As far as the east is from the west, so far does he remove our transgressions from us.",
      "James 5:16: Therefore, confess your sins to one another and pray for one another, that you may be healed. The prayer of a righteous person has great power as it is working.",
      "1 John 1:9: If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
      "Matthew 18:21-22: Then Peter came up and said to him, “Lord, how often will my brother sin against me, and I forgive him? As many as seven times?” Jesus said to him, “I do not say to you seven times, but seventy times seven.",
      "Luke 17:3-4: Pay attention to yourselves! If your brother sins, rebuke him, and if he repents, forgive him, and if he sins against you seven times in the day, and turns to you seven times, saying, ‘I repent,’ you must forgive him.",
      "Acts 3:19: Repent therefore, and turn back, that your sins may be blotted out.",
      "Psalm 86:5: For you, O Lord, are good and forgiving, abounding in steadfast love to all who call upon you.",
      "Micah 7:18: Who is a God like you, pardoning iniquity and passing over transgression for the remnant of his inheritance? He does not retain his anger forever, because he delights in steadfast love.",
      "Matthew 5:23-24: So if you are offering your gift at the altar and there remember that your brother has something against you, leave your gift there before the altar and go. First be reconciled to your brother, and then come and offer your gift.",
      "Psalm 32:5: I acknowledged my sin to you, and I did not cover my iniquity; I said, “I will confess my transgressions to the Lord,” and you forgave the iniquity of my sin.",
      "Luke 23:34: And Jesus said, “Father, forgive them, for they know not what they do.” And they cast lots to divide his garments.",
      "Matthew 6:12: and forgive us our debts, as we also have forgiven our debtors.",
      "Matthew 18:15: If your brother sins against you, go and tell him his fault, between you and him alone. If he listens to you, you have gained your brother.",
      "1 Peter 3:9: Do not repay evil for evil or reviling for reviling, but on the contrary, bless, for to this you were called, that you may obtain a blessing.",
     
      "Isaiah 55:7: Let the wicked forsake his way, and the unrighteous man his thoughts; let him return to the Lord, that he may have compassion on him, and to our God, for he will abundantly pardon."
    ]
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






export default Forgiveness

