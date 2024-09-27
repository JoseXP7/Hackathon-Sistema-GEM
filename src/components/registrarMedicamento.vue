<script setup>
import { ref } from 'vue'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

const name = ref()
const lab = ref()
const tipo = ref()
const amount = ref()
const caducate_date = ref()

const regMedicamento = async () => {
  try {
    const send = {
      nombre: name.value,
      laboratorio: lab.value,
      tipo: tipo.value,
      stock: amount.value,
      fecha_caducidad: caducate_date.value,
    }
    const { error } = await useSupabase()
      .supabase.from('medicamentos')
      .upsert(send)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Medicamento Registrado',
      text: 'Actualizando',
      icon: 'success',
    })
  }
}
</script>

<template>
  <div>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#regMedicineModal"
    >
      <i class="bi bi-prescription2"></i> Registrar Medicamento
    </button>
  </div>
  <div
    class="modal fade"
    tabindex="-1"
    id="regMedicineModal"
    aria-labelledby="regMedicineModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="regMedicineModalLabel">
            Registro de Medicamento
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
            <div class="col-lg-12">
              <form @submit.prevent="regMedicamento">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row mb-4">
                  <div class="col">
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
                  <div class="col">
                    <div>
                      <label class="form-label" for="lab">Laboratorio</label>
                      <input
                        type="text"
                        id="lab"
                        class="form-control"
                        v-model="lab"
                      />
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-4">
                    <div>
                      <label for="tipo" class="form-label">Tipo</label>
                      <select class="form-select" id="tipo" v-model="tipo">
                        <option value="Hipertenso">Hipertenso</option>
                        <option value="Oncológico">Oncológico</option>
                        <option value="Diabetico">Diabetico</option>
                        <option value="Psiquiatrico">Psiquiatrico</option>
                        <option value="Asmatico">Asmatico</option>
                        <option value="Cuidado General">Cuidado General</option>
                      </select>
                    </div>
                  </div>
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
                  <div class="col-4">
                    <div>
                      <label for="caducate_date" class="form-label"
                        >Fecha de Caducidad</label
                      >
                      <input
                        type="date"
                        id="caducate_date"
                        class="form-control"
                        v-model="caducate_date"
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
