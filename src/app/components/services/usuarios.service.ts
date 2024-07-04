import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, map } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

  export class UsuariosService{
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer b2f43f6e-a162-4932-b558-903c0063821b'
        })
    }

    private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativaangular.appspot.com/o/usuarios.json?alt=media&token=b2f43f6e-a162-4932-b558-903c0063821b';

    

    constructor(private http: HttpClient){}

    getJsonData(): Observable<any>{
        return this.http.get(this.jsonUrl);
    }
    
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

    authenticateUser(email: string, password: string): Observable<any> {
      return this.getJsonData().pipe(
        map((userList: any[]) => {
          return userList.find(user => user.email === email && user.password === password);
        })
      );
    }

   

    getUsuarios(): Observable<any[]> {
      return this.http.get<any[]>(this.jsonUrl);
    }
  
    buscarUsuarioPorEmail(email: string): Observable<any> {
      return this.getUsuarios().pipe(
        map((userList: any[]) => userList.find(user => user.email === email))
      );
    }

   
  // Actualizar el rol de un usuario por email
  actualizarRolUsuarioPorEmail(email: string, nuevoRol: string): Observable<any> {
    const url = `${this.jsonUrl}/email/${email}/rol`;
    return this.http.post<any>(url, { rol: nuevoRol });
  }

  }