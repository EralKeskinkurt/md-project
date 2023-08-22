import { initializeApp } from "firebase/app";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY,
        authDomain: "nuxt-md-project.firebaseapp.com",
        projectId: "nuxt-md-project",
        storageBucket: "nuxt-md-project.appspot.com",
        messagingSenderId: "274917963337",
        appId: "1:274917963337:web:db49aca9bb3180e8bfb198",
        measurementId: "G-08G1C2ZLXJ"
    };
    initializeApp(firebaseConfig);
})