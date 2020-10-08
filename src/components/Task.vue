<template>
  <q-slide-item
    @left="onLeft()"
    @right="onRight()"
  >
    <template v-if="task.statusId < 5" v-slot:left>
      <div class="row items-center">
        <span class="text-weight-bold text-uppercase text-white">
          {{ getSwipeLabel(task.statusId, 'left') }}
        </span>
        <q-icon size="sm" left name="navigate_next" color='white' />
      </div>
    </template>

    <template v-if="task.statusId > 2" v-slot:right>
      <div class="row items-center">
        <q-icon size="sm" right name="navigate_before" color='white' />
        <span class="text-weight-bold text-uppercase text-white">
          {{ getSwipeLabel(task.statusId, 'right') }}
        </span>
      </div>
    </template>

    <q-expansion-item
      switch-toggle-side
      expand-separator
      expand-icon-class="text-grey"
      :label="task.title"
      :caption="task.priority"
      @dblclick="editTask(task.id)"
    >
      <q-list>
        <step
          v-for="step in task.steps"
          :key="step.id"
          :step="step"
        />
      </q-list>
    </q-expansion-item>

  </q-slide-item>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['task', 'index'],
  components: {
    step: () => import('components/Step')
  },
  methods: {
    ...mapActions('data', ['updateTask', 'setTask']),
    ...mapActions('app', ['setStatusTab']),
    editTask (taskId) {
      this.setStatusTab('add')
      this.setTask(this.task.id)
    },
    onLeft () {
      console.log('task@onLeft')
      this.updateTask({
        id: this.task.id,
        type: 'status',
        task_index: this.index,
        value: this.getStatusId(this.task.statusId, 'left')
      })
    },
    onRight () {
      console.log('task@onRight')
      this.updateTask({
        id: this.task.id,
        type: 'status',
        task_index: this.index,
        value: this.getStatusId(this.task.statusId, 'right')
      })
    },
    getStatusId (currentStatusId, direction) {
      if (direction === 'left') {
        switch (currentStatusId) {
          case 1: return 3 // pending -> started[3]
          case 2: return 3 // onhold -> started[3]
          case 3: return 5 // started -> completed[5]
          case 4: return 5 // working -> completed[5]
          // case 5: break
        }
      } else {
        switch (currentStatusId) {
          // case 1: return
          // case 2: return
          case 3: return 2 // started -> onhold[2]
          case 4: return 2 // working -> onhold[2]
          case 5: return 3 // completed -> started[3]
        }
      }
    },
    getSwipeLabel (currentStatusId, direction) {
      if (direction === 'left') {
        switch (currentStatusId) {
          case 1: return 'Start' // pending -> started[3]
          case 2: return 'Resume' // onhold -> started[3]
          case 3: return 'Done' // started -> completed[5]
          case 4: return 'Done' // working -> completed[5]
          case 5: break
          default:break
        }
      } else {
        switch (currentStatusId) {
          case 1: break
          case 2: break
          case 3: return 'OnHold' // started -> onhold[2]
          case 4: return 'OnHold' // working -> onhold[2]
          case 5: return 'Resume' // completed -> started[3]
          default:break
        }
      }
    }
  }
}
</script>
