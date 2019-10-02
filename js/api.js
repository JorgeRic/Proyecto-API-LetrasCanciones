'use strict'

export class API{
  constructor(artista, cancion){
    this.artista = artista;
    this.cancion = cancion;
  }
  async obtenerLetrasAPI(){
    const letras = await fetch(`https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`);
    const respuesta = await letras.json()
    return { respuesta }
  }
}
