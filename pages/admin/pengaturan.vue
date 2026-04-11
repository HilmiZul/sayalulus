<template>
  <div class="card bg-shadow border-0">
    <div class="card-header">
      <h3><i class="bi bi-sliders"></i> Pengaturan</h3>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div v-if="setting.length < 1" class="text-muted my-3">
            <span class="spinner-border spinner-border-sm me-1"></span>
            Sedang memuat
          </div>

          <div v-else>
            <!-- Nav Tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item" role="presentation">
                <a href="#pengaturan-umum" aria-selected="true" role="tab" class="nav-link active" data-bs-toggle="tab">
                  Umum
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a href="#pengaturan-kelulusan" aria-selected="false" role="tab" class="nav-link" tab-index="-1" data-bs-toggle="tab">
                  Kelulusan
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a href="#pengaturan-pernyataan" aria-selected="false" role="tab" class="nav-link" tab-index="-1" data-bs-toggle="tab">
                  Pernyataan
                </a>
              </li>
            </ul>

            <div id="myTabContent" class="tab-content">
              <div class="tab-pane active show" id="pengaturan-umum" role="tabpanel">
                <form @submit.prevent="updateSetting">
                  <div v-if="statusSuccessUpdate" class="alert alert-success alert-dismissible my-3">
                    <button @click="() => statusSuccessUpdate = false" class="btn-close small"></button>
                    Pengaturan berhasil diperbaharui.</div>
                  <div class="my-3">
                    <label for="nama_sekolah">Nama Sekolah</label>
                    <input v-model="setting.nama_sekolah" id="nama_sekolah" type="text" class="form-control" placeholder="Nama Sekolah" required />
                  </div>
                  <div class="mb-3">
                    <label for="alamat_sekolah">Alamat Sekolah</label>
                    <textarea v-model="setting.alamat_sekolah" id="alamat_sekolah" rows="4" class="form-control" placeholder="Alamat lengkap sekolah" required></textarea>
                  </div>
                  <button class="btn btn-dark" :disabled="isSaving">
                    <span v-if="isSaving">Sedang menyimpan</span>
                    <span velse>Simpan</span>
                  </button>
                </form>
              </div>

              <div class="tab-pane" id="pengaturan-kelulusan" role="tabpanel">
                <form @submit.prevent="updateSetting">
                  <div v-if="statusSuccessUpdate" class="alert alert-success alert-dismissible my-3">
                    <button @click="() => statusSuccessUpdate = false" class="btn-close small"></button>
                    Pengaturan berhasil diperbaharui.</div>
                  <div class="my-3">
                    <label for="nomor">Nomor SK</label>
                    <input v-model="setting.nomor_surat" id="nomor" type="text" class="form-control" placeholder="-/-/SMKN.4-Cabdin Wil.XII" required />
                  </div>
                  <div class="mb-3">
                    <label for="tgl_penetapan">Tanggal Penetapan</label>
                    <input v-model="setting.tgl_penetapan" id="tgl_penetapan" type="date" class="form-control" placeholder="Tanggal penetapan" required />
                  </div>
                  <hr class="my-4 border-dark" />
                  <div class="mb-3">
                    <label for="tgl_pengumuman">Tanggal Pengumuman</label>
                    <input v-model="setting.tgl_pengumuman" id="tgl_pengumuman" type="date" class="form-control" placeholder="Tanggal pengumuman" required />
                  </div>
                  <div class="mb-3">
                    <label for="waktu_pengumuman">Waktu Pengumuman</label>
                    <input v-model="setting.waktu_pengumuman" id="waktu_pengumuman" type="time" class="form-control" placeholder="Waktu pengumuman" required />
                  </div>
                  <button class="btn btn-dark" :disabled="isSaving">
                    <span v-if="isSaving">Sedang menyimpan</span>
                    <span velse>Simpan</span>
                  </button>
                </form>
              </div>

              <div class="tab-pane" id="pengaturan-pernyataan" role="tabpanel">
                <form @submit.prevent="updateSetting">
                  <div v-if="statusSuccessUpdate" class="alert alert-success alert-dismissible my-3">
                    <button @click="() => statusSuccessUpdate = false" class="btn-close small"></button>
                    Pengaturan berhasil diperbaharui.</div>
                  <div class="my-3">
                    <label for="pernyataan">Pernyataan Siswa</label>
                    <textarea v-model="setting.pernyataan_siswa" id="pernyataan" rows="6" class="form-control" placeholder="Tulis teks pernyataan siswa sebelum memeriksa hasil kelulusan..." required></textarea>
                  </div>
                  <button class="btn btn-dark" :disabled="isSaving">
                    <span v-if="isSaving">Sedang menyimpan</span>
                    <span velse>Simpan</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useHead({
  title: 'Pengaturan / Site Administration',
  meta: [
    {
      name: 'description',
      content: 'Site administration',
    },
  ],
})

const client = useSupabaseClient()
const setting = ref([])
const statusSuccessUpdate = ref(false)
const isSaving = ref(false)

async function getSetting() {
  const { data, error } = await client
    .from('kelulusan_setting')
    .select('*')
    .eq('id', 1)
    .single()
  if (data) {
    setting.value = data
  } else {
    console.error('Error fetching setting:', error)
  }
}

async function updateSetting() {
  isSaving.value = true
  statusSuccessUpdate.value = false
  const { data, error } = await client
    .from('kelulusan_setting')
    .update({
      nomor_surat: setting.value.nomor_surat,
      tgl_penetapan: setting.value.tgl_penetapan,
      tgl_pengumuman: setting.value.tgl_pengumuman,
      waktu_pengumuman: setting.value.waktu_pengumuman,
      nama_sekolah: setting.value.nama_sekolah,
      alamat_sekolah: setting.value.alamat_sekolah,
      pernyataan_siswa: setting.value.pernyataan_siswa,
    })
    .eq('id', 1)
    .select()
  if (data) {
    isSaving.value = false
    statusSuccessUpdate.value = true
  } else {
    isSaving.value = false
    console.error('Error updating setting:', error)
  }
}

onMounted(() => {
  getSetting()
})
</script>

<style scoped>
a.nav-link {
  text-decoration: none !important;
  color: inherit
}
</style>
