<template>
  <div class="col-md-4 mx-auto mt-5">
    <h1 class="text-center">Logging out...</h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth-login',
  middleware: 'auth',
})
const client = useSupabaseClient()

async function handleLogout() {
  const { error } = await client.auth.signOut()
  if(!error){
    navigateTo('/auth/login')
  }
}

onMounted(() => {
  handleLogout()
})
</script>
