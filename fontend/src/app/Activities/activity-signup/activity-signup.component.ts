import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-signup',
  templateUrl: './activity-signup.component.html',
  styleUrls: ['./activity-signup.component.css']
})
export class ActivitySignupComponent implements OnInit {
  activityId: number = 0;
  loading: boolean = false;
  activity: any = {}; 

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // รับ activityId จากพารามิเตอร์ใน URL
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.getActivity()// ตรวจสอบค่า activityId
  }

  getActivity() {
    this.loading = true;
    this.http.get<any>('http://localhost:8080/api/activities/' + this.activityId).subscribe({
      next: (data) => {
        this.activity = data; 
        console.log('Fetched activity:', this.activity);
      },
      error: (error) => {
        console.error('Failed to fetch activity:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


}
