import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../features/tasks/taskSlice";


export default function TaskList() {

  const tareas = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  
  const handleSubmit = (id) => {
     dispatch(deleteTask(id));
    }

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>TOTAL DE TAREAS: {tareas.length}</h1>
        <Link to='/create' className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
          Crear tareas
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-3">
        {tareas.map(tarea => (
          <div key={tarea.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h3>{tarea.title}</h3>
              <div className="flex gap-x-2">
                <button className="bg-red-500 px-2 py-1 text-xs rounded-md" onClick={() => handleSubmit(tarea.id)}>Eliminar</button>
                <Link className="bg-zinc-600 px-2 py-1 text-xs rounded-md" to={`/edit/${tarea.id}`}>Editar</Link>
              </div>
            </header>
            <p>{tarea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
