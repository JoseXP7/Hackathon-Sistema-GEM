<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'
const { supabase } = useSupabase()

const med_vencidos = ref([])

async function getVencidos() {
  try {
    const { data, error } = await supabase.from('vencidos').select()
    med_vencidos.value = data
    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

const devolucion = async (id) => {
  const send = {
    fecha_devolucion: new Date(),
  }
  try {
    const { error } = await supabase.from('vencidos').update(send).eq('id', id)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Medicamento Devuelto',
      icon: 'success',
    })
    getVencidos()
  }
}

onMounted(() => {
  getVencidos()
})
</script>

<template>
  <div class="container">
    <RouterLink to="/menu" class="btn btn-primary me-3"
      ><i class="bi bi-arrow-left-circle"></i> Regresar</RouterLink
    >
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Medicamentos Vencidos</h1>
    </section>
    <section class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Medicamento</th>
            <th>Laboratorio</th>
            <th>Tipo</th>
            <th>Caducidad</th>
            <th>Stock</th>
            <th>Fecha Devolucion</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody v-for="medicamento in med_vencidos" :key="medicamento.id">
          <tr>
            <th>{{ medicamento.id }}</th>
            <td>{{ medicamento.nombre }}</td>
            <td>{{ medicamento.laboratorio }}</td>
            <td>{{ medicamento.tipo }}</td>
            <td>{{ medicamento.caducidad }}</td>
            <td>{{ medicamento.stock }}</td>
            <td>
              {{ medicamento.fecha_devolucion }}
            </td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  class="btn btn-info"
                  @click="devolucion(medicamento.id)"
                >
                  <i class="bi bi-box-seam"></i> Devolución
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
