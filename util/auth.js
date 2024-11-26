import axios from "axios";
import { FIREBASE_API_KEY } from "@env";
const API_KEY = FIREBASE_API_KEY;

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "e-commerce-3b6f5.firebaseapp.com",
  projectId: "e-commerce-3b6f5",
  storageBucket: "e-commerce-3b6f5.appspot.com",
  messagingSenderId: "1014480048764",
  appId: "1:1014480048764:web:7b5b9b9b1c7b7d6e6d9b41",
  measurementId: "G-8T0QWZQJQ8",
};

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
