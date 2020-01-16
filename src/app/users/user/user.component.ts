import { Component, OnInit } from '@angular/core';
import{UserService}from'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user :User = {
    fullName:'',
    email:'',
    mobile:'',
    city:'',
    gender:'',
    departement:'',
    hireDate:'',
    isPermanent:false
  };

  constructor(private service:UserService, private router: Router) { }
  departments = [
    {id:'Dep1',value:'Dep1'},
    {id:'Dep2',value:'Dep2'},
    {id:'Dep3',value:'Dep3'}
  ];
  onClear(){
    this.service.initializeFormGroup();
    this.service.form.reset();
  }

  ngOnInit() {
    this.service.findAll();
  }
  users :User[] = []

  add(){
    this.service.add(this.user)
    .subscribe((user)=>{
      this.users = [user, ...this.users];
    });
  }

  onSubmit(){
    if(this.service.form.valid){
      this.user = this.service.form.value;
      console.log(this.user);
      this.add();
      this.service.form.reset();
      this.service.initializeFormGroup();
    };
  }

}
