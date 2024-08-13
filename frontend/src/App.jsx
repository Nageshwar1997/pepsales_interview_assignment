/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import Context from "./context/index.context";
import { useDispatch } from "react-redux";
import { setCompleted, setInProgress, setTodos } from "./redux/todosSlice";
import { Toaster } from "react-hot-toast";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    const response = await fetch(
      "https://pepsales-interview-assignment-backend.vercel.app/todos"
    );
    const data = await response.json();

    const todoResponse = await data.filter((todo) => todo.status === "todos");
    dispatch(setTodos(todoResponse));

    const inProgressResponse = await data.filter(
      (todo) => todo.status === "inprogress"
    );
    dispatch(setInProgress(inProgressResponse));

    const completedResponse = await data.filter(
      (todo) => todo.status === "completed"
    );
    dispatch(setCompleted(completedResponse));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster position="top-right" />
        <Context.Provider value={{ fetchTodos }}>
          <div className="bg-slate-100 w-full h-[100vh] overflow-hidden flex flex-col items-center gap-8 pt-3 lg:gap-16 lg:pt-6 px-4 lg:px-0">
            <CreateTask />
            <ListTasks />
          </div>
        </Context.Provider>
      </DndProvider>
    </>
  );
}

export default App;
