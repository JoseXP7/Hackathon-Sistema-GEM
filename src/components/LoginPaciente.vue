<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../clients/supabase'
import Swal from 'sweetalert2'
const { supabase } = useSupabase()
const router = useRouter()

const paciente = ref([])

const ci = ref(0)
const name = ref()
const surname = ref()
const age = ref()
const tel = ref()
const dir = ref()
const club = ref()

const login = async () => {
  //primero revisamos si existe en la base de datos
  const { data } = await supabase
    .from('pacientes')
    .select()
    .eq('cedula', ci.value)
  if (data.length == 0) {
    Swal.fire({
      icon: 'error',
      title: 'Cedula no encontrada',
      text: 'Por favor, ingrese una cedula valida',
    })
  } else {
    paciente.value = data
    //si existe, mandamos a la vista de paciente y guardamos en localStorage
    localStorage.setItem('usuario', JSON.stringify(paciente.value))
    router.push('/solicitarMedicamento')
  }
}
</script>

<template>
  <section class="row justify-content-center">
    <div class="col-lg-6">
      <form @submit.prevent="login">
        <!-- CI input -->
        <div class="row mb-4">
          <div class="col-5">
            <div>
              <label class="form-label" for="ci">Cedula de Identidad</label>
              <input type="text" id="ci" class="form-control" v-model="ci" />
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <button type="button" class="btn btn-primary mb-4" @click="login">
          Ingresar
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
