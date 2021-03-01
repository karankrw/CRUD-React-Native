import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {firebase} from '@react-native-firebase/firestore';



function DetailScreen({navigation}) {

    const studentRef = firebase.firestore().collection('students')
    

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [hobby, setHobby] = useState('')
    const [comment, setComment] = useState('')
    

    const onAddButtonPress = () => {
        if (name && name.length > 0 &&
            age && age > 0 && age.length > 0 && age.length < 3 &&
            gender && gender === 'male' || gender === 'female' ||
            gender === 'Male' || gender === 'Female' &&
            hobby && hobby.length > 1 &&
            comment && comment.length > 1) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                name: name,
                age: age,
                gender: gender,
                hobby: hobby,
                comment: comment,
                createdAt: timestamp,
            };
            studentRef
                .add(data)
                .then(_doc => {
                    setName('')
                    setAge('')
                    setGender('')
                    setHobby('')
                    setComment('')
                    //Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
                Alert.alert(
                    'Alert',
                    'Student Added',
                    [
                      {
                        text: 'OK',
                      },
                    ],
                    {cancelable: false},
                  );
        } else {
            Alert.alert(
                'Alert',
                'Add Valid Details',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                        setName('')
                        setAge('')
                        setGender('')
                        setHobby('')
                        setComment('')
                    }
                  },
                ],
                {cancelable: false},
              );
        }
    }

    return (
        <View style={styles.container}>
        <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always">
            
            <TextInput
                style={styles.input}
                placeholder='Name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setName(text)}
                value={name}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Age'
                onChangeText={(number) => setAge(number)}
                value={age}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Gender: Male / Female'
                onChangeText={(text) => setGender(text)}
                value={gender}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Hobbies'
                onChangeText={(text) => setHobby(text)}
                value={hobby}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Comments or Feedback'
                onChangeText={(text) => setComment(text)}
                value={comment}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                autoCorrect={false}           
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onAddButtonPress}>
                <Text style={styles.buttonTitle}>Add Student</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 12,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        borderColor: 'gray',
        borderWidth: 0.25,
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 25,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})
 
  
  export default DetailScreen;