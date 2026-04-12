<template>
  <div class="container">
    <div class="row">
      <h1 class="mt-3">{{ title }} / Site Administration</h1>
      <h6 class="mb-3">
        <span v-if="isLoading">
          <span class="spinner-border spinner-border-sm me-1"></span>
          Sedang memuat
        </span>
        <span v-else>{{ setting?.nama_sekolah }}</span>
      </h6>
      <div class="col-md-3">
        <div class="card bg-shadow border-0 mb-4">
          <div class="card-body p-2">
            <ul class="list-group small">
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
              <nuxt-link to="/admin/pengaturan" class="list-link border-bottom border-1">
                <li class="list-group-item">
                  Pengaturan <span class="float-end"><i class="bi bi-chevron-right"></i></span>
                </li>
              </nuxt-link>
              <nuxt-link to="/" target="_blank" class="list-link border-bottom border-1">
                <li class="list-group-item">
                  Pengumuman <span class="float-end"><i class="bi bi-arrow-up-right-square"></i></span>
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
let title = ref("SayaLulus")
let client = useSupabaseClient()
let isLoading = ref(true)
let setting = ref()

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

<style>
.list-link {
  text-decoration: none !important;
  color: #000;
}

@font-face {
  font-family: "Prototype";
  src: url("../assets/font/Prototype.ttf");
}
@font-face {
  font-family: "Fredoka One";
  src: url("../assets/font/fredoka.one.ttf");
}
@font-face {
  font-family: "Rechtman";
  src: url("../assets/font/RECHTMAN.TTF");
}
@font-face {
  font-family: "Grestal Script Demo";
  src: url("../assets/font/GrestalScriptDemoRegular.ttf");
}
@font-face {
  font-family: "Quicksand-SemiBold";
  src: url("../assets/font/Quicksand-SemiBold.ttf");
}
body {
  color: #525252;
  background: transparent url("../assets/img/bg.png") no-repeat center center fixed;
  font-family: "Quicksand-SemiBold";
  background-size: cover;
}

.rechtman {
  font-family: "Rechtman";
}
.geral {
  font-family: "Grestal Script Demo";
}
.quicksand {
  font-family: "Quicksand-SemiBold";
}

.logo {
  width: 50px;
}

.bg-yellow {
  background-color: #f7e999;
}

.bg-green {
  background-color: #a5ffc6;
}

.bg-blue {
  background-color: #8bcbde;
}

.bg-purple {
  background-color: #8fa8f6;
}

.bg-red {
  background-color: #e6567a;
}

.bg-shadow {
  box-shadow: 9px 9px 0 0 rgba(255, 255, 255, 0.331);
}

.prototype {
  font-family: "Prototype";
}

.fredoka-one {
  font-family: "Fredoka One";
}

.title {
  color: rgb(80, 80, 80);
}

.text-grey {
  color: rgb(121, 121, 121);
}

.congrats {
  width: 100%;
  height: 748px;
  /* background: url("../assets/img/bg-frame.jpg") no-repeat center center fixed; */
  background-size: contain;
}
@font-face {
  font-family: "Fredoka One";
  src: url("../assets/font/fredoka.one.ttf");
}
body {
  width: 100%;
  height: 100%;
  color: rgb(77, 77, 77);
}
canvas {
  margin: auto;
}

.congrats {
  width: 100%;
  height: 100%;
}

.congrats .inner {
  margin-top: 120px;
}

.fredoka {
  font-family: "Fredoka One";
}

.h1 {
  font-size: 4vmax;
}

.h2 {
  font-size: 3vmax;
}

.bg-result {
  background-color: #ffffffc4;
}

.keterangan {
  cursor: pointer;
}
</style>
