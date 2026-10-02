export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn, user } = useUserSession();

    if(!loggedIn.value){
        return navigateTo('/')
    }

    if(user.value.role !== 'admin'){
        return navigateTo('/dashboard/user')
    }
})