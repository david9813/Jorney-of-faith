import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Share,TouchableOpacity, Alert, Platform, PermissionsAndroid, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';




const  Healing= () => {
  const [verseColors, setVerseColors] = useState({}); 
  const [verses, setVerses] = useState([]); 

  const viewShotRef = useRef(null); 

  useEffect(() => {
    setVerses(getBibleVerses()); 
  }, []);

  const getBibleVerses = () => {
    return [
      
    "Matthew 4:23: And he went throughout all Galilee, teaching in their synagogues and proclaiming the gospel of the kingdom and healing every disease and every affliction among the people.",
    "James 5:14-15: Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord. And the prayer of faith will save the one who is sick, and the Lord will raise him up. And if he has committed sins, he will be forgiven.",
    "Psalm 107:20: He sent out his word and healed them, and delivered them from their destruction.",
    "Isaiah 53:5: But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.",
    "Jeremiah 17:14: Heal me, O Lord, and I shall be healed; save me, and I shall be saved, for you are my praise.",
    "Matthew 9:35: And Jesus went throughout all the cities and villages, teaching in their synagogues and proclaiming the gospel of the kingdom and healing every disease and every affliction.",
    "Exodus 15:26: Saying, 'If you will diligently listen to the voice of the Lord your God, and do that which is right in his eyes, and give ear to his commandments and keep all his statutes, I will put none of the diseases on you that I put on the Egyptians, for I am the Lord, your healer.'",
    "Psalm 103:2-3: Bless the Lord, O my soul, and forget not all his benefits, who forgives all your iniquity, who heals all your diseases.",
    "Proverbs 4:20-22: My son, be attentive to my words; incline your ear to my sayings. Let them not escape from your sight; keep them within your heart. For they are life to those who find them, and healing to all their flesh.",
    "Isaiah 41:10: Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    "Matthew 14:14: When he went ashore he saw a great crowd, and he had compassion on them and healed their sick.",
    "1 Peter 2:24: He himself bore our sins in his body on the tree, that we might die to sin and live to righteousness. By his wounds you have been healed.",
    "Jeremiah 30:17: For I will restore health to you, and your wounds I will heal, declares the Lord, because they have called you an outcast: ‘It is Zion, for whom no one cares!’",
    "Mark 16:17-18: And these signs will accompany those who believe: in my name they will cast out demons; they will speak in new tongues; they will pick up serpents with their hands; and if they drink any deadly poison, it will not hurt them; they will lay their hands on the sick, and they will recover.",
    "Psalm 30:2: O Lord my God, I cried to you for help, and you have healed me.",
    "Exodus 23:25: You shall serve the Lord your God, and he will bless your bread and your water, and I will take sickness away from among you.",
    "Luke 9:11: When the crowds learned it, they followed him, and he welcomed them and spoke to them of the kingdom of God and cured those who had need of healing.",
    "James 5:16: Therefore, confess your sins to one another and pray for one another, that you may be healed. The prayer of a righteous person has great power as it is working.",
    "Psalm 41:3: The Lord sustains him on his sickbed; in his illness you restore him to full health.",
    "Matthew 10:1: And he called to him his twelve disciples and gave them authority over unclean spirits, to cast them out, and to heal every disease and every affliction.",
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

export default Healing