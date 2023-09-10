import {getAuth} from "firebase-admin/auth";
import useFirebaseServer from "~/composables/useFirebaseServer";
import {userCollection} from "~/store/userCollection";
import {getFirestore} from "firebase-admin/firestore";
export default defineEventHandler(async(event) => {
    useFirebaseServer()
    const db = getFirestore()
    const {sessionCookie} = await readBody(event)
    try {
        const claim = await getAuth().verifySessionCookie(sessionCookie)
        const user = await getAuth().getUser(claim.uid)
        await db.collection('user').doc(user.uid).get().then(res => {
            const data = res.data()
            userCollection().setCurrentUser({displayName:data.displayName, email: data.email, photoUrl: data.photoUrl});
        })
        return {statusCode: 200, claim: claim}
    }catch (e){

        return {statusCode: 401, error: 'UNAUTHORİZED-REQUEST'}
    }
})
