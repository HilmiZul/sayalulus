<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light bg-shadow mt-4 border-0">
          <NuxtLink
            class="navbar-brand"
            to="/"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/id/9/9e/Logo_SMK_Negeri_4_Tasikmalaya.png"
              alt="logo"
              class="logo ms-2"
              style="width: 1.2em"
            />
            <span class="mx-2 prototype text-dark">
              <span class="border-top border-start border-bottom border-dark p-1">SayaLulus</span>
            </span>
          </NuxtLink>
          <button
            class="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <nuxt-link class="nav-link" to="/"><i class="bi bi-mortarboard-fill"></i> Pengumuman</nuxt-link>
              <nuxt-link class="nav-link" to="/kontak"><i class="bi bi-person-lines-fill"></i> Kontak</nuxt-link>
              <!-- <router-link class="nav-link" to="/tentang"><i class="bi bi-building"></i> TENTANG</router-link> -->
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-brand {
  font-size: 1rem;
}
</style>
