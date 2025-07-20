DROP TABLE IF EXISTS Products;
-- Step 1: Create Products Table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10, 2)
);

-- Step 2: Insert Sample Products
INSERT INTO Products VALUES
(1, 'iPhone 13', 'Mobiles', 799),
(2, 'Samsung Galaxy S21', 'Mobiles', 699),
(3, 'OnePlus 9', 'Mobiles', 729),
(4, 'Google Pixel 6', 'Mobiles', 699),
(5, 'MacBook Pro', 'Laptops', 1299),
(6, 'Dell XPS 13', 'Laptops', 999),
(7, 'HP Spectre x360', 'Laptops', 999),
(8, 'Lenovo Yoga', 'Laptops', 949),
(9, 'Sony WH-1000XM4', 'Accessories', 299),
(10, 'Bose QC 45', 'Accessories', 299),
(11, 'JBL Flip 5', 'Accessories', 149),
(12, 'Anker Soundcore', 'Accessories', 99);

-- Step 3: Use ROW_NUMBER to get top 3 products per category
SELECT *
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNum
    FROM Products
) AS Ranked
WHERE RowNum <= 3;

-- Step 4: Use RANK to get top 3 ranked products per category
SELECT *
FROM (
    SELECT *,
           RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS RankNum
    FROM Products
) AS Ranked
WHERE RankNum <= 3;

-- Step 5: Use DENSE_RANK to get top 3 ranked products per category
SELECT *
FROM (
    SELECT *,
           DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS DenseRankNum
    FROM Products
) AS Ranked
WHERE DenseRankNum <= 3;