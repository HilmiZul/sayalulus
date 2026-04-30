<template>
  <div class="row">
    <div class="col-md-12">
      <div class="text-center mb-3">
        <i v-if="isLoading" class="bi bi-hourglass-split"></i>
        <img
          v-else
          :src="logo"
          alt="logo"
          class="logo"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
const client = useSupabaseClient()
const isLoading = ref(true)
const logo = ref()

async function getSetting() {
  isLoading.value = true

  let { data, error } = await client
    .from('kelulusan_setting')
    .select('*')
    .eq('id', 1)
    .single()

  if(data) {
    logo.value = data.logo_sekolah
    isLoading.value = false
  }
  if(error) {
    console.error(error)
  }
}

onMounted(() => getSetting())
</script>

