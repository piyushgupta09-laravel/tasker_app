<template>
  <div class="auth-container">
    <q-layout>
      <q-img class="center" src="~assets/app_logo.png" width="150px" height="150px" />
      <h2 class="text-center q-mt-xs q-mb-xs">Tasker</h2>
      <q-page-container>
        <validation-errors />
        <transition
          enter-active-class="animated slideInRight"
          leave-active-class="animated fadeOutLeftBig"
          :duration="500"
        >
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  components: {
    'validation-errors': () => import('components/Error')
  }
}
</script>

<style scoped lang="scss">
.auth-container {
  margin: 0px auto;
  width: 350px;
}
h2 {
  color: $blue;
  font-weight: 400;
  font-family: 'Quicksand', sans-serif;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
