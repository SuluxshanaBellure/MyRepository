<template>
  <div class="container">
    <div class="sidebar">
      <button @click="toggleModal" class="add-task-button">
        Add Task <span class="plus-sign">+</span>
      </button>
      <ul>
        <router-link to="/dashboard" tag="li" :class="{ 'menu-item': true, active: currentView === 'Dashboard' }" @click.native="currentView = 'Dashboard'">
          Dashboard
        </router-link>
        <router-link to="/active" tag="li" :class="{ 'menu-item': true, active: currentView === 'Active' }" @click.native="currentView = 'Active'">
          Active
        </router-link>
        <router-link to="/completed" tag="li" :class="{ 'menu-item': true, active: currentView === 'Completed' }" @click.native="currentView = 'Completed'">
          Completed
        </router-link>
      </ul>
    </div>
    <div class="content">
      <h2 style="margin-bottom:30px;font-family:cursive;">{{ currentView }}</h2>
      <div style="margin-bottom: 40px; display: flex; align-items: center;">
        <div style="width: 500px;margin-top: -178px;">
          <h3 style="font-family: cursive; font-size: 40px;">Hello, Beautiful Human!</h3>
          <p style="font-family: cursive; font-size: 15px;">What do you want to do today?</p>
        </div>
        <div style="flex-shrink: 0; margin-right: 20px;">
          <img src="https://s3-alpha-sig.figma.com/img/d01b/50d4/5114a5cef6f889c35a61dc3081ff132a?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=chPpGFRhdTuANvGrLoDx~0CMxspjlNtST3wkA1f48ALA7OI9iO5Op46v~IJY3uzU0HgM~WC-oLoEsG2WWiPEmrEcwcZ4eA2UOZIBmkSD85RhQLrnj4iCib7TiI4qyqazmSbBViYdawCUZPtQFD0ls-3ZA~Ed3Yg4hffJ8WyyhU78LIzk9UPc4II~IREM0Q5qW8sDE-k5~R6qQzBsFlCGCo4mtSHXl~0RAV~gL6IM77z1C8p1cDNngzrPd25S5JgI3DfCL2YaJeJ1oJhOXZoRJo6oPrvyGA3GlV~NXrKrer4J3BNIUe894y1VzLLoCJwyPN7F5Db04X3yMsxlEwxPhQ__" alt="Beautiful Image" style="height: 250px; width: 300px;">
        </div>
      </div>

      <div class="task-header">
        <h3 style="font-family:cursive;font-weight:bold">Today's tasks</h3>
        <button @click="deleteAllTasks" class="delete-all-button">
          Delete All
        </button>
      </div>
      <ul class="task-list">
        <li v-for="(task, index) in tasks" :key="index" :class="{'task-item': true, 'completed': task.completed}">
          <input type="checkbox" v-model="task.completed" :disabled="task.completed" @change="handleTaskCompletion(task, index)">
          {{ task.title }} - {{ task.description }}
        </li>
      </ul>
    </div>
    <div style="width:50%" class="task-stats">
      <div class="completed-task">
        <div class="checkbox-container" @click="toggleChecked(popupContent)">
          <div class="checkbox" @click="toggleChecked(popupContent)">✔</div>
        </div>
        <p style="font-family:cursive;font-weight:bold;color:white;font-size: 15px">{{ completedPercentage }}%</p>
        <p style="font-family:cursive;font-weight:bold;color:white;font-size: 15px">Completed Tasks</p>
      </div>
      <div class="active-task">
        <font-awesome-icon icon="clock" />
        <p style="font-family:cursive;font-weight:bold;color:white;font-size: 15px">{{ uncompletedPercentage }}%</p>
        <p style="font-family:cursive;font-weight:bold;color:white;font-size: 15px">Active Tasks</p>
      </div>
    </div>
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <div class="inputs-wrapper">
          <input type="text" v-model="newTaskTitle" placeholder="Add title" @keyup.enter="addTask" />
          <textarea class="textarea-bottom-border" v-model="newTaskDescription" placeholder="Add description" @keyup.enter="addTask" rows="4"></textarea>
        </div>
        <div class="buttons-wrapper">
          <button @click="toggleModal" class="cancel-button">Cancel</button>
          <button @click="addTask" class="save-button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Dashboard",
  
  data() {
    return {
      tasks: [],
      isModalVisible: false,
      newTaskTitle: "",
      newTaskDescription: "",
      currentView: "Dashboard",
    };
  },
  computed: {
    completedPercentage() {
      const completedTasks = this.tasks.filter(task => task.completed).length;
      const totalTasks = this.tasks.length;
      return totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;
    },
    uncompletedPercentage() {
      const uncompletedTasks = this.tasks.filter(task => !task.completed).length;
      const totalTasks = this.tasks.length;
      return totalTasks > 0 ? ((uncompletedTasks / totalTasks) * 100).toFixed(2) : 0;
    },
  },
  methods: {
    loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks).map(task => ({ ...task, completed: task.completed }));
      } else {
        this.fetchTasks();
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    fetchTasks() {
      axios.get('http://localhost:5174/tasks')
        .then(response => {
          this.tasks = response.data.map(task => ({ ...task, completed: task.completed === 1 }));
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        })
        .catch(error => console.error('Error fetching tasks:', error));
    },
    addTask() {
      if (!this.newTaskTitle.trim() || !this.newTaskDescription.trim()) {
        alert("Both title and description must be filled out.");
        return;
      }
      const task = { title: this.newTaskTitle, description: this.newTaskDescription, completed: false };
      axios.post('http://localhost:5174/tasks', task)
        .then(() => {
          this.fetchTasks();
          this.newTaskTitle = '';
          this.newTaskDescription = '';
          this.toggleModal();
        })
        .catch(error => {
          console.error('Failed to add task:', error);
          alert('Failed to add task: ' + error.message);
        });
    },
    handleTaskCompletion(task, index) {
      if (task.completed) return;
      if (confirm("Are you sure you want to mark this task as completed?")) {
        task.completed = true;
        this.$set(this.tasks, index, task);
        this.saveTasks();

        axios.put(`http://localhost:5174/tasks/${task.id}`, { completed: true })
          .then(() => console.log('Task completion status updated'))
          .catch(error => console.error('Failed to update task:', error));
      }
    },
    deleteAllTasks() {
      if (!confirm("Are you sure you want to delete all tasks?")) return;
      
      const deletePromises = this.tasks.map(task => 
        axios.delete(`http://localhost:5174/tasks`)
      );

      Promise.all(deletePromises)
        .then(() => {
          this.tasks = [];
          alert("All tasks have been deleted.");
        })
        .catch(error => {
          console.error('Error deleting tasks:', error);
          alert('Failed to delete tasks: ' + error.message);
        });
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      axios.put(`http://localhost:5174/tasks/${task.id}`, { completed: task.completed })
        .then(() => console.log('Task completion status updated'))
        .catch(error => console.error('Failed to update task:', error));
    },
  },
  mounted() {
    this.loadTasksFromLocalStorage();
  },
};
</script>


