<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="container">
      <div class="row g-3">
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Pacientes</h5>
              <p class="card-icon">
                <i class="bi bi-person-wheelchair"></i>
              </p>
              <RouterLink to="/pacientes" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Medicamentos</h5>
              <p class="card-icon">
                <i class="bi bi-capsule"></i>
              </p>
              <RouterLink to="/medicamentos" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Donantes</h5>
              <p class="card-icon">
                <i class="bi bi-box2-heart"></i>
              </p>
              <RouterLink to="/donantes" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Solicitudes de Pacientes</h5>
              <p class="card-icon">
                <i class="bi bi-ui-checks"></i>
              </p>
              <RouterLink to="/gestion" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.card-icon {
  font-size: 50px;
}
</style>
