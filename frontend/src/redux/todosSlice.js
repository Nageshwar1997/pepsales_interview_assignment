import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  inProgress: [],
  completed: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      // console.log(state.todos)
    },

    setInProgress: (state, action) => {
      state.inProgress = action.payload;
      // console.log(state.inProgress);
    },

    setCompleted: (state, action) => {
      state.completed = action.payload;
      // console.log(state.completed);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodos, setInProgress, setCompleted } = todosSlice.actions;

export default todosSlice.reducer;
