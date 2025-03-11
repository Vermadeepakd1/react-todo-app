
import Navbar from './components/Navbar'
import './App.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState('');
  const [todos, settodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let t = localStorage.getItem('todos');
    if (t) {
      settodos(JSON.parse(t));
    }
  }
    , []);

    useEffect(() => {
      if (todos.length > 0) {  // Prevent overwriting localStorage with an empty array on first render
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    }, [todos]);  


  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }
  
  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id);
    setTodo(t[0].todo);
    settodos(todos.filter(item => item.id !== id)); 
  }

  const handleDelete = (e, id) => {
    settodos(todos.filter(item => item.id !== id));
  }

  const handleAdd = () => {
    if (todo.trim()) {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(todo => todo.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl shadow-lg p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='text-3xl font-bold text-center'>DoIt ToDo App</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex gap-5">
          <input onChange={handleChange} value={todo} type="text" placeholder="Enter a new todo" className=' border border-gray-300 rounded p-2 w-full' />
          <button onClick={handleAdd} className=" bg-violet-800 hover:bg-violet-950 text-white p-4 py-2 rounded  text-sm font-bold">Add Todo</button>
          </div>
          
        </div>
        <div className="flex items-center">
          <input type="checkbox" onChange={toggleFinished} checked={showFinished} />
          <label className="ml-2">Show Finished</label>
        </div>
        <hr className='opacity-15 mx-auto my-3'/>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="text-center text-lg">No Todos</div>}

          {todos.map(item => (
            (showFinished || !item.isCompleted) &&
            <div key={item.id} name={item.id} className="todo flex w-full justify-between items-center my-2 h-auto">
              <div className='flex gap-5 items-center w-full'>
                <input className='my-4' onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? 'line-through' : ''}>
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className=" bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 rounded m-0 mx-1  text-sm font-bold"><MdEdit />
                </button>
                <button onClick={(e) => handleDelete(e, item.id)} className=" bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 rounded m-0 mx-1  text-sm font-bold"><MdDelete />
                </button>
              </div>      
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
