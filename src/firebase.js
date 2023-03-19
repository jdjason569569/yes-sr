import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBRMJjzaqwPXPLdmk16JYAW5yf0-Xhi-XM",
  authDomain: "login-test-c1f85.firebaseapp.com",
  projectId: "login-test-c1f85",
  storageBucket: "login-test-c1f85.appspot.com",
  messagingSenderId: "634537234456",
  appId: "1:634537234456:web:77e2aa79aec09d4be7f36d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth};
