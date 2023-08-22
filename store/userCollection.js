import {defineStore} from "pinia";
export const userCollection = defineStore('user', {
    state: () => ({
        currentUser: null,
    }),
    getters: {
        getCurrentUser: (state) => state.currentUser
    },
    actions: {
        setCurrentUser(user){
            this.currentUser = user;
        }
    },
})

export class usercollection {
}