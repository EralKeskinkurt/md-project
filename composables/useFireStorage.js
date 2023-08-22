import {getStorage, ref, uploadString, getDownloadURL, deleteObject, uploadBytes } from "firebase/storage"
import {toastStore} from "~/store/toastStore";
import {userBlogStore} from "~/store/userBlogStore";
import {useRouter} from "#app";

export default () => ({
    createMd: async function (data) {
        const storage = getStorage()
        const metadata = {
            contentType: 'text/md',
        };
       const contentRef = ref(storage,'content/' + data.title + '.md')
       await uploadString(contentRef, data.text).then(resMd => {
           getDownloadURL(ref(storage, `content/${resMd.metadata.name}`)).then(urlRes => {
               $fetch('api/createmd', {
                   method:'POST',
                   body: {
                       title: data.title,
                       urlRes: urlRes,
                       mdText: data.text

                   }
               }).then(res => {
                   toastStore().setToast('Success', res.message)
               }).catch(e => {
                   toastStore().setToast('Error', e.error)
               })
           })

       })
    },
    updateMdFile: async function (data) {
        const storage = getStorage()
        const deleteFileRef = ref(storage,'content/' + data?.oldMd.mdTitle + '.md')
        const newFileRef = ref(storage, 'content/' + data?.newMd.mdTitle + '.md')
        try {
            await deleteObject(deleteFileRef)
            await uploadString(newFileRef, data?.newMd.mdText).then(resMd => {
                getDownloadURL(ref(storage, `content/${resMd.metadata.name}`)).then(urlRes => {
                    $fetch('/api/updateMdFile', {
                        method:'POST',
                        body: {
                            oldMd: {
                                mdTitle:data.oldMd.mdTitle,
                                mdText:data.oldMd.mdText,
                                mdFileUrl: data.oldMd.mdFileUrl
                            },
                            newMd: {
                                mdTitle:data.newMd.mdTitle,
                                mdText:data.newMd.mdText,
                                mdFileUrl: urlRes
                            }
                        }
                    }).then(res => {
                        useRouter().push('/profile')
                        toastStore().setToast('Success', res.message)
                    }).catch(e => {
                        toastStore().setToast('Error', e.error)
                    })
                })

            })
        }catch (error){
            toastStore().setToast('Error', error)
        }
    },
    getMdFiles: async function () {
        await $fetch('/api/getmdblog', {
            method:'POST',
            credentials: 'include',
        }).then(blogRes => {
            userBlogStore().setBlogs(blogRes)
        }).catch((e)=> {
            toastStore().setToast('Error', e)
        })
    },

    getContent: async function (slug) {
        const posts = await userBlogStore().getBlogs.data;

        const postUrl = await posts.find((p) => p?.mdTitle === slug).mdFileUrl;

        const { data } = await $fetch("/api/getContent", {
            method: "POST",
            body: {
                url: postUrl,
            },
        });

        return parseMarkdown(data);
    },

    updateUserProfile: async function (data) {
        const storage = getStorage()
        const imageRef = ref(storage,'images/' + data.file.filename)
        await uploadBytes(imageRef, data.file).then(imgRes => {
            getDownloadURL(ref(storage, `images/${imgRes.metadata.name}`))
                .then(imgUrl => {
                    $fetch('/api/userUpdate', {
                        method: 'POST',
                        body:{
                            displayName: data.displayName,
                            email: data.email,
                            photoUrl: imgUrl
                        }
                    }).then(res => {
                        toastStore().setToast('Success', res.message)
                    })
                }).catch(error =>{
                    toastStore().setToast('Error', error)
            })
        }).catch(error => {
            toastStore().setToast('Error', error)
        })
    }
})