import {useCookie} from "#app";
import {getAuth} from "firebase/auth";
export default defineNuxtRouteMiddleware(async (to) => {
        if(process.server){
                const auth = getAuth();
                const cookie =  useCookie('session')
                const data = await $fetch('https://md-project-vercel.app/api/checkAuthStatus',{
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


