import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./pages/upload/upload.component').then((m) => m.UploadComponent),
    },
    {
        path: 'jobs',
        loadComponent: () =>
            import('./components/list-job/list-job.component').then((m) => m.ListJobComponent),
    },
];