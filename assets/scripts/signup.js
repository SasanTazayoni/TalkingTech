import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbhyBW7m8Anzi5xD-NwzVcWAViETcY3Qw",
  authDomain: "talkingtech-df5d4.firebaseapp.com",
  projectId: "talkingtech-df5d4",
  storageBucket: "talkingtech-df5d4.appspot.com",
  messagingSenderId: "619342140520",
  appId: "1:619342140520:web:c210dd45a2f16f89de57dd"
};

// Initialise firebase
initializeApp(firebaseConfig);

// Initialise services
const db = getFirestore()

// Collection reference
const colRef = collection(db, 'Users')

// Get collection data
getDocs(colRef).then((snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id })
    })
    console.log(users)
}).catch(err => {
    console.log(err.message)
})

// Adding user data
const addUserInfo = document.querySelector('[data-form]')

addUserInfo.addEventListener('submit', e => {
    e.preventDefault()

    addDoc(colRef, {
        firstname: addUserInfo.fname.value,
        lastname: addUserInfo.lname.value,
        email: addUserInfo.email.value,
        phone: addUserInfo.contact.value,
        address: addUserInfo.address.value,
        address2: addUserInfo.address2.value,
        postcode: addUserInfo.postcode.value
    }).then(() => {
        addUserInfo.reset()
    })
})