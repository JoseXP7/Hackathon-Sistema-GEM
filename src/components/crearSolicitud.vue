<script setup>
import { ref, onMounted } from 'vue'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()

const medicamentos = ref([])

const getMedicamentos = async () => {
  const { data } = await supabase.from('medicamentos').select()
  medicamentos.value = data
}

onMounted(() => {
  getMedicamentos()
})
</script>

<template>
  <div>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#regSolicModal"
    >
      <i class="bi bi-file-earmark-plus"></i> Solicitar Medicamento
    </button>
  </div>
  <div
    class="modal fade"
    tabindex="-1"
    id="regSolicModal"
    aria-labelledby="regSolicModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="regSolicModalLabel">Crear Solicitud</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <section class="row justify-content-center">
            <div class="col-lg-12">
              <form @submit.prevent="createRequest" autocomplete="off">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row mb-4">
                  <div class="col-6">
                    <div>
                      <label class="form-label" for="names"
                        >Nombre del Medicamento</label
                      >
                      <input
                        type="text"
                        id="names"
                        class="form-control"
                        v-model="name"
                      />
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-3">
                    <div>
                      <label class="form-label" for="amount">Cantidad</label>
                      <input
                        type="number"
                        id="amount"
                        class="form-control"
                        v-model="amount"
                      />
                    </div>
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
          <button type="button" class="btn btn-primary" @click="regMedicamento">
            Registrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
