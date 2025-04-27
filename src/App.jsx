import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load todos from localStorage when app starts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === "") return; // don't add empty todos

    if (editingId) {
      setTodos(todos.map(item =>
        item.id === editingId ? { ...item, todo } : item
      ));
      setEditingId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const toEdit = todos.find(item => item.id === id);
    setTodo(toEdit.todo);
    setEditingId(id);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 w-[80vw] rounded-xl bg-violet-100 p-5 min-h-[90vh]">
        <div className="addTodo mb-6">
          <h2 className='font-bold text-2xl mb-3'>Add a Todo</h2>
          <div className="flex space-x-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter a todo..."
              className='w-2/3 border border-violet-800 rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-violet-500'
            />
            <button
              onClick={handleAdd}
              className='text-white font-bold rounded-md bg-violet-800 hover:bg-violet-950 px-6 py-2 text-sm'>
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <h2 className='text-2xl font-bold mb-4'>Your Todos</h2>
        <div className="todos flex flex-col space-y-3">
          {todos.length === 0 ? (
            <div className="text-gray-500">No todos yet! Add something.</div>
          ) : (
            todos.map(item => (
              <div key={item.id} className="todo flex justify-between items-center w-full border border-indigo-600 p-3 rounded-md bg-white">
                <div className="flex items-center space-x-3">
                  <input
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-5 h-5"
                  />
                  <div className={item.isCompleted ? "line-through text-lg text-gray-400" : "text-lg text-black"}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='text-white font-bold rounded-md bg-green-600 hover:bg-green-700 px-4 py-1 text-sm'>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='text-white font-bold rounded-md bg-red-600 hover:bg-red-700 px-4 py-1 text-sm'>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
