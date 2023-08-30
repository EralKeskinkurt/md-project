import {getFirestore} from "firebase-admin/firestore";
import useFirebaseServer from "~/composables/useFirebaseServer";
export default defineEventHandler(async(event) => {
    useFirebaseServer()
    const db = getFirestore()
    try {
        const cookie = getCookie(event,'session')
        const mdBlogRef = db.collection('mdBlog')
        const mdBlogsRef = await mdBlogRef.get()
        let mdBlogs = []
         for(const blog of mdBlogsRef.docs){
             const mdData = blog.data()
             if (!mdData.userRef) return
             const userData = await db.collection('user').doc(mdData.userRef._resourcePath.segments[1]).get()
             mdBlogs.push({
                 mdTitle: mdData.mdTitle,
                 mdViews: mdData.mdViews,
                 mdText: mdData.mdText,
                 mdCreatedTime: mdData.mdCreatedTime,
                 userRef: userData.data()
             })
         }
        return {status: 200, data:mdBlogs}
    }catch (e) {
        return {status : 400, error: e}
    }
})