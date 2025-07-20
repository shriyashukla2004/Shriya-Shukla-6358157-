using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;  
using RetailInventory.Models;

namespace RetailInventory
{
    class Program
    {
        static async Task Main(string[] args)
        {
            using var context = new AppDbContext();

            // Optional: Only insert data if empty
            if (await context.Categories.CountAsync() == 0)
            {
                var electronics = new Category { Name = "Electronics" };
                var groceries = new Category { Name = "Groceries" };

                await context.Categories.AddRangeAsync(electronics, groceries);

                var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
                var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };

                await context.Products.AddRangeAsync(product1, product2);
                await context.SaveChangesAsync();

                Console.WriteLine("Initial data inserted successfully.");
            }
            else
            {
                Console.WriteLine("Data already exists. Skipping insertion.");
            }

            // Optional: Show products
            var products = context.Products.Include(p => p.Category);

            Console.WriteLine("\nProducts:");
            await foreach (var p in products.AsAsyncEnumerable())
            {
                Console.WriteLine($"{p.Name} - ₹{p.Price} - Category: {p.Category.Name}");
            }
        }
    }
}
