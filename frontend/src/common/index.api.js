import process from "../env";

const backendUrl = process.env.BACKEND_URL;
const SummaryApi = {
  getAllTodos: {
    url: `${backendUrl}/all-todos`,
    method: "GET",
  },

  createTodo: {
    url: `${backendUrl}/create-todo`,
    method: "POST",
  },

  updateTodo: {
    url: `${backendUrl}/update-todo`,
    method: "PATCH",
  },

  deleteTodo: {
    url: `${backendUrl}/delete-todo`,
    method: "DELETE",
  },
};

export default SummaryApi;
