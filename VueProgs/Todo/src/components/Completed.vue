<template>
  <div class="container">
    <div class="sidebar">
      <button @click="toggleModal" class="add-task-button">Add Task <span class="plus-sign">+</span></button>
      <ul>
        <router-link to="/dashboard" tag="li" class="menu-item" :class="{ active: currentView === 'Dashboard' }">Dashboard</router-link>
        <router-link to="/active" tag="li" class="menu-item" :class="{ active: currentView === 'Active' }">Active</router-link>
        <router-link to="/completed" tag="li" class="menu-item" :class="{ active: currentView === 'Completed' }">Completed</router-link>
      </ul>
    </div>
    <div class="content">
      <h2 style="font-weight:bold;font-family:cursive;margin-bottom:20px">Completed</h2>
      <ul class="task-list">
        <h4 style="font-weight:bold;font-family:cursive;margin-bottom:30px">Today's completed tasks</h4>
  <li v-for="(task, index) in completedTasks" :key="index" class="task-item completed"
      @mouseover="showPopup(task, $event)" @mouseleave="hidePopup">
      <div class="checkbox-wrapper">
      <input type="checkbox" class="checkbox" @click="toggleChecked(task)" :checked="task.completed">
      <div class="checkmark"></div>
    </div>
  <span class="task-title" style="padding-left: 20px;">{{ task.title }} - {{ task.description }}</span>
  </li>
      </ul>
        <div v-if="isModalVisible" class="modal">
        <div class="modal-content">
          <div class="inputs-wrapper">
            <input type="text" v-model="newTaskTitle" placeholder="Add title" @keyup.enter="processAddTask" />
            <textarea class="textarea-bottom-border" v-model="newTaskDescription" placeholder="Add description" @keyup.enter="processAddTask" rows="4"></textarea>
          </div>
          <div class="buttons-wrapper">
            <button @click="toggleModal" class="cancel-button">Cancel</button>
            <button @click="processAddTask" class="save-button">Save</button>
          </div>
        </div>
      </div>
     <div v-if="popupVisible" :style="{top: popupY + 'px', left: popupX + 'px'}" class="popup">
  <h3>{{ popupContent.title }}</h3>
  <div class="description">
    <strong>Description:</strong>
    <p>{{ popupContent.description }}</p>
  </div>
   <div class="actions">
    <div class="checkbox" @click="toggleChecked(popupContent)">✔</div>
    <i class="fas fa-trash-alt trash-icon" @click="deleteTask(popupContent.id)"></i>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Completed',
  data() {
    return {
      completedTasks: [],
      currentView: 'Completed',
      isModalVisible: false,
      popupVisible: false,
    popupContent: {},
    popupX: 0,
    popupY: 0
    };
  },
  methods: {
    loadCompletedTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      this.completedTasks = tasks.filter(task => task.completed);
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    showPopup(task, event) {
  this.popupContent = task;
  this.popupX = event.clientX + 10; // Adds a small offset to the X coordinate
  this.popupY = event.clientY + 10; // Adds a small offset to the Y coordinate
  // Calculate the number of days since the task was added
      const daysAgo = Math.floor((Date.now() - new Date(task.created_at)) / (1000 * 60 * 60 * 24));
      
      // Add the number of days to the popup content
      this.popupContent.daysAgo = daysAgo;
  this.popupVisible = true;
},
  hidePopup() {
    this.popupVisible = false;
  },
  },
  mounted() {
    this.loadCompletedTasks();
  },
  toggleChecked(task) {
    task.completed = !task.completed;
    // Code to update the task in your data store or backend
  },
 deleteTask(taskId) {
    axios.delete(`http://localhost:5174/tasks/${taskId}`)
      .then(response => {
        // Handle the response from the server
        console.log('Task deleted successfully:', response.data);
        // Optionally remove the task from the local list without refreshing
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        // Additional UI feedback or state updates can go here
      })
      .catch(error => {
        // Handle errors if the API call failed
        console.error('Failed to delete task:', error);
        alert('Failed to delete task');
      });
  }
}
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
  display:block;
  margin-bottom: 10px;
  padding: 10px;
  text-decoration: none;
  color: black;
  border-radius: 5px;
}
.menu-item:hover, .menu-item.active {
  background-color: #ccc;
}
.menu-item.active {
  background-color: #EDB040;
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
  background-color: #BA5112;
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
  box-shadow: 0px 4px 4px -4px rgba(0,0,0,0.3); /* Horizontal offset, vertical offset, blur radius, spread radius, color */
  width: 100%; /* Ensures the input takes the full container width */
  padding: 8px; /* Adds some padding inside the input for better text visibility */
  box-sizing: border-box; /* Ensures padding doesn't affect overall dimensions */
}

input::placeholder,
textarea::placeholder {
  color: #B5B5B5; /* Grey color for the placeholder text */
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
  border: 2px solid #EDB046;
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
  background-color: #EDB046;
  height: 35px;
  width: 77px;
  padding: 0 15px; /* Adds padding to the sides of the button for better touch area */
  cursor: pointer; /* Makes the mouse cursor indicate a clickable item */
}

.task-item {
  background-color: #ffffff; /* Light background for better contrast with the shadow */
  padding: 15px; /* Sufficient padding around the text */
  border-radius: 10px; /* Rounded corners */
  margin-bottom: 10px; /* Space between items */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  display: flex;
  transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transitions for hover effects */
  width: 300px; /* Adjust width based on your layout needs */
  /* Add margin to create space between checkbox and task title */
  margin-left: 10px; 
}

.task-item:hover {
  background-color: #f5f5f5; /* Slightly lighter on hover for interactive effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
}

.task-item.completed {
  background-color: #edb040; /* Distinct background color for completed tasks */
  color: #333; /* Ensuring readability */
}

.popup {
  position: fixed;
  padding: 16px;
  background-color: #edb040;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: cursive;
  max-width: 300px; /* Ensure it fits smaller screens */
}

.popup .actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px; /* Space from the description to actions */
}

.popup .checkbox {
  width: 20px;
  height: 20px;
  background-color: #BA5112;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%; /* Circular checkbox */
}

.trash-icon {
  color: #BA5112;
  cursor: pointer;
}

.popup h3, .popup .description, .popup .actions {
  padding: 0;
  margin: 0 0 8px; /* Spacing for visual separation */
}

.popup .description strong {
  font-weight: bold;
}

.popup .description p {
  margin-top: 4px; /* Small top margin for alignment under the heading */
}

.task-list li:hover {
  cursor: pointer;
  background-color: #edb040; /* Provides a consistent highlight on hover */
}

.task-item {
  transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transition for hover effects */
}

.task-item:hover {
  background-color: #f0c040; /* Lighter or different color on hover for interaction feedback */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Enhances depth perception on hover */
}
.checkbox-wrapper {
  position: relative;
  display: inline-block;
  margin-right: 10px; /* Adjust margin as needed */

}

.checkbox {
  display: none; /* Hide the actual checkbox */
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #BA5112; /* Checkbox background color */
  border-radius: 3px; /* Rounded corners */
}

/* Style the checkmark (hidden by default) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when the checkbox is checked */
.checkbox:checked + .checkmark:after {
  display: block;
}

/* Style the checkmark icon */
.checkbox:checked + .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

</style>
