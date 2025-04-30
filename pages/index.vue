<template>
  <div>
    <TimeRemaining @end="handleEndCounting" v-if="isCounting" />
    <CekKelulusan v-else />
  </div>
</template>

<script setup>
useHead({ title: "Info Kelulusan SMKN 4 Tasikmalaya" })
const isCounting = ref(true)

function handleEndCounting(newValue) {
  isCounting.value = newValue
}
</script>
