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

// pievieno tasku ar id, nosaukumu un complete statusu
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
// Atgriež visus taskus, kuriem nesakrīt id ar padoto id
  const handleDeleteClick = (taskId:number) => {
    const removeItem = list.filter((task) => {
      return task.id !== taskId;
    })

    return setList(removeItem)
  }

  return (
    <div className='input__wrapper'>
      <ul className='tasks__list'>
        {/* iet cauri list masīvām un izvada sarakstā tasku */}
        {list.map((task) => (
          <li 
            className={`list__items ${task.complete === true ? 'completed' : ''}`} key={task.id} >
            {task.task}
            <input className='li__checkbox' type='checkbox' checked={task.complete} onChange={() => toggleComplete(task.id)} />
            <img className='delete__button' src='/src/assets/delete-button.svg' alt='delete button' onClick={() => handleDeleteClick(task.id)}  />
          </li>
        ))}
      </ul>

      <input className='input' type='text' value={input} placeholder='add your task' onChange={(e) => setInput(e.target.value)} ></input>
      <button className='add__btn' type='submit' onClick={() => addTask(input)} > Add Task!</button>

    </div>
  )
}

export default ToDoList
