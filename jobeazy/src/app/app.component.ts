import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadComponent } from './pages/upload/upload.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = signal('JobEazy');
}
