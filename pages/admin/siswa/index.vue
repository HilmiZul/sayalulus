<template>
  <div>
    <div class="card bg-shadow border-0">
      <div class="card-header">
        <span class="float-end">
          <button class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#update-record"><i class="bi bi-upload"></i> Update</button>
        </span>
        <h3><i class="bi bi-people"></i> Siswa</h3>

        <div class="modal" id="update-record">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                Update data saat ini
                <button class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body small">
                <div class="alert alert-info">
                  <ul class="m-0 px-3">
                    <li>Update ini akan menimpa yang lama (saat ini)</li>
                    <li>Isi data kelulusan dengan format <nuxt-link to="https://docs.google.com/spreadsheets/d/1NEi2EOG5UXJtqd7x6PWKYiYKGcw2b7hGcRYZpr1F6Ac/edit?usp=sharing" target="_blank">disini</nuxt-link></li>
                    <li>Download sebagai file <code>.csv</code></li>
                    <li>Upload file tersebut pada form dibawah</li>
                    <li>Tunggu hingga proses update berhasil tersimpan!</li>
                  </ul>
                </div>

                <div class="mb-3">
                  <label for="file">Pilih file <code>.csv</code></label>
                  <input @change="getFile" id="file" type="file" accept=".csv" class="form form-control">
                </div>
                
                <div v-if="isLoading" class="mb-3 text-muted fs-italic">
                  <div class="strong">Bentar, sedang menyimpan...</div>
                </div>
                <div v-if="isError" class="mb-3 text-muted">
                  <div class="strong">Error: Periksa kembali berkas.</div>
                </div>
                <div v-if="isUploadSuccess" class="mb-3 text-dark fw-bold">
                  <div class="strong">Berhasil tersimpan!</div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-dark btn-sm" data-bs-dismiss="modal">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div v-if="countNotPassed > 0" class="alert alert-warning">
          Ada {{ countNotPassed }} Siswa tidak lulus!
        </div>

        <div v-if="isLoading" class="text-muted my-3">
          <span class="spinner-border spinner-border-sm me-1"></span>
          Sedang memuat
        </div>

        <div v-else class="table-responsive">
          <div class="mb-3 quicksand small">
            Filter Jurusan:
              <select @change="filterBy" v-model="opsiFilterJurusan" class="form-control-sm form-control-select" name="filter-jurusan" id="filter-jurusan">
                <option value="">Semua</option>
                <option value="Teknik Sepeda Motor">TSM</option>
                <option value="Rekayasa Perangkat Lunak">RPL</option>
                <option value="Teknik Komputer dan Jaringan">TKJ</option>
                <option value="Desain Komunikasi Visual">DKV</option>
                <option value="Teknik Otomasi Industri">TOI</option>
              </select>
              <!--<button @click="filterBy('')" type="button" class="btn btn-light">All.</button>
              <button @click="filterBy('Teknik Sepeda Motor')" type="button" class="btn btn-light">TSM</button>
              <button @click="filterBy('Rekayasa Perangkat Lunak')" type="button" class="btn btn-light">RPL</button>
              <button @click="filterBy('Teknik Komputer dan Jaringan')" type="button" class="btn btn-light">TKJ</button>
              <button @click="filterBy('Desain Komunikasi Visual')" type="button" class="btn btn-light">DKV</button>
              <button @click="filterBy('Teknik Otomasi Industri')" type="button" class="btn btn-light">TOI</button>
              -->
            <div class="my-2 "><i class="bi bi-people"></i> {{ students.length }}</div>
          </div>

          <table class="table table-hover small quicksand">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th width="70%">Nama</th>
                <th>TTD Pernyataan</th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="isEmptyRecord">
                <td colspan="3" class="text-center text-muted">Tidak tersedia</td>
              </tr>
              
              <tr v-else v-for="(student, i) in students" :key="i" class="p-0">
                <td><div class="border border-dark p-1 text-center rounded-2 small">{{ i+1 }}</div></td>
                <td>
                  <a title="Preview & Change status TTD" data-bs-toggle="modal" data-bs-target="#preview-siswa" @click="setStudentID(student.id, student)" href="#" class="text-decoration-none">
                    <div v-if="student.keterangan == 'LULUS'">{{ student.nama }}</div> 
                    <div v-else class="text-danger">{{ student.nama }}</div>
                    <span class="text-muted">{{ student.kelas }}</span>
                  </a>
                </td>
                <td>
                  <span v-if="student.status == 1" class="badge bg-success">sudah</span>
                  <span v-else class="badge bg-danger">belum</span>
                </td>
              </tr>
            </tbody>

          </table>

          <div class="modal" id="preview-siswa">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header fs-6">{{ previewStudent?.nama }} <span class="text-muted small">{{ previewStudent?.kelas }}</span></div>
                <div class="modal-body fs-6">
                    <div v-if="msgSuccessUpdateStatus" class="alert alert-success">Berhasil diperbaharui.</div>
                    <div class="text-muted">NIS</div>
                    <span class="fw-bold">{{ previewStudent?.nis }}</span>

                    <div class="mt-2 text-muted">Password</div>
                    <span class="fw-bold">{{ previewStudent?.password }}</span>

                    <div class="mt-2 text-muted">Keterangan</div>
                    <span class="fw-bold">{{ previewStudent?.keterangan }}</span>

                    <div class="mt-2 text-muted">TTD. Pernyataan</div>
                    <span class="fw-bold">{{ previewStudent?.status == 1 ? '✅ Sudah Tandatangan' : '❌ Belum Tandatangan' }}</span>

                    <hr />

                    <div class="alert alert-info small"><i class="bi bi-info-circle-fill"></i> Tutup jika tidak ada perubahan Status.</div>
                    <select v-model="newStatusTTD" class="form-control form-control-sm form-select my-2" required>
                      <option disable value="">&#8212;Ubah Status&#8212;</option>
                      <option value="1">✅ Sudah tandatangan</option>
                      <option value="0">❌ Belum tandatangan</option>
                    </select>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-dark" data-bs-dismiss="modal" @click="updateStatusTTD" :disabled="newStatusTTD.length < 1">Simpan</button>
                  <button class="btn" data-bs-dismiss="modal">Tutup</button>
                </div>
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
  title: 'Siswa / Site Administration',
  meta: [
    {
      name: 'description',
      content: 'Site administration',
    },
  ],
})
const client = useSupabaseClient()
const students = ref([])
const newStatusTTD = ref('')
const studentID = ref('')
const msgSuccessUpdateStatus = ref(false)
const countNotPassed = ref(0)
const isLoading = ref(false)
const isError = ref(false)
const isUploadSuccess = ref(false)
const isEmptyRecord = ref(false)
const previewStudent = ref()
const opsiFilterJurusan = ref('')

