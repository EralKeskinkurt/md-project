import {getFirestore} from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";
import {getAuth} from "firebase-admin/auth";
export default defineEventHandler(async(event) => {
    const {app} = useFirebaseServer()
    const body = await readBody(event)
    const db = getFirestore()
    const verifyCookie = await getAuth().verifySessionCookie(getCookie(event,'session'))
    if (!verifyCookie) throw "User Not Found!"
    try {
        const deleteBlogRef = db.collection('mdBlog')
        const snapshot = await deleteBlogRef.where('mdTitle', '==', body.mdTitle).get()
        snapshot.forEach(callback => {
            if (callback.data().userRef === db.doc('users/' + verifyCookie.uid)){
                throw "unauthorized access"
            }
            deleteBlogRef.doc(callback.ref._path.segments[1]).delete()
        })
        return {status:200, message: 'Blog successfully deleted'}
    }catch (e) {
        return {status:400, error: 'There was a problem while deleting a blog.'}
    }
})