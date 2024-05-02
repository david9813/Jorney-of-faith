import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import About from './Src/About';

import Contact from './Src/Contact';

import Custommenu from './Src/Custommenu';
import Home from "./Src/TenScreen/Home"
import Jesus from './Src/TenScreen/Jesus';
import Miraculous from './Src/TenScreen/Miraculous';
import Thankful from './Src/TenScreen/Thankful';
import Prayer from './Src/TenScreen/Prayer';
import Hope from './Src/TenScreen/Hope';
import Love from './Src/TenScreen/Love';
import Inspirational from './Src/TenScreen/Inspirational';
import Fear from './Src/TenScreen/Fear';
import Forgiveness from './Src/TenScreen/Forgiveness';
import Healing from './Src/TenScreen/Healing';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  const screenOptions = {
    headerStyle: { backgroundColor: '#EE6670' },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold' },
  };

  return (


    <Stack.Navigator screenOptions={screenOptions}  >
      <Stack.Screen
        name="Journey of Faith"
        component={Home}
        options={({ navigation }) => ({
          headerStyle: { height: 120, backgroundColor: '#EE6670' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 30 },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 30 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Entypo name="menu" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen name="Jesus" component={Jesus} />
      <Stack.Screen name='Miraculous' component={Miraculous} />
      <Stack.Screen name="Thankful" component={Thankful} />
      <Stack.Screen name="Prayer" component={Prayer} />
      <Stack.Screen name="Hope" component={Hope} />
      <Stack.Screen name="Love" component={Love} />
      <Stack.Screen name="Inspirational" component={Inspirational} />
      <Stack.Screen name="Faith" component={Fear} />
      <Stack.Screen name="Forgiveness" component={Forgiveness} />
      <Stack.Screen name="Healing" component={Healing} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <Custommenu {...props} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Drawer.Screen name="About Me" component={About}

        options={{
          headerStyle: { height: 100, backgroundColor: '#EE6670' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen name="Contact Me" component={Contact}
        options={{
          headerStyle: { height: 100, backgroundColor: '#EE6670' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
