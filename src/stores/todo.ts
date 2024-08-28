import { defineStore } from 'pinia';
import * as api from '../api/index'; // Importa le funzioni API
import {type ITodo} from '@/api/types';
import {useAuthStore} from './auth'

type IState = { 
  userTodoList: ITodo[]
  userTodo: ITodo | undefined;
}

export const useTodoStore = defineStore('todo', {
  state: (): IState => ({
    userTodoList: [],
    userTodo: undefined,
  }),
  getters: {
    getUserId: () => useAuthStore().getUserId
  },
  actions: {
  /**
   * Create a new todo for a user
   * @param userId - The user's id
   * @param data - The todo data
   * @throws {Error} - If the server returns an error
   */
    async createUserTodo(data: {title:string, content: string}) {
      try {
        const userId = this.getUserId;
        if (!userId) {
          console.warn('User ID not found');
          return;
        };
        await api.createUserTodo(userId, data);
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred while creating user todo.');
      }
    },
    /**
     * Get a specific user's todo
     * @param userId - The user's id
     * @param todoId - The todo's id
     * @throws {Error} - If the server returns an error
     */
    async getUserTodo(todoId: string) {
      try {
        const userId = this.getUserId;
        if (!userId) {
          console.warn('User ID not found');
          return;
        };
        const response = await api.getUserTodo(userId, todoId);
        this.userTodo = response.data;
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred while fetching user todo.');
      }
    },

    /**
     * Retrieves all todos for a specific user
     * @param {string} userId - The user's id
     * @return {Promise<void>} - Returns a Promise that resolves when the todos are fetched.
     * @throws {Error} - If the server returns an error.
     */
    async getAllUserTodos() {
      try {
        const userId = this.getUserId;
        if (!userId) {
          console.warn('User ID not found');
          return;
        };
        const response = await api.getAllUserTodos(userId);
        this.userTodoList = response.data;
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred while fetching user todo.');
      }
    },

    /**
     * Update a user's todo
     * @param userId - The user's id
     * @param todoId - The todo's id
     * @param data - The updated todo data
     * @throws {Error} - If the server returns an error
     */
    async updateUserTodo(todoId: string, data: {title:string, content: string}) {
      try {
        const userId = this.getUserId;
        if (!userId) {
          console.warn('User ID not found');
          return;
        };
        await api.updateUserTodo(userId, todoId, data);
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred while updating user todo.');
      }
    },

    /**
     * Delete a user's todo
     * @param userId - The user's id
     * @param todoId - The todo's id
     * @throws {Error} - If the server returns an error
     */
    async deleteUserTodo(todoId: string) {
      try {
        const userId = this.getUserId;
        if (!userId) {
          console.warn('User ID not found');
          return;
        };
        await api.deleteUserTodo(userId, todoId);
      } catch (error: any) {
        alert(error.response?.data?.message || 'An error occurred while deleting user todo.');
      }
    }
  }
});
