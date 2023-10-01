import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ProjectData } from '../Models/project-data';
import { GetProject } from '../Models/get-project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private httpOptions: any;
  constructor(private httpClient: HttpClient) {}

  getAllProjects(): Observable<GetProject[]> {
    return this.httpClient.get<GetProject[]>(
      'https://localhost:44377/api/Projects'
    );
  }
  addProject(project: ProjectData): Observable<any> {
    return this.httpClient.post(
      'https://localhost:44377/api/Projects',
      JSON.stringify(project)
    );
  }
  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete(`https://localhost:44377/api/Projects/${id}`);
  }

  getProjectById(id: number): Observable<GetProject> {
    return this.httpClient.get<GetProject>(
      `https://localhost:44377/api/Projects/${id}`
    );
  }
  updateProject(id: number, project: ProjectData): Observable<any> {
    return this.httpClient.put(
      `https://localhost:44377/api/Projects/${id}`,
      project
    );
  }

  getProjectTypes(): string[] {
    return ['Construction', 'Urban', 'Regional', 'Electrical', 'GIS'];
  }
}
