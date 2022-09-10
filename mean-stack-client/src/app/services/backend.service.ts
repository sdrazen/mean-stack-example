import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../common/globals';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDataContactsModel } from '../models/data.contacts.model';
import { IDataApiInfoModel } from '../models/data.apiinfo.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private _http: HttpClient) { }

  getApiInfo(): Observable<IDataApiInfoModel> {

    let url = Globals.api_url + "/info";
    return this._http.get(url).pipe(map((res: any) => <IDataApiInfoModel>res));

  }

  getAllContacts(): Observable<any> {

    let url = Globals.api_url + "/contacts";
    return this._http.get(url).pipe(map((res: any) => <IDataContactsModel[]>res));

  }

  addContact(newContact: IDataContactsModel): Observable<JSON> {

    let url = Globals.api_url + "/contact";
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, newContact, { headers: headers }).pipe(map((res: any) => <JSON>res));

  }

  deleteContact(id: string): Observable<JSON> {

    let url = Globals.api_url + "/contact/" + id;
    return this._http.delete(url).pipe(map((res: any) => <JSON>res));

  }

  updateContact(id: string, updatedContact: IDataContactsModel): Observable<JSON> {

    let url = Globals.api_url + "/contact/" + id;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.put(url, updatedContact, { headers: headers }).pipe(map((res: any) => <JSON>res));

  }

}
