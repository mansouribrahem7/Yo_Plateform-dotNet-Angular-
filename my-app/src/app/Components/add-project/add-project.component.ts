import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectData } from 'src/app/Models/project-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  project: ProjectData = {
    name: '',
    type: '',
    date: new Date(),
  };
  projectForm: any;
  projectTypes!: string[];
  editeMode: boolean = false;
  currentId!: number;
  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.createForm();

    if (localStorage.length == 0) {
      this.router.navigateByUrl('/login');
    }
    this.projectTypes = this.projectService.getProjectTypes();
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(paramMap.get('id'));
      if (this.currentId) {
        this.editeMode = true;
        this.projectService
          .getProjectById(this.currentId)
          .subscribe((projectToUpdate) => {
            // Set the form values using patchValue
            this.projectForm.patchValue({
              projectName: projectToUpdate.name,
              projectType: projectToUpdate.type,
              projectDate: projectToUpdate.date,
            });
          });
      }
    });
  }
  public get projectName() {
    return this.projectForm.controls['projectName'];
  }
  public get projectType() {
    return this.projectForm.controls['projectType'];
  }
  public get projectDate() {
    return this.projectForm.controls['projectDate'];
  }
  createForm() {
    this.projectForm = this.formBuilder.group({
      projectName: ['', [Validators.required]],
      projectType: ['', [Validators.required]],
      projectDate: ['', [Validators.required]],
    });
  }

  controlForm() {
    if (this.editeMode == true) {
      this.updateProject();
    } else {
      this.mapProject();
      this.addProject();
    }
  }
  mapProject() {
    this.project.name = this.projectForm.value.projectName;
    this.project.type = this.projectForm.value.projectType;
    this.project.date = new Date(this.projectForm.value.projectDate);
  }
  addProject() {
    this.projectService.addProject(this.project).subscribe((response) => {
      this.router.navigateByUrl('/projects');
    });
    console.log(this.project);
  }

  updateProject() {
    this.mapProject();
    this.projectService
      .updateProject(this.currentId, this.project)
      .subscribe(() => {
        this.router.navigateByUrl('/projects');
      });
  }
}
