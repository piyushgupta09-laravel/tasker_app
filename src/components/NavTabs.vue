<template>
  <q-tabs
    align="justify"
    :vertical="is_vertical"
  >
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
</template>

<script>
export default {
  props: ['is_vertical']
}
</script>
