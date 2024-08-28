import { defineStore } from 'pinia';
import { registerUser, loginUser } from '../api'; // Importa le funzioni API
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useStorage('user', {
      _id: '',
      username: '',
    }),
  }),
  getters: {
    isAuthenticated: (state) => state.user._id !== '',
    getUser: (state) => state.user,
    getUserId:  (state) => state.user._id,
  },
  actions: {
    /**
     * Registers a new user with the given username and password.
     *
     * @param {Object} data - The data for the new user.
     * @param {string} data.username - The username for the new user.
     * @param {string} data.password - The password for the new user.
     * @return {Promise<void>} A Promise that resolves when the user is registered.
     * @throws {Error} If the server returns a non-200 status code.
     */
    async register(data: {username:string, password: string}) {
      try {
        const response = await registerUser(data);
        this.user = {
          _id: response.data.user._id,
          username: response.data.user.username
        }
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred during registration.');
      }
    },
    /**
     * Logs in a user with the given username and password.
     *
     * @param {Object} data - The data for the user login.
     * @param {string} data.username - The username for the user login.
     * @param {string} data.password - The password for the user login.
     * @throws {Error} If the server returns a non-200 status code.
     */
    async login(data: {username:string, password: string}) {
      try {
        const response = await loginUser(data);
        this.user = {
          _id: response.data.user._id,
          username: response.data.user.username
        };
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred during login.');
      }
    },
    /**
     * Logs out the current user by clearing the user object and setting the error to null.
     */
    logout() {
      this.user = {
        _id: '',
        username: ''
      };
    }
  },
});
