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
  const [isEdit, setIsEdit] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const addTask = (task: string) => {
    id += 1
    const newTask: Task = {
      id,
      task,
      complete: false
    }

    setList([...list, newTask])

    setInput('')
  }

  const toggleComplete = (taskId: number) => {
    setList(list.map((task) => {
      if (task.id === taskId) {
        task.complete = task.complete === true ? false : true
        return task
      } else {
        return task
      }
    }))
  }
  const handleDeleteClick = (taskId: number) => {
    const removeItem = list.filter((task) => {
      return task.id !== taskId;
    })

    return setList(removeItem)
  }

  const handleEdit = (taskId: number, taskText: string) => {
    setIsEdit(true);
    setEditingTaskId(taskId);
    setEditingTaskText(taskText);
  };

  const handleEditTask = () => {
    if (editingTaskId !== null) {
      setList(list.map((task) => {
        if (task.id === editingTaskId) {
          task.task = editingTaskText;
        }
        return task;
      }));

      setIsEdit(false);
      setEditingTaskId(null);
      setEditingTaskText('');
    }
  };

  return (
    <div className='input__wrapper'>
      <ul className='tasks__list'>
        {list.map((task) => (
          <li
            className={`list__items ${task.complete === true ? 'completed' : ''}`} key={task.id} >
            <input className='li__checkbox' type='checkbox' checked={task.complete} onChange={() => toggleComplete(task.id)} />
            {task.task}
            <div className="iconWrapper">
              <span className="delete__button material-symbols-outlined" onClick={() => handleDeleteClick(task.id)} >delete</span>
              <span className={`test material-symbols-outlined`} onClick={() => handleEdit(task.id, task.task)}>edit</span>
            </div>
          </li>
        ))}
      </ul>
      {isEdit ? (
        <>
          <input className='input' type='text' value={editingTaskText} placeholder='add your task...' onChange={(e) => setEditingTaskText(e.target.value)} ></input>
          <button className='add__btn' type='submit' onClick={() => handleEditTask()} > Edit Task!</button>
        </>
      ) : (
        <>
          <input className='input' type='text' value={input} placeholder='add your task...' onChange={(e) => setInput(e.target.value)} ></input>
          <button className='add__btn' type='submit' onClick={() => addTask(input)} > Add Task!</button>
        </>
      )}

    </div>
  )
}

export default ToDoList

