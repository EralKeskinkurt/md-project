import {getFirestore} from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";
import {getAuth} from "firebase-admin/auth";
export default defineEventHandler(async(event) => {
    useFirebaseServer()
    const db = getFirestore()
    try {
        const cookie = getCookie(event,'session')
        const verifyCookie = await getAuth().verifySessionCookie(cookie.toString());
        const mdBlogRef = db.collection('mdBlog')
        const snapshot = await mdBlogRef.where("userRef", "==", db.doc('users/' + verifyCookie.uid)).get()
        let blogs = [];
        snapshot.forEach((doc) => {
            blogs.push(doc.data())
        });
        return {status: 200, data: blogs}
    }catch (e) {
        return {status : 400, error: e}
    }
})