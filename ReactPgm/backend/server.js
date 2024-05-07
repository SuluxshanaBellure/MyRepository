const express = require('express');
const { json } = require('express');
const cors = require('cors');
const { createConnection } = require('mysql');
// const nodemailer = require('nodemailer');
const { json: _json } = require('body-parser');


const app = express();
app.use(cors());
app.use(json());
app.use(_json());

const db = createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'users'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    return res.json("From server side");
});

app.get('/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        return res.json(data);
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const productQuery = "SELECT * FROM products WHERE id = ?";
    const colorsQuery = "SELECT color_name, image_url, front_image, back_image FROM product_colors WHERE product_id = ?";
    
    db.query(productQuery, [productId], (err, productData) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (productData.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        db.query(colorsQuery, [productId], (err, colorData) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const product = productData[0];
            const colors = colorData.map(row => ({
                color_name: row.color_name,
                image_url: row.image_url,
                front_image: row.front_image,
                back_image: row.back_image
            }));

            const productWithColors = { ...product, colors };

            return res.json(productWithColors);
        });
    });
});


app.get('/products/:id/colors', (req, res) => {
    const productId = req.params.id;
    const sql = `
        SELECT color_name
        FROM product_colors
        WHERE product_id = ?
    `;
    db.query(sql, [productId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Colors not found for this product' });
        }
        const colors = data.map(row => row.color_name); 
        return res.json({ colors });
    });
});


app.post('/products/insert', (req, res) => {
    const { id, name, description, price, quantity } = req.body;

    db.query('INSERT INTO products (id, name, description, price, quantity) VALUES (?, ?, ?, ?, ?)',
        [id, name, description, price, quantity],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.json({ message: 'Insert succeeded.' });
        });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    db.query('DELETE FROM products WHERE id = ?',
        [productId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.json({ message: 'Delete succeeded.' });
        });
});

app.put('/products/update/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price, quantity } = req.body;

    db.query(
        'UPDATE products SET name=?, description=?, price=?, quantity=? WHERE id=?',
        [name, description, price, quantity, productId],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.json({ message: 'Update succeeded.' });
        }
    );
});

app.get('/books', (req, res) => {
    const categoryId = 1; 
    const sql = "SELECT * FROM product WHERE category_id = ?";
    db.query(sql, [categoryId], (err, data) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        return res.json(data);
    });
});


app.get('/coffeemugs', (req, res) => {
    const categoryId = 2; 
    const sql = "SELECT * FROM product WHERE category_id = ?";
    db.query(sql, [categoryId], (err, data) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        return res.json(data);
    });
});

app.get('/mousepads', (req, res) => {
    const categoryId = 3; 
    const sql = "SELECT * FROM product WHERE category_id = ?";
    db.query(sql, [categoryId], (err, data) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        return res.json(data);
    });
});

app.get('/luggagetags', (req, res) => {
    const categoryId = 4; 
    const sql = "SELECT * FROM product WHERE category_id = ?";
    db.query(sql, [categoryId], (err, data) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        return res.json(data);
    });
});


app.get('/pdp/:sku', (req, res) => {
    const sku = req.params.sku;
    const sql = `
        SELECT * 
        FROM product
        WHERE sku = ?`;
    db.query(sql, [sku], (err, data) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(data[0]); 
    });
});
  

  // Backend API for fetching all collections along with their products
app.get("/collections", (req, res) => {
    const sql = "SELECT * FROM collection";
    db.query(sql, async (err, collections) => {
        if (err) {
            console.error("Error fetching collections:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        for (let i = 0; i < collections.length; i++) {
            const collection = collections[i];
            const products = await fetchProductsForCollection(collection.name);
            collection.products = products;
        }

        return res.status(200).json(collections);
    });
});

// Helper function to fetch products for a collection
async function fetchProductsForCollection(collectionName) {
    const sql = "SELECT * FROM collection_product WHERE collection_name = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [collectionName], (err, products) => {
            if (err) {
                console.error("Error fetching products for collection:", err);
                reject(err);
            }
            resolve(products);
        });
    });
}


