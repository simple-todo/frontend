import apisauce from "apisauce";

const create = (baseURL = "https://pcdp2m10n8.execute-api.ap-southeast-1.amazonaws.com/dev") => {
  const api = apisauce.create({
    baseURL,
    timeout: 15000,
  });

  const login = (username, password) => api.post("/api/user-management/login", { username, password });

  const register = (username, password, full_name) =>
    api.post("/api/user-management/register", { username, password, full_name });

  const getTask = (token) => api.get("/api/todo-management/todos", {}, { headers: { Authorization: token } });

  return {
    login,
    register,
    getTask,
  };
};

export default {
  create,
};
