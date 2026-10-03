export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    if(!user.value){
        return navigateTo('/')
    }

    if(user.value.user_metadata?.role !== 'admin'){
        return navigateTo('/dashboard/user')
    }
})