import { useState } from 'react'
import './App.css'
let id = 0;
type Task = {
  id: number,
  task: string,
  complete: boolean
}

const ToDoList = () => {
  const [list, setList] = useState<Task[]>([]);
  const [input, setInput] = useState('');


  const addTask = (task: string) => {
    id += 1
    const newTask: Task = {
      id,
      task,
      complete: false
    }
    // pievienot esošajiem taskiem jaunu tasku
    setList([...list, newTask])
    // iztīra inputu
    setInput('')
  }

  const toggleComplete = (taskId: number) => {
    // iet cauri, katram taskam, skatas vai id nav vienāks ar uzspiestā taska id,
    // ja ir, tad skatas vai nav true, ja ir samaina uz false un otrādi
    // atgriež samainīto task
    setList(list.map((task) => {
      if (task.id === taskId) {
        task.complete = task.complete === true ? false : true
        return task
      } else {
        return task
      }
    }))
  }

  return (
    <div className='input__wrapper'>
      <ul className='tasks__list'>
        {list.map((task) => (
          <li className={`list__items ${task.complete === true ? 'completed' : ''}`}
            key={task.id}>
            {task.task}
            <input className='li__checkbox' type='checkbox' checked={task.complete} onChange={() => toggleComplete(task.id)} />
          </li>
        ))}
      </ul>

      <input className='input' type='text' value={input} placeholder='add your task' onChange={(e) => setInput(e.target.value)}></input>
      <button className='add__btn' type='submit' onClick={() => addTask(input)} > Add Task!</button>

    </div>
  )
}

export default ToDoList
