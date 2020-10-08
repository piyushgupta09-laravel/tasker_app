<template>
  <q-page style="width: 100vw">
    <add-project-form />
    <q-list v-if="projects.length" bordered separator class="q-mb-xl">
      <q-slide-item
        :key="project.id"
        v-for="project in projects"
        left-color="blue-grey-1"
        right-color="blue-grey-1"
        @left="opt => onLeft(opt, project)"
        @right="opt => onRight(opt, project)"
      >

        <template v-slot:left>
          <slide-item direction="left" />
        </template>

        <template v-slot:right>
          <slide-item />
        </template>

        <q-item
          clickable
          @click="openProject(project)"
          v-bind:style="{ backgroundColor: project.color }"
        >

          <!-- COVER -->
          <q-item-section avatar>
            <q-avatar v-if="project.cover" rounded size="82px">
              <img
                draggable="false"
                :src="getServerUrl + project.cover"
                spinner-color="white"
                style="object-fit: cover"
              >
            </q-avatar>
            <q-avatar v-else rounded size="82px" color="blue" text-color="white" icon="fact_check" />
          </q-item-section>

          <!-- TEXT -->
          <q-item-section>

            <!-- PRIORITY -->
            <q-item-label
              class="text-uppercase"
              v-bind:style="{ color: getColor(project.color) }"
            >
              {{ project.priority }}
            </q-item-label>

            <!-- NAME -->
            <q-item-label
              class="text-capitalize text-weight-bold"
              style="fontSize: 1.2rem"
              v-bind:style="{ color: getColor(project.color) }"
            >
              {{ project.name }}
            </q-item-label>

            <!-- STATUS | LAST_UPDATED -->
            <q-item-label
              class="text-caption text-capitalize"
              v-bind:style="{ color: getColor(project.color) }"
            >
              {{ project.status }} | {{ project.updated }}
            </q-item-label>

          </q-item-section>

        </q-item>

      </q-slide-item>
    </q-list>
    <p v-else class="q-mt-md text-grey-6 text-center text-uppercase text-overline">
      {{ emptyListText(projectsType) }}
    </p>
  </q-page>
</template>

<script>
import mixinCommon from 'src/mixins/common'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Projects',
  mixins: [mixinCommon],
  components: {
    'add-project-form': () => import('components/forms/AddProject'),
    'slide-item': () => import('components/SlideItem')
  },
  computed: {
    ...mapGetters('data', ['getDataType', 'projectsType']),
    ...mapGetters('app', ['getServerUrl']),
    ...mapState('data', ['projects'])
  },
  watch: {
    getDataType () {
      this.$q.notify({
        time: 500,
        type: (this.getDataType === 'Cached') ? 'warning' : 'info',
        message: (this.getDataType === 'Cached') ? 'Showing cached data' : 'Fresh data fetched'
      })
    }
  },
  methods: {
    ...mapActions('data', [
      'loadLocalData',
      'fetchProjects',
      'updateProject',
      'deleteProject'
    ]),
    openProject (project) {
      if (this.projectsType === 'archived') {
        this.$q.notify('Restore project to get access')
      } else {
        this.$router.push({ name: 'project', params: { projectId: project.id } })
      }
    },
    onLeft ({ reset }, project) {
      console.log('swipe@onLeft')
      this.updateProject({
        type: 'archived',
        id: project.id,
        archived: !project.archived
      })
      this.finalize(reset)
    },
    onRight ({ reset }, project) {
      console.log('swipe@onRight')
      this.updateProject({
        type: 'status',
        id: project.id,
        status: 5
      })
      this.finalize(reset)
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    }
  },
  created () {
    this.fetchProjects(false)
  },
  mounted () {
    this.loadLocalData()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
