import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams} from "react-router-dom";

export default function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const tareas = useSelector(state => state.tasks);

  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value})
  };

  const handleSubmit = e => {
    e.preventDefault()
    
    if(Object.values(task).includes('')){
      console.log('Campos vacios');
      return
    }

    if(params.id) {
      dispatch(editTask(task))
    }else{
      dispatch(addTask({
        ...task,
        id: uuid(),
      }));
    }
    navigate('/');
  };

  useEffect(() => {
    if(params.id) {
    setTask(tareas.find(tarea => tarea.id === params.id))    
  }
  }, [params.id, tareas])

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-xs font-bold mb-2">Tarea</label>
      <input className="w-full p-2 rounded-md bg-zinc-600 mb-2" type="text" placeholder="title" name="title" onChange={handleChange} value={task.title}/>
      <label htmlFor="description" className="block text-xs font-bold mb-2">Descripcion</label>
      <textarea className="w-full p-2 rounded-md bg-zinc-600 mb-2" name="description" placeholder="description" onChange={handleChange} value={task.description}></textarea>
      <button className="bg-indigo-600 px-2 py-1">Save</button>
    </form>
  )
}
