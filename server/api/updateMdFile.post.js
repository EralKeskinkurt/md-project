import {getFirestore} from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";
import {getAuth} from "firebase-admin/auth";
export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    useFirebaseServer()
    const db = getFirestore()
    try {
        const verifyCookie = await getAuth().verifySessionCookie(getCookie(event,'session'));
        const mdBlogRef = db.collection('mdBlog')
        const snapshot = await mdBlogRef.where('mdTitle', '==', body.oldMd.mdTitle).get()
        snapshot.forEach(callback => {
            if (callback.data().userRef === db.doc('users/' + verifyCookie.uid)){
                throw "unauthorized access"
            }
            mdBlogRef.doc(callback.ref._path.segments[1]).update({
                mdTitle: body?.newMd.mdTitle,
                mdFileUrl: body?.newMd.mdFileUrl,
                mdText: body?.newMd.mdText,
                userRef: db.doc('users/' + verifyCookie.uid)
            })
        })
        return {status: 200, message:"Successfully Updated"}
    }catch (e) {
        return {status : 400, error:"Something Has Gone Wrong"}
    }
})