import firebase from 'firebase/app';

export interface FirebaseConfig {
  apiKey: string;
  projectId: string;
  appId: string;
  authDomain: string;
  databaseURL: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId: string;
}

export interface FirebaseServiceOptions {
  analytics?: boolean;
  firestore?: boolean;
  auth?: boolean;
}

export type FirebaseService = {
  app: firebase.app.App;
  firebase: typeof firebase;
};

export function initializeFirebase(
  config: FirebaseConfig,
  { analytics = true }: FirebaseServiceOptions = {}
): FirebaseService {
  const isApp = firebase.apps.length;
  const app = !isApp ? firebase.initializeApp(config) : firebase.app();

  if (!isApp) {
    if (analytics) {
      firebase.analytics();
    }
  }

  return { app, firebase };
}
