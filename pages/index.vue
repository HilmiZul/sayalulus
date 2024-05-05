<template>
  <div>
    <div v-if="!isResult">
      <div class="col-md-6 mx-auto mb-5">
        <div class="text-center fs-3 prototype my-4" >
          Pengumuman Kelulusan 
          <div class="fs-4">SMKN 4 Tasikmalaya</div>
          <div class="fs-5 quicksand text-dark">{{ tahun-1 }}/{{ tahun }}</div>
        </div>

        <div class="card bg-shadow"  >
          <div class="card-body">
            <form @submit.prevent="onPeriksa">
              <div class="input-group my-3">
                <input v-model="NIS" type="text" class="form-control form-control-lg" placeholder="NIS" autofocus required :disabled="checking" />
              </div>
              <div class="input-group my-3">
                <input v-model="tgl_lahir" type="password" class="form-control form-control-lg" placeholder="PASSWORD" required :disabled="checking" />
              </div>
              <div v-if="mismatch" class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> NIS dan Password tidak cocok!</div>
              <button class="btn btn-primary" :disabled="checking">
                <span v-if="!checking">PERIKSA</span>
                <span v-else><em>SEDANG MEMERIKSA...</em></span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6 mx-auto p-4 my-5 bg-yellow bg-shadow alert alert-warning">
        <div class="container-fluid">
          <h1 class="fs-3 fw-bold">PERINGATAN TEGAS!</h1>
          <div class="fs-5 text-grey">
            <Peringatan />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isResult">
      <div class="position-relative">
        <div v-confetti class="position-absolute top-0 start-50 translate-middle-x"</div>
      </div>
      <div class="my-3 mt-2 px-2 text-center bg-white p-2 alert p-4">
        <div class="fs-6">
          Berdasarkan Surat Keputusan Kepala SMK Negeri 4 Tasikmalaya Nomor
          Nomor : 420/292.1/SMKN.4-Cabdin Wil. XII dan Keputusan hasil Rapat
          Kelulusan Dewan Guru SMK Negeri 4 Tasikmalaya tanggal 3 Mei 2024,
          bahwa:
        </div>
        <div class="text-center">
          <div class="display-6 mt-3 fw-bold prototype">{{ result.nama }}</div>
          <div class="fs-6 text-grey">{{ result.ttl }}</div>
          <div class="fs-6 text-grey">{{ result.kelas }}</div>
          <div class="fs-6 mb-3 text-grey">{{ result.kompetensi }}</div>
          <span class="fs-6">dinyatakan <strong><em>"{{ result.keterangan }}"</em></strong></span>
          <p class="fs-6">
            Dari satuan Pendidikan SMK Negeri 4 Tasikmalaya Tahun Pelajaran
            {{ tahun-1 }}/{{ tahun }}.
          </p>
        </div>
      </div>
      <hr />
      <div class="my-3 pt-2 m-2 text-center">
        <div class="alert alert-warning">
          Catatan: <em>screenshot</em> halaman ini untuk pengambilan SKL (Surat
          Keterangan Lulus)
        </div>
        <div class="alert alert-danger">
          <Peringatan />
        </div>
        <button class="btn btn-danger" @click="reset">kembali</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vConfetti } from '@neoconfetti/vue';
useHead({ title: "Info Kelulusan SMKN 4 Tasikmalaya" })
const client = useSupabaseClient();
const mismatch = ref(false);
const NIS = ref("");
const tgl_lahir = ref("");
const result = ref([]);
const isResult = ref(false);
const tahun = new Date().getFullYear()
const checking = ref(false)

const onPeriksa = async () => {
  mismatch.value = false
  checking.value = true
  const { data, error } = await client
    .from("kelulusan2024")
    .select('*')
    .match({ nis: NIS.value, password: tgl_lahir.value })
    .single()
  if (data) {
    result.value = data
    isResult.value = true
    checking.value = false
  } 
  if(error) {
    mismatch.value = true
    checking.value = false
  }
}

const reset = () => {
  isResult.value = false
  result.value = []
  NIS.value = ""
  tgl_lahir.value = ""
  mismatch.value = false
  checking.value = false
}
</script>