<style scoped>
.container {
  padding-top: 20px;
  display: flex;
  padding-bottom: 20px;
}
.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
  height: 100vh;
}
.menu-item {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  text-decoration: none;
  color: black;
  border-radius: 5px;
}
.menu-item:hover,
.menu-item.active {
  background-color: #ccc;
}
.menu-item.active {
  background-color: #edb040;
}
.content {
  flex-grow: 1;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
.add-task-button {
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 7px 10px;
  height: 36px;
}
.add-task-button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.plus-sign {
  background-color: #ba5112;
  padding: 2px 5px;
  border-radius: 50%;
  color: white;
  margin-left: 10px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}
.inputs-wrapper {
  display: flex;
  flex-direction: column;
}

.inputs-wrapper input {
  border: none;
  margin-bottom: 8px; /* Optional: adds spacing between the inputs */
  box-shadow: 0px 4px 4px -4px rgba(0, 0, 0, 0.3); /* Horizontal offset, vertical offset, blur radius, spread radius, color */
  width: 100%; /* Ensures the input takes the full container width */
  padding: 8px; /* Adds some padding inside the input for better text visibility */
  box-sizing: border-box; /* Ensures padding doesn't affect overall dimensions */
}

input::placeholder,
textarea::placeholder {
  color: #b5b5b5; /* Grey color for the placeholder text */
  opacity: 1; /* Ensures the color isn't rendered with lower opacity */
}

/* Maintain styles for .textarea-bottom-border */
.textarea-bottom-border {
  border: none; /* Removes all default borders */
  border-bottom: 1px solid #ccc; /* Adds a solid border to the bottom only */
  width: 100%; /* Ensures the textarea takes the full container width */
  padding: 8px; /* Adds some padding inside the textarea for better text visibility */
  box-sizing: border-box;
  margin-bottom: 20px;
}

/* Specific class for the textarea with only a bottom border */
.textarea-bottom-border {
  border: none; /* Removes all default borders */
  border-bottom: 1px solid #ccc; /* Adds a solid border to the bottom only */
  width: 100%; /* Ensures the textarea takes the full container width */
  padding: 8px; /* Adds some padding inside the textarea for better text visibility */
  box-sizing: border-box;
  margin-bottom: 20px;
}

.buttons-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Centers the buttons within the wrapper */
  gap: 15px; /* Adds space between the buttons */
}

