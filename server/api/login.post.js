import {getAuth} from "firebase-admin/auth";
import useFirebaseServer from "~~/composables/useFirebaseServer";
import {userCollection} from "~/store/userCollection";
import {getFirestore} from "firebase-admin/firestore";
export default defineEventHandler(async(event) => {
    const {app} = useFirebaseServer();
    const {idToken} = await readBody(event)
    const db = getFirestore();
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    try {
        const user = {};
        const sessionCookie = await getAuth().createSessionCookie(idToken,{expiresIn})
        const verifyCookie = await getAuth().verifySessionCookie(sessionCookie);
        const options =  {maxAge: expiresIn, httpOnly: false, secure: false, path: '/'}
        setCookie(event, 'session', sessionCookie, options);
        const res = await db.collection('user').doc(verifyCookie.uid).get()
        return {statusCode: 200, body:res.data()}
    }catch (e){
        return {statusCode: 401, error:"İncorrect email or password "}
    }
})
