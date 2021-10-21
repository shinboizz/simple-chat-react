import React, { useState } from 'react'
import { FirebaseApp, initializeApp } from '@firebase/app';
import { Auth } from '@firebase/auth';
import { createContext, useContext } from 'react'
import { getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from '@firebase/firestore';

interface AppDataProps {
    user: null;
    setUser: React.Dispatch<React.SetStateAction<null>>;
    firebaseApp: FirebaseApp;
    getFirebaseAuth: () => Auth;
    getStore: () => Firestore;
}

// const firebaseApp = initializeApp({
//     apiKey: "AIzaSyAwJXBubQlTq5SxuWpy7ekwXRSl9Z_jO0U",
//     authDomain: "simple-chat-dntu.firebaseapp.com",
//     projectId: "simple-chat-dntu",
//     storageBucket: "simple-chat-dntu.appspot.com",
//     messagingSenderId: "278628401805",
//     appId: "1:278628401805:web:4cd542c5d8179e943d98c4"
// })

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBY7x5VPOwiFH25xS04VblbnK-Jl3WeMLM",
    authDomain: "shinboizz.firebaseapp.com",
    projectId: "shinboizz",
    storageBucket: "shinboizz.appspot.com",
    messagingSenderId: "103466513596",
    appId: "1:103466513596:web:54e5dd748a66175c640cb9",
    measurementId: "G-45G2CXDK80"
  });


const AppContext = createContext<Partial<AppDataProps>>({});

function AppProvider({ children }: any) {
    const appData = AppData();
    return (
        <AppContext.Provider value={appData}>
            {children}
        </AppContext.Provider>
    )
}

function AppData() {
    const [user, setUser] = useState<any>(null);

    const getFirebaseAuth = () => {
        return getAuth(firebaseApp);
    }

    const getStore = () => {
        return getFirestore()
    }

    return {
        user,
        setUser,
        firebaseApp,
        getFirebaseAuth,
        getStore,
    }
}

function useApp() {
    return useContext(AppContext);
}

export {
    useApp,
    AppProvider,
}