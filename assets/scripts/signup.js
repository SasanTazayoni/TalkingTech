import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    getDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const form = document.querySelector("form[data-form]")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmation = document.querySelector("#confirmation")
const errorMessage = document.querySelector("[data-error]")
const resetBtn = document.querySelector("[data-reset]")
const loginForm = document.querySelector("[data-login-form]")
const logout = document.querySelector('.logout')
const login = document.querySelector('.login')

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
const auth = getAuth()

// Collection reference
const colRef = collection(db, 'Users')

// Adding user data
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const emailInput = email.value
    const passwordInput = password.value

    if (passwordInput !== confirmation.value) {
        errorMessage.textContent = 'Passwords do not match'
    } else {
        errorMessage.textContent = ''
        try {
            // Check if email already exists
            const querySnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', emailInput)))
            if (!querySnapshot.empty) {
                errorMessage.textContent = 'Email already in use'
            } else {
                const cred = await createUserWithEmailAndPassword(auth, emailInput, passwordInput)

                await addDoc(colRef, {
                    firstname: form.fname.value,
                    lastname: form.lname.value,
                    email: emailInput,
                    phone: form.contact.value,
                    address: form.address.value,
                    address2: form.address2.value,
                    postcode: form.postcode.value
                })
                form.reset()
            }
        } catch (error) {
            console.error('Error checking email in Firestore or signing up:', error)
        }
    }
})

resetBtn.addEventListener("click", () => {
    errorMessage.textContent = ""
})

logout.addEventListener('click', () => {
    signOut(auth).catch((err) => {
        console.log(err.message)
    })
})

loginForm.addEventListener('submit', e => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password).catch((err) => {
        console.log(err.message)
    })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})