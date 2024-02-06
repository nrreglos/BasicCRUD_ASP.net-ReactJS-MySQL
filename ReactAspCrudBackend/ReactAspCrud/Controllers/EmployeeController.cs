using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDBContext _employeeDBContext;

        public EmployeeController(EmployeeDBContext employeeDBContext)
        {
            _employeeDBContext = employeeDBContext;

        }

        [HttpGet]
        [Route("GetEmployee")]
        public async Task<IEnumerable<Employee>> GetEmployee()
        {
            return await _employeeDBContext.Employee.ToListAsync();
        }
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<Employee> AddEmployee(Employee objEmployee)
        {
            _employeeDBContext.Employee.Add(objEmployee);
            await _employeeDBContext.SaveChangesAsync();
            return objEmployee;

        }
        [HttpPatch]
        [Route("UpdateEmployee/{EmpId}")]

        public async Task<Employee> UpdateEmployee(Employee objEmployee) 
        {
            _employeeDBContext.Entry(objEmployee).State= EntityState.Modified;
            await _employeeDBContext.SaveChangesAsync();
            return objEmployee;
        }

        [HttpDelete]
        [Route("DeleteEmployee/{EmpId}")]

        public bool DeleteEmployee(int EmpId)
        { 
            bool a = false;
            var employee = _employeeDBContext.Employee.Find(EmpId);
            if (employee != null)
            {
                a = true;
                _employeeDBContext.Entry(employee).State = EntityState.Deleted;
                _employeeDBContext.SaveChanges();
            }
            else
            {
                a = false;
            }

            return a;
        }


    }




}
