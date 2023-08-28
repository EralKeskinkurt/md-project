import {getFirestore,FieldValue } from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";

export default defineEventHandler(async(event) => {
        useFirebaseServer()
        const body = await readBody(event)
        const db = getFirestore()
    try {
        const queryRef = await db.collection('mdBlog').where('mdTitle', '==', body['body']).get()
        queryRef.forEach((selectedMd) =>{
            const isCurrent = selectedMd.data().mdViews.find((views) => views?.ipForViews === body['x-forwarded-for'])
            if (isCurrent){
                return
            }
            db.collection('mdBlog').doc(selectedMd.id).update({
                mdViews: FieldValue.arrayUnion(body['x-forwarded-for'])
            })
        })
        return {status: 200}
    }catch (e) {
        return {status : 400, error: 'Something Has Gone Wrong'}
    }
})