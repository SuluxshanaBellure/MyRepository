<template>
  <div class="container">
    <div class="sidebar">
      <button @click="toggleModal" class="add-task-button">Add Task <span class="plus-sign">+</span></button>
      <ul>
        <router-link to="/dashboard" tag="li" :class="{ 'menu-item': true, active: currentView === 'Dashboard' }" @click="currentView = 'Dashboard'">Dashboard</router-link>
        <router-link to="/active" tag="li" :class="{ 'menu-item': true, active: currentView === 'Active' }" @click="currentView = 'Active'">Active</router-link>
        <router-link to="/completed" tag="li" :class="{ 'menu-item': true, active: currentView === 'Completed' }" @click="currentView = 'Completed'">Completed</router-link>
      </ul>
    </div>
    <div class="content">
      <h2 style="font-weight:bold;font-family:cursive;margin-bottom:20px">Active</h2>
      <ul class="task-list">
        <h4 style="font-weight:bold;font-family:cursive;margin-bottom:30px">Today's active tasks</h4>
        <li v-for="(task, index) in activeTasks" :key="index" class="task-item"
         @mouseover="showPopup(task, $event)" @mouseleave="hidePopup">
          <div class="checkbox-wrapper">
    <div class="checkbox" @click="toggleChecked(popupContent)">✔</div>
        <div class="checkmark" style="background-color: #EDB040;"></div>
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
    </div>
    <div v-if="popupVisible" :style="{top: popupY + 'px', left: popupX + 'px'}" class="popup">
      <h3>{{ popupContent.title }}</h3>
      <div class="description">
        <strong>Description:</strong>
        <p>{{ popupContent.description }}</p>
      </div>
    <div class="actions">
  <div class="checkbox" @click="toggleChecked(popupContent)">
    ✔
  </div>
  <i class="fas fa-edit edit-icon" @click="editTask(popupContent.id)"></i>
  <i class="fas fa-trash-alt trash-icon" @click="deleteTask(popupContent.id)"></i>
</div>

    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  name: 'Active',
  data() {
    return {
      tasks: [],
      currentView: 'Active',
      isModalVisible: false,
      newTaskTitle: '',
      newTaskDescription: '',
      popupVisible: false,
      popupContent: {},
      popupX: 0,
      popupY: 0
    };
  },
  computed: {
    activeTasks() {
      return this.tasks.filter(task => !task.completed);
    }
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    showPopup(task, event) {
      this.popupContent = task;
      this.popupX = event.clientX;
      this.popupY = event.clientY;
      this.popupVisible = true;
    },
    hidePopup() {
      this.popupVisible = false;
    }
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
.task-item.completed {
  background-color: #d3d3d3; /* Light grey background for completed tasks */
  color: #666; /* Darker text for completed tasks */
  text-decoration: line-through; /* Strikethrough style */
}
.task-item {
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
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

.popup {
  position: fixed;
  padding: 16px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: cursive;
  height:200px;
  width: 200px; /* Ensure it fits smaller screens */
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
  border:1px solid #EDB046;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   border-radius: 3px;
   color:#EDB046;
}
.checkbox{
    width: 20px;
  height: 20px;
  border:1px solid #EDB046;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   border-radius: 3px;
   color:#EDB046;
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
.popup .checkbox:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when the checkbox is checked */
.popup .checkbox:checked:after {
  display: block;
}

/* Style the checkmark icon */
.popup .checkbox:checked:after {
  content: "";
  width: 10px; /* Adjust width of checkmark */
  height: 10px; /* Adjust height of checkmark */
  border: 2px solid white; /* White checkmark color */
  border-width: 0 2px 2px 0;
  transform: rotate(45deg); /* Rotate checkmark */
}

.edit-icon,
.trash-icon {
  margin-left: 10px; /* Adjust the margin as needed */
  cursor: pointer; /* Change cursor to indicate clickable */
  color: #EDB046; /* Set the color of the icons */
}

</style>
