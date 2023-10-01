namespace Projects.Dtos
{
    public class GetProjectDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }

        public DateTime Date { get; set; }
    }
}
