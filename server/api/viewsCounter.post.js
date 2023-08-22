import {getFirestore,FieldValue } from "firebase-admin/firestore";

export default defineEventHandler(async(event) => {
        const ipForViews = getHeaders(event)["x-forwarded-for"];
        const body = await readBody(event)
        const db = getFirestore()
    try {
        const queryRef = await db.collection('mdBlog').where('mdTitle', '==', body).get()
        queryRef.forEach((selectedMd) =>{
            const isCurrent = selectedMd.data().mdViews.find(views => views.ipForViews === ipForViews)
            if (isCurrent){
                return
            }
            db.collection('mdBlog').doc(selectedMd.id).update({
                mdViews: FieldValue.arrayUnion(ipForViews)
            })
        })

        return {status: 200}
    }catch (e) {
        return {status : 400, error: 'Something Has Gone Wrong'}
    }
})