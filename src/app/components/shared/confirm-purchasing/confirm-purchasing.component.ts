import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/User.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-purchasing',
  templateUrl: './confirm-purchasing.component.html',
  styleUrls: ['./confirm-purchasing.component.css']
})
export class ConfirmPurchasingComponent implements OnInit {

  constructor(private router: Router,
    private messageService: MessageService) { }

  public userLogged: IUser;
  ngOnInit() {
    this.userLogged = JSON.parse(localStorage.getItem("userInfo"));
  }

}