.cancel-button {
  border: 2px solid #edb046;
  border-radius: 5px;
  background-color: white;
  height: 33px;
  width: 76px;
  padding: 0 15px; /* Adds padding to the sides of the button for better touch area */
  cursor: pointer; /* Makes the mouse cursor indicate a clickable item */
}

.save-button {
  border: none;
  border-radius: 5px;
  background-color: #edb046;
  height: 35px;
  width: 77px;
  padding: 0 15px; /* Adds padding to the sides of the button for better touch area */
  cursor: pointer; /* Makes the mouse cursor indicate a clickable item */
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 500px;
}

.task-item:hover {
  background-color: #e2e2e2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.task-checkbox {
  margin-right: 10px; /* Space between checkbox and task text */
}

/* Optionally, styling when a task is completed */
.task-item.completed {
  color: #a0a0a0; /* Grayed out text color */
}

.task-checkbox {
  cursor: pointer; /* Ensures the checkbox cursor is a pointer, indicating clickability */
  opacity: 1; /* Ensure the checkbox is fully visible */
  position: relative; /* Ensures the checkbox is not accidentally positioned behind another element */
  z-index: 1; /* Ensure the checkbox is above other elements */
}
.completed {
  background-color: #edb046; /* Background color for completed tasks */
  color: #a0a0a0;
}
.content p {
  color: #333;
  font-size: 1.1em;
}
.completed-task {
  background-color: #ba5112;
  height: 90px;
  width: 110px;
}
.delete-all-button {
  background-color: white; /* Red color to indicate a destructive action */
  color: #ba5112;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  float: right; /* Positions the button to the right of the h3 element */
  margin-right: 5px; /* Provides some spacing from the right edge */
  padding-top: 30px;
  font-family: cursive;
}

.delete-all-button:hover {
  background-color: #F0F0F0; /* Darker red on hover for better user feedback */
  padding-top:5px;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items vertically in the center */
  padding: 10px 0; /* Optional: Adds some padding around the header */
}

h3 {
  font-weight: bold;
  margin: 0; /* Removes default margin to ensure proper alignment */
}

.delete-all-button {
  background-color: white;
  color: #ba5112;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-all-button:hover {
  background-color: #F0F0F0; /* Slightly darker on hover for better user feedback */
}
.task-stats {
  padding: 10px 0;
  display: flex;
  flex-direction: column; /* Change to column layout */
  align-items: center;
  padding-top: 430px;
}

.completed-task, .active-task {
  background-color: #ba5112;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 10px; /* Add margin between sections */
}

.active-task {
  background-color: #edb046;
  border-radius: 10px;
  height: 150px;
  width: 110px;
}
.clock-icon {
  margin-right: 5px;
}
.completed-task {
    position: relative;
    color: white;
    background-color: #ba5112; /* Example background color */
    padding: 20px;
    border-radius: 10px;
    height: 150px;
}

.checkbox-container {
    position: relative;
    width: 30px;
    height: 30px;
    border: 2px solid white;
    border-radius: 50%; /* Makes it circular */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.task-item.completed {
  background-color: #edb040; /* Updated color when task is completed */
  text-decoration: line-through;
  color: #a0a0a0;
}

</style>
