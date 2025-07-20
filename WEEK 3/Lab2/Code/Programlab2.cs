using System;
using System.Linq;
using RetailInventory.Models;

namespace RetailInventory
{
    class Program
    {
        static void Main(string[] args)
        {
            using var context = new AppDbContext();

            // Ensure database is created
            context.Database.EnsureCreated();

            // Add sample data if none exists
            if (!context.Categories.Any())
            {
                var electronics = new Category { Name = "Electronics" };
                var groceries = new Category { Name = "Groceries" };

                context.Categories.AddRange(electronics, groceries);

                context.Products.Add(new Product { Name = "Laptop", Price = 60000, Category = electronics });
                context.Products.Add(new Product { Name = "Smartphone", Price = 30000, Category = electronics });
                context.Products.Add(new Product { Name = "Rice", Price = 50, Category = groceries });

                context.SaveChanges();
            }

            // Fetch and print all products with categories
            var products = context.Products
                .Select(p => new { p.Name, p.Price, CategoryName = p.Category.Name })
                .ToList();

            Console.WriteLine("Products in RetailInventory:");
            foreach (var p in products)
            {
                Console.WriteLine($"{p.Name} - ₹{p.Price} - Category: {p.CategoryName}");
            }
        }
    }
}
