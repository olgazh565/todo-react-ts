import { useEffect } from "react";
import { Form } from "./Components/Form/Form";
import { Login } from "./Components/Login/Login";
import { Logout } from "./Components/Logout/Logout";
import { Table } from "./Components/Table/Table";
import { Title } from "./Components/Title/Title";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { getTodos } from "./store/todosSlice";

function App() {
  const {user} = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTodos(user));
    }
  }, [user, dispatch]);

  return (
    <div className="container">
      <Login />
      <Title />
      <Form />
      <Table />
      <Logout />
    </div>
  );
}

export default App;
