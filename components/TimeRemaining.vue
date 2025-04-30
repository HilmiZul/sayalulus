<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="text-center fs-3 prototype mb-4">
        Menuju Pengumuman
      </div>
      <Countdown
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
          <div class="small mt-3 text-muted">05 Mei 2025, 20:00 WIB.</div>
        </div>
      </Countdown>
    </div>
  </div>
</template>

<script setup>
const isCounting = ref(true)
const emit = defineEmits(['end'])
// const DDay = ref(new Date('April 30, 2025 21:27:00 GMT+07:00'))
const DDay = ref(new Date('May 05, 2025 20:00:00 GMT+07:00'))
const onCountdownEnd = () => {
  isCounting.value = false
  emit('end', isCounting.value)
}
</script>

<style scoped>
.timer h1.fs-1 {
  display: inline
}
</style>
