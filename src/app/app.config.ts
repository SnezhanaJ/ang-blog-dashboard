import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
     importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"angular-blog-95bf5","appId":"1:500847897338:web:c526d4f46036700603b743","storageBucket":"angular-blog-95bf5.appspot.com","apiKey":"AIzaSyDTpD1cHVyRjU5LvjZEPLVmU_AJR6TQ9qg","authDomain":"angular-blog-95bf5.firebaseapp.com","messagingSenderId":"500847897338"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"angular-blog-95bf5","appId":"1:500847897338:web:c526d4f46036700603b743","storageBucket":"angular-blog-95bf5.appspot.com","apiKey":"AIzaSyDTpD1cHVyRjU5LvjZEPLVmU_AJR6TQ9qg","authDomain":"angular-blog-95bf5.firebaseapp.com","messagingSenderId":"500847897338"}))), importProvidersFrom(provideAuth(() => getAuth()))]
};

