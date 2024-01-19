import { createSlice, nanoid } from '@reduxjs/toolkit';

export interface Item {
  id?: string;
  task: string;
  completed?: true | false;
  priority: string;
}

interface TodoState {
  user: string;
  todos: Item[];
}

const initialState: TodoState = {
  user: localStorage.getItem('userName') || '',
  todos: [],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('userName', action.payload);

    },
    getTodos(state, action) {
      const item = localStorage.getItem(action.payload);
      const result = item ? JSON.parse(item) : [];

      state.todos = result;

    },
    addTodo(state, action) {
      const { task, priority } = action.payload;
      const id = nanoid();

      state.todos.push({
        id,
        task,
        completed: false,
        priority,
      });

      localStorage.setItem(state.user, JSON.stringify(state.todos));
    },
    deleteTodo(state, action) {
      const index = state.todos.findIndex(item => item.id === action.payload);

      if (index >= 0) {
        state.todos.splice(index, 1);

        localStorage.setItem(state.user, JSON.stringify(state.todos));
      }
    },
    toggleCompleteTodo(state, action) {
      const matchingTodo = state.todos.find(todo => todo.id === action.payload)

      if (matchingTodo) {
        matchingTodo.completed = !matchingTodo.completed;
        localStorage.setItem(state.user, JSON.stringify(state.todos));
      }
    },
    editTodo(state, action) {
      const matchingTodo = state.todos.find(todo => todo.id === action.payload.id);

      if (matchingTodo) {
        matchingTodo.task = action.payload.text;
        localStorage.setItem(state.user, JSON.stringify(state.todos));
      }
    },
    logoutUser(state) {
      state.user = ''
      state.todos = [];
      localStorage.removeItem('userName');
    },
  },
});

export default todosSlice.reducer;
export const {
  loginUser,
  getTodos,
  addTodo,
  deleteTodo,
  toggleCompleteTodo,
  editTodo,
  logoutUser
} = todosSlice.actions;
