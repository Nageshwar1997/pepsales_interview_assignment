/* eslint-disable react/prop-types */
import { useContext } from "react";
import toast from "react-hot-toast";
import Context from "../context/index.context";
import { useDrag } from "react-dnd";
import SummaryApi from "../common/index.api";

const Task = ({ task }) => {
  const { fetchTodos } = useContext(Context);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { _id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`${SummaryApi.deleteTodo.url}/${id}`, {
        method: SummaryApi.deleteTodo.method,
      });

      if (response.ok) {
        fetchTodos();
        toast.success("Task Deleted successfully");
      }
      if (!response.ok) {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message || "Failed to delete task");
    }
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-4 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      } bg-white flex justify-between items-center`}
    >
      <p className="text-lg">{task?.name}</p>
      <button
        className="text-slate-400 hover:text-red-500 transition-colors"
        onClick={() => handleRemove(task._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Task;
