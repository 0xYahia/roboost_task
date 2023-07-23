import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import { IUser } from '../../models/iUser';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];
  constructor(private authService: AuthServices) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  updateUser(id: number, user: IUser) {
    this.authService.updateUser(user, id).subscribe((user) => {});
  }

  deleteUser(id: number) {
    this.authService.deleteUser(id).subscribe((user) => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
