<template>
  <div>
    <div class="card bg-shadow border-0">
      <div class="card-header">
        <h3><i class="bi bi-graph-up-arrow"></i> Statistik</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <div v-if="statusTTD.length > 0" class="alert alert-warning">
              Ada {{ statusTTD.length }} siswa belum menandatangani surat pernyataan.
              <nuxt-link to="#" class="link" data-bs-toggle="modal" data-bs-target="#unsign">Lihat</nuxt-link>
              <div class="modal fade" id="unsign">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header fs-4 text-dark">Belum tandatangan surat pernyataan</div>
                    <div class="modal-body">
                      <table class="table table-hover quicksand small">
                        <tbody>
                          <tr v-for="(s, i) in statusTTD" :key="i">
                            <td width="5%">{{ i+1 }}.</td>
                            <td>{{ s.nama }}</td>
                            <td>{{ s.kelas }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-dark" data-bs-dismiss="modal">Tutup</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-6">
            <div class="card p-2">
              <h3>{{ students }}</h3>
              siswa
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <div class="card p-2 bg-danger text-white">
              <h3>{{ tsm }}</h3>
              TO
            </div>
          </div>
          <div class="col">
            <div class="card p-2 bg-success text-white">
              <h3>{{ pplg }}</h3>
              PPLG
            </div>
          </div>
          <div class="col">
            <div class="card p-2 bg-info text-white">
              <h3>{{ tjkt }}</h3>
              TJKT
            </div>
          </div>
          <div class="col">
            <div class="card p-2 bg-warning text-white">
              <h3>{{ dkv }}</h3>
              DKV
            </div>
          </div>
          <div class="col">
            <div class="card p-2 bg-secondary text-white">
              <h3>{{ toi }}</h3>
              TE
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
  title: 'Kelulusan / Site Administration',
  meta: [
    {
      name: 'description',
      content: 'Site administration',
    },
  ],
})

const client = useSupabaseClient()
const students = ref(0)
const pplg = ref(0)
const tsm = ref(0)
const dkv = ref(0)
const tjkt = ref(0)
const toi = ref(0)
const statusTTD = ref(0)

async function getStatusTTD() {
  const { data, error } = await client
    .from('kelulusan_siswa')
    .select('*')
    .eq('status', 0)
  if(data) statusTTD.value = data
}

async function getStudents() {
  const { data, error } = await client.from('kelulusan_siswa').select('*')
  if (error) console.error(error)
  else students.value = data.length
}

async function getPPLG() {
  const { data, error } = await client.from('kelulusan_siswa').select('*')
    .eq('kompetensi', 'Rekayasa Perangkat Lunak')
  if (error) console.error(error)
  else pplg.value = data.length
}

async function getTJKT() {
  const { data, error } = await client.from('kelulusan_siswa').select('*')
    .eq('kompetensi', 'Teknik Komputer dan Jaringan')
  if (error) console.error(error)
  else tjkt.value = data.length
}

async function getTSM() {
  const { data, error } = await client.from('kelulusan_siswa').select('*')
    .eq('kompetensi', 'Teknik Sepeda Motor')
  if (error) console.error(error)
  else tsm.value = data.length
}

async function getDKV() {
  const { data, error } = await client.from('kelulusan_siswa').select('*')
    .eq('kompetensi', 'Desain Komunikasi Visual')
  if (error) console.error(error)
  else dkv.value = data.length
}

async function getTOI() {
  const { data, error } = await client.from('kelulusan_siswa').select('*')
    .eq('kompetensi', 'Teknik Otomasi Industri')
  if (error) console.error(error)
  else toi.value = data.length
}

onMounted(() => {
  getStudents()
  getPPLG()
  getTJKT()
  getTSM()
  getDKV()
  getTOI()
  getStatusTTD()
})
</script>


<style scoped>
table.table tbody tr td {
  border-top: none !important;
  border-top: 1px solid #ddd;
}
</style>
