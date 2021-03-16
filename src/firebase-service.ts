import firebase from 'firebase/app';

export type { firebase };

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
  name?: string;
  analytics?: boolean;
  firestore?: boolean;
  auth?: boolean;
}

export type FirebaseService = firebase.app.App;
export type Firebase = typeof firebase;

export function initializeFirebase(
  config: FirebaseConfig,
  { name = 'default', analytics = true }: FirebaseServiceOptions = {}
): FirebaseService {
  // Check if app with provided name already exists. It is usefull for development environments with HMR
  // to avoid Firebase errors about already initialized app.
  const isAppInitialized = firebase.apps.length ? firebase.apps.find((app) => app.name === name) : undefined;

  // Get already initialized app or create a new one.
  const app = isAppInitialized ? firebase.app(name) : firebase.initializeApp(config, name);

  // Initialize required modules only if app is initialized for the first time.
  if (!isAppInitialized) {
    if (analytics) {
      firebase.analytics();
    }
  }

  return app;
}
