import { useState, useEffect } from "react";
import { ITodo } from "./types";
import Modal from "./components/Modal";
import TodoService from "./services/todo.service";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<ITodo>({
    title: "",
    detail: "",
  });
  const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isDisablebtnAdd, setIsDisablebtnAdd] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTodo((newTodo) => ({ ...newTodo, [name]: value }));
  };

  const getTodos = async () => {
    setIsLoading(true);
    try {
      TodoService.getTodos().then((res) => {
        setTodos(res.data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodosByCompleted = (status: boolean) => async () => {
    setIsLoading(true);
    try {
      TodoService.getTodosByCompleted(status).then((res) => {
        setTodos(res.data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async () => {
    setIsLoading(true);
    setIsDisablebtnAdd(true);

    if (newTodo.title.trim().length === 0) return;

    try {
      TodoService.addTodo(newTodo).then((res) => {
        if (res.data) {
          setNewTodo({
            title: "",
            detail: "",
          });
          getTodos();
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsDisablebtnAdd(false);
    }
  };

  const updateTodo = (todo: ITodo) => async () => {
    setIsLoading(true);
    const updatedTodo = {
      ...todo,
      status: !todo.status,
    };

    try {
      TodoService.updateTodo(Number(todo.id), updatedTodo).then((res) => {
        if (res.data) {
          getTodos();
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (todo: ITodo) => {
    setIsShowModal(true);
    setTodoIdToDelete(Number(todo.id));
  };

  const removeTodo = async () => {
    if (todoIdToDelete) {
      setIsLoading(true);
      try {
        TodoService.removeTodo(todoIdToDelete).then((res) => {
          if (res.data) {
            getTodos();
            setIsShowModal(false);
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsShowModal(false);
    setTodoIdToDelete(null);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="block sticky bg-slate-500 p-3"></div>
      <div className="block md:flex">
        <div className="block md:w-80 space-y-3 p-3 pt-12">
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              Title
            </label>
            <input
              type="text"
              className="rounded p-3"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold">
              Detailed
            </label>
            <textarea
              className="rounded h-32 p-3 line-clamp-1"
              name="detail"
              value={newTodo.detail}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={addTodo} disabled={isDisablebtnAdd}>
            Add Todo
          </button>
        </div>
        <div className="block flex-1 border-l-1 border-white  p-3">
          <div className="flex justify-end space-x-3 mb-3">
            <button
              className="bg-white text-black"
              onClick={getTodosByCompleted(true)}
            >
              Show Done
            </button>
            <button onClick={getTodosByCompleted(false)}>Show Todo</button>
          </div>
          <div className="block">
            {isLoading ? (
              <>Loading...</>
            ) : (
              <ul className="space-y-5">
                {todos.map((todo) => (
                  <li key={todo.id}>
                    <div
                      className={`${
                        todo.status === true ? "bg-slate-600" : ""
                      } hover:bg-slate-400 border border-slate-300 shadow rounded p-3 transition`}
                    >
                      <h3 className="font-bold text-xl">{todo.title}</h3>
                      <p className="line-clamp-3 mb-3">{todo.detail}</p>
                      <div className="flex justify-end space-x-3">
                        <button
                          className="bg-red-400 px-3 py-1 w-32"
                          onClick={() => handleDeleteClick(todo)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-green-400 px-3 py-1 w-32"
                          onClick={updateTodo(todo)}
                        >
                          {todo.status ? "Un Mark" : "Mark done"}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {isShowModal && (
        <Modal
          message="Are you sure you want to delete this todo?"
          onConfirm={removeTodo}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default App;
