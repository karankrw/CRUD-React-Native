import Firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyAFakAQKyQSi_p4aM880Ijs3N5aOkP8T34",
    authDomain: "crud-e8335.firebaseapp.com",
    databaseURL: "https://crud-e8335.firebaseio.com",
    projectId: "crud-e8335",
    storageBucket: "crud-e8335.appspot.com",
    messagingSenderId: "575803922206",
    appId: "1:575803922206:web:3da27b196a7a4a7761db0f"
  };
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();