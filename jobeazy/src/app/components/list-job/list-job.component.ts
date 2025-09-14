import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/newJob.model';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-job',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './list-job.component.html',
  styleUrl: './list-job.component.css'
})
export class ListJobComponent implements OnInit {
  files: string[] = [];
  selectedJob?: Job;

  constructor(private jobService: JobService){}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.jobService.listJob().subscribe((files) => (this.files = files));
  }

  viewJob(filename: string) {
    this.jobService.getJob(filename).subscribe((job) => (this.selectedJob = job));
  } 

}
