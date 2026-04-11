<template>
  <div class="row justify-content-center mt-5 mb-5">
    <div class="col-md-4">
      <footer class="card text-center small p-2 bg-shadow bg-light border-0">
        <div>v{{ version }}</div>
        &copy; 2023 - {{ tahun }}.
      </footer>
    </div>
  </div>
</template>

<script setup>
const tahun = new Date().getFullYear();
let config = useRuntimeConfig()
let version = config.public.appVersion
</script>

<style scoped>
footer {
  color: rgb(160, 160, 160);
}
footer .link {
  color: inherit;
  text-decoration: none;
}
</style>
