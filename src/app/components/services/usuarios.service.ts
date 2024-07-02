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
            'Authorization': 'Bearer c71c2e5d-5259-4b49-ae77-a8963f965bf2'
        })
    }

    private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativaangular.appspot.com/o/usuarios.json?alt=media&token=c71c2e5d-5259-4b49-ae77-a8963f965bf2';

    

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
  }