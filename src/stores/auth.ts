import { defineStore } from 'pinia';
import { registerUser, loginUser } from '../api'; // Importa le funzioni API
import { useStorage } from '@vueuse/core';
import {jwtDecode} from 'jwt-decode';
import { ITokenPayload } from '@/api/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useStorage('token', ''),
  }),
  getters: {
    getTokenPayload(state): ITokenPayload {
      try {
        return jwtDecode<ITokenPayload>(state.token)
      } catch (error) {
        console.warn('Token not found');
        return { username: '', id: '', iat: 0, exp: 0 };
      }
    },
    isAuthenticated(): boolean {
      return this.getTokenPayload.id !== ''
    },
    getUsername(): string{
      return this.getTokenPayload.username
    },
    getUserId(): string{
      return this.getTokenPayload.id
    }
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
        return response.data
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
        this.token = response.data.token;  
        return response.data
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred during login.');
      }
    },
    /**
     * Logs out the current user by clearing the user object and setting the error to null.
     */
    logout() {
      this.token = ''
    }
  },
});
