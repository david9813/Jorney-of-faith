import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet , ScrollView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (

    <ScrollView style={styles.scrollView}> 

    <View style={styles.container}>
     
      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Hope')}>
        <Text style={styles.buttonText}> Hope </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Love')}>
        <Text style={styles.buttonText}> Love </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Faith')}>
        <Text style={styles.buttonText}> Faith</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Prayer')}>
        <Text style={styles.buttonText}> Prayer </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Miraculous')}>
        <Text style={styles.buttonText}>Miraculous</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Inspirational')}>
        <Text style={styles.buttonText}> Inspirational</Text>
      </TouchableOpacity>

      
    
      
      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Thankful')}>
        <Text style={styles.buttonText}> Thankful</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Healing')}>
        <Text style={styles.buttonText}> Healing</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Forgiveness')}>
        <Text style={styles.buttonText}> Forgaveness</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Jesus')}>
        <Text style={styles.buttonText}>Jesus</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    margin: 20,
    marginTop:0,
  },

  button: {
    backgroundColor: '#33C5BF',
    
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    alignContent: 'center',


    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
   
  },
  buttonText: {
    color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2
  },
 
 
  separator: {
    height: 10,
  },
 
});


export default Home;
