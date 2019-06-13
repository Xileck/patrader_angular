import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Empresa } from 'src/app/clases/empresa';
import { Observable } from 'rxjs';
import { Response } from 'selenium-webdriver/http';
import { CodigoPostal } from 'src/app/clases/codigo-postal';

@Injectable({
  providedIn: 'root'
})
export class EmpresasCatalogoService {

  private rutaRestEmpresas = environment.rutaWebService + '/empresas/';
  private rutaRestCodigoPostal = environment.rutaWebService + '/codigo_postal/';

  constructor(private http: HttpClient) { }

  public selectAll(): Observable<HttpResponse<Empresa[]>> { return this.http.get<Empresa[]>(this.rutaRestEmpresas, { observe: 'response' }) }

  public select(idEmpresa: number): Observable<HttpResponse<Empresa>> { return this.http.get<Empresa>(this.rutaRestEmpresas + idEmpresa, { observe: 'response' }).pipe() }

  public selectCodigoPostal(cp: number): Observable<HttpResponse<CodigoPostal>> { return this.http.get<CodigoPostal>(this.rutaRestCodigoPostal + cp, { observe: 'response' }).pipe() }

  public insert(empresa: Empresa): Observable<HttpResponse<Object>> { return this.http.post(this.rutaRestEmpresas, empresa, { observe: 'response' }) }

  public update(empresa: Empresa): Observable<HttpResponse<Object>> { return this.http.put(this.rutaRestEmpresas, empresa, { observe: 'response' }) }

  public delete(idEmpresa: number): Observable<HttpResponse<Object>> { return this.http.delete(this.rutaRestEmpresas + idEmpresa, { observe: 'response' }) }

}
