import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACTZjNkSaIoEJT6Xi6q3Ja-fd7txDAKes",
    authDomain: "laclave-fitnessclub.firebaseapp.com",
    projectId: "laclave-fitnessclub",
    storageBucket: "laclave-fitnessclub.firebasestorage.app",
    messagingSenderId: "136554406152",
    appId: "1:136554406152:web:fcba117cfe0e22d5c94cbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

