import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NewJob } from '../../models/newJob.model';
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
    if(this.jobForm.valid){
      const newJob = new NewJob(
        this.jobForm.value.companyName!,
        this.jobForm.value.positionName!,
        this.now.toDateString(),
        this.thirtyDaysFromNow.toDateString(),
        this.jobForm.value.siteUrl,
        this.jobForm.value.jobDescription,
        false,
      );
      console.log(newJob);
    }
  }
}
