import {useCookie} from "#app";
import {getAuth} from "firebase/auth";
export default defineNuxtRouteMiddleware(async (to) => {
                const auth = getAuth();
            if (process.server){
                const cookie =  useCookie('session')
                const data = await $fetch('http://192.168.1.33:3000/api/checkAuthStatus',{
                    method: 'POST',
                    body: JSON.stringify({sessionCookie: cookie.value}),
                })
                if (data?.statusCode === 401 && !to.path.startsWith('/login')){
                    return  navigateTo('/login')
                }
                if (data?.statusCode === 200 && to.path.startsWith('/login')){
                    return  navigateTo('/')
                }
            }

})


