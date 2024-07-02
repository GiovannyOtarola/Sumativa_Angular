import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, map } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

  export class JuegosService{
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 3837d476-c88c-42af-b0d4-737000ab0761'
        })
    }

    private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativaangular.appspot.com/o/juegos.json?alt=media&token=3837d476-c88c-42af-b0d4-737000ab0761';

    

    constructor(private http: HttpClient){}

    getJsonData(): Observable<any>{
        return this.http.get(this.jsonUrl);
    }
    
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