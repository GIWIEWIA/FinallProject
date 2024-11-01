import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = {};

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // ถอดรหัส token โดยใช้ atob()
      const payload = JSON.parse(atob(token.split('.')[1])); // ดึง payload จาก JWT

      this.user = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        profileImage: payload.imageprofile,
        contact: payload.contact,
        allergies: payload.allergies,
        illness: payload.illness,
        foodallergies: payload.foodallergies,
        religion: payload.religion,
        time: payload.time
      };
    }
  }
}
