<template>
  <div>
    <TimeRemaining @end="handleEndCounting" v-if="isCounting" />
    <CekKelulusan v-else />
  </div>
</template>

<script setup>
useHead({ 
  title: "SayaLulus / Info Kelulusan SMKN 4 Tasikmalaya",
  meta: [
    {
      name: 'description',
      content: 'Info Kelulusan SMKN 4 Tasikmalaya',
    },
  ],
})
const isCounting = ref(true)

function handleEndCounting(newValue) {
  isCounting.value = newValue
}
</script>
