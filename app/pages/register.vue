<script setup Lang="ts">

const name = ref('')
const email = ref('')
const password = ref('')
const errorMesagge = ref('')

const supabase = useSupabaseClient()

const { fetch: refreshUserSession } = useUserSession()

const registerForm = async () => {
    try {
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data:{
                    name: name.value,
                    role: 'user'
                }
            }
        })
        if (error) throw error
        
        await refreshUserSession()
        await navigateTo('/')
    }
    catch (error) {
        console.log(error)
        errorMesagge.value = error.message
    }
}

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 class="text-2x1 font-bold text-center mb-6 text-gray-800">Registrarse</h1>
            <form @submit.prevent="registerForm" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" v-model="name" placeholder="Nombre" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" v-model="email" placeholder="Email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input type="password" v-model="password" placeholder="Contraseña" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Registrarse</button>

                <p v-if="errorMesagge" class="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{{ errorMesagge }}</p>
            </form>
            <p>¿Ya tienes cuenta? <NuxtLink to="/" class="text-blue-600 hover:underline font-medium">Inicia sesion</NuxtLink>
            </p>
        </div>
    </div>
</template>