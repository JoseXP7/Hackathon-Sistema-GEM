<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
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
  //primero creamos el medicamento vencido
  let name
  let lab
  let tipo
  let cad
  let stock

  //primero buscamos el medicamento
  const { data } = await supabase.from('medicamentos').select().eq('id', id)
  medicamento_vencido.value = data

  data.forEach((e) => {
    name = e.nombre
    lab = e.laboratorio
    tipo = e.tipo
    cad = e.fecha_caducidad
    stock = e.stock
  })

  const send = {
    nombre: name,
    laboratorio: lab,
    tipo: tipo,
    caducidad: cad,
    stock: stock,
  }

  //luego lo movemos a vencidos
  try {
    const { error } = await supabase.from('vencidos').upsert(send)
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

const verifyDate = () => {
  const hoy = new Date().toISOString().split('T')[0]
  return hoy
}

onMounted(() => {
  getMedicamentos()
})
</script>
<template>
  <div class="container">
    <RouterLink to="/menu" class="btn btn-primary me-3"
      ><i class="bi bi-arrow-left-circle"></i> Regresar</RouterLink
    >
    <section class="d-flex align-items-center">
      <h1 class="me-auto">Medicamentos</h1>
      <registrarMedicamento />
      <div class="ms-1">
        <button class="btn btn-secondary" @click="getMedicamentos">
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
            <td>
              {{
                medicamento.fecha_caducidad > verifyDate()
                  ? medicamento.fecha_caducidad
                  : `${medicamento.fecha_caducidad} (Vencido) 🔴`
              }}
            </td>
            <td>{{ medicamento.stock }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  class="btn btn-info"
                  @click="moveToCaducated(medicamento.id)"
                >
                  <i class="bi bi-hand-thumbs-down-fill"></i> Mover a Vencidos
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