async function getStudents() {
  isLoading.value = true
  const { data, error } = await client
    .from('kelulusan_siswa')
    .select('*')
    .order('status, id, keterangan', { ascending: true })
  if (data) {
    students.value = data
    students.value.forEach(item => {
      if(item.keterangan == "TIDAK LULUS") countNotPassed.value++ 
    });
    isLoading.value = false
    if(students.value.length < 1) {
      isEmptyRecord.value = true
    }
  }
  else console.error(error)
}

async function filterBy() {
  isEmptyRecord.value = false
  if(opsiFilterJurusan.value) {
    const { data, error } = await client
      .from('kelulusan_siswa')
      .select('*')
      .eq('kompetensi', opsiFilterJurusan.value)
      .order('status', { ascending: true })
    if(data) {
      students.value = data
      if(students.value.length < 1) {
        isEmptyRecord.value = true
      }
    }
    else console.error(error)
  } else {
    const { data, error } = await client
      .from('kelulusan_siswa')
      .select('*')
      .order('status', { ascending: true })
    if(data) {
      students.value = data
      if(students.value.length < 1) {
        isEmptyRecord.value = true
      }
    }
    else console.error(error)
  }
}

function setStudentID(id, student) {
  msgSuccessUpdateStatus.value = false
  studentID.value = id
  previewStudent.value = student
}

async function updateStatusTTD() {
  const { data, error } = await client
    .from('kelulusan_siswa')
    .update({ status: newStatusTTD.value })
    .eq('id', studentID.value)
    .select()
  if(data) {
    msgSuccessUpdateStatus.value = true
    newStatusTTD.value = ''
    await getStudents()
  } else {
    console.error(error)
  }
}

async function getFile(e) {
  isLoading.value = true
  isError.value = false
  isUploadSuccess.value = false

  let file = e.target.files.item(0)
  let csv = await file.text()
  let normalisasi = csv.replace(/\r\n?/g, '\n')
  const lines = normalisasi.trim().split('\n')
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    // client.autoCancellation(false)
    // let data = await client
    //   .collection('iduka')
    //   .create(obj)
    result.push(obj);
  }
  
  let { error } = await client.from('kelulusan_siswa').delete().neq('id', -999)
  if(!error) {
    let { error } = await client.from('kelulusan_siswa').insert(result)
    if(!error) {
      students.value = []
      result.forEach(item => {
        students.value.push(item)
      })
      isLoading.value = false
      isError.value = false
      isUploadSuccess.value = true
    } else {
      isError.value = true
      isLoading.value = false
      isUploadSuccess.value = false
      console.error(error)
    }
  }
  else {
    isUploadSuccess.value = true
    isLoading.value = false
    isError.value = false
  }
}

onMounted(() => {
  getStudents()
})
</script>


<style scoped>
table.table thead tr th,
table.table tbody tr td {
  border-top: none !important;
  border-top: 1px solid #ddd;
  padding: 0.5rem !important;
}

button:focus {
  color:#fff !important;
  background-color: #7a7a7a !important;
}
</style>
