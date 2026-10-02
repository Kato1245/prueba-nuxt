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
    <div>
        <h1>Dashboard Admin</h1>
        <button @click="logout">Cerrar Sesion</button>
    </div>
</template>