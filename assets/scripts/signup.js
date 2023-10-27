import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const form = document.querySelector('form[data-form]')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmation = document.querySelector('#confirmation')
const errorMessage = document.querySelector('[data-error]')
const resetBtn = document.querySelector('[data-reset]')
const loginForm = document.querySelector('[data-login-form]')
const loginBtn = document.querySelector('[data-login-btn]')
const logoutBtn = document.querySelector('[data-logout-btn]')
const confirmLoginBtn = document.querySelector('#loginButton')
const cancelLoginBtn = document.querySelector('#cancelButton')
const loginPromptModal = new bootstrap.Modal(document.getElementById('loginModalToggle'))
const loginModal = new bootstrap.Modal(document.getElementById('loggedinModalToggle'))
const logoutModal = new bootstrap.Modal(document.getElementById('logoutModalToggle'))
const signupModal = new bootstrap.Modal(document.getElementById('signupModalToggle'))
const userStatus = document.querySelector('[data-user-status]')
const blockTopElement = document.querySelector('.block-top')
const loginSuccessMessage = document.querySelector('[data-login-success-message]')
const signUpSuccessMessage = document.querySelector('[data-signup-success-message]')
const signupTab = document.querySelector('#signupTab')

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
                await createUserWithEmailAndPassword(auth, emailInput, passwordInput)

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

                signupModal.show()
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                errorMessage.textContent =
                'There is a problem with your account. Please contact TalkingTech.'
            } else {
                errorMessage.textContent =
                'An error occurred during sign-up. Please try again later.'
            }
            console.error('Error checking email in Firestore or signing up:', error)
        }
    }
})

resetBtn.addEventListener('click', () => {
    errorMessage.textContent = ''
})

logoutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            logoutModal.show()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

loginForm.addEventListener('submit', e => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            loginPromptModal.hide()
            loginForm.reset()
            loginModal.show()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status:', user)

    if (user) {
        userStatus.classList.add('logged-in')
        loginBtn.classList.add('logged-in')
        logoutBtn.classList.add('logged-in')
        blockTopElement.classList.remove('logged-out')

        signupTab.textContent = 'Appointments'
        setEmail(user.email)
    } else {
        userStatus.classList.remove('logged-in')
        loginBtn.classList.remove('logged-in')
        logoutBtn.classList.remove('logged-in')
        blockTopElement.classList.add('logged-out')

        signupTab.textContent = 'Sign up'
        setEmail('')
    }
})

function setEmail(email) {
    const signUpEmailSpan = signUpSuccessMessage.querySelector('.blue')
    const loginEmailSpan = loginSuccessMessage.querySelector('.blue')
    const userEmail = userStatus.querySelector('.user-email')
    signUpEmailSpan.textContent = email
    loginEmailSpan.textContent = email
    userEmail.textContent = email
}

confirmLoginBtn.addEventListener('click', () => {
    document.querySelector('[data-login-form] .login').click()
})

cancelLoginBtn.addEventListener('click', () => {
    loginForm.reset()
})

