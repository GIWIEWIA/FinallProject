import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  activityId: number = 0;
  activity: any = {};
  status: boolean = true;

  participantDetail = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    allergies: '',
    medicalHistory: '',
    emergencyContact: '',
    activity: {
      activityId: 0
    }
    
  };

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) { }

  ngOnInit() {
    // รับ activityId จากพารามิเตอร์ใน URL
    this.activityId = +this.route.snapshot.paramMap.get('activityId')!;
    this.participantDetail.activity.activityId = this.activityId
    
    this.getActivity()// ตรวจสอบค่า activityId
  }


  getActivity() {
    this.http.get<any>('http://localhost:8080/api/activities/' + this.activityId).subscribe({
      next: (data) => {
        this.activity = data;
        console.log('Fetched activity:', this.activity);
        const endDate = new Date(this.activity.endDate);
        if (endDate < new Date()|| this.activity.totalvolunteerAmount == this.activity.volunteerAmount) {
          this.status = false;
          console.log("เกินวันสิ้นสุดกิจกรรม");
        } else {
          console.log("ยังไม่เกินวันสิ้นสุดกิจกรรม");
          console.log(endDate, 'test', new Date());
          this.status = true;
        }
      },
      error: (error) => {
        console.error('Failed to fetch activity:', error);
      },
      complete: () => {
      }
    });
  }



  submitForm() {
    this.http.post('http://localhost:8080/api/participant-details', this.participantDetail)
      .subscribe(response => {
        console.log('Signup success:', response);
        this.incrementVolunteer(this.activityId);
      }, error => {
        console.error('Error occurred during signup:', error);
      });
  }

  incrementVolunteer(activityId: number) {
    this.http.post('http://localhost:8080/api/activities/' + activityId + '/incrementVolunteer', {})
      .subscribe(response => {
        window.location.reload();
      }, error => {
        console.error('Error occurred during volunteer increment:', error);
      });
  }


  goToInformation(): void {
    this.router.navigate(['/activity-sinup-list', this.activityId]);
  }

}
