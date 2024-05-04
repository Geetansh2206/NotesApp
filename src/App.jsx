import { useEffect, useState } from 'react'
import { Navbar } from './Components/Navbar'
import { Button, Card, Divider, TextField } from '@mui/material'
import axios from 'axios';

function App() {

  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDiscription, setNewDiscription] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditItem, setCurrentEditItem] = useState("")

  // const handleAddTodo = () => {
  //   let newTodoItem = {
  //     title:newTitle,
  //     discription:newDiscription
  //    }
  //    let updatedTodoArr = [...allTodos]
  //    updatedTodoArr.push(newTodoItem)
  //    setTodos(updatedTodoArr)
  //    localStorage.setItem('Todolist' , JSON.stringify(updatedTodoArr))
  // }
  // const handleDeleteTodo = (index)=>{
  //   let reduceTodo = [...allTodos]
  //   reduceTodo.splice(index,1)
  //   localStorage.getItem('Todolist', JSON.stringify(reduceTodo))
  //   setTodos(reduceTodo)
  // }
  const handleEdit = (ind, item) => {
    setCurrentEdit(ind)
    setCurrentEditItem(item)
  }
  const handleUpdatedTitle = (value) => {
    setCurrentEditItem((prev) => {
      return { ...prev, title: value }
    })

  }
  const handleUpdatedDiscription = (value) => {
    setCurrentEditItem((prev) => {
      return { ...prev, discription: value }
    })
  }
  const handleUpdatedTodo = () => {
    let newTodo = [...allTodos]
    newTodo[currentEdit] = currentEditItem
    setTodos(newTodo);
    setCurrentEdit("")
  }
  const handleSubmit = (event, action) => {
    event.preventDefault();
    axios
      .post("http://localhost:7000/todo", { newTitle, newDiscription })
      .then((res) => {
        setTodos((prev) => [...prev, res.data.createdNote]);
        console.log(res, "response");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  const getTodos = async () => {
    let {
      data: { data },
    } = await axios.get("http://localhost:7000/todos");
    // let getData = await getData.json();
    setTodos(data, "hhhhhhhhhhhhhhhhhhhhhhhhh");
  };
  const handleDeleteTodo = async (id) => {
    // event.preventDefault();
    let response = await axios.delete(`http://localhost:7000/delete?id=${id}`)
    // setTodos((prev) => [...prev, res.data.createdNote]);
    // console.log(res, "response");
    if (response.status === 200) {
      setTodos((prev) => prev.filter((i) => i.id !== id))
    }
  };


  useEffect(() => {
    getTodos()
  }, [])
  return (  
    <>
      <Navbar />
      <form action="">
        <div className="container mx-auto my-5 bg-violet-100 rounded-lg p-4 text-lg min-h-[85vh] ">
          <h2>Yours To Dos</h2>
          <div className="todo-wrapper mt-5">
            <div className="todo-inputs">
              <div className="todo-input-item flex space-x-10">
                <TextField className='w-full' fullWidth label="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} id="notes" />
                <TextField className='w-full' fullWidth label="Discription" value={newDiscription} onChange={(e) => setNewDiscription(e.target.value)} id="notes" sx={{ ms: 5 }} />
                <Button variant="contained" onClick={handleSubmit} color="success">Add</Button>
              </div>
              <Divider sx={{ mt: 3 }} />

              {/* <div className="btn-area space-x-10 mt-4">
          <Button variant="contained" color="success">To Do</Button>
          <Button variant="contained" color="success">Completed</Button>
          </div> */}
            </div>

            <div className="todo-list">
              {
                allTodos.map((item, index) => {
                  if (currentEdit === index) {
                    return (
                      <div className='edit_wrapper' key={index}>
                        <TextField fullWidth label="Updated Title"
                          value={currentEditItem.title}
                          onChange={(e) => handleUpdatedTitle(e.target.value)} sx={{ mt: 3 }} id="notes" />
                        <TextField fullWidth label="Updated Discription"
                          value={currentEditItem.discription}
                          onChange={(e) => handleUpdatedDiscription(e.target.value)} sx={{ mt: 3 }} id="notes" />
                        <Button variant="contained" sx={{ mt: 3 }} onClick={() => handleUpdatedTodo(index, item)} color="success">Update</Button>
                      </div>
                    )
                  } else {
                    return <div className="todo-list-item" key={index}>
                      <Card sx={{ display: "flex", justifyContent: "space-between", mt: 5, p: 2 }}>
                        <div>
                          <h1 className='text-3xl'>{item.title}</h1>
                          <span>{item.discription}</span>
                        </div>
                        <div className='flex m-4'>
                          <Button variant="outlined" onClick={() => handleEdit(index, item)} color="success">✏️</Button>
                          <Button variant="outlined" onClick={() => handleDeleteTodo(item.id)} color="error">🗑️</Button>
                        </div>
                      </Card>
                    </div>
                  }
                })
              }
            </div>
          </div>
        </div>
      </form>

    </>
  )
}

export default App
