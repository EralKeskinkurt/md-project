import {getFirestore} from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";
import {getAuth} from "firebase-admin/auth";

export default defineEventHandler(async (event) => {
    const {app} = useFirebaseServer()
    const body = await readBody(event)
    const db = getFirestore()
    const verifyUser = await getAuth().verifySessionCookie(getCookie(event, 'session'))
    if (!verifyUser) throw "User Not Found!"
    try {
        const date = new Date()
        const createMd = await db.collection('mdBlog').add({
            mdTitle: body?.title,
            mdFileUrl: body?.urlRes,
            mdText: body?.mdText,
            userRef: db.doc('users/' + verifyUser.uid),
            mdViews: [],
            mdCreatedTime: `${date.getDay().toString().length < 2 ? '0' + date.getDay() : date.getDay()} / ${date.getMonth().toString().length < 2 ? '0' + date.getMonth() : date.getMonth()} / ${date.getFullYear()} - ${date.getHours() + ':' + date.getMinutes()}`
        })
        return {status: 200, message: 'Blog successfully created'}
    } catch (e) {
        return {status: 400, error: 'There was a problem while creating a blog.'}
    }
})