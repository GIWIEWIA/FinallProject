import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-activities-carousal',
  templateUrl: './current-activities-carousal.component.html',
  styleUrls: ['./current-activities-carousal.component.css']
})
export class CurrentActivitiesCarousalComponent implements OnInit {
  activities: any[] = []; // สร้าง array สำหรับเก็บกิจกรรม

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.getActiveActivities();
  }

  // Method สำหรับดึงข้อมูลกิจกรรมที่ active
  getActiveActivities() {
    this.http.get<any[]>('http://localhost:8080/api/activities/active')
      .subscribe(
        (response) => {
          this.activities = this.filterActivitiesByDate(response); // กรองกิจกรรมตามวันที่
          console.log('Filtered Active Activities:', this.activities);
        },
        (error) => {
          console.error('There was an error retrieving active activities:', error);
        }
      );
  }

  // Method สำหรับกรองกิจกรรมตามวันที่
  filterActivitiesByDate(activities: any[]): any[] {
    const today = new Date(); 
    return activities.filter(activity => {
      const startDate = new Date(activity.startDate); // แปลง startDate เป็น Date object
      const endDate = new Date(activity.endDate); // แปลง endDate เป็น Date object
      return today >= startDate && today <= endDate; // ตรวจสอบว่าวันนี้อยู่ในช่วงเวลา
    });
  }

  navigateToSignup(activityId: number) {
    this.router.navigate(['/activity-signup', activityId]);
    
  }
}
