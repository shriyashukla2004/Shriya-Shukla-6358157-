using System;

public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string Category { get; set; }

    public Product(int id, string name, string category)
    {
        ProductId = id;
        ProductName = name;
        Category = category;
    }

    public override string ToString()
    {
        return $"ID: {ProductId}, Name: {ProductName}, Category: {Category}";
    }
}

class Program
{
    public static Product LinearSearch(Product[] products, string name)
    {
        foreach (var product in products)
        {
            if (product.ProductName.Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                return product;
            }
        }
        return null;
    }

    public static Product BinarySearch(Product[] products, string name)
    {
        int left = 0;
        int right = products.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;
            int comparison = string.Compare(products[mid].ProductName, name, StringComparison.OrdinalIgnoreCase);

            if (comparison == 0)
                return products[mid];
            else if (comparison < 0)
                left = mid + 1;
            else
                right = mid - 1;
        }

        return null;
    }

    static void Main()
    {
        Product[] productList = new Product[]
        {
            new Product(1, "Laptop", "Electronics"),
            new Product(2, "Shirt", "Clothing"),
            new Product(3, "Phone", "Electronics"),
            new Product(4, "Shoes", "Footwear"),
            new Product(5, "Book", "Stationery")
        };

        Console.WriteLine("Linear Search:-");
        var resultLinear = LinearSearch(productList, "Phone");
        Console.WriteLine(resultLinear != null ? resultLinear.ToString() : "Product not found");

        Console.WriteLine("\nSorting products for Binary Search...");
        Array.Sort(productList, (p1, p2) => string.Compare(p1.ProductName, p2.ProductName, StringComparison.OrdinalIgnoreCase));

        Console.WriteLine("Binary Search:-");
        var resultBinary = BinarySearch(productList, "Phone");
        Console.WriteLine(resultBinary != null ? resultBinary.ToString() : "Product not found");

        Console.WriteLine("\nTime Complexity Summary:-");
        Console.WriteLine("Linear Search: O(n) - Scans each item");
        Console.WriteLine("Binary Search: O(log n) - Fast, but requires sorted data");
    }
}