<script setup>
import { ref, onMounted } from 'vue'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

//nota: aqui voy a crear una tabla donde me de los medicamentos, con un input de busqueda, el paciente
//al buscar en la tabla, y le de click a una opcion, rellenara el formulario con el id del medicamento y
//el nombre del medicamento

const { supabase } = useSupabase()

const medicamentos = ref([])
/*Unico medicamento a obtener */
const medicine = ref()
const amount = ref()
const uq_id = ref()

/*-------------------------- */

let users = ref([])
const uq_cedula = ref()

const searchName = ref('')

const getLocalStorage = () => {
  users = JSON.parse(localStorage.getItem('usuario'))
}

const getPaciente = async () => {
  users.forEach((e) => {
    uq_cedula.value = e.cedula
  })
}

const getMedicamentos = async () => {
  const { data } = await supabase.from('medicamentos').select()
  medicamentos.value = data
}

const obtenerMedicamento = async (id) => {
  const { data } = await supabase.from('medicamentos').select().eq('id', id)
  data.forEach((e) => {
    uq_id.value = e.id
    medicine.value = e.nombre
  })
}

const crearSolicitud = async () => {
  if (!medicine.value || !amount.value) {
    return Swal.fire({
      title: 'Error',
      text: 'Seleccione un medicamento y la cantidad',
      icon: 'error',
    })
  }
  try {
    const send = {
      cedula: uq_cedula.value,
      medicamento: medicine.value,
      id_medicamento: uq_id.value,
      cantidad: amount.value,
    }
    const { error } = await supabase.from('solicitudes').upsert(send)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Solicitud creada',
      html: 'Presiona <i class="bi bi-arrow-clockwise"></i> para recargar',
      icon: 'success',
    })
  }
}

const searchMedicine = async () => {
  if (typeof searchName.value === 'string' && searchName.value.length === 0) {
    getMedicamentos()
  } else {
    const wordOne = searchName.value.trim().split(' ').at(0)
    const wordTwo = searchName.value.trim().split(' ').at(1)
    const { data } = await supabase
      .from('medicamentos')
      .select()
      .or(`nombre.ilike.%${wordOne}%, laboratorio.ilike.%${wordTwo}%`)

    medicamentos.value = data
  }
}

onMounted(() => {
  getMedicamentos()
  getLocalStorage()
  getPaciente()
})
</script>

<template>
  <div>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#regSolicModal"
    >
      <i class="bi bi-file-earmark-plus"></i> Solicitar Medicamento
    </button>
  </div>
  <div
    class="modal fade"
    tabindex="-1"
    id="regSolicModal"
    aria-labelledby="regSolicModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="regSolicModalLabel">Crear Solicitud</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <section class="row justify-content-center">
            <div class="col-lg-12">
              <form @submit.prevent="createRequest" autocomplete="off">
                <div class="row mb-4">
                  <div class="col-sm-6 col-lg-4">
                    <div>
                      <label class="form-label" for="medicine"
                        >Nombre del Medicamento</label
                      >
                      <input
                        type="text"
                        id="medicine"
                        class="form-control"
                        v-model="medicine"
                        disabled
                      />
                    </div>
                    <div class="row mb-4">
                      <div class="col-6">
                        <div>
                          <label class="form-label" for="amount"
                            >Cantidad</label
                          >
                          <input
                            type="number"
                            id="amount"
                            class="form-control"
                            v-model="amount"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-group mb-1">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Buscar"
                        v-model="searchName"
                      />
                      <button class="btn btn-primary" @click="searchMedicine">
                        <i class="bi bi-search"></i>
                      </button>
                    </div>
                    <div
                      class="table table-responsive overflow-auto"
                      style="height: 250px"
                    >
                      <table class="table table-sm table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Medicamento</th>
                            <th>Laboratorio</th>
                            <th>Cantidad</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody
                          v-for="medicamento in medicamentos"
                          :key="medicamento.id"
                        >
                          <tr>
                            <th>{{ medicamento.id }}</th>
                            <td>{{ medicamento.nombre }}</td>
                            <td>{{ medicamento.laboratorio }}</td>
                            <td>{{ medicamento.stock }}</td>
                            <td>
                              <div>
                                <button
                                  class="btn btn-primary"
                                  @click="obtenerMedicamento(medicamento.id)"
                                >
                                  <i class="bi bi-plus"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="crearSolicitud">
            Solicitar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
