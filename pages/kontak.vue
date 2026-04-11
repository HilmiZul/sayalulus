<template>
  <div class="row">
    <div class="col-md-6 mx-auto">
      <div class="text-center fs-3 prototype mb-4">
        Kontak.
      </div>
      <div class="card bg-shadow p-4 border-0 white-space">
        <span v-if="isLoading" class="card text-center bg-shadow border-0"><i class="bi bi-hourglass-split"></i> Sedang memuat</span>
        <span v-else class="small">
          {{ setting?.alamat_sekolah }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Kontak / Info Kelulusan SMKN 4 Tasikmalaya" })
let client = useSupabaseClient()
let setting = ref()
let isLoading = ref(true)

async function getSetting() {
  isLoading.value = true
  let { data, error } = await client.from('kelulusan_setting').select().eq('id', 1).single()
  if(data) {
    setting.value = data
    isLoading.value = false
  }
}

onMounted(() => {
  getSetting()
})
</script>

<style scoped>
.white-space {
  white-space: pre-wrap;
}
</style>
