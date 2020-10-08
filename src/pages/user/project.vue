<template>
  <q-page style="width: 100vw">

    <q-toolbar class="text-primary bg-grey-3" >
      <q-btn flat round dense icon="navigate_before" @click="goBack" />
      <q-toolbar-title class="text-capitalize">{{ project.name }}</q-toolbar-title>

      <q-btn-dropdown flat round dense no-icon-animation dropdown-icon="more_vert">
        <q-list>

          <q-item>
            <q-item-section>
              <div class="text-overline">Priority</div>
              <q-option-group
                :options="options"
                label="Notifications"
                type="radio"
                v-model="priority"
              />
            </q-item-section>
          </q-item>

          <q-item clickable @click="deleteProject({id: project.id})">
            <q-item-section>
              <q-item-label>Delete Project</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="delete" color="red" />
            </q-item-section>
          </q-item>

        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
    <edit-feild
      label="Description"
      :id="project.id"
      :data="project.description"
      v-if="isEditFeildActive"
    />
    <p v-else class="description">
      {{ project.description }}
      <q-btn
        flat
        size="sm"
        color="grey"
        label="Edit"
        @click="toggleEditFeild" />
    </p>

    <status-tabs />

    <q-list v-if="tasks.length" bordered separator>
      <task
        v-for="(task, index) in tasks"
        :key="task.id"
        :task="task"
        :index="index"
      />
    </q-list>
    <p v-else class="q-mt-md text-grey-6 text-center text-uppercase text-overline">
      {{ noTaskMessage() }}
    </p>

  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'Projects',
  components: {
    task: () => import('components/Task'),
    'status-tabs': () => import('components/StatusTabs'),
    'edit-feild': () => import('components/forms/EditFeild')
  },
  data () {
    return {
      options: [
        {
          label: 'Least',
          value: 1
        },
        {
          label: 'Regular',
          value: 2
        },
        {
          label: 'Remember',
          value: 3
        },
        {
          label: 'Important',
          value: 4
        },
        {
          label: 'Urgent',
          value: 5
        }
      ]
    }
  },
  created () {
    if (this.$route.params.projectId) {
      this.fetchProject(this.$route.params.projectId)
    } else {
      this.$router.go(-1)
    }
  },
  methods: {
    ...mapActions('data', ['fetchProject', 'updateProject', 'deleteProject']),
    ...mapActions('app', ['toggleEditFeild']),
    noTaskMessage () {
      switch (this.getStatusTab) {
        case 'yet': return 'No tasks available'
        case 'on': return 'No task to work on'
        case 'did': return 'No completed task'
        default: return ''
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    onItemClick (action) {
      console.log('Clicked on ' + action)
    }
  },
  computed: {
    ...mapState('data', ['isChanged', 'project']),
    ...mapGetters('app', ['getStatusTab', 'isEditFeildActive']),
    description: {
      get: function () {
        return this.project.description
      },
      set: function (newValue) {
        console.log(newValue)
      }
    },
    priority: {
      get: function () {
        return this.project.priorityId
      },
      set: function (newValue) {
        this.updateProject({
          type: 'priority',
          id: this.project.id,
          priority: newValue
        })
      }
    },
    tasks () {
      const tab = this.getStatusTab
      if (this.project.tasks) {
        const tasks = this.project.tasks.filter(function (e) {
          switch (tab) {
            case 'yet': return e.status === 'pending' || e.status === 'onhold'
            case 'on' : return e.status === 'started' || e.status === 'working'
            case 'did': return e.status === 'completed'
            case 'add': return false
          }
        })
        return tasks
      } else {
        return []
      }
    }
  }
}
</script>

<style scooped>
  .q-item__label--caption {
    text-transform: uppercase;
  }

  .description {
    margin: 0.5rem 1rem;
    text-align: justify;
    text-justify: inter-word;
    line-clamp: 3;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    /*line-height: 20px;
    max-height: 40px; */
  }
</style>
