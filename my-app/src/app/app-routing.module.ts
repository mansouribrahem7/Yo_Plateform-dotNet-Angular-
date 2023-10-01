import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { AddProjectComponent } from './Components/add-project/add-project.component';
import { LoginComponent } from './Components/login/login.component';
import { registerLocaleData } from '@angular/common';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProjectsComponent } from './Components/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'add',
        component: AddProjectComponent,
      },
      {
        path: 'add/:id',
        component: AddProjectComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
