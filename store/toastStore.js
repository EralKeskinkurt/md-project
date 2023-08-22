import {defineStore} from "pinia";
export const toastStore = defineStore('toast', {
    state: () => ({
        toast:{
            title: null,
            message: null
        }
    }),
    getters: {
        getToast: (state) => state.toast
    },
    actions: {
        setToast(title, message){
            this.toast.title = title;
            this.toast.message = message;
            setTimeout(()=> {
                this.toast.title =null
                this.toast.message =null
            }, 3500)
        }
    },
})