import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { IDataContactsModel } from '../models/data.contacts.model';
import { IDataApiInfoModel } from '../models/data.apiinfo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Data from backend
  apiInfo: IDataApiInfoModel;
  backendData: IDataContactsModel[];

  // Variables
  first_name: String = "";
  last_name: String = "";
  phone: String = "";

  constructor(private activatedRoute: ActivatedRoute, private _backendService: BackendService) { }

  ngOnInit() {

    this.getApiInfo();
    this.getAllContacts();

  }

  onDeleteClick(id: string) {

    this._backendService.deleteContact(id)
      .subscribe(response => {
        // Refresh contacts
        this.getAllContacts();
      });

  }

  onAddClick() {

    let newContact: IDataContactsModel = { "first_name": this.first_name, "last_name": this.last_name, "phone": this.phone };
    this._backendService.addContact(newContact)
      .subscribe(response => {
        // Refresh contacts
        this.getAllContacts();
        // Empty fields
        this.first_name = "";
        this.last_name = "";
        this.phone = "";
      });

  }

  getApiInfo() {

    this._backendService.getApiInfo()
      .subscribe(response => {
        this.apiInfo = response;
      });

  }

  getAllContacts() {

    this._backendService.getAllContacts()
      .subscribe(response => {
        this.backendData = response;
      });

  }

}
