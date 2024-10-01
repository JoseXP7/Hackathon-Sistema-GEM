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
              <p class="card-icon patient">
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
              <RouterLink to="/menu" class="btn btn-primary">Entrar</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container mt-5">
      <div>
        <h4>¿Quieres revisar el estado de tus solicitudes?</h4>
        <p>
          En nuestro bot de Telegram puedes consultar solo enviando tu
          <span class="ci-text">cédula de identidad</span>.
        </p>
        <a
          href="https://t.me/gema_salu_bot"
          target="_blank"
          class="btn btn-primary btn-telegram"
          ><i class="bi bi-telegram"></i> Entrar al bot</a
        >
      </div>
    </section>
    <section class="container mt-5">
      <h2 class="text-center">Preguntas Frecuentes</h2>
      <div class="row justify-content-center mt-4 mb-5">
        <div class="col-lg-8">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  ¿Cual es nuestra misión?
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  Nuestra asociación tiene como misión promover y desarrollar
                  actividades que conlleven a la búsqueda del bienestar de la
                  comunidad en general, mediante alianzas con Organismos
                  públicos y privados permitiendo así, lograr mejorar la calidad
                  de vida y obtener el mejoramiento de las funciones, en los
                  servicios públicos.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  ¿Cual es nuestra visión?
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  Aspiramos que nuestra Organización sea un modelo de gestión
                  comunitario sin fines de lucro, solida y con presencia
                  Nacional en donde la participación protagónica de la comunidad
                  sea la base fundamental. <br />
                  <br />
                  Nuestra función es facilitar el proceso de cambio de la
                  comunidad donde colaboramos con una labor participativa y
                  transparente, siempre buscando la autonomía y autogestión,
                  para la sustentabilidad de los proyectos y programas.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  ¿Cuando puedo retirar mis medicamentos despues de
                  solicitarlos?
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  Al crear una solicitud, nuestro equipo revisará la solicitud
                  verificarla, aprobarla o rechazarla, y en caso de ser
                  aprobada, la fecha de retiro de la solicitud se le notificará
                  al paciente en el sistema.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  ¿Como puedo donar un medicamento?
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  Debes dirigirte a nuestra sede con el medicamento, donde
                  nuestro equipo registrará la donación con el sistema, después
                  ellos se encargarán de donar el medicamento al paciente
                  necesitado.
                </div>
              </div>
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

.card-icon.patient {
  color: #056bd8;
}

.ci-text {
  color: #133a71;
  font-weight: bold;
}

.btn-telegram {
  background-color: #24a1de;
  border: none;
}

.btn-telegram:hover {
  background-color: #0098cf;
}

.btn-telegram:active {
  background-color: #0085b6;
}
</style>
