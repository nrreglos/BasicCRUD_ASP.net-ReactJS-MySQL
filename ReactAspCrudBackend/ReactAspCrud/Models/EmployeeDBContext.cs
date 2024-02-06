using Microsoft.EntityFrameworkCore;

namespace ReactAspCrud.Models
{
    public class EmployeeDBContext : DbContext
    {
        public EmployeeDBContext(DbContextOptions<EmployeeDBContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employee { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=KJTREGLOS\\SQLEXPRESS;Initial Catalog=company_employees;Integrated Security=True;Pooling=False;Encrypt=True;Trust Server Certificate=True");
        }
    }
}
