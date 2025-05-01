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

<style>
.list-link {
  text-decoration: none;
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
