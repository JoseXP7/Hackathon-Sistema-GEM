<script setup>
import { ref, onMounted } from 'vue'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

const name = ref()
const surname = ref()
const document = ref()
const medicine = ref()
const amount = ref()
const lab = ref()
const club = ref()
const caducate_date = ref()
const donation_type = ref()

const regDonativo = async () => {
  try {
    const send = {
      nombres: name.value,
      apellidos: surname.value,
      ci_rif: document.value,
      medicamento: medicine.value,
      laboratorio: lab.value,
      cantidad: amount.value,
      fecha_caducidad: caducate_date.value,
      tipo: club.value,
      fecha: new Date(),
      tipo_donacion: donation_type.value,
    }
    const { error } = await useSupabase().supabase.from('donantes').upsert(send)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Donativo Registrado',
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
      data-bs-target="#regDonateModal"
    >
      <i class="bi bi-person-heart"></i> Registrar Donativo
    </button>
  </div>
  <div
    class="modal fade"
    tabindex="-1"
    id="regDonateModal"
    aria-labelledby="regDonateModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="regDonateModalLabel">
            Registro de Donativo
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
              <form @submit.prevent="regDonativo">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row mb-4">
                  <div class="col">
                    <div>
                      <label class="form-label" for="names">Nombres</label>
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
                      <label class="form-label" for="surnames">Apellidos</label>
                      <input
                        type="text"
                        id="surnames"
                        class="form-control"
                        v-model="surname"
                      />
                    </div>
                  </div>
                </div>

                <!-- CI input -->
                <div class="row mb-4">
                  <div class="col-5">
                    <div>
                      <label class="form-label" for="ci"
                        >Cedula de Identidad / R.I.F</label
                      >
                      <input
                        type="text"
                        id="ci"
                        class="form-control"
                        v-model="document"
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div>
                      <label class="form-label" for="medicine"
                        >Medicamento</label
                      >
                      <input
                        type="text"
                        id="medicine"
                        class="form-control"
                        v-model="medicine"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div>
                      <label class="form-label" for="age">Cantidad</label>
                      <input
                        type="number"
                        id="age"
                        class="form-control"
                        v-model="amount"
                      />
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-3">
                    <div>
                      <label for="lab">Laboratorio</label>
                      <input
                        type="text"
                        id="lab"
                        class="form-control"
                        v-model="lab"
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div>
                      <label for="caducate_date">Fecha de Caducidad</label>
                      <input
                        type="date"
                        id="caducate_date"
                        class="form-control"
                        v-model="caducate_date"
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div>
                      <label for="club">Club</label>
                      <select class="form-select" id="club" v-model="club">
                        <option value="Hipertenso">Hipertenso</option>
                        <option value="Oncológico">Oncológico</option>
                        <option value="Diabetico">Diabetico</option>
                        <option value="Psiquiatrico">Psiquiatrico</option>
                        <option value="Asmatico">Asmatico</option>
                        <option value="Cuidado General">Cuidado General</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-4">
                    <div>
                      <label for="donation_type">Tipo de Donación</label>
                      <select
                        id="donation_type"
                        class="form-select"
                        v-model="donation_type"
                      >
                        <option value="ONG">ONG</option>
                        <option value="Empresa Privada">Empresa Privada</option>
                        <option value="Gubernamental">Gubernamentales</option>
                        <option value="Personal">Personales</option>
                      </select>
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
          <button type="button" class="btn btn-primary" @click="regDonativo">
            Registrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
