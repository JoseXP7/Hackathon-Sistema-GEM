<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'

const router = useRouter()

const name = ref()
const surname = ref()
const ci = ref()
const age = ref()
const tel = ref()
const dir = ref()
const club = ref()

const createPaciente = async () => {
  if (
    !ci.value ||
    !name.value ||
    !surname.value ||
    !age.value ||
    !tel.value ||
    !dir.value ||
    !club.value
  ) {
    return Swal.fire({
      title: 'Error',
      text: 'Por favor, rellene todos los campos',
      icon: 'error',
    })
  }
  try {
    const send = {
      cedula: ci.value,
      nombres: name.value,
      apellidos: surname.value,
      edad: age.value,
      telefono: tel.value,
      direccion: dir.value,
      club: club.value,
    }
    const { error } = await useSupabase()
      .supabase.from('pacientes')
      .upsert(send)
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    Swal.fire({
      title: 'Paciente Creado',
      text: 'Redirigiendo',
      icon: 'success',
    })
    router.push('/loginPaciente')
  }
}
</script>

<template>
  <section class="row justify-content-center">
    <div class="col-lg-6">
      <form @submit.prevent="createPaciente">
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
                required
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
                required
              />
            </div>
          </div>
        </div>

        <!-- CI input -->
        <div class="row mb-4">
          <div class="col-5">
            <div>
              <label class="form-label" for="ci">Cedula de Identidad</label>
              <input type="text" id="ci" class="form-control" v-model="ci" />
            </div>
          </div>
          <div class="col-3">
            <div>
              <label class="form-label" for="age">Edad</label>
              <input
                type="number"
                id="age"
                class="form-control"
                v-model="age"
                required
              />
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-4">
            <div>
              <label class="form-label" for="phone">Telefono</label>
              <input
                type="number"
                id="phone"
                class="form-control"
                v-model="tel"
                required
              />
            </div>
          </div>
          <div class="col">
            <div>
              <label class="form-label" for="direction">Dirección</label>
              <input
                type="text"
                id="direction"
                class="form-control"
                v-model="dir"
                required
              />
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-4">
            <div>
              <label for="club">Club</label>
              <select class="form-select" id="club" v-model="club" required>
                <option value="Hipertenso">Hipertenso</option>
                <option value="Oncológico">Oncológico</option>
                <option value="Psiquiatrico">Psiquiatrico</option>
                <option value="Asmatico">Asmatico</option>
                <option value="Diabetico">Diabetico</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <button
          type="button"
          class="btn btn-primary mb-4"
          @click="createPaciente"
        >
          Registrarme
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
