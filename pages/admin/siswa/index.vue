<template>
  <div>
    <div class="card bg-shadow border-0">
      <div class="card-header">
        <h3><i class="bi bi-people"></i> Siswa</h3>
      </div>
      <div class="card-body">
        <div v-if="students.length < 1" class="text-center text-muted my-3">
          <span class="spinner-border spinner-border-sm me-1"></span>
          Sedang memuat
        </div>
        <div v-else class="table-responsive">
          <div class="mb-3 quicksand small">
            Filter by:
            <div class="btn-group btn-group-sm" role="group" aria-label="Filter">
              <button @click="getStudents" type="button" class="btn btn-light">All.</button>
              <button @click="filterBy('Teknik dan Bisnis Sepeda Motor')" type="button" class="btn btn-light">TSM</button>
              <button @click="filterBy('Rekayasa Perangkat Lunak')" type="button" class="btn btn-light">PPLG</button>
              <button @click="filterBy('Teknik Komputer dan Jaringan')" type="button" class="btn btn-light">TJKT</button>
              <button @click="filterBy('Desain Komunikasi Visual')" type="button" class="btn btn-light">DKV</button>
              <button @click="filterBy('Teknik Otomasi Industri')" type="button" class="btn btn-light">TOI</button>
            </div>
            <div class="my-2 "><i class="bi bi-people"></i> {{ students.length }}</div>
          </div>
          <table class="table table-hover small quicksand">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>TTD Pernyataan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, i) in students" :key="i" class="p-0">
                <td>{{ i+1 }}.</td>
                <td>
                  <a title="Change status TTD" data-bs-toggle="modal" :data-bs-target="`#changeStatus-${student.id}`" @click="setStudentID(student.id)" href="#" class="border-1 border-bottom border-dark pb-1 text-decoration-none">
                    {{ student.nama }}
                  </a>
                  <div class="modal fade" :id="`changeStatus-${student.id}`">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header fs-6">{{ student.nama }} <span class="text-muted small">{{ student.kelas }}</span></div>
                        <div class="modal-body fs-6">
                          <div v-if="msgSuccessUpdateStatus" class="alert alert-success">Berhasil diperbaharui.</div>
                          NIS: {{ student.nis }} <br>
                          Password: {{ student.password }} <br>
                          Keterangan: {{ student.keterangan }} <br>
                          TTD. Pernyataan: {{ student.status == 1 ? '✅ Sudah Tandatangan' : '❌ Belum Tandatangan' }}
                          <hr />
                          <div class="alert alert-info small"><i class="bi bi-info-circle-fill"></i> Tutup jika tidak ada pembaharuan Status TTD pernyataan.</div>
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
                </td>
                <td>{{ student.kelas }}</td>
                <td>
                  <span v-if="student.status == 1" class="badge bg-success">sudah</span>
                  <span v-else class="badge bg-danger">belum</span>
                </td>
              </tr>
            </tbody>
          </table>
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
  title: 'Kelulusan / Site Administration',
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

async function getStudents() {
  const { data, error } = await client
    .from('kelulusan2024')
    .select('*')
    .order('status, id', { ascending: true })
  if (data) students.value = data
  else console.error(error)
}

async function filterBy(kompetensi) {
  const { data, error } = await client
    .from('kelulusan2024')
    .select('*')
    .eq('kompetensi', kompetensi)
    .order('status', { ascending: true })
  if(data) students.value = data
  else console.error(error)
}

function setStudentID(id) {
  msgSuccessUpdateStatus.value = false
  studentID.value = id
}

async function updateStatusTTD() {
  const { data, error } = await client
    .from('kelulusan2024')
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
