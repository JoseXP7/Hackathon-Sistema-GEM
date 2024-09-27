<script setup>
import { onMounted, ref } from 'vue'
import { useSupabase } from '../clients/supabase'
const { supabase } = useSupabase()
const pacientes = ref([])

const searchName = ref('')

async function getPacientes() {
  const { data } = await supabase.from('pacientes').select()
  pacientes.value = data
}

const searchPaciente = async () => {
  if (typeof searchName.value === 'string' && searchName.value.length === 0) {
    getPacientes()
  } else {
    const wordOne = searchName.value
    const { data } = await supabase
      .from('pacientes')
      .select()
      .eq('cedula', wordOne)

    pacientes.value = data
  }
}

const historiales = ref([])

const historyPaciente = async (ci) => {
  const { data } = await supabase.from('historiales').select().eq('cedula', ci)
  historiales.value = data

  console.log(historiales.value)
}

onMounted(() => {
  getPacientes()
})
</script>
<template>
  <div class="container">
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Pacientes</h1>
      <div class="ms-1">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Ingrese una cedula"
            v-model="searchName"
          />
          <button class="btn btn-primary" @click="searchPaciente">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </section>
    <section>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>C.I</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Club</th>
            <th>Opción</th>
          </tr>
        </thead>
        <tbody v-for="paciente in pacientes" :key="paciente.cedula">
          <tr>
            <th>{{ paciente.cedula }}</th>
            <td>{{ paciente.nombres }}</td>
            <td>{{ paciente.apellidos }}</td>
            <td>{{ paciente.edad }}</td>
            <td>{{ paciente.telefono }}</td>
            <td>{{ paciente.direccion }}</td>
            <td>{{ paciente.club }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  class="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#historyModal"
                  @click="historyPaciente(paciente.cedula)"
                >
                  <i class="bi bi-clipboard2-pulse"></i>
                  Historial
                </button>
                <button class="btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
  <div
    class="modal fade"
    tabindex="-1"
    id="historyModal"
    aria-labelledby="historyModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="historyModalLabel">
            Historial del Paciente
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <section class="row justify-content-center">
            <h3>Historial</h3>
            <div class="col">
              <ul v-for="historial in historiales" :key="historial.cedula">
                <li>Cedula del Paciente: {{ historial.cedula }}</li>
                <li>Nombre del Médico: {{ historial.nombre_medico }}</li>
                <li>Teléfono del Médico: {{ historial.tel_medico }}</li>
                <li>Descripción: {{ historial.descripcion }}</li>
              </ul>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
