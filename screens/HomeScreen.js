import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Keyboard,
  Button,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import {firebase} from '@react-native-firebase/firestore';

import DetailsScreen from '../screens/DetailsScreen';


function HomeScreen({navigation}) {

    /*
    entityName -> studentName
    setEntityName -> setStudentName
    entities -> students
    setEntities -> setStudents
    entity -> student
    newEntities -> newStudents
    */

    //const [studentName, setStudentName] = useState('')
    const [students, setStudents] = useState([])

    const studentRef = firebase.firestore().collection('students')
    
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [hobby, setHobby] = useState('')
    const [comment, setComment] = useState('')
    const [id, setId] = useState('')

    //bottom sheet reference
    bs = React.createRef();
    fall = new Animated.Value(1);

    //FETCHING STUDENT DATA FROM FIREBASE
    useEffect(() => {
        studentRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newStudents = []
                    querySnapshot.forEach(doc => {
                        const student = doc.data()
                        student.id = doc.id
                        newStudents.push(student)
                    });
                    setStudents(newStudents)
                    //console.log(newStudents)
                    //console.log(students)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])


    //Open Bottom Sheet with preloaded
    const openBS = (item) => {
        setId(item.id)
        setName(item.name)
        setAge(item.age)
        setGender(item.gender)
        setHobby(item.hobby)
        setComment(item.comment)
        this.bs.current.snapTo(0)
    }


    //DISPLAY STUDENT LIST
    const renderStudent = ({item, index}) => {
        return (
            <View style={styles.studentContainer}>
            
            
            <TouchableOpacity onPress={() => openBS(item)}>
                <Text style={styles.studentText}>
                    {index+1}.   {item.name} 
                {/*  {"\n"}  {"Age:"}   {item.age} {"\t"}  {"Gender:"}   {item.gender} {"\n"}
                    {"Hobbies:"}   {item.hobby} {"\n"}
                    {"Comments:"}   {item.comment} {"\n"}
                    {"ID: "} {item.id}   */}
                </Text>
            </TouchableOpacity>
            </View>
        )
    }

    const updateRef = firebase.firestore().collection('students').doc(id)
    
    const onDeleteButtonPress = () => {
        updateRef
        .delete()
        .then(() => {console.log("DELETED")})
        .catch(() => {alert(error)})

        setTimeout(() => {this.bs.current.snapTo(1)}, 300)

        Alert.alert(
            'Deleted',
            'Student Removed',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
    }  

    const onUpdateButtonPress = () => {
      
        if (name && name.length > 0 &&
            age && age.length > 0 && age > 0 && age.length < 3 &&
            gender && gender === 'male' || gender === 'female' ||
            gender === 'Male' || gender === 'Female' &&
            hobby && comment) {

            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                name: name,
                age: age,
                gender: gender,
                hobby: hobby,
                comment: comment,
                createdAt: timestamp,
                id: id
            };
                updateRef
                .set(data)
                .then(_doc => {
                    setName('')
                    setAge('')
                    setGender('')
                    setHobby('')
                    setComment('')
                    setId('')
                    //Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
                Alert.alert(
                  'Alert',
                  'Student Details Updated',
                  [
                    {
                      text: 'OK',
                    },
                  ],
                  {cancelable: false},
                );
                setTimeout(() => {this.bs.current.snapTo(1)}, 600)
        } else {
            Alert.alert(
                'Alert',
                'Add Valid Details',
                [
                  {
                    text: 'Ok',
                    onPress: () => {
                        setName(name)
                        setAge(age)
                        setGender(gender)
                        setHobby(hobby)
                        setComment(comment)
                    }
                  },
                ],
                {cancelable: false},
              );
        }
    }


    //Bottom Sheet Content
    renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );

    
    renderInner = () => (
        <View style={styles.panel}>

      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Student Details</Text>
        <Text style={styles.panelSubtitle}>Do you want to update or delete?</Text>
      </View>

            
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

      <TouchableOpacity style={styles.panelButton} onPress={onUpdateButtonPress}>
        <Text style={styles.panelButtonTitle}>Update Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={onDeleteButtonPress}>
        <Text style={styles.panelButtonTitle}>Delete Student</Text>
      </TouchableOpacity>

    </View>
      );


    return (
    
    <View style={{flex: 1}}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[550, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 5,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)), marginTop: -12
    }}>



       {/* <ScrollView>
            {
                students.map((newStudents) => {
                    return (
                    
                    <ListItem key={newStudents.id} onPress={() => navigation.navigate('DetailsScreen', {studentId: newStudents.id}) }>
                        <ListItem><Text>{newStudents.id}</Text></ListItem>
                        <ListItem><Text>{newStudents.index}</Text></ListItem>
                        <ListItem><Text>{newStudents.name}</Text></ListItem>
                    </ListItem>
                
                    )
                })
            }
        </ScrollView> */}





        { students && (
            <View style={styles.studentContainer}>
                <FlatList
                    data={students}
                    renderItem={renderStudent}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={true}
                />
            </View>
        )}
        </Animated.View>
    </View>    
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    studentContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.25,
        paddingBottom: 10,
        marginLeft: 6
    },
    studentText: {
        textTransform: "capitalize",
        fontSize: 24,
        color: '#333333',
        fontWeight: '500'
    },
    panel: {
        padding: 20,
        backgroundColor: '#CCCBCB',
        paddingTop: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderWidth: 0.2,
      },
    panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 60,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        fontWeight: '600',
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: '#2F2F2F',
        height: 30,
        marginBottom: 6,
      },
      panelButton: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 6,
        
      },
      panelButtonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      input: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 0.3,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginBottom: 6,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 15,
      }
})


export default HomeScreen;