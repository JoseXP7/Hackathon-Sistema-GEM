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
  <div class="overflow-hidden view-app">
    <RouterView v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <Component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
/* .view-app {
  padding-top: 3.5em;
} */

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
