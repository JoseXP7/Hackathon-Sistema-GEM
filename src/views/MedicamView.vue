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

let total = ref(0)
const searchType = ref('')

async function getMedicamentos() {
  total.value = 0
  const { data } = await supabase.from('medicamentos').select()
  medicamentos.value = data
  data.forEach((e) => {
    total.value += e.stock
  })
}

async function totalMedicine() {
  total.value = 0
  if (typeof searchType.value === 'string' && searchType.value.length === 0) {
    getMedicamentos()
  } else {
    const word = searchType.value
    const { data } = await supabase
      .from('medicamentos')
      .select()
      .eq('tipo', word)
    data.forEach((e) => {
      total.value += e.stock
    })

    medicamentos.value = data
  }
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
      html: '<p>Presione <i class="bi bi-arrow-clockwise"></i> para recargar</p>',
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
    <div class="row">
      <div class="col-lg-3 col-8">
        Cantidad de Medicamentos para:
        <div class="d-flex align-items-center gap-2">
          <select v-model="searchType" class="form-select">
            <option value="Hipertenso" selected>Hipertensos</option>
            <option value="Oncológico">Oncológicos</option>
            <option value="Psiquiatrico">Psiquiatricos</option>
            <option value="Asmatico">Asmaticos</option>
            <option value="Diabetico">Diabeticos</option>
            <option value="Cuidado General">Cuidados Generales</option>
          </select>
          <button class="btn btn-primary" @click="totalMedicine">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>Total: {{ total }}</h3>
      </div>
    </div>
    <section class="table-responsive mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
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
            <td class="stock">{{ medicamento.stock }}</td>
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
