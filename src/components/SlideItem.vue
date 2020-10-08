<template>
    <div class="row items-center">
      <q-icon size="sm" left :name="icon" :color="color" />
      <span class="text-weight-bold text-uppercase" :class="'text-' + color">
        {{ label }}
      </span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SlideItem',
  props: ['direction'],
  computed: {
    ...mapGetters('data', ['projectsType']),
    icon () {
      switch (this.projectsType) {
        case 'active': return (this.direction === 'left') ? 'archive' : 'done'
        case 'archived': return (this.direction === 'left') ? 'unarchive' : 'delete'
        case 'completed': return (this.direction === 'left') ? 'archive' : 'delete'
        default : return ''
      }
    },
    label () {
      switch (this.projectsType) {
        case 'active': return (this.direction === 'left') ? 'archive' : 'done'
        case 'archived': return (this.direction === 'left') ? 'restore' : 'delete'
        case 'completed': return (this.direction === 'left') ? 'archive' : 'delete'
        default : return ''
      }
    },
    color () {
      switch (this.projectsType) {
        case 'active': return (this.direction === 'left') ? 'brown' : 'green'
        case 'archived': return (this.direction === 'left') ? 'brown' : 'red'
        case 'completed': return (this.direction === 'left') ? 'brown' : 'red'
        default : return ''
      }
    }
  }
}
</script>
