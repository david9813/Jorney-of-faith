import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';

const Jesus = () => {
  const [verseColors, setVerseColors] = useState({});
  const [verses, setVerses] = useState([]);

  const viewShotRef = useRef(null);

  useEffect(() => {
    fetchBibleVerses();
  }, []);

  const fetchBibleVerses = () => {
    const bibleVerses =  [
  


      "John 1:1 - 'In the beginning was the Word, and the Word was with God, and the Word was God.'",
      "John 1:14 - 'And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.'",
      "John 14:6 - 'Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.''",
      "Matthew 1:23 - ''Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel' (which means, God with us).'",
      "Colossians 1:15-16 - 'He is the image of the invisible God, the firstborn of all creation. For by him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or rulers or authorities—all things were created through him and for him.'",
      "Philippians 2:6-8 - 'who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, by taking the form of a servant, being born in the likeness of men. And being found in human form, he humbled himself by becoming obedient to the point of death, even death on a cross.'",
      "Hebrews 1:3 - 'He is the radiance of the glory of God and the exact imprint of his nature, and he upholds the universe by the word of his power. After making purification for sins, he sat down at the right hand of the Majesty on high,'",
      "Isaiah 9:6 - 'For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.'",
      "John 10:30 - 'I and the Father are one.'",
      "Revelation 1:8 - ''I am the Alpha and the Omega,' says the Lord God, 'who is and who was and who is to come, the Almighty.''",
      "1 Timothy 3:16 - 'Great indeed, we confess, is the mystery of godliness: He was manifested in the flesh, vindicated by the Spirit, seen by angels, proclaimed among the nations, believed on in the world, taken up in glory.'",
      "John 8:58 - 'Jesus said to them, 'Truly, truly, I say to you, before Abraham was, I am.''",
      "John 20:28 - 'Thomas answered him, 'My Lord and my God!'",
      "Colossians 2:9 - 'For in him the whole fullness of deity dwells bodily,'",
      "Matthew 16:16 - 'Simon Peter replied, 'You are the Christ, the Son of the living God.''",
      "John 20:31 - 'But these are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name.'",
      "Hebrews 4:15 - 'For we do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin.'",
      "John 6:35 - 'Jesus said to them, 'I am the bread of life; whoever comes to me shall not hunger, and whoever believes in me shall never thirst.''",
      "John 14:9 - 'Jesus said to him, 'Have I been with you so long, and you still do not know me, Philip? Whoever has seen me has seen the Father. How can you say, 'Show us the Father'?'",
      "Acts 4:12 - 'And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved.'"
    ];


    setVerses(bibleVerses);
  };

  const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const handleVersePress = (index) => {
    const updatedColors = { ...verseColors };
    updatedColors[index] = generateRandomColor();
    setVerseColors(updatedColors);
  };

  const copyVerse = (verse) => {
    Clipboard.setString(verse);
    Alert.alert('Copied', 'Verse copied to clipboard!');
  };

  const shareVerse = async (verse) => {
    try {
      await Share.share({ message: verse });
      console.log('Verse shared successfully.');
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
        <TouchableOpacity onPress={() => shareVerse(item)}>
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
    padding: 30,
    marginBottom: 10,
  },
  touchableHighlight: {
    borderRadius: 10,
  },
  text: {
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

export default Jesus;
