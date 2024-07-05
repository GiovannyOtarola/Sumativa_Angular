import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, map } from "rxjs";

/**
 * @description
 * Servicio para gestionar los usuarios.
 * 
 * Este servicio permite obtener datos de los usuarios desde un archivo JSON, sobrescribir el archivo, autenticar usuarios y buscar usuarios por email.
 */
@Injectable({
    providedIn: 'root'
  })

  export class UsuariosService{
    /**
     * Opciones HTTP, incluyendo los encabezados.
    */
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 68432845-8dbc-4dd8-a994-57a8a6312df0'
        })
    }

    /**
    * URL del archivo JSON que contiene los datos de los usuarios.
    * @private
    */
    private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativaangular.appspot.com/o/usuarios.json?alt=media&token=68432845-8dbc-4dd8-a994-57a8a6312df0';

    

    constructor(private http: HttpClient){}

    /**
    * Obtiene los datos de los usuarios desde el archivo JSON.
    * 
    * @returns {Observable<any>} - Observable que emite los datos de los usuarios.
    */
    getJsonData(): Observable<any>{
        return this.http.get(this.jsonUrl);
    }
    
    /**
    * Sobrescribe el archivo JSON con la lista de usuarios proporcionada.
     * 
    * @param {any} listaUsuarios - Lista de usuarios que se va a sobrescribir en el archivo JSON.
    */
    MetodoUsuario(listaUsuarios:any) {
      console.log(listaUsuarios);
      this.http.post(this.jsonUrl,listaUsuarios,this.httpOptions).subscribe(
        response => {
          console.log('Archivo JSON sobrescrito con exito', response);
        },
        error => {
          console.error('Error al sobrescribir el archivo JSON', error);
        })
    }

    /**
    * Autentica un usuario por email y contraseña.
    * 
    * @param {string} email - Email del usuario.
    * @param {string} password - Contraseña del usuario.
    * @returns {Observable<any>} - Observable que emite el usuario autenticado.
    */
    authenticateUser(email: string, password: string): Observable<any> {
      return this.getJsonData().pipe(
        map((userList: any[]) => {
          return userList.find(user => user.email === email && user.password === password);
        })
      );
    }

   
    /**
    * Obtiene todos los usuarios.
    * 
    * @returns {Observable<any[]>} - Observable que emite la lista de usuarios.
    */
    getUsuarios(): Observable<any[]> {
      return this.http.get<any[]>(this.jsonUrl);
    }
    
    /**
    * Busca un usuario por email.
    * 
    * @param {string} email - Email del usuario a buscar.
    * @returns {Observable<any>} - Observable que emite el usuario encontrado.
    */
    buscarUsuarioPorEmail(email: string): Observable<any> {
      return this.getUsuarios().pipe(
        map((userList: any[]) => userList.find(user => user.email === email))
      );
    }

   

  }