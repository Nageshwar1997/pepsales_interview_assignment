import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Context from "../context/index.context";

const CreateTask = () => {
  const { fetchTodos } = useContext(Context);
  const [task, setTask] = useState({
    name: "",
    status: "todos",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.name) {
      return toast.error("Task name is required");
    }

    try {
      const response = await fetch(
        "https://pepsales-interview-assignment-backend.vercel.app/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      if (response.ok) {
        toast.success("Task created successfully");
        fetchTodos(); // Call fetchTodos after successfully creating the task
        setTask({
          name: "",
          status: "todos", // Reset status to "todo"
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to create task");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row w-full max-w-lg items-center"
    >
      <input
        type="text"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        className="border-2 border-slate-400 bg-slate-100 rounded-md mb-4 sm:mb-0 sm:mr-4 p-2 w-full"
        placeholder="Enter your task..."
      />
      <button className="bg-cyan-500 rounded-md px-6 py-2 text-white">
        Create
      </button>
    </form>
  );
};

export default CreateTask;
