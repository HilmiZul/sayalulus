<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="text-center fs-3 prototype mb-4">
        Menuju Pengumuman.
      </div>
      <div v-if="isLoading" class="card text-center my-3 py-3 bg-shadow border-0"><i class="bi bi-hourglass-split"></i> Sedang memuat</div>
      <Countdown
        v-else
        :date="DDay"
        v-slot="{ days, hours, minutes, seconds }"
        @end="onCountdownEnd"
        >
        <div class="text-center my-3 py-3 card bg-shadow border-0">
          <div class="timer">
            <h1 class="fs-1">{{ days }}</h1> hari
            <h1 class="fs-1">{{ hours }}</h1> jam
            <h1 class="fs-1">{{ minutes }}</h1> menit
            <h1 class="fs-1">{{ seconds }}</h1> detik
          </div>
          <div class="small mt-3 text-muted">{{ tglString }}</div>
        </div>
      </Countdown>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const isCounting = ref(true)
const emit = defineEmits(['end'])
const DDay = ref(0)
const tglString = ref('')
const isLoading = ref(true)
const onCountdownEnd = () => {
  isCounting.value = false
  emit('end', isCounting.value)
}

async function getDDay() {
  isLoading.value = true
  const { data, error } = await client
    .from('kelulusan_setting')
    .select('tgl_pengumuman, waktu_pengumuman')
    .eq('id', 1)
    .single()
  if(data) {
    const waktu = data.waktu_pengumuman
    tglString.value = formatDate(data, 'id-ID') + ', ' + waktu + ' WIB'
    DDay.value = new Date(formatDate(data, 'en-US') + ' ' + waktu + ' GMT+0700')
    isLoading.value = false
  } else {
    console.error(error)
  }
}

function formatDate(data, country) {
  return new Date(data.tgl_pengumuman).toLocaleDateString(country, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'Asia/Jakarta'
  })
}

onMounted(() => {
  getDDay()
})
</script>

<style scoped>
.timer h1.fs-1 {
  display: inline
}
</style>
