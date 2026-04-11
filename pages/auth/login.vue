<template>
  <div class="col-md-4 offset-md-4 mt-5">
    <h2 class="text-center">Pengumuman<span class="border-1 border-bottom border-left border-top border-dark">Kelulusan</span></h2>
    <h6 class="text-center mb-3">
      <span v-if="isLoadingSetting">
        <span class="spinner-border spinner-border-sm me-1"></span>
        Sedang memuat
      </span>
      <span v-else>{{ setting?.nama_sekolah }}</span>
    </h6>
    <div class="card border-0 bg-shadow">
      <div class="card-header bg-transparent">
        <h6 class="m-0">Login dulu gak sih!</h6>
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
          <button class="btn btn-dark btn-sm" :disabled="isLoading">
            <span v-if="isLoading">bentar...</span>
            <span v-else>Gass!</span>
          </button>
        </form>
      </div>
    </div>
    <div class="my-3 small">
      <nuxt-link to="/" class="text-muted"><i class="bi bi-arrow-left"></i> ke halaman pengumuman</nuxt-link>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth-login'
})

useHead({
  title: 'Login / Kelulusan',
  meta: [
    { name: 'description', content: 'Login ke halaman admin' }
  ]
})
const client = useSupabaseClient()
const user = useSupabaseUser()
const errorStatus = ref(false)
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const isLoadingSetting = ref(true)
const setting = ref()

if (user.value) {
  navigateTo('/admin')
}

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

async function getSetting() {
  isLoadingSetting.value = true
  let { data, error } = await client.from('kelulusan_setting').select().eq('id', 1).single()
  if(data) {
    setting.value = data
    isLoadingSetting.value = false
  }
}

onMounted(() => {
  getSetting()
})
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
