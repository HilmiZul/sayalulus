<template>
  <div>
    <div v-if="!isResult">
      <div class="col-md-6 mx-auto mb-5">
        <div class="text-center fs-3 prototype mb-4" >
          Pengumuman Kelulusan
          <div class="fs-4">{{ setting?.nama_sekolah }}</div>
          <div class="fs-5 quicksand text-dark">{{ tahun-1 }}/{{ tahun }}</div>
        </div>
        <div class="card bg-shadow border-0">
          <div v-if="checking" class="card-body text-center"><em>Sedang Memeriksa...</em></div>
          <div v-else class="card-body">
            <!-- <form @submit.prevent="onPeriksa"> -->
              <div class="input-group my-3">
                <input v-model="NIS" type="text" class="form-control form-control-lg" placeholder="NIS" autofocus required :disabled="checking" />
              </div>
              <div class="input-group my-3">
                <input v-model="tgl_lahir" type="password" class="form-control form-control-lg" placeholder="PIN" required :disabled="checking" />
              </div>
              <div v-if="mismatch" class="alert alert-danger small">
                <ul>
                  <li>Periksa dengan teliti NIS/PIN. </li>
                  <li>Jika data Anda tidak ditemukan, silahkan temui pihak Sekolah pada hari dan jam kerja.</li>
                </ul>
              </div>
              <div v-if="timeNotTheSame" class="alert alert-danger small">
                Waktu Anda tidak sama dengan Server. Pastikan waktu Anda otomatis dan tidak diubah.
              </div>
              <button :disabled="NIS.length < 9 || tgl_lahir.length < 8" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SuratPernyataan">
                KIRIM
              </button>
              <div class="modal fade" id="SuratPernyataan" tabindex="-1">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header"><h3 class="quicksand">Saya Menyatakan</h3></div>
                    <div class="modal-body">
                      <MDC v-if="md_text_pernyataan_siswa" :value="md_text_pernyataan_siswa" tag="article" />
                      <hr/>
                      <div class="my-2 form-check">
                        <label for="ceklisPernyataan" class="form-check-label ms-2 me-2">
                          Ya, Saya setuju dengan Pernyataan diatas.
                        </label>
                        <input v-model="isAgree" class="form-check-input" id="ceklisPernyataan" type="checkbox"/>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        class="btn btn-primary"
                        @click="onPeriksa"
                        :disabled="!isAgree"
                        data-bs-dismiss="modal"
                      >Ya Setuju</button>
                      <button class="btn btn-outline-primary" data-bs-dismiss="modal">Tidak</button>
                    </div>
                  </div>
                </div>
              </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="isResult">
      <!-- tampilkan hasil kelulusan apabila NIS dan password sesuai dan status bernilai 1.
            nilai 1 mengartikan peserta didik telah menandatangani surat pernyataan. -->
      <div class="position-relative">
        <div v-confetti v-if="isConfetti" class="position-absolute top-0 start-50 translate-middle-x"></div>
      </div>
      <div class="my-3 mt-2 px-2 text-center bg-white p-2 alert p-4">
        <div class="fs-6">
          Berdasarkan Surat Keputusan Kepala SMKN 4 Tasikmalaya
          Nomor : {{ setting.nomor_surat }} dan Keputusan hasil Rapat
          Kelulusan Dewan Guru SMKN 4 Tasikmalaya tanggal {{ setting.tgl_penetapan }},
          bahwa:
        </div>
        <div class="text-center">
          <div class="display-6 mt-3 fw-bold prototype">{{ result.nama }}</div>
          <div class="fs-6 text-grey">{{ result.ttl }}</div>
          <div class="fs-6 text-grey">{{ result.kelas }}</div>
          <div class="fs-6 mb-3 text-grey">{{ result.kompetensi}}</div>
          <span class="fs-6">dinyatakan <span @click="moreConfetti" class="keterangan"><em>"{{ result.keterangan }}"</em></span></span>
          <p class="fs-6">
            Dari satuan Pendidikan SMKN 4 Tasikmalaya Tahun Pelajaran
            {{ tahun-1 }}/{{ tahun }}.
          </p>
        </div>
      </div>
      <div class="my-3 pt-2 m-2 text-center">
        <button class="btn btn-dark" @click="reset">kembali</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vConfetti } from '@neoconfetti/vue';
const client = useSupabaseClient();
const mismatch = ref(false);
const NIS = ref("");
const tgl_lahir = ref("");
const tahun = new Date().getFullYear()
const result = ref([]);
const isResult = ref(false);
const checking = ref(false)
const isConfetti = ref(false)
const isAgree = ref(false)
const timeNotTheSame = ref(false)
const setting = ref([])
const bulan = ref([
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
])
const md_text_pernyataan_siswa = ref()

const onPeriksa = async () => {
  // ambil waktu dari server dunia berdasarkan zona wilayah.
  // untuk menghindari mengganti waktu lokal komputer.
  let timeApi = `https://time.now/developer/api/timezone/Asia/Jakarta`
  let isClientServerTimeAreSame = false
  await fetch(timeApi)
    .then(res => res.json())
    .then(d => {
      let dateServer = new Date(d.utc_datetime)
      let option = {
        dateStyle: "full",
        timeStyle: "short"
      }
      let formatedServer = new Intl.DateTimeFormat('id-ID', option).format(dateServer)
      let dateClient = new Date() 
      let formatClient = new Intl.DateTimeFormat('id-ID', option).format(dateClient)
      if(formatClient >= formatedServer) isClientServerTimeAreSame = true
      else isClientServerTimeAreSame = false
    })

  if(isClientServerTimeAreSame) {
    mismatch.value = false
    checking.value = true
    timeNotTheSame.value = false

    const { data, error } = await client
      .from("kelulusan_siswa")
      .select('*')
      .eq("status", 1)
      .match({ nis: NIS.value, password: tgl_lahir.value })
      .single()
    if (data) {
      await getSetting()
      result.value = data
      isResult.value = true
      checking.value = false
      isConfetti.value = true
    }
    if(error) {
      mismatch.value = true
      checking.value = false
      isAgree.value = false
    }
  } else {
    timeNotTheSame.value = true
  }
}

const reset = () => {
  isResult.value = false
  result.value = []
  NIS.value = ""
  tgl_lahir.value = ""
  mismatch.value = false
  checking.value = false
  isConfetti.value = false
  isAgree.value = false
}

const moreConfetti = async () => {
  isConfetti.value = false
  await Promise.resolve()
  isConfetti.value = true
}

const getSetting = async () => {
  const { data, error } = await client
    .from('kelulusan_setting')
    .select('*')
    .eq('id', 1)
    .single()
  if (data) {
    setting.value = data
    const date = new Date(data.tgl_penetapan)
    const dd = date.getDate()
    const mm = date.getMonth()
    const yyyy = date.getFullYear()
    setting.value.tgl_penetapan = `${dd} ${bulan.value[mm]} ${yyyy}`
    md_text_pernyataan_siswa.value = data.pernyataan_siswa
  } else {
    console.error('Error fetching setting:', error)
  }
}

onMounted(() => {
  getSetting()
})
</script>
