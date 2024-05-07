import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: []
  },
  getters: {
    completedTasks: state => state.tasks.filter(task => task.completed),
    activeTasks: state => state.tasks.filter(task => !task.completed)
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    TOGGLE_TASK(state, task) {
      const taskFound = state.tasks.find(t => t.id === task.id);
      if (taskFound) {
        taskFound.completed = !taskFound.completed;
      }
    }
  },
  actions: {
    fetchTasks({ commit }) {
      axios.get('http://localhost:5174/tasks')
        .then(response => {
          commit('SET_TASKS', response.data);
        })
        .catch(error => console.error('Error fetching tasks:', error));
    },
    toggleTaskCompletion({ commit }, task) {
      axios.put(`http://localhost:5174/tasks/${task.id}`, {
        completed: !task.completed
      })
      .then(() => {
        commit('TOGGLE_TASK', task);
      })
      .catch(error => {
        console.error('Failed to update task:', error);
      });
    }
  },
});
