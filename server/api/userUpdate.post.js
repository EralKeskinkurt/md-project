import useFirebaseServer from "~/composables/useFirebaseServer";
import {getAuth} from "firebase-admin/auth";
import {userCollection} from "~/store/userCollection";
import {getFirestore} from "firebase-admin/firestore";
export default defineEventHandler(async(event) => {
    let formData = new FormData()
    const {app} = useFirebaseServer()
    const body = await readBody(event)
    const db = getFirestore()
    const verifyCookie = await getAuth().verifySessionCookie(getCookie(event,'session'))
    if (!verifyCookie) throw "User Not Found!"
    try {
        await db.collection('user').doc(verifyCookie.uid).update({
            photoUrl: body.photoUrl,
            displayName: body.displayName,
            email: body.email
        })
        await db.collection('user').doc(verifyCookie.uid).get().then(res => {
            const userRes = res.data()
            userCollection().setCurrentUser({displayName:userRes.displayName, email: userRes.email, photoUrl: userRes.photoURL});
        })
        return {status:200, message: "Changing Successful"}
    }catch (e) {
        return {status:400, error: 'Image Changing Unsuccessful'}
    }
})