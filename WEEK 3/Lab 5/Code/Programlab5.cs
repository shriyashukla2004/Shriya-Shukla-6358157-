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

            // Seed data if none exists
            if (!await context.Categories.AnyAsync())
            {
                var electronics = new Category { Name = "Electronics" };
                var groceries = new Category { Name = "Groceries" };

                await context.Categories.AddRangeAsync(electronics, groceries);

                var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
                var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };

                await context.Products.AddRangeAsync(product1, product2);
                await context.SaveChangesAsync();

                Console.WriteLine("Seeded initial data.");
            }

            // Now retrieve data
            var products = await context.Products.ToListAsync();
            Console.WriteLine("All Products:");
            foreach (var p in products)
            {
                Console.WriteLine($"{p.Name} - ₹{p.Price}");
            }

            Console.WriteLine();

            var product = await context.Products.FindAsync(1);
            Console.WriteLine($"Found product with ID=1: {product?.Name ?? "Not found"}");

            Console.WriteLine();

            var expensive = await context.Products.FirstOrDefaultAsync(p => p.Price > 50000);
            Console.WriteLine($"First expensive product (>₹50000): {expensive?.Name ?? "None found"}");
        }
    }
}
