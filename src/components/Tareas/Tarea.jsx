import React from 'react'
import { useState, useEffect } from 'react'
import './Tarea.css'

function insertLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
    // const storedBlogs = JSON.parse(localStorage.getItem(key));
}

const Tarea = () => {

    const [tareasInput, setTareasInput] = useState(''); // Inicializo el estado de tareas como un arreglo vacío
    const [checkFilter, setCheckFilter] = useState([]);
    //hooks de estado para manejar el estado de la tarea
    const [listTask, setListTask] = useState([]);
    const [listTaskOriginal, setListTaskOriginal] = useState([]);
    
    //useEffect que al checkear o descheckear una tarea, actualiza el estado de la tarea y las filtra en la lista
    useEffect(() => {
        if(checkFilter){
            setListTaskOriginal(listTask);
            const lists = listTask.filter(tarea => tarea.estado === false);
            setListTask(lists);
        }else{
            setListTask(listTaskOriginal);
        }
    }, [checkFilter]);

    //useEffect que  al cargar la página, obtiene la informacion de tareas en el local storage
    useEffect(() => {
        //obtengo el arreglo de tareas del localStorage
        const tareasStorage = localStorage.getItem('tareas');
        //si hay tareas en el localStorage, las cargo en el estado
        if(tareasStorage !== ''){
            setListTask(JSON.parse(tareasStorage))
        }
    }, []);

    //Componente que ingresara una tarea al componente lista de tareas
    //Agregar tareas escribiendo en una entrada de texto y presionando enterpara dejarla registrad
    const handleSubmit = (event) => {
        event.preventDefault();
        if(tareasInput !== "" && tareasInput !== " "){
            setListTask([...listTask, {id: listTask.length, nombre: tareasInput, estado: false}]);
            setTareasInput(''); //Limpiado de input al ingresar un campo
            insertLocalStorage('tareas', listTask); //Insert localStorage, key tareas
        }
    }

    //Funcion que escrbe en el estado de tareasInput
    function handleWrite(event){
        console.log(event.target.value);
        setTareasInput(event.target.value);
    }

    //funcion marca tareas como completadas. Al completarse, el texto debe tacharse.
    function completarTarea(index ,event){
        // obtener valor de la seleccion del checkbox
        const nuevaLista = [...listTask];
        nuevaLista[index].estado = event.target.checked;
        setListTask(nuevaLista);
        
    }
    
    //Eliminar una tarea específica
    function deleteTask(index, item, e){
        const nuevaLista = listTask.filter(tarea => tarea.id !== item.id);
        setListTask(nuevaLista);
        insertLocalStorage('tareas', nuevaLista); //Insert localStorage, key tareas
    }

  return (
    <div id='divPadre'>
        <h1>Lista de Tareas</h1>
        <table className='TableTask'>
            <thead>
                <tr>
                    <th>Nueva tarea</th>
                    <th>
                    <form onSubmit={handleSubmit}> 
                        <input value={tareasInput} type="text" name="inputTarea" id="inputTarea" placeholder="Ingresa una tarea" onChange={handleWrite}/>
                    </form>                
                    </th>
                    <th><input type="checkbox" name="checkTarea" id="checkTarea" onChange={(e) => setCheckFilter(e.target.checked)} />Mostrar faltante</th>
                </tr>
            </thead>
        </table>
        {/* Lista de tareas a la vista. */}
        {/* Centrar div */}
        <div id='divHijo'>
        <table className='TableTask'>
                {listTask.length > 0 ? (
                    listTask.map((item, index)=> (
                        <tbody key={index}>
                            <td><input type="checkbox" name="checkTarea" id="checkTarea" checked={item.estado} onClick={(e) => completarTarea(index, e)} /></td>
                            {/* Poder marcar tareas como completadas. Al completarse, el texto debe tacharse. */}
                            <td className={`${item.estado ? 'strikethrough' : ''}`}>{item.nombre}</td>
                            <td>
                                <button type="button" name="checkTarea" id="checkTarea" onClick={(e) => deleteTask(index, item, e)}>
                                    <span className="fa fa-trash-o" aria-hidden="true"></span>
                                </button>
                            </td>
                        </tbody>
                    ))
                    ) : ( 
                    <p>No hay tareas registradas</p>
                    )
                }
        </table>
        </div>
    </div>
  )
}

export default Tarea