<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row m-3">
    <div class="col-6">
      <div class="d-flex align-items-center">
        <RouterLink to="/" class="btn btn-primary me-3"
          ><i class="bi bi-house"></i
        ></RouterLink>
        <h5>Sistema GEM</h5>
      </div>
      <!--<RouterLink to="/menu" class="btn btn-primary"
        ><i class="bi bi-list"></i
      ></RouterLink>-->
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>
