import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {};
  isAdmin: boolean = false;
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      this.user = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        profileImage: payload.imageprofile,
        role: payload.role
      };

      if (this.user.role === 'admin') {
        this.isAdmin = true;
      }
    }
  }

  navigateToProfile(event: Event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login-guest']);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
