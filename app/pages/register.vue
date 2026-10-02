<script setup Lang="ts">

const name = ref('')
const email = ref('')
const password = ref('')

const { fetch: refreshUserSession} = useUserSession()

const registerForm = async () => {
    try{
        await $fetch('/api/register', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                password: password.value
            }
        })
        await refreshUserSession()
    }
    catch(error){
        console.log(error)
    }
}

</script>

<template>
    <div>
        <div>
            <h1>Registrarse</h1>
            <form @submit.prevent="registerForm">
                <label for="name">Nombre</label>
                <input type="text" v-model="name" placeholder="Nombre">

                <label for="email">Email</label>
                <input type="email" v-model="email" placeholder="Email">
                
                <label for="password">Contraseña</label>
                <input type="password" v-model="password" placeholder="Contraseña">

                <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes cuenta? <NuxtLink to="/">Inicia sesion</NuxtLink></p>
        </div>
    </div>
</template>