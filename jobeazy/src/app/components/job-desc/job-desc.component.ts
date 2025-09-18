import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/newJob.model';
import { NewlineToBrPipe } from '../../pipes/newline-to-br.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-desc',
  imports: [NewlineToBrPipe, CommonModule],
  templateUrl: './job-desc.component.html',
  styleUrl: './job-desc.component.css'
})
export class JobDescComponent {
  @Input({ required: true }) selectedJob!: Job | undefined;
  @Output() close = new EventEmitter<void>();

  toggleJobView() {
    this.close.emit();
  }

}
