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
                <button class="btn btn-info">
                  <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-warning">
                  <i class="bi bi-pencil-square"></i>
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
</template>
<style scoped></style>
