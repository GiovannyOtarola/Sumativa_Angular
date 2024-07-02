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
            'Authorization': 'Bearer d31062ce-ceb3-4a40-8d64-bede53347e93'
        })
    }

    private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativaangular.appspot.com/o/usuarios.json?alt=media&token=d31062ce-ceb3-4a40-8d64-bede53347e93';

    

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

    actualizarUsuario(usuario: any): Observable<any> {
      const url = `${this.jsonUrl}/${usuario.email}.json`;
      return this.http.put(url, usuario);
    }

    getUsuarios(): Observable<any[]> {
      return this.http.get<any[]>(this.jsonUrl);
    }
  
    buscarUsuarioPorEmail(email: string): Observable<any> {
      return this.getUsuarios().pipe(
        map((userList: any[]) => userList.find(user => user.email === email))
      );
    }

   
   

  }