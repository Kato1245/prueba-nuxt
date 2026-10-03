<script setup Lang="ts">

definePageMeta({
    middleware: ["admin-auth"]
})

const { clear: clearUserSession } = useUserSession()

const logout = async () => {
    await clearUserSession();
    await navigateTo("/");
}

</script>

<template>
    <div class="min-h-screen bg-gray-50 p-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
            <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">Cerrar Sesion</button>
        </div>
    </div>
</template>