using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projects.Dtos;
using Projects.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectContext _context;

        public ProjectsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        [Authorize]

        public async Task<IActionResult> GetProjects()
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }
            var Projects = await _context.Projects.ToListAsync();
            var ProjectsList = new List<GetProjectDto>();
            foreach (var project in Projects)
            {
                var GetProjectDto = new GetProjectDto()
                {
                    Id = project.Id,
                    Name = project.Name,
                    Type = project.Type,
                    Date = project.Date,
                };
                ProjectsList.Add(GetProjectDto);
            }
            return Ok(ProjectsList);

        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetProject(int id)
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }
            var GetProjectDto = new GetProjectDto()
            {
                Id = project.Id,
                Name = project.Name,
                Type = project.Type,
                Date = project.Date,
            };

            return Ok(GetProjectDto);
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutProject(int id, ProjectDto projectDto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return BadRequest();
            }

            project.Name = projectDto.Name;
            project.Type = projectDto.Type;
            project.Date = projectDto.Date;
            _context.Update(project);
            _context.SaveChanges();

            return NoContent();
        }

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostProject(ProjectDto projectDto)
        {
            if (_context.Projects == null)
            {
                return Problem("Entity set 'ProjectContext.Projects'  is null.");
            }
            var project = new Project()
            {
                Name = projectDto.Name,
                Type = projectDto.Type,
                Date = projectDto.Date,
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

