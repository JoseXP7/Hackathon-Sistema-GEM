<script setup>
import { onMounted, ref } from 'vue'
import { useSupabase } from '../clients/supabase'
import registrarMedicamento from '@/components/registrarMedicamento.vue'
const { supabase } = useSupabase()
import Swal from 'sweetalert2'

const medicamentos = ref([])

/*Seccion de Vencimiento*/
const medicamento_vencido = ref([])

/* ------------------- */

async function getMedicamentos() {
  const { data } = await supabase.from('medicamentos').select()
  medicamentos.value = data
}

async function moveToCaducated(id) {
  //primero buscamos el medicamento
  const { data } = await supabase.from('medicamentos').select().eq('id', id)
  medicamento_vencido.value = data

  //luego lo movemos a vencidos
  try {
    const { error } = await supabase
      .from('vencidos')
      .upsert(medicamento_vencido.value)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    //por ultimo eliminamos el medicamento vencido de la tabla medicamentos
    const { error } = await supabase.from('medicamentos').delete().eq('id', id)
    if (error) throw error

    Swal.fire({
      title: 'Medicamento Eliminado',
      icon: 'success',
    })
  }
}

onMounted(() => {
  getMedicamentos()
})
</script>
<template>
  <div class="container">
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Medicamentos</h1>
      <registrarMedicamento />
      <div class="ms-1">
        <button class="btn btn-primary" @click="getMedicamentos">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </section>
    <section>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Laboratorio</th>
            <th>Tipo</th>
            <th>Caducidad</th>
            <th>Stock</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody v-for="medicamento in medicamentos" :key="medicamento.id">
          <tr>
            <th>{{ medicamento.id }}</th>
            <td>{{ medicamento.nombre }}</td>
            <td>{{ medicamento.laboratorio }}</td>
            <td>{{ medicamento.tipo }}</td>
            <td>{{ medicamento.fecha_caducidad }}</td>
            <td>{{ medicamento.stock }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  class="btn btn-info"
                  @click="moveToCaducated(medicamento.id)"
                >
                  <i class="bi bi-hand-thumbs-down-fill"></i>
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
