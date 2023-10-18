import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from 'firebase/firestore'

const form = document.querySelector("form[data-form]")
const password = document.querySelector("#password")
const confirmation = document.querySelector("#confirmation")
const errorMessage = document.querySelector("[data-error]")
const resetBtn = document.querySelector("[data-reset]")

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbhyBW7m8Anzi5xD-NwzVcWAViETcY3Qw",
  authDomain: "talkingtech-df5d4.firebaseapp.com",
  projectId: "talkingtech-df5d4",
  storageBucket: "talkingtech-df5d4.appspot.com",
  messagingSenderId: "619342140520",
  appId: "1:619342140520:web:c210dd45a2f16f89de57dd"
}

// Initialise firebase
initializeApp(firebaseConfig)

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
form.addEventListener('submit', e => {
    e.preventDefault()

    if (password.value !== confirmation.value) {
        errorMessage.textContent = "Passwords do not match"
    } else {
        errorMessage.textContent = ""
        addDoc(colRef, {
            firstname: form.fname.value,
            lastname: form.lname.value,
            email: form.email.value,
            phone: form.contact.value,
            address: form.address.value,
            address2: form.address2.value,
            postcode: form.postcode.value
        }).then(() => {
            form.reset()
        })
    }
})

resetBtn.addEventListener("click", () => {
    errorMessage.textContent = "";
});
