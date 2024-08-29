import axiosUserApi from './axiosUserApi';
import axiosAuthApi from './axiosAuthApi';
import { type ITodo, ILoginResponse, IRegistrationResponse } from './types';

/**
 * Registers a new user with the given username and password.
 *
 * @param {Object} data - The data for the new user.
 * @param {string} data.username - The username for the new user.
 * @param {string} data.password - The password for the new user.
 * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
 * @throws {Error} If the server returns a non-200 status code.
 */
export const registerUser = async (data: {username:string, password: string}) => {
  return axiosAuthApi.post<IRegistrationResponse>('/register', data);
};


/**
 * Logs in a user with the given username and password.
 *
 * @param {Object} data - The data for the user login.
 * @param {string} data.username - The username for the user login.
 * @param {string} data.password - The password for the user login.
 * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
 * @throws {Error} If the server returns a non-200 status code.
 */
export const loginUser = async (data: {username:string, password: string}) => {
  return axiosAuthApi.post<ILoginResponse>('/login', data);
};


/**
 * Creates a new todo for a user.
 *
 * @param {string} userId - The id of the user.
 * @param {Object} data - The data for the new todo.
 * @param {string} data.title - The title of the todo.
 * @param {string} data.content - The content of the todo.
 * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
 * @throws {Error} If the server returns a non-200 status code.
 */
export const createUserTodo = async (userId: string, data: {title:string, content: string}) => {
  return axiosUserApi.post<ITodo>(`/user/${userId}/todo`, data);
};


/**
 * Retrieves a specific user's todo
 * @param userId - The user's id
 * @param todoId - The todo's id
 * @throws {Error} - If the server returns an error
 */
export const getUserTodo = async (userId: string, todoId: string) => {
  return axiosUserApi.get<ITodo>(`/user/${userId}/todo/${todoId}`);
};


/**
 * Retrieves all todos for a specific user
 * @param {string} userId - The user's id
 * @return {Promise<AxiosResponse<any>>} A Promise that resolves to the response from the server.
 * @throws {Error} If the server returns a non-200 status code.
 */
export const getAllUserTodos = async (userId: string) => {
  return axiosUserApi.get<ITodo[]>(`/user/${userId}/todo`);
}


/**
 * Updates a specific user's todo
 * @param userId - The user's id
 * @param infoId - The todo's id
 * @param data - The updated todo data
 * @throws {Error} - If the server returns an error
 * @return {Promise<AxiosResponse<any>>} - A Promise that resolves to the response from the server.
 * @throws {Error} - If the server returns a non-200 status code.
 */
export const updateUserTodo = async (userId: string, infoId: string, data: {title:string, content: string}) => {
  return axiosUserApi.put<ITodo>(`/user/${userId}/todo/${infoId}`, data);
};


/**
 * Deletes a specific user's todo
 * @param userId - The user's id
 * @param todoId - The todo's id
 * @throws {Error} - If the server returns an error
 * @return {Promise<AxiosResponse<any>>} - A Promise that resolves to the response from the server.
 * @throws {Error} - If the server returns a non-200 status code.
 */
export const deleteUserTodo = async (userId: string, todoId: string) => {
  return axiosUserApi.delete<ITodo>(`/user/${userId}/todo/${todoId}`);
};
