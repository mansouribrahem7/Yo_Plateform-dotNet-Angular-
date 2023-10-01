import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GetProject } from 'src/app/Models/get-project';
import { ProjectData } from 'src/app/Models/project-data';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projectsList: GetProject[] = [];
  projectTypes!: string[];
  selectedTypes: string[] = [];
  checkboxState: { [key: string]: boolean } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  errorMessage = '';
  dataSource;
  displayedColumns: string[] = ['name', 'type', 'date', 'id'];
  constructor(
    private projectService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.errorMessage = 'application id not found';
    this.projectTypes = this.projectService.getProjectTypes();
    if (localStorage.length == 0) {
      this.router.navigateByUrl('/login');
    }
    this.filterProjects();

    this.projectTypes.forEach((type) => {
      this.checkboxState[type] = false;
    });
  }

  deleteProject(projID: number) {
    if (confirm('Are you sure?')) {
      this.projectService.deleteProject(projID).subscribe((res) => {
        this.router.navigateByUrl('/projects');
        this.projectsList = this.projectsList.filter(
          (proj) => proj.id !== projID
        );
        this.dataSource = new MatTableDataSource<GetProject>(this.projectsList);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  updateProject(id: number) {
    this.router.navigateByUrl(`add/${id}`);
  }

  filterProjects() {
    this.selectedTypes = Object.keys(this.checkboxState).filter(
      (type) => this.checkboxState[type]
    );

    if (this.selectedTypes.length === 0) {
      // Show all projects if no checkboxes are selected
      this.projectService.getAllProjects().subscribe((projects) => {
        this.projectsList = projects;
        this.dataSource = new MatTableDataSource<GetProject>(this.projectsList);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      // Filter projects based on selected types
      this.projectService.getAllProjects().subscribe((projects) => {
        this.projectsList = projects.filter((project) =>
          this.selectedTypes.includes(project.type)
        );
        this.dataSource = new MatTableDataSource<GetProject>(this.projectsList);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  onReceiveMessage(message: string) {}
}
