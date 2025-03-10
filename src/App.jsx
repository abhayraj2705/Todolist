import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [show, setshow] = useState(true)

  useEffect(() => {
    
  let todosstirng=localStorage.getItem("todos")

  if(todosstirng)
  {

    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }

   
  }, [])
  

  let savels=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  
  const handeladd=()=>{
    setTodos([...todos,{id:uuidv4(),  todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
    savels()
  }
  
  const handelchange=(e)=>{
    
    setTodo(e.target.value)
  }
  
  const handelcheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    setTodo(newtodos)
    savels()
  }
  
  const handeldelete=(e,id)=>{
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    savels()
    
  }

  const handeledit = (e,id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    savels()
  }

  const togglefinished=(e)=>{
  setshow(!show)
  }
  
  
  return (
    <>
    <Navbar/>

    <div className="container mx-auto bg-violet-100 rounded-xl my-5 p-5 min-h-[80vh] w-1/2">

        <h1 className='font-bold text-center text-xl'>iTask - Mange your todos at one place</h1>
      <div className="addtodo my-5 flex-col justify-center items-center text-center">
        <h2 className='font-bold text-xl text-center'>Add a Todo</h2>
        <input  onChange={handelchange} type="text" value={todo} className='w-full p-2 rounded-xl my-3 '/>
        <button onClick={handeladd} disabled={todo.length<=3} className='bg-violet-700 disabled:bg-violet-700 hover:bg-violet-900 text-sm font-bold p-6 py-1 text-white rounded-md  my-4 w-full '>Save</button>
      </div>
      <h1 className='font-bold text-xl'>Your Todos</h1>
      <input onChange={togglefinished} type="checkbox" checked={show}  className='my-4'/> Show finished
      <div className="todos">

        {todos.length===0 && <div className='m-5' >No todos to display</div> }

        {todos.map(item=>{

        
        return(show||!item.isCompleted) && <div key={item.id} className="todo flex space-x-7 justify-between w-full my-3">

          <div className='flex gap-5 '>
            <input name={item.id} onChange={handelcheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>

            <div className="buttons flex h-fu">
              <button onClick={(e)=>{handeledit(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 text-sm font-bold p-2 py-1 text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handeldelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 text-sm font-bold p-2 py-1 text-white rounded-md mx-1'><MdDelete />
              </button>
            </div>
           </div>
      })}
      </div>
    </div>

    </>
  )
}

export default App
