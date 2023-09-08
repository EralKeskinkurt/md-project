// https://firebase.google.com/docs/auth/web/start?hl=tr
import { getAuth, createUserWithEmailAndPassword, setPersistence, inMemoryPersistence, getIdToken, signInWithEmailAndPassword, onAuthStateChanged, updateProfile   } from "firebase/auth";
import {userCollection} from "~/store/userCollection";
import {useRouter} from "#app";
import {toastStore} from "~/store/toastStore";

export default () => ({
    createUser: async function (email, password, displayName) {
        const auth = getAuth();
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                $fetch('/api/addUserCollection', {
                    method: 'POST',
                    body: {
                        displayName: displayName,
                        userUid: user.user.uid,
                        email: user.user.email
                    }
                }).then(res => {
                }).catch(err => "")
                $fetch('api/deleteusercookie', {
                    method: 'POST',
                }).then(response => {
                    useRouter().push('/login')
                    toastStore().setToast("Success", 'Successfully Created User')
                    userCollection().setCurrentUser(null);
                }).catch(err => {
                    toastStore().setToast("Error", "Something Has Gone Wrong")
                })
            })
            .catch((error) => {
                toastStore().setToast("Error", error.message.slice(10, ))
            });
        return credentials
    },

    signInUser: async function (email, password){
        const auth = getAuth();
        await setPersistence(auth, inMemoryPersistence)
            .then(()=> {
                signInWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        return getIdToken(user.user).then((idToken) =>{
                            fetch("api/login",{
                                method:'POST',
                                body: JSON.stringify({idToken}),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(res =>  res.json())
                                .then((data) => {
                                    if (data.error) {
                                        return
                                    }
                                    userCollection().setCurrentUser({displayName: data.body.displayName, email: data?.body.email, photoUrl: data.body.photoUrl})
                                    toastStore().setToast("Success", 'Successfully Signed In')
                                    useRouter().push('/');
                                })
                        })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toastStore().setToast("Error", "Incorrect email or password")
                    });
            })

    },
    signOut: async function (){
        await $fetch('api/deleteusercookie', {
            method: 'POST',
        }).then(response => {
                toastStore().setToast("Success", "Logged Out Successful")
                userCollection().setCurrentUser(null);
                useRouter().push('/login')
            }).catch(err => {
                toastStore().setToast("Error", "Something Has Gone Wrong")
            })
    }

})




