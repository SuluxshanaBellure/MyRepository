<template>
  <div>
    <!-- <HelloWorld msg="You did it!" /> -->
    <!-- <TheWelcome /> -->
    <!-- <MyComponent />  -->
    <Users/>
    <!-- <CounterComponent :counters="counterMessage" />
    <FormComponent :message="parentMessage"/>
    <Shopping/>
    <Todo />
<CustomButton>
      <template v-slot:firstSlot>
        Hello inside the button!
      </template>
      <template v-slot:secondSlot>
        Additional content below the button.
      </template>
    </CustomButton> -->
    <!-- <button @click="currentComponent = 'HomeComponent'">Home</button>
    <button @click="currentComponent = 'ProfileComponent'">Profile</button>
    <button @click="currentComponent = 'SettingsComponent'">Settings</button> -->

    <!-- Dynamic component that changes based on currentComponent -->
    <!-- <component :is="currentComponent"></component> -->
  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import MyComponent from './components/MyComponent.vue'
import CounterComponent from './components/CounterComponent.vue'
import FormComponent from './components/FormComponent.vue'
import Shopping from './components/Shopping.vue'
import Todo from './components/Todo.vue'
import CustomButton from './components/CustomButton.vue'
import HomeComponent from './components/HomeComponent.vue'
import ProfileComponent from './components/ProfileComponent.vue'
import SettingsComponent from './components/SettingsComponent.vue'
import UsersVue from './components/Users.vue'

const parentMessage="Hello message !"
const counterMessage="This is counter message!"
const currentComponent = 'HomeComponent'

</script>
