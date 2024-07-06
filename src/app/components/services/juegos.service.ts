import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, map } from "rxjs";

/**
 * @description
 * Servicio para gestionar los juegos.
 * 
 * Este servicio permite obtener los datos de los juegos desde un archivo JSON y sobrescribir el archivo con nuevos datos.
 */
@Injectable({
    providedIn: 'root'
  })

  export class JuegosService{
    /**
    * Opciones HTTP, incluyendo los encabezados.
     */
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 3837d476-c88c-42af-b0d4-737000ab0761'
        })
    }

    /**
    * URL del archivo JSON que contiene los datos de los juegos.
    * @private
    */
    private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativaangular.appspot.com/o/juegos.json?alt=media&token=3837d476-c88c-42af-b0d4-737000ab0761';

    

    constructor(private http: HttpClient){}

     /**
   * Obtiene los datos de los juegos desde el archivo JSON.
   * 
   * @returns {Observable<any>} - Observable que emite los datos de los juegos.
   */
    getJsonData(): Observable<any>{
        return this.http.get(this.jsonUrl);
    }
    
    /**
   * Sobrescribe el archivo JSON con la lista de juegos proporcionada.
   * 
   * @param {any} listaJuegos - Lista de juegos que se va a sobrescribir en el archivo JSON.
   */
    MetodoJuego(listaJuegos:any) {
      console.log(listaJuegos);
      this.http.post(this.jsonUrl,listaJuegos,this.httpOptions).subscribe(
        response => {
          console.log('Archivo JSON sobrescrito con exito', response);
        },
        error => {
          console.error('Error al sobrescribir el archivo JSON', error);
        })
    }

  
  }