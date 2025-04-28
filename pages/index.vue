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
          <div v-if="checking" class="card-body text-center"><em>Sedang Memeriksa...</em></div>
          <div v-else class="card-body">
            <!-- <form @submit.prevent="onPeriksa"> -->
              <div class="input-group my-3">
                <input v-model="NIS" type="text" class="form-control form-control-lg" placeholder="NIS" autofocus required :disabled="checking" />
              </div>
              <div class="input-group my-3">
                <input v-model="tgl_lahir" type="password" class="form-control form-control-lg" placeholder="PASSWORD" required :disabled="checking" />
              </div>
              <div v-if="mismatch" class="alert alert-danger"><i class="bi bi-exclamation-triangle"></i> NIS dan Password tidak cocok!</div>
              <button :disabled="NIS.length < 9 || tgl_lahir.length < 8" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SuratPernyataan">
                KIRIM
              </button>
              <div class="modal fade" id="SuratPernyataan">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header"><h3>Saya Menyatakan</h3></div>
                    <div class="modal-body">
                      <MDC :value="md_text_pernyataan" tag="article" />
                      <hr/>
                      <div class="my-2">
                        <label for="ceklisPernyataan" class="ms-2 me-2">
                          <input v-model="isAgree" class="form-input checkbox" id="ceklisPernyataan" type="checkbox"/>
                          <strong>Ya, Saya setuju dengan Pernyataan diatas.</strong>
                        </label>
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
              <!-- <button class="btn btn-primary" :disabled="checking">
                <span v-if="!checking">PERIKSA</span>
                <span v-else><em>SEDANG MEMERIKSA...</em></span>
              </button> -->
            <!-- </form> -->
          </div>
        </div>
      </div>
      <!-- <div class="col-md-6 mx-auto p-4 my-5 bg-yellow bg-shadow alert alert-warning">
        <div class="container-fluid">
          <h1 class="fs-3 fw-bold">PERINGATAN TEGAS!</h1>
          <div class="fs-5 text-grey">
            <Peringatan />
          </div>
        </div>
      </div> -->
    </div>
    <div v-if="isResult">
      <div class="position-relative">
        <div v-confetti v-if="isConfetti" class="position-absolute top-0 start-50 translate-middle-x"></div>
      </div>
      <div class="my-3 mt-2 px-2 text-center bg-white p-2 alert p-4">
        <div class="fs-6">
          Berdasarkan Surat Keputusan Kepala SMK Negeri 4 Tasikmalaya
          Nomor : -/-/SMKN.4-Cabdin Wil. XII dan Keputusan hasil Rapat
          Kelulusan Dewan Guru SMK Negeri 4 Tasikmalaya tanggal 2 Mei 2025,
          bahwa:
        </div>
        <div class="text-center">
          <div class="display-6 mt-3 fw-bold prototype">{{ result.nama }}</div>
          <div class="fs-6 text-grey">{{ result.ttl }}</div>
          <div class="fs-6 text-grey">{{ result.kelas }}</div>
          <div class="fs-6 mb-3 text-grey">{{ result.kompetensi}}</div>
          <span class="fs-6">dinyatakan <span @click="moreConfetti" class="keterangan"><em>"{{ result.keterangan }}"</em></span></span>
          <p class="fs-6">
            Dari satuan Pendidikan SMK Negeri 4 Tasikmalaya Tahun Pelajaran
            {{ tahun-1 }}/{{ tahun }}.
          </p>
        </div>
      </div>
      <div class="my-3 pt-2 m-2 text-center">
        <!-- <div class="alert alert-warning">
          Catatan: <em>screenshot</em> halaman ini untuk pengambilan SKL (Surat
          Keterangan Lulus)
        </div>
        <div class="alert alert-danger">
          <Peringatan />
        </div> -->
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
const isConfetti = ref(false)
const isAgree = ref(false)
const md_text_pernyataan = `
Saya adalah merupakan Calon Lulusan SMK Negeri 4 Tasikmalaya Tahun Pelajaran 2024/2025, dalam rangka menghadapi kelulusan, dengan ini saya menyatakan:
1. Tidak akan melakukan euphoria yang berlebihan dan tindak negatif dalam merayakan kelulusan dari SMK Negeri 4 Tasikmalaya, seperti:

    a. Curat-coret pada pakaian seragam sekolah atau media/fasilitas lainnya;

    b. Konvoi/iring-iringan dengan kendaraan bermotor dan mengganggu ketertiban umum, atau;

    c. Tindakan kriminal lainnya baik yang merugikan diri sendiri maupun orang lain.

2. Tidak akan mengadakan kegiatan/acara perpisahan baik pada lingkup kelas, program keahlian, sekolah, atau antar sekolah dalam bentuk apapun.

3. Tidak akan melakukan atau terlibat dalam tindakan yang melanggar norma dan/atau aturan yang berlaku di masyarakat.

4. Pihak SMK Negeri 4 Tasikmalaya secara institusi terlepas dari kewajiban dan tanggung jawab, apabila Saya bermasalah secara hukum melanggar peraturan atau ketentuan di masyarakat serta perundang-udangan yang berlaku.

Demikian pernyataan ini dibuat dengan sesungguhnya dalam keadaan sadar dan tanpa ada paksaan dari pihak manapun, serta Saya siap bertanggung jawab sepenuhnya menanggung segala konsekuensi yang terjadi akibat dari dibuatnya pernyataan ini.
`

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
    isConfetti.value = true
  }
  if(error) {
    mismatch.value = true
    checking.value = false
    isAgree.value = false
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
</script>
