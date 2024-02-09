import { useState, useEffect } from 'react'
import './App.css'
import gal from './assets/gal.svg'
import trash from './assets/trash.svg'

function App() {
  const [array, setArray] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    const taskList = JSON.parse(localStorage.getItem('list'))
    if (taskList) {
      setArray(taskList)
    }
  }, [])

  const setList = (task) => {
    setArray([...array, { task: task, complite: false }])
    localStorage.setItem('list', JSON.stringify([...array, { task: task, complite: false }]))
  }

  const update = (index, value) => {
    const updateArray = array.map((item, i) =>
      i == index ? { ...item, task: value } : item
    )
    setArray(updateArray)
    localStorage.setItem('list', JSON.stringify(updateArray))
  }

  const compliteTodo = (index) => {
    const updateArray = array.map((item, i) =>
      i == index ? { ...item, complite: true } : item
    )
    setArray(updateArray)
    localStorage.setItem('list', JSON.stringify(updateArray))
  }

  const deleteTodo = (i) => {
    const newArray = array.filter((a, index) => {
      return index !== i
    })
    console.log(newArray);
    setArray(newArray)
    localStorage.setItem('list', JSON.stringify(newArray))
  }

  return (
    <>
    <div className="wrapper">
      <div className="task_add">
        <h1 className='task_add_h1'>Добавить задачу</h1>
        <form className="task_add_ib" >
          <input className='task_add_input' placeholder='Введите текст...' type="text" value={task} onChange={(a) => setTask(a.target.value)} />
          <button className='task_add_btn' onClick={() => {setList(task);setTask('')}}>добавить</button>
        </form>
      </div>
      <div className="my_tasks">
        {
          array.map((e, index) => {
            return (
              <div className="my_task" key={index}>
                <input className={e.complite ? "todo my_task_back" : "todo"} value={e.task} onChange={(a) => update(index, a.target.value)}></input> 
                <button className='task_btn' onClick={() => compliteTodo(index)}><img src={gal} alt="" /></button>
                <button className='task_btn' onClick={() => deleteTodo(index)}><img src={trash} alt="" /></button>
              </div>
            );
          })
        }

      </div>
    </div>
    </>
  )
}

export default App
