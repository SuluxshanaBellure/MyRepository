// store.js
import { reactive } from 'vue';

export const state = reactive({
  username: ''
});

export function setUsername(newUsername) {
  state.username = newUsername;
}

export function clearUsername() {
  state.username = '';
}
