'use strict'

import { buscar, resultado, mensajes, formularioBuscar } from './interfaz.js'
import { API } from './api.js'
const spinner = document.querySelector('.spinner');


formularioBuscar.addEventListener('submit', (event)=>{
  event.preventDefault()

  const artista = document.querySelector('#artista').value;
  const cancion = document.querySelector('#cancion').value;

  function mostrarOcultarSpinner(vista){
  const spinner = document.querySelector('.spinner');
  spinner.style.display = vista;
   }

  if(artista === '' || cancion === ''){
    mensajes.innerHTML = 'Por favor, rellene todos los campos'
    mensajes.classList.add('error');
    setTimeout(() =>{
      mensajes.innerHTML = '';
      mensajes.classList.remove('error');
    },2000)
  }else{
    const api = new API(artista, cancion);
    api.obtenerLetrasAPI()
      .then(data => {
        if(data.respuesta.lyrics){
          mostrarOcultarSpinner('block');
          const letra = data.respuesta.lyrics;
          setTimeout(()=>{
            resultado.innerHTML = letra;
            formularioBuscar.reset();
            mostrarOcultarSpinner('none')
          },1000)
        }else{
          mensajes.innerHTML = 'La cancion no existe. Prueba con otra busqueda'
          mensajes.classList.add('error');
          setTimeout(() =>{
          mensajes.innerHTML = '';
          mensajes.classList.remove('error');
          formularioBuscar.reset();
          },2000)

        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  
})