import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../models/newJob.model';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-upload',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  jobService = inject(JobService)

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
      // Send the job to backend
      this.jobService.saveJob(newJob).subscribe({
        next: (res) => {
          console.log('Job saved successfully!', res);
          // Optionally reset form
          this.jobForm.reset();
        },
        error: (err) => {
          console.error('Failed to save job', err);
        }
      });
    }
  }
}
