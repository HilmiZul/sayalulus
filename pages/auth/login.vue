<template>
  <div class="col-md-4 offset-md-4 mt-5">
    <h2 class="text-center prototype">Pengumuman<span class="border-1 border-bottom border-left border-top border-dark">Kelulusan</span></h2>
    <div class="text-center mb-3 prototype">SMKN 4 Tasikmalaya</div>
    <div class="card">
      <div class="card-header">
        <h4>Login dulu gak sih!</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <div v-if="errorStatus" class="alert alert-danger">
            Surel dan katasandi gak cocok!
          </div>
          <div class="mb-3">
            <input v-model="email" type="text" class="form-control" placeholder="surel" required autofocus>
          </div>
          <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="katasandi" required>
          </div>
          <button class="btn btn-dark" :disabled="isLoading">
            <span v-if="isLoading">bentar...</span>
            <span v-else>Gass!</span>
          </button>
        </form>
      </div>
    </div>
    <div class="my-3">
      <nuxt-link to="/"><i class="bi bi-arrow-left"></i> ke halaman pengumuman</nuxt-link>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth-login'
})
const client = useSupabaseClient()
const errorStatus = ref(false)
const email = ref('')
const password = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorStatus.value = false
  isLoading.value = true
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value +'@smkn4-tsm.sch.id',
    password: password.value
  })

  if(data) {
    navigateTo('/admin')
    isLoading.value = false
  }
  if(error) {
    errorStatus.value = true
    password.value = ''
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
