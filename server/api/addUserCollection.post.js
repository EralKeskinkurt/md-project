import {getFirestore} from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";
export default defineEventHandler(async(event) => {
    const {app} = useFirebaseServer()
    const body = await readBody(event)
    try {
        const db = getFirestore()
        await db.collection('user').doc(body?.userUid).set({
            displayName: body?.displayName,
            email: body?.email,
            photoUrl: null
        })
        return {status:200, message: 'Successful'}
    }catch (e) {
        return {status:400, error: 'Something Wrong'}
    }
})