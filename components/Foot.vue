<template>
  <div class="row justify-content-center mt-5 mb-5">
    <div class="col-md-4">
      <footer class="card text-center small p-2 bg-shadow bg-light border-0">
        &copy; 2023 - {{ tahun }}. Dibuat dengan ♥ oleh PPLG.
      </footer>
    </div>
  </div>
</template>

<script setup>
const tahun = new Date().getFullYear();
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
