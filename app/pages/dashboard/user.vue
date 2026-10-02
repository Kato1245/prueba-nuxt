<script setup Lang="ts">

definePageMeta({
    middleware: ["authentication"]
})

const { clear: clearUserSession } = useUserSession()

const logout = async () => {
    await clearUserSession();
    await navigateTo("/");
}

</script>

<template>
    <div>
        <h1>Pagina de Usuario Comun</h1>
        <button @click="logout">Cerrar Sesion</button>
    </div>
</template>