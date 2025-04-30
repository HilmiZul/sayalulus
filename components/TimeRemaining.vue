<template>
  <div class="row">
    <div class="col">
      <Countdown
        :date="DDay"
        v-slot="{ days, hours, minutes, seconds }"
        @end="onCountdownEnd"
        >
        <div class="text-center my-5 py-3 card">
          <div class="fs-2 pb-3">MENUJU PENGUMUMAN</div>
          <div class="timer">
            <span class="fredoka-one fs-1">{{ days }}</span> hari
            <span class="fredoka-one fs-1">{{ hours }}</span> jam
            <span class="fredoka-one fs-1">{{ minutes }}</span> menit
            <span class="fredoka-one fs-1">{{ seconds }}</span> detik
          </div>
          <div class="quicksand small mt-3 text-muted">05 Mei 2025, 20:00 WIB.</div>
        </div>
      </Countdown>
    </div>
  </div>
</template>

<script setup>
const isCounting = ref(true)
const emit = defineEmits(['end'])
// const DDay = ref(new Date('April 30, 2025 11:07:00 GMT+07:00'))
const DDay = ref(new Date('May 05, 2025 20:00:00 GMT+07:00'))
const onCountdownEnd = () => {
  isCounting.value = false
  emit('end', isCounting.value)
}
</script>

<style scoped>
.timer {
  display: inline
}
</style>
