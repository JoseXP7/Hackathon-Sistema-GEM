<script setup>
import crearSolicitud from '@/components/crearSolicitud.vue'
import rellenarHistorial from '@/components/rellenarHistorial.vue'
import { onMounted, ref } from 'vue'
import { useSupabase } from '../clients/supabase'
const { supabase } = useSupabase()

const solicitudes = ref([])
const pacientes = ref([])

let users = ref([])

const getLocalStorage = () => {
  users = JSON.parse(localStorage.getItem('usuario'))
}

const getPaciente = async () => {
  let uq_cedula
  users.forEach((e) => {
    uq_cedula = e.cedula
  })
  const { data } = await supabase
    .from('pacientes')
    .select()
    .eq('cedula', uq_cedula)
  pacientes.value = data
}

const getSolicitudes = async () => {
  let uq_cedula
  users.forEach((e) => {
    uq_cedula = e.cedula
  })
  const { data } = await supabase
    .from('solicitudes')
    .select()
    .eq('cedula', uq_cedula)
  solicitudes.value = data
}

onMounted(() => {
  getLocalStorage()
  getPaciente()
  getSolicitudes()
})
</script>

<template>
  <div class="container">
    <section v-for="paciente in pacientes" :key="paciente.cedula">
      <h3>Bienvenido {{ paciente.nombres }} {{ paciente.apellidos }}!</h3>
    </section>
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Solicitudes</h1>
      <div class="d-flex align-items-center flex-column">
        <div class="mb-1">
          <rellenarHistorial />
        </div>
        <crearSolicitud />
        <div class="mt-1 mb-1">
          <button class="btn btn-primary" @click="getSolicitudes">
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="table-responsive">
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>C.I</th>
            <th>Medicamento</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Fecha de Retiro</th>
          </tr>
        </thead>
        <tbody v-for="solicitud in solicitudes" :key="solicitud.id">
          <tr v-if="solicitudes.length === 0">
            <td colspan="6" class="text-center">No hay solicitudes</td>
          </tr>
          <tr v-else>
            <th>{{ solicitud.id }}</th>
            <td>{{ solicitud.cedula }}</td>
            <td>{{ solicitud.medicamento }}</td>
            <td>{{ solicitud.cantidad }}</td>
            <td>
              <span class="badge text-bg-secondary">{{
                solicitud.estado
              }}</span>
            </td>
            <td>{{ solicitud.fecha_retiro }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped></style>
