<script setup>
import { onMounted, ref } from 'vue'
import { useSupabase } from '../clients/supabase'
import registrarDonacion from '@/components/registrarDonacion.vue'
const { supabase } = useSupabase()
const donantes = ref([])

async function getDonantes() {
  const { data } = await supabase.from('donantes').select()
  donantes.value = data
}

onMounted(() => {
  getDonantes()
})
</script>
<template>
  <div class="container">
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Donantes</h1>
      <registrarDonacion />
      <div class="ms-1">
        <button class="btn btn-primary" @click="getDonantes">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </section>
    <section class="table-responsive">
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Medicamento Donado</th>
            <th>Laboratorio</th>
            <th>Cantidad</th>
            <th>Fecha Caducidad</th>
            <th>Tipo de Medicamento</th>
            <th>C.I / R.I.F</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody v-for="donante in donantes" :key="donante.id">
          <tr>
            <th>{{ donante.id }}</th>
            <td>{{ donante.nombres }}</td>
            <td>{{ donante.apellidos }}</td>
            <td>{{ donante.medicamento }}</td>
            <td>{{ donante.laboratorio }}</td>
            <td>{{ donante.cantidad }}</td>
            <td>{{ donante.fecha_caducidad }}</td>
            <td>{{ donante.tipo }}</td>
            <td>{{ donante.ci_rif }}</td>
            <td>{{ donante.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<style scoped></style>