// Backend API for storing collection name and share setting
app.post("/collection", (req, res) => {
    const { collectionName, shareSetting } = req.body; // Retrieve share setting from request body
    const sql = "INSERT INTO collection (name, share_settings) VALUES (?, ?)";
    db.query(sql, [collectionName, shareSetting], (err, result) => {
        if (err) {
            console.error("Error storing collection name and share setting:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Collection name and share setting stored successfully");
        return res.status(200).json({ collectionId: result.insertId });
    });
});


// Backend API for adding a product to a collection
app.post('/add-to-collection', (req, res) => {
    const { collectionName, productSku, productName, productImage, productPrice, category } = req.body;

    // Fetch category_id based on product category
    const getCategorySql = "SELECT * FROM product_category WHERE id = ?";
    db.query(getCategorySql, [category], (categoryErr, categoryData) => {
        if (categoryErr || categoryData.length === 0) {
            console.error("Error fetching category id:", categoryErr);
            return res.status(500).json({ error: "Error adding product to collection: Category not found" });
        }

        const categoryId = categoryData[0].id;

        // Insert product details into collection_product table
        const sql = "INSERT INTO collection_product (collection_name, sku, name, image_url, unit_price, category_id) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [collectionName, productSku, productName, productImage, productPrice, categoryId], (err) => {
            if (err) {
                console.error("Error adding product to collection:", err);
                return res.status(500).json({ error: "Error adding product to collection" });
            }
            res.status(200).json({ message: "Product added to collection successfully" });
        });
    });
});


// Backend API for fetching products from a collection
app.get("/collection-products/:collectionName", (req, res) => {
    const { collectionName } = req.params;
    const sql = `
    SELECT cp.*, pc.category_id
    FROM collection_product cp
    INNER JOIN product_category pc ON cp.category_id = pc.id
    WHERE cp.collection_name = ?
    `;
    db.query(sql, [collectionName], (err, data) => {
        if (err) {
            console.error("Error fetching products from collection:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json(data);
    });
});

// Backend API for deleting a collection
app.delete("/collections/:collectionName", (req, res) => {
    const { collectionName } = req.params;
    const sql = `
    DELETE FROM collection
    WHERE name = ?
    `;
    db.query(sql, [collectionName], (err, data) => {
        if (err) {
            console.error("Error deleting collection:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json({ message: "Collection deleted successfully" });
    });
});


// Backend API endpoint to fetch all details for a specific collection
app.get('/collections/:collectionName', (req, res) => {
    const { collectionName } = req.params;
    const sql = `
        SELECT * FROM collection WHERE name=?
    `;
    db.query(sql, [collectionName], (err, data) => {
        if (err) {
            console.error("Error fetching collection details:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Collection not found" });
        }
        // Assuming data is an array with one element
        const collectionDetails = data[0];
        return res.status(200).json(collectionDetails);
    });
});


  // Backend API for removing products from a collection
app.delete('/remove-from-collection', (req, res) => {
    const { collectionName, productSkus } = req.body;
  
    // Construct SQL query to delete products with specified SKUs from the collection
    const sql = `
      DELETE FROM collection_product
      WHERE collection_name = ? AND sku IN (?)
    `;
    db.query(sql, [collectionName, productSkus], (err) => {
      if (err) {
        console.error('Error removing products from collection:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Products removed from collection successfully' });
    });
  });


  app.put('/collections/:collectionName', async (req, res) => {
    try {
      const collectionName = req.params.collectionName;
      const updatedCollection = req.body; // Assuming the request body contains the updated collection details
  
      // Construct the update query
      const updateQuery = `
        UPDATE your_collection_table_name
        SET name = $1, share_settings = $2
        WHERE name = $3
      `;
  
      // Execute the update query
      await pool.query(updateQuery, [updatedCollection.name, updatedCollection.share_settings, collectionName]);
  
      // Send a response indicating success
      res.status(200).json({ message: 'Collection updated successfully' });
    } catch (error) {
      // Handle any errors
      console.error('Error updating collection:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Assuming 'app' is your Express app and 'db' is the MySQL connection

app.post('/store-address', (req, res) => {
    const { fullName, addressLine1, addressLine2, city, state, postalCode, country } = req.body;
  
    if (!fullName || !addressLine1 || !city || !state || !postalCode || !country) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    const insertSql = 'INSERT INTO address (fullName, addressLine1, addressLine2, city, state, postalCode, country) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    db.query(insertSql, [fullName, addressLine1, addressLine2, city, state, postalCode, country], (err, result) => {
      if (err) {
        console.error('Error storing address in MySQL:', err);
        return res.status(500).json({ message: 'Failed to store address in MySQL' });
      }
      console.log('Address stored in MySQL:', result);
      return res.status(200).json({ message: 'Address stored successfully in MySQL' });
    });
  });
  
  app.get("/get-address", (req, res) => {
    try {
      const query = "SELECT * FROM address";
      db.query(query, (err, result) => {
        if (err) {
          console.error('Error getting address from MySQL:', err);
          res.status(500).json({ message: 'Failed to retrieve address from MySQL' });
          return;
        }
        console.log('Address retrieved from MySQL:', result);
        res.status(200).json(result);
      });
    } catch (error) {
      console.error("Error getting address:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.listen(8081, () => {
    console.log('Server is running on port 3000');
  });