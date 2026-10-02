<script setup Lang="ts">

const email = ref('')
const password = ref('')

const { fetch: refreshUserSession} = useUserSession()

const loginForm = async () => {
    try{
        await $fetch('/api/login', {
            method: 'POST',
            body:{
                email: email.value,
                password: password.value
            }
        })
        await refreshUserSession()

        const { user } = await useUserSession()

        if(user.value.role === "admin"){
            await navigateTo('/dashboard/admin')
        }
        else{
            await navigateTo('/dashboard/user')
        }
    }
    catch(error){
        console.log(error)
        return {
            statusCode: 500,
            message: 'Error al iniciar sesion'
        }
    }
}

</script>   

<template>
    <div>
        <div>
            <h1>Iniciar Sesion</h1>
            <form @submit.prevent="loginForm">
                <label for="email">Email</label>
                <input type="email" v-model="email" placeholder="Email">
                <label for="password">Contraseña</label>
                <input type="password" v-model="password" placeholder="Contraseña">
                <button type="submit">Iniciar Sesion</button>
            </form>
            <p>¿No tienes cuenta? <NuxtLink to="/register">Registrate</NuxtLink></p>
        </div>
    </div>
</template>