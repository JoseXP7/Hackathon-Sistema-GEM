<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <section>
      <h1 class="text-center">Sistema GEM</h1>
    </section>
    <section class="container">
      <div class="row justify-content-center g-3">
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Soy Paciente</h5>
              <p class="card-icon">
                <i class="bi bi-person-wheelchair"></i>
              </p>
              <RouterLink to="/regPaciente" class="btn btn-primary me-2"
                >Registrarme</RouterLink
              >
              <RouterLink to="/loginPaciente" class="btn btn-primary"
                >Iniciar Sesión</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Soy EGM</h5>
              <p class="card-icon">
                <i class="bi bi-clipboard2-heart"></i>
              </p>
              <RouterLink to="/ingresoOperador" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card-icon {
  font-size: 50px;
}
</style>
