<template>
  <q-layout view="hHh lpr fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-uppercase">
          {{ $route.name }}
          <span class="text-overline" v-show="$route.name === 'projects'">
            &nbsp;[{{ projectsType }}]
          </span>
        </q-toolbar-title>

        <q-btn-dropdown flat round dense no-icon-animation dropdown-icon="more_vert">
          <q-list>
            <q-item clickable v-close-popup @click="toggleForm">
              <q-item-section>
                <q-item-label>Add New Projects</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="fetchActiveProjects">
              <q-item-section>
                <q-item-label>Active Projects</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="fetchArchivedProjects">
              <q-item-section>
                <q-item-label>Archived Projects</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="fetchCompletedProjects">
              <q-item-section>
                <q-item-label>Completed Projects</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer v-if="$q.platform.is.desktop" mini show-if-above content-class="bg-blue-8 text-white">
      <nav-tabs v-bind:is_vertical="true" />
    </q-drawer>

    <q-footer v-else class="bg-blue-10 text-white">
      <nav-tabs v-bind:is_vertical="false" />
    </q-footer>

    <!-- ONLY FOR DEVELOPMENT PURPOSE -->
    <!-- <q-footer class="bg-blue-10 text-white">
      <nav-tabs v-bind:is_vertical="false" />
    </q-footer> -->

  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app-layout',
  components: {
    'nav-tabs': () => import('components/NavTabs')
  },
  computed: {
    ...mapGetters('data', ['projectsType'])
  },
  methods: {
    ...mapActions('data', ['toggleForm', 'fetchProjects', 'setProjectsType']),
    fetchActiveProjects () {
      this.setProjectsType('active')
      this.fetchProjects()
    },
    fetchArchivedProjects () {
      this.setProjectsType('archived')
      this.fetchProjects()
    },
    fetchCompletedProjects () {
      this.setProjectsType('completed')
      this.fetchProjects()
    }
  }
}
</script>
