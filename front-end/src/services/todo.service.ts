import axios from 'axios';
import { Constant } from '../constants';
import { ITodo } from '../types';

class TodoService {
  getTodos() {
    console.log('Constant', Constant);

    return axios.get(`${Constant.api}/todos`);
  }

  getTodosByCompleted(status?: boolean) {
    return axios.get(`${Constant.api}/todos?status=${status}`);
  }

  addTodo(newTodo: ITodo) {
    return axios.post(`${Constant.api}/todos`, newTodo);
  }

  updateTodo(todoId: number, updatedTodo: ITodo) {
    return axios.put(`${Constant.api}/todos/${todoId}`, updatedTodo);
  }

  removeTodo(todoId: number) {
    return axios.delete(`${Constant.api}/todos/${todoId}`);
  }
}

export default new TodoService();