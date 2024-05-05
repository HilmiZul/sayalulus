<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light bg-shadow mt-4 border-0">
          <a
            class="navbar-brand"
            href="http://smkn4-tsm.sch.id"
            target="_blank"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/id/9/9e/Logo_SMK_Negeri_4_Tasikmalaya.png"
              alt="logo"
              class="logo"
              style="width: 1.2em"
            />
            <span class="mx-3 prototype">SMKN 4 Tasikmalaya</span>
          </a>
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
              <router-link class="nav-link" to="/"><i class="bi bi-mortarboard-fill"></i> PENGUMUMAN</router-link>
              <router-link class="nav-link" to="/about"><i class="bi bi-building"></i> ABOUT</router-link>
              <router-link class="nav-link" to="/contact"><i class="bi bi-person-lines-fill"></i> CONTACT</router-link>
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
