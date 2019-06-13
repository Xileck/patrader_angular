import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Persona } from 'src/app/clases/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasCatalogoService {

  constructor(private http: HttpClient) { }

  seleccionarPersonas() {
    return this.http.get<Persona[]>(environment.rutaWebService + "/personas");
  }

  insertarPersona(persona): Observable<HttpResponse<any>> {
    return this.http.post(environment.rutaWebService + "/personas", persona, { observe: 'response' });
  }

  deletePersona(id): Observable<HttpResponse<any>> {
    return this.http.delete(environment.rutaWebService + "/personas/delete/"+id,{ observe: 'response' });
  }
}
