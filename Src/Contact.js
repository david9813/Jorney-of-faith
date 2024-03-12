// screens/ContactScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Contact <Text style={styles.span}>Here</Text>
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="+41"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />
        <TextInput
          style={[styles.input, { height: 100 }]} // Adjust height for multiline input
          placeholder="Type here"
          value={formData.message}
          onChangeText={(text) => handleChange("message", text)}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactInfo}>
        <Text style= { styles. lastp}>For business-related questions and bug inquiries,</Text>
        <Text>please contact me:</Text>
        <Text>Email: dr.david.sapkota.np@gmail.com</Text>
        <Text>Phone: +4915228094022</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  span: {
    fontWeight: "normal",
    color: "blue",
  
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    
  },
  contactInfo: {
    marginTop: 80,
  },

  lastp:{

    fontWeight: "bold",
  

  },
});


export default Contact