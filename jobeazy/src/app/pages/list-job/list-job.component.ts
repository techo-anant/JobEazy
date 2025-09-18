import { Component, OnInit, signal } from '@angular/core';
import { Job } from '../../models/newJob.model';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { SanitizeStringPipe } from '../../pipes/sanitize-string.pipe';
import { NewlineToBrPipe } from '../../pipes/newline-to-br.pipe';
import { JobDescComponent } from '../../components/job-desc/job-desc.component';


@Component({
  selector: 'app-list-job',
  standalone: true,
  imports: [CommonModule, SanitizeStringPipe, NewlineToBrPipe, JobDescComponent],
  templateUrl: './list-job.component.html',
  styleUrl: './list-job.component.css'
})
export class ListJobComponent implements OnInit {
  files: string[] = [];
  selectedJob?: Job | null;
  isSelected = signal(false)

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    this.jobService.listJob().subscribe((files) => (this.files = files));
  }


  getCompanyAndPosition(file: string): { company: string; position: string } {
    const parts = file.split(/[_\.]/); // ["job", "Company", "Position", "json"]
    return {
      company: parts[1],
      position: parts[2],
    };
  }

    // Open (explicit)
  openJob(filename: string) {
    this.jobService.getJob(filename).subscribe((job) => {
      console.log('Job received from backend:', job);
      this.selectedJob = job;
      this.isSelected.set(true);
    });
  }

  // Close (explicit)
  closeJob() {
    this.isSelected.set(false);
    this.selectedJob = undefined;
  }

}
