<script setup>
import { ref, onMounted } from 'vue'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()

const medic = ref()
const telephone = ref()
const description = ref()

let users = ref([])
const uq_cedula = ref()

const getPaciente = async () => {
  users.forEach((e) => {
    uq_cedula.value = e.cedula
  })
}

const getLocalStorage = () => {
  users = JSON.parse(localStorage.getItem('usuario'))
}

const updateHistory = async () => {
  if (!medic.value || !telephone.value || !description.value) {
    return Swal.fire({
      title: 'Historial Incompleto',
      icon: 'error',
      text: 'Rellena todos los campos',
    })
  }
  try {
    const send = {
      nombre_medico: medic.value,
      tel_medico: telephone.value,
      descripcion: description.value,
      fecha_actualizacion: new Date(),
    }
    const { error } = await supabase
      .from('historiales')
      .update(send)
      .eq('cedula', uq_cedula.value)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Historial Actualizado',
      icon: 'success',
    })
    getUpdateDateHistory()
  }
}

const dateLastUpdate = ref()

const getUpdateDateHistory = async () => {
  const { data } = await supabase
    .from('historiales')
    .select()
    .eq('cedula', uq_cedula.value)
    .single()
  dateLastUpdate.value = data.fecha_actualizacion
  medic.value = data.nombre_medico
  telephone.value = data.tel_medico
  description.value = data.descripcion
}

onMounted(() => {
  getLocalStorage()
  getPaciente()
  getUpdateDateHistory()
})
</script>

<template>
  <div>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#updateHistModal"
    >
      <i class="bi bi-clipboard2-pulse"></i> Subir mi Historial
    </button>
  </div>
  <div
    class="modal fade"
    tabindex="-1"
    id="updateHistModal"
    aria-labelledby="updateHistModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateHistModalLabel">
            Actualizar mi Historial
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
            <p>Ultima Actualización: {{ dateLastUpdate }}</p>
            <div class="col-lg-12">
              <form @submit.prevent="updateHistory" autocomplete="off">
                <div class="row mb-4">
                  <div class="col-sm-6 col-lg-4">
                    <div>
                      <label class="form-label" for="medic"
                        >Nombre de mi médico</label
                      >
                      <input
                        type="text"
                        id="medic"
                        class="form-control"
                        v-model="medic"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6 col-lg-4">
                    <div>
                      <label class="form-label" for="telephone"
                        >Teléfono del médico</label
                      >
                      <input
                        type="text"
                        id="telephone"
                        class="form-control"
                        v-model="telephone"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col">
                    <label for="description" class="form-label"
                      >Describa sus medicamentos actuales y pasados</label
                    >
                    <textarea
                      class="form-control"
                      id="description"
                      rows="3"
                      v-model="description"
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <hr />
            <h3>Mi Historial:</h3>
            <p>Nombre de mi médico: {{ medic }}</p>
            <p>Teléfono del Médico: {{ telephone }}</p>
            <p>Descripción: {{ description }}</p>
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
          <button type="button" class="btn btn-primary" @click="updateHistory">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
