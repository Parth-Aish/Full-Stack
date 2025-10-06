// Switch to (or create) the 'ecommerce_catalog' database
use ecommerce_catalog;

// --- Task 1: Insert Sample Product Documents ---
// This command clears the collection to ensure a fresh start
db.products.deleteMany({}); 

// Insert an array of product documents with nested variants
db.products.insertMany([
  {
    name: "Classic T-Shirt",
    price: 19.99,
    category: "Apparel",
    tags: ["cotton", "casual", "unisex"],
    variants: [
      {
        color: "Black",
        size: "M",
        stock: 150
      },
      {
        color: "White",
        size: "L",
        stock: 200
      },
      {
        color: "Blue",
        size: "M",
        stock: 80
      }
    ]
  },
  {
    name: "Smartphone Pro",
    price: 899.99,
    category: "Electronics",
    tags: ["mobile", "tech", "camera"],
    variants: [
      {
        color: "Midnight Gray",
        storage: "128GB",
        stock: 50
      },
      {
        color: "Ocean Blue",
        storage: "256GB",
        stock: 35
      }
    ]
  },
  {
    name: "Ceramic Coffee Mug",
    price: 12.50,
    category: "Home Goods",
    tags: ["kitchen", "gift", "coffee"],
    variants: [
      {
        color: "White",
        design: "Classic Logo",
        stock: 300
      },
      {
        color: "Black",
        design: "Minimalist",
        stock: 120
      }
    ]
  }
]);

print("\n--- Sample documents inserted successfully. ---\n");


// --- Task 2: Implement Queries ---

// Query 1: Retrieve all products in the catalog
print("\n--- 1. All Products in the Catalog ---");
db.products.find().pretty();

// Query 2: Filter products by a specific category (e.g., 'Electronics')
print("\n--- 2. Products in the 'Electronics' Category ---");
db.products.find({ category: "Electronics" }).pretty();

// Query 3: Project specific variant details
// This query finds the 'Smartphone Pro' and shows only its name and the color/storage of its variants.
print("\n--- 3. Projecting Specific Variant Details for 'Smartphone Pro' ---");
db.products.find(
  { name: "Smartphone Pro" },
  { name: 1, "variants.color": 1, "variants.storage": 1, _id: 0 }
).pretty();

// Query 4: Find products that have a variant of a specific color (e.g., 'Black')
print("\n--- 4. Find all products available in 'Black' ---");
db.products.find({ "variants.color": "Black" }).pretty();

// Query 5: Find products with a specific variant that has stock greater than 100
print("\n--- 5. Find T-Shirts where a specific variant has more than 100 in stock ---");
db.products.find({
  name: "Classic T-Shirt",
  "variants": { $elemMatch: { stock: { $gt: 100 } } }
}).pretty();
