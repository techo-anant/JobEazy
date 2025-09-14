import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../models/newJob.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  jobForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    positionName: new FormControl('', Validators.required),
    siteUrl: new FormControl('', [Validators.pattern('^https://.+')]),
    jobDescription: new FormControl(''),
  })

  now: Date = new Date();
  thirtyDaysFromNow: Date = new Date(this.now.getDate() + 30);

  onSubmit(): void {
    if (this.jobForm.valid) {
      const newJob: Job = {
        companyName: this.jobForm.value.companyName!,
        positionName: this.jobForm.value.positionName!,
        date: this.now.toDateString(),
        dateToOld: this.thirtyDaysFromNow.toDateString(),
        siteUrl: this.jobForm.value.siteUrl,
        jobDescription: this.jobForm.value.jobDescription,
        isAccepted: false,
      };
      console.log(newJob);
    }
  }
}
