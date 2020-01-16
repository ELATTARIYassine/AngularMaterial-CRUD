import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.fetchElements();
  }

  listData = new MatTableDataSource<User>();
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'gender', 'departement', 'hireDate', 'isPermanent'];

  fetchElements()
  {
    this.userService.findAll().subscribe(
      res => {
        if (!res) return;
        console.log(res);
        this.listData = new MatTableDataSource(res as any);
      }
    )
  }
  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }

}
