<template>
  <div class="container">
    <div class="row">
      <h1 class="my-3">Met dateng kembali, Pak!</h1>
      <div class="col-md-3">
        <div class="card bg-shadow border-0 mb-4">
          <div class="card-body">
            <ul class="list-group">
              <nuxt-link to="/admin" class="list-link border-bottom border-1">
                <li class="list-group-item">
                  Statistik <span class="float-end"><i class="bi bi-chevron-right"></i></span>
                </li>
              </nuxt-link>
              <nuxt-link to="/admin/siswa" class="list-link border-bottom border-1">
                <li class="list-group-item">
                  Siswa <span class="float-end"><i class="bi bi-chevron-right"></i></span>
                </li>
              </nuxt-link>
              <nuxt-link to="/" class="list-link border-bottom border-1">
                <li class="list-group-item">
                  Ke Pengumuman <span class="float-end"><i class="bi bi-arrow-up-right-square"></i></span>
                </li>
              </nuxt-link>
              <!-- <nuxt-link to="/" class="list-link border-bottom border-1">
                <li class="list-group-item">
                  Ke Pengumuman <span class="float-end"><i class="bi bi-arrow-up-right-square"></i></span>
                </li>
              </nuxt-link> -->
              <nuxt-link to="/auth/logout" class="list-link">
                <li class="list-group-item text-danger">
                  Logout
                </li>
              </nuxt-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <slot />
      </div>
    </div>
    <Foot />
  </div>
</template>

<script setup>
const route = useRoute()
</script>

<style scoped>
.list-link {
  text-decoration: none;
  color: #000;
}
</style>
