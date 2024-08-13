/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { useContext } from "react";
import Context from "../context/index.context";

const Section = ({ status }) => {
  const { fetchTodos } = useContext(Context);

  const { todos, inProgress, completed } = useSelector((state) => state.todos);

  const addItemToSection = async (id) => {
    try {
      const response = await fetch(
        `https://pepsales-interview-assignment-backend.vercel.app/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (response.ok) {
        fetchTodos();
        toast.success("Task moved successfully");
      } else {
        toast.error("Failed to move task");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message || "Failed to move task");
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todos";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "todos") {
    text = "Todos";
    bg = "bg-slate-500";
    tasksToMap = todos;
  }

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  return (
    <div
      ref={drop}
      className={`w-full h-[79vh] lg:w-1/3 rounded-md p-2 pt-0 mb-4 lg:mb-0 ${
        isOver && "bg-slate-200"
      } overflow-y-auto custom-scrollbar`}
    >
      <div className="sticky top-0 bg-white z-10">
        <Header text={text} bg={bg} count={tasksToMap.length} />
      </div>
      <div className="mt-4">
        {tasksToMap &&
          tasksToMap.map((task, index) => (
            <Task key={index + task.id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default Section;
