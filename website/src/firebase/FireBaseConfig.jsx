import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCFC7FBI5_tOxwagqgHRcZ3ZaS15BCFxLs',
  authDomain: 'xuongthuchanh-5e6b4.firebaseapp.com',
  projectId: 'xuongthuchanh-5e6b4',
  storageBucket: 'xuongthuchanh-5e6b4.appspot.com',
  messagingSenderId: '657495558725',
  appId: '1:657495558725:web:86c6a23263de79d9f1712c',
  measurementId: 'G-0Y5L7CLQBK',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
