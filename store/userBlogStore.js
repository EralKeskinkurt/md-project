import {defineStore} from "pinia";
export const userBlogStore = defineStore('user-blog', {
    state: () => ({
        blogs: null,
    }),
    getters: {
        getBlogs: (state) => state.blogs,
    },
    actions: {
        setBlogs(data){
            this.blogs = data
        },
    },
})