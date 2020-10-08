import { LoadingBar } from 'quasar'
import axios from 'axios'

const fetchAllProjects = '/auth/projects/'
const fetchActiveProjects = '/auth/projects/active'
const fetchArchivedProjects = '/auth/projects/archived'
const fetchCompletedProjects = '/auth/projects/completed'

const fetchProject = '/auth/projects/'
const createProject = '/auth/projects'
const updateProject = '/auth/projects/'
const deleteProject = 'auth/projects/'

const createTask = '/auth/tasks'
const updateTask = '/auth/tasks/'
const deleteTask = '/auth/tasks/'

const createStep = '/auth/steps'
const updateStep = '/auth/steps/'
const deleteStep = '/auth/steps/'

const getDefaultState = () => {
  return {
    status: '',
    statusText: '',
    type: '',
    errors: {},
    task: {},
    project: {},
    projects: [],
    showForm: false,
    isChanged: false,
    projectsType: 'active'
  }
}
const state = getDefaultState()

const mutations = {
  loadLocalData (state) {
    console.log('mutations@setResponse')
    state.projects = JSON.parse(localStorage.getItem('data'))
    state.project = JSON.parse(localStorage.getItem('project'))
    state.type = 'Cached'
    LoadingBar.stop()
  },
  localUpdate (state, action) {
    console.log('mutations@localUpdate::' + action.type)
    // console.log('old status: ' + state.project.tasks[action.task_index].statusId)
    // console.log('new status: ' + action.value)
    state.project.tasks[action.task_index].statusId = action.value
    state.isChanged = true
  },
  setResponseStatus (state, response) {
    console.log('mutations@setResponseStatus')
    state.status = response.status
    state.statusText = response.statusText
    // Means data in state is of type feched
    state.type = 'Fetched'
  },
  setAllProjects (state, projects) {
    console.log('mutations@setAllProjects')
    state.projects = projects
    localStorage.setItem('data', JSON.stringify(projects))
  },
  setProject (state, project) {
    console.log('mutations@setProject')
    state.project = project
    localStorage.setItem('project', JSON.stringify(project))
  },
  addNewProject (state, project) {
    console.log('mutations@addNewProject')
    state.projects.splice(0, 0, project)
  },
  updateProject (state, project) {
    console.log('mutations@updateProject')
    const index = state.projects.map(function (x) { return x.id }).indexOf(project.id)
    Object.assign(state.projects[index], project)
  },
  deleteProject (state, project) {
    console.log('mutations@deleteProject')
    // Find the index of the item that needs to be removed
    const index = state.projects.indexOf(project)
    state.projects.splice(index, 1)
  },
  setTask (state, taskId) {
    console.log('mutations@setTask::' + taskId)
    const index = state.project.tasks.map(function (x) { return x.id }).indexOf(taskId)
    Object.assign(state.task, state.project.tasks[index])
  },
  unsetTask (state) {
    console.log('mutations@unsetTask')
    state.task = {}
  },
  resetErrors (state) {
    console.log('mutations@resetErrors')
    state.status = ''
    state.statusText = ''
    state.errors = {}
  },
  toggleForm (state) {
    console.log('mutations@toggleForm::' + !state.showForm)
    state.showForm = !state.showForm
  },
  setProjectsType (state, type) {
    console.log('mutations@setProjectsType::' + type)
    state.projectsType = type
  }
}

const actions = {
  refreshData ({ dispatch }) {
    console.log('actions@refreshData')
    dispatch('fetchProjects')
  },
  loadLocalData ({ commit }) {
    console.log('action@loadLocalData')
    LoadingBar.start()
    commit('loadLocalData')
  },
  setResponse ({ dispatch, commit }, promise) {
    promise.then((response) => {
      console.log('action@setResponse')
      dispatch('setResponseStatus', response).then(() => {
        switch (response.data.info) {
          case 100:
            commit('setAllProjects', response.data.data)
            break
          case 101:
            commit('setProject', response.data.data)
            break
          case 102:
            commit('addNewProject', response.data.data)
            break
          case 103:
            commit('updateProject', response.data.data)
            break
          case 104:
            commit('deleteProject', response.data.data)
            break
          default: break
        }
      })
    }).catch(errors => {
      dispatch('resetErrors').then(() => {
        commit('setResponse', {
          status: errors.response.status,
          statusText: errors.response.statusText,
          data: errors.response.data
        })
      })
    })
  },
  setResponseStatus ({ commit }, response) {
    console.log('action@setResponseStatus')
    commit('setResponseStatus', response)
  },
  resetErrors ({ commit }) {
    console.log('action@resetErrors')
    commit('resetErrors')
  },
  async fetchProjects ({ dispatch, state }) {
    console.log('action@fetchProjects')
    switch (state.projectsType) {
      case 'archived':
        dispatch('setResponse', axios.get(fetchArchivedProjects))
        break
      case 'active':
        dispatch('setResponse', axios.get(fetchActiveProjects))
        break
      case 'completed':
        dispatch('setResponse', axios.get(fetchCompletedProjects))
        break
      default:// all
        dispatch('setResponse', axios.get(fetchAllProjects))
        break
    }
  },
  async createProject ({ dispatch }, project) {
    console.log('action@createProjects')
    dispatch('setResponse', axios.post(createProject, project))
  },
  async updateProject ({ dispatch }, action) {
    switch (action.type) {
      case 'status':
        console.log('action@updateProject::status')
        dispatch(
          'setResponse',
          axios.put(updateProject + action.id, {
            status: action.status
          }))
        break
      case 'priority':
        console.log('action@updateProject::priority')
        dispatch(
          'setResponse',
          axios.put(updateProject + action.id, {
            priority: action.priority
          }))
        break
      case 'description':
        console.log('action@updateProject::description')
        dispatch(
          'setResponse',
          axios.put(updateProject + action.id, {
            description: action.description
          }))
        break
      case 'archived':
        console.log('action@updateProject::archived')
        dispatch(
          'setResponse',
          axios.put(updateProject + action.id, {
            archived: action.archived
          }))
        break
      default:
        console.log('action@updateProject::default')
        dispatch('setResponse', axios.put(updateProject + action.id, {
          feild: action.type,
          value: action.value
        }))
        break
    }
  },
  async deleteProject ({ dispatch }, action) {
    console.log('action@deleteProject')
    dispatch('setResponse', axios.delete(deleteProject + action.id))
  },
  async fetchProject ({ dispatch }, projectId) {
    console.log('action@fetchProject')
    dispatch('setResponse', axios.get(fetchProject + projectId))
  },
  async createTask ({ dispatch }, task) {
    console.log('action@createTask')
    dispatch('setResponse', axios.post(createTask, task))
  },
  async updateTask ({ dispatch, commit }, action) {
    switch (action.type) {
      case 'status':
        console.log('action@updateTask::status')
        dispatch(
          'setResponse',
          axios.put(updateTask + action.id, { status: action.value })
        ).then(() => {
          commit('localUpdate', action)
        })
        break
      case 'priority':
        console.log('action@updateTask::priority')
        dispatch(
          'setResponse',
          axios.put(updateTask + action.id, { priority: action.value })
        ).then(() => {
          commit('localUpdate', action)
        })
        break
      default:
        console.log('action@updateTask::default')
        dispatch(
          'setResponse',
          axios.put(updateTask + action.id, action.value)
        ).then(() => {
          commit('localUpdate', action)
        })
    }
  },
  async deleteTask ({ dispatch }, action) {
    console.log('action@deleteTask')
    dispatch('setResponse', axios.delete(deleteTask + action.id))
  },
  async createStep ({ dispatch }, step) {
    console.log('action@createStep')
    dispatch('setResponse', axios.post(createStep, step))
  },
  async updateStep ({ dispatch, commit }, action) {
    switch (action.type) {
      case 'content':
        console.log('action@updateStep::content')
        dispatch(
          'setResponse',
          axios.put(updateStep + action.id, { content: action.value })
        ).then(() => {
          // commit('localUpdate', action)
        })
        break
      case 'completed':
        console.log('action@updateStep::completed')
        dispatch(
          'setResponse',
          axios.put(updateStep + action.id, { completed: action.value })
        ).then(() => {
          // commit('localUpdate', action)
        })
        break
      default:
        console.log('action@updateStep::default')
        break
    }
  },
  async deleteStep ({ dispatch }, action) {
    console.log('action@deleteStep')
    dispatch('setResponse', axios.delete(deleteStep + action.id))
  },
  setTask ({ commit }, taskId) {
    console.log('actions@setTask::' + taskId)
    commit('setTask', taskId)
  },
  unsetTask ({ commit }) {
    console.log('actions@unsetTask')
    commit('unsetTask')
  },
  toggleForm ({ commit }) {
    console.log('actions@showForm')
    commit('toggleForm')
  },
  setProjectsType ({ commit }, type) {
    console.log('actions@setProjectsType')
    commit('setProjectsType', type)
  }
}

const getters = {
  getDataType: (state) => {
    console.log('getters@getDataType::' + state.type)
    return state.type
  },
  task: (state) => {
    console.log('getters@getDataType::' + state.type)
    return state.task
  },
  project: (state) => {
    console.log('getters@project::' + state.project)
    return state.project
  },
  projects: (state) => {
    console.log('getters@projects::' + state.projects)
    return state.projects
  },
  showForm: (state) => {
    console.log('getters@showForm::' + state.showForm)
    return state.showForm
  },
  projectsType: (state) => {
    console.log('getters@projectsType::' + state.projectsType)
    return state.projectsType
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
