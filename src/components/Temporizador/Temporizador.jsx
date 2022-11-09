import React from 'react'
import { useState } from 'react'

const Temporizador = () => {
    //hooks de estado para manejar el estado de la tarea
    const [listTemp, setListTemp] = useState([{
        id: 0,
        nombre: '',
        menuto: 0,
        segunto: 0,
     },
    ]);

    //Metodo que debe enviar y registrar los temporizadores en el local storage
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('enviando');
    }

  return (
    <div id='divPadre'>
    <table  className='TableTask'>
        <form onSubmit={handleSubmit}> 
        <thead>
            <tr>
                <th><input type="number" name="inputTemporizadorMin" id="inputTemporizadorMin" placeholder="Minutos" /></th>
                <th><input type="number" name="inputTemporizadorSeg" id="inputTemporizadorSeg" placeholder="Segundos" /></th>
                <th><input type="text" name="inputTarea" id="inputTarea" placeholder="Nombre"/></th>
            </tr>
        </thead>
        </form>
        <tbody>
            <tr>
                <td>Minutos</td>
                <td>Segundos</td>
            </tr>
        </tbody>
    </table>
        <button onClick={handleSubmit}>Agregar</button>
    </div>
  )
}

export default Temporizador