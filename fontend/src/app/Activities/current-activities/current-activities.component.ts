import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.css']
})
export class CurrentActivitiesComponent implements OnInit {
  activities: any[] = []; // เก็บข้อมูลกิจกรรม
  loading: boolean = false; // ใช้แสดงสถานะการโหลด
  activity: any = {}; 
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.fetchActivities(); // เรียก fetch กิจกรรมเมื่อ component ถูกโหลด
  }

  // Method สำหรับดึงข้อมูลกิจกรรมจาก API
  fetchActivities() {
    this.http.get<any[]>('http://localhost:8080/api/activities/active/detail').subscribe({
      next: (data) => {
        this.activities = data; // เก็บข้อมูลกิจกรรมที่ได้รับจาก API
        console.log('Fetched activities:', this.activities); // Log ข้อมูลที่ได้รับ
      },
      error: (error) => {
        console.error('Error fetching activities:', error); // แสดงข้อผิดพลาด
      },
      complete: () => {
        this.loading = false; // ปิดการโหลดเมื่อดึงข้อมูลเสร็จ
      }
    });
  }

  navigateToSignup(activityId: number) {
    this.router.navigate(['/activity-signup', activityId]);
  }

  navigateToDonation(activityId: number) {
    this.router.navigate(['/donation', activityId]);
  }



  
}
