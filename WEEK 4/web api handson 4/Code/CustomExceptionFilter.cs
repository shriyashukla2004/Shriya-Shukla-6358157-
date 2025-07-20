using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EmployeeApi.Filters
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs.txt");
            File.AppendAllText(path, $"{DateTime.Now}: {context.Exception.Message}\n");

            context.Result = new ObjectResult("Internal Server Error from CustomExceptionFilter")
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }
    }
}
