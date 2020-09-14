<template>
  <q-layout view="hHh lpR fFf">

    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          Tasker
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>
