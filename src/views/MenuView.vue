<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="mb-4">
    <div class="container">
      <div class="row g-3">
        <div class="col-lg-4 col-md-6">
          <div class="card shadow border border-0">
            <div class="card-body text-center">
              <h5 class="card-title">Pacientes</h5>
              <p class="card-icon patient">
                <i class="bi bi-person-wheelchair"></i>
              </p>
              <RouterLink to="/pacientes" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card shadow border border-0">
            <div class="card-body text-center">
              <h5 class="card-title">Medicamentos</h5>
              <p class="card-icon medicine">
                <i class="bi bi-capsule"></i>
              </p>
              <RouterLink to="/medicamentos" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card shadow border border-0">
            <div class="card-body text-center">
              <h5 class="card-title">Donantes</h5>
              <p class="card-icon donation">
                <i class="bi bi-box2-heart"></i>
              </p>
              <RouterLink to="/donantes" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card shadow border border-0">
            <div class="card-body text-center">
              <h5 class="card-title">Solicitudes de Pacientes</h5>
              <p class="card-icon request">
                <i class="bi bi-ui-checks"></i>
              </p>
              <RouterLink to="/gestion" class="btn btn-primary"
                >Entrar</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card shadow border border-0">
            <div class="card-body text-center">
              <h5 class="card-title">Medicamentos Vencidos</h5>
              <p class="card-icon expired">
                <i class="bi bi-capsule-pill"></i>
              </p>
              <RouterLink to="/vencidos" class="btn btn-primary"
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

.card-icon.patient {
  color: #056bd8;
}

.card-icon.medicine {
  color: #43ed9e;
}

.card-icon.expired {
  color: #ef0063;
}

.card-icon.donation {
  color: #9eed21;
}

.card-icon.request {
  color: #7b0bfc;
}
</style>
