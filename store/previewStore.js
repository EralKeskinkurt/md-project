import {defineStore} from "pinia";
export const previewStore = defineStore('preview', {
    state: () => ({
        preview: null,
    }),
    getters: {
        getPreview: (state) => state?.preview,
    },
    actions: {
        setPreview(data){
            this.preview = data
        },
    },
})