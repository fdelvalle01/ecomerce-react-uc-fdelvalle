import React from 'react'
import { useRef } from 'react';
import { useState, useEffect} from 'react'

const Temporizador = () => {
    //####### HOOKS DE ESTADO #######
    //hooks de estado para manejar el estado del temporizador
    const [temp, setTemp] = useState({
            id: 0,
            nombre: '',
            time: '00:00',
        },
    );
    //hooks de estado que mantendra una lista de los temporiadores creados temp 
    const [listTemp, setListTemp] = useState([]);

    //####### FUNCIONES #######
    //Metodo que debe enviar y registrar los temporizadores en el local storage
    const handleSubmit = (event) => {
        event.preventDefault();
        setListTemp([...listTemp, {id: listTemp.length, nombre: temp.nombre, time: temp.time}]);
        //Una vez que se agrege el tiempo, se debe empezar a restar el valor del timer en el componente Temporizador
    }
    const useR = useRef();
    function reducerTime(listTemp){
        //SetInterval para restar el tiempo
        const nuevaLista = [...listTemp];
        useR.current = setTimeout(() => {
            //Obtengo el tiempo del temporizador
            
            for(let list of listTemp){
                const timeArray = list.time.split(':');
                let minutes = timeArray[0];
                let seconds = timeArray[1];
                if(seconds > 0){
                    seconds = seconds - 1;
                }else{
                    minutes = minutes - 1;
                    seconds = 59;
                }
                const time = minutes + ':' + seconds;
                
                nuevaLista[list.id] = {...nuevaLista[list.id], time}
            }
            setListTemp(nuevaLista);  
            useR.current = null;
        }, 1000);
 
    }
    //useEffect que controlara el tiempo de los temporizadores y los restara
    useEffect(() => {
       reducerTime(listTemp);
        return () => {
            clearTimeout(useR.current);
            useR.current = null;
        }
    }
    , [listTemp]);
        

    const handlerChange = (e) => {
        const {name, value} = e.target;
        //Obteniendo los valores del formulario, se deben setear en el estado del temporizador temp
        //Concatenar valores de los input en un solo timer
        if(name === 'minutos'){
            console.log(temp.time.split(':')[1]);
            setTemp({...temp, time: value + ':' + temp.time.split(':')[1]});
        }else if(name === 'segundos'){
            console.log(temp.time.split(':')[0]);
            setTemp({...temp, time: temp.time.split(':')[0] + ':' + value});
        }
    }
   console.log(listTemp)
  return (
    <div id='divPadre'>
        <form onSubmit={handleSubmit}> 
            <table  className='TableTask'>
                <thead>
                    <tr>
                        <th><input  onChange={handlerChange} defaultValue={0} min="0" max="60" type="number" name="minutos" id="inputMin" placeholder="Minutos" /></th>
                        <th><input  onChange={handlerChange} defaultValue={0} min="0" max="60" type="number" name="segundos" id="inputSeg" placeholder="Segundos" /></th>
                        <th><input  onChange={handlerChange} type="text" name="nombre" id="inputTarea" placeholder="Nombre"/></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Minutos</td>
                        <td>Segundos</td>
                    </tr>
                </tbody>
            </table>
        </form>
        <button onClick={handleSubmit}>Agregar</button>
        <h1>Tiempos</h1>
        <div id='divHijo'>
            <table className='TableTask'>
                {
                listTemp.map((item, index) => (
                    <thead key={item.id}>
                        <tr>
                            <td>{item.time}</td>
                            <td>
                                <button><span className="fa fa-pause" aria-hidden="true"></span></button>
                                <button><span className="fa fa-square" aria-hidden="true"></span></button>
                            </td>
                        </tr>
                        <tr>
                            <td>{item.nombre}</td>
                        </tr>
                    </thead>
                    ))
                }
            </table>
        </div>       
    </div>
  )
}

export default Temporizador