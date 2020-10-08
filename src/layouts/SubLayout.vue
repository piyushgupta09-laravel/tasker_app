<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-blue-10 text-white">
      <q-tabs align="left">
        <q-route-tab to="/dashboard">
          <q-icon name="dashboard" size="sm" />
        </q-route-tab>
        <q-route-tab to="/projects">
          <q-icon name="done_outline" size="sm" />
        </q-route-tab>
        <q-route-tab to="/settings">
          <q-icon name="settings" size="sm" />
        </q-route-tab>
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: 'sub-layout'
}
</script>
