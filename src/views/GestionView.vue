<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSupabase } from '../clients/supabase'
const { supabase } = useSupabase()
import Swal from 'sweetalert2'

const solicitudes = ref([])
const pacientes = ref([])
const data_solicitud = ref([])

const state = ref()
const date_pick = ref()

const getSolicitudes = async () => {
  const { data } = await supabase.from('solicitudes').select()
  solicitudes.value = data
}

const getUqPaciente = async (cedula) => {
  const { data } = await supabase
    .from('pacientes')
    .select()
    .eq('cedula', cedula)
  pacientes.value = data

  solicitud_unica(cedula)
}

const solicitud_unica = async (ci) => {
  const { data } = await supabase
    .from('solicitudes')
    .select()
    .eq('cedula', ci)
    .order('id', { ascending: false })
    .limit(1)
  data_solicitud.value = data
}

const updateRequest = async (id) => {
  const send = {
    estado: state.value,
    fecha_retiro: date_pick.value,
  }
  try {
    const { error } = await supabase
      .from('solicitudes')
      .update(send)
      .eq('id', id)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Actualizado!',
      icon: 'success',
    })
    getSolicitudes()
  }
}

const calcSubtract = async (id, cant) => {
  let amount
  const { data } = await supabase
    .from('medicamentos')
    .select('stock')
    .eq('id', id)
    .single()
  amount = data
  let subtract = amount.stock - cant
  let send_id = id
  subtractStock(subtract, send_id)
}

const subtractStock = async (s, id) => {
  const send = {
    stock: s,
  }
  try {
    const { error } = await supabase
      .from('medicamentos')
      .update(send)
      .eq('id', id)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Stock Actualizado!',
      icon: 'success',
    })
  }
}

onMounted(() => {
  getSolicitudes()
})
</script>
<template>
  <div class="container">
    <RouterLink to="/menu" class="btn btn-primary me-3"
      ><i class="bi bi-arrow-left-circle"></i> Regresar</RouterLink
    >
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Solicitudes de Pacientes</h1>
    </section>
    <section>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Cedula</th>
            <th>Medicamento</th>
            <th>ID del Medicamento</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Fecha de retiro</th>
            <th>Ver Solicitud</th>
          </tr>
        </thead>
        <tbody v-for="solicitud in solicitudes" :key="solicitud.id">
          <tr>
            <th>{{ solicitud.id }}</th>
            <td>{{ solicitud.cedula }}</td>
            <td>{{ solicitud.medicamento }}</td>
            <td>{{ solicitud.id_medicamento }}</td>
            <td>{{ solicitud.cantidad }}</td>
            <td>{{ solicitud.estado }}</td>
            <td>{{ solicitud.fecha_retiro }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  class="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#seeInfoRequest"
                  @click="getUqPaciente(solicitud.cedula)"
                >
                  <i class="bi bi-eye"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <!--Modal de la info de la solicitud-->
    <div
      class="modal fade"
      tabindex="-1"
      id="seeInfoRequest"
      aria-labelledby="seeInfoRequestLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="seeInfoRequestLabel">
              Solicitud de Paciente
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <section class="row justify-content-start">
              <div class="col-lg-12">
                <form @submit.prevent="updateRequest">
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div class="row mb-4">
                    <div class="col-6">
                      <ul v-for="paciente in pacientes" :key="paciente.cedula">
                        <li>Nombres: {{ paciente.nombres }}</li>
                        <li>Apellidos: {{ paciente.apellidos }}</li>
                        <li>Edad: {{ paciente.edad }}</li>
                        <li>Telefono: {{ paciente.telefono }}</li>
                        <li>Direccion: {{ paciente.direccion }}</li>
                        <li>Club: {{ paciente.club }}</li>
                      </ul>
                    </div>
                    <div class="col">
                      <h5>Solicitud:</h5>
                      <ul v-for="data in data_solicitud" :key="data.id">
                        <li>Medicamento: {{ data.medicamento }}</li>
                        <li>ID Medicamento: {{ data.id_medicamento }}</li>
                        <li>Cantidad Solicitada: {{ data.cantidad }}</li>
                        <li>
                          <label for="estado" class="form-label">Estado</label>
                          <select
                            id="estado"
                            class="form-select"
                            v-model="state"
                          >
                            <option value="Aprobado">Aprobar</option>
                            <option value="Rechazado">Rechazar</option>
                            <option value="Entregado">Entregar</option>
                          </select>
                        </li>
                        <li>
                          <label for="date_pick" class="form-label"
                            >Fecha para retirar</label
                          >
                          <input
                            type="datetime-local"
                            id="date_pick"
                            class="form-control"
                            v-model="date_pick"
                          />
                        </li>
                        <li>
                          <button
                            type="button"
                            class="btn btn-success mt-2"
                            @click="updateRequest(data.id)"
                          >
                            Aceptar
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            class="btn btn-secondary mt-2"
                            @click="
                              calcSubtract(data.id_medicamento, data.cantidad)
                            "
                          >
                            Restar del Stock
                          </button>
                        </li>
                      </ul>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
ul li {
  list-style: none;
}
</style>
