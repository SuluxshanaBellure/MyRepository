import React, { useState, useCallback, useEffect,useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DarkModeContext from "./global/DarkModeContext ";

// Define sorting functions outside the component
const sortById = (direction, productsToSort) => {
  const sortedProducts = [...productsToSort].sort((a, b) =>
    direction === "asc" ? a.id - b.id : b.id - a.id
  );
  return sortedProducts;
};

const sortByName = (direction, productsToSort) => {
  const sortedProducts = [...productsToSort].sort((a, b) => {
    if (direction === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  return sortedProducts;
};

const sortByPrice = (direction, productsToSort) => {
  const sortedProducts = [...productsToSort].sort((a, b) => {
    if (direction === "asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else {
      return parseFloat(b.price) - parseFloat(a.price);
    }
  });
  return sortedProducts;
};

export default function AddProduct() {
  const { isDarkMode } = useContext(DarkModeContext); 


  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [disableBool, setDisableBool] = useState(false);

  const handleInputs = (e) => {
    e.persist();
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
    setShowModal(true);
  };

  const saveProduct = (e) => {
    e.preventDefault();

    const data = {
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      quantity: newProduct.quantity,
    };

    if (selectedProduct) {
      axios
        .put(
          `http://localhost:8081/products/update/${selectedProduct.id}`,
          data
        )
        .then((res) => {
          alert(res.data.message);
          fetchProducts();
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      axios
        .post("http://localhost:8081/products/insert", data)
        .then((res) => {
          alert(res.data.message);
          fetchProducts();
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }

    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
    setSelectedProduct(null);
    setShowModal(false);
  };

  const deleteRow = (id) => {
    axios
      .delete(`http://localhost:8081/products/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        const updatedProducts = products.filter((item) => item.id !== id);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const fetchProducts = useCallback(() => {
    axios
      .get("http://localhost:8081/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const disableBoolHandler = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    setDisableBool(currentProducts.length === 0);
  }, [currentPage, itemsPerPage, products]);

  const [value, setValue] = useState("NoSort");
  const [sortDirection, setSortDirection] = useState({
    id: "asc",
    name: "asc",
    price: "asc",
  });
  const [sortBy, setSortBy] = useState("id");

  const handleSort = (column) => {
    const direction = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortDirection({ ...sortDirection, [column]: direction });
  };

  useEffect(() => {
    console.log("Sorting by price:", value);
    fetch(
      `http://localhost:8081/products?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((fetchedProducts) => {
        let sortedProducts = [...fetchedProducts];

        if (sortBy === "name") {
          sortedProducts = sortByName(sortDirection[sortBy], sortedProducts);
        }

        if (sortBy === "price") {
          console.log("sortBy: ", sortBy);
          console.log("value: ", value);

          if (value === "LowToHigh" || value === "HighToLow") {
            console.log("Sorting by price in ", value, " order");
            sortedProducts = sortByPrice(
              value === "LowToHigh" ? "asc" : "desc",
              sortedProducts
            );
          } else {
            console.log(
              "Sorting by price in direction: ",
              sortDirection[sortBy]
            );
            sortedProducts = sortByPrice(sortDirection[sortBy], sortedProducts);
          }
        }

        // Sort by ID
        if (sortBy === "id") {
          sortedProducts.sort((a, b) =>
            sortDirection[sortBy] === "asc" ? a.id - b.id : b.id - a.id
          );
        }

        setProducts(sortedProducts);
        disableBoolHandler();
      })
      .catch((error) => console.error(error));
  }, [
    currentPage,
    itemsPerPage,
    disableBoolHandler,
    value,
    sortDirection,
    sortBy,
  ]);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const renderHeader = (column, label) => (
    <th key={column} onClick={() => handleSort(column)}>
      {label}
      {sortBy === column && (
        <FontAwesomeIcon
          icon={sortDirection[column] === "asc" ? faCaretUp : faCaretDown}
          style={{ marginLeft: "5px", color: "#777" }}
        />
      )}
      {sortBy !== column && (
        <div style={{ display: "inline-block" }}>
          {column !== "id" && (
            <>
              <FontAwesomeIcon
                icon={faCaretUp}
                style={{ marginRight: "3px", color: "#777" }}
              />
              <FontAwesomeIcon icon={faCaretDown} style={{ color: "#777" }} />
            </>
          )}
        </div>
      )}
    </th>
  );

  return (
    <div
    style={{ backgroundColor: isDarkMode ? "#E8E8E8" : "#fff", margin: "0 169px", paddingTop:"120px" }}
    >
     <Link to="/">
  <button className="btn btn-danger">Back</button>
</Link>
      <form style={{ justifyContent: "flex-end" }}>
        <label htmlFor="sort">Price : </label>
        <select
          name="sort"
          id="sort"
          className="sort-selection-style"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <option value="NoSort">No sort</option>
          <option value="HighToLow">Price(HighToLow)</option>
          <option value="LowToHigh">Price(LowToHigh)</option>
        </select>
      </form>
      <table >
        <thead>
          <tr>
            {renderHeader("id", "ID")}
            {renderHeader("name", "Name")}
            <th>Description</th>
            {renderHeader("price", "Price")}
            <th>Quantity</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {/* <td>{item.name}</td> */}
              <td>
                <Link to={`/product/${item.id}`}>{item.name}</Link>
              </td>

              <td>{item.description}</td>
              <td>${item.price}</td>
              <td style={{textAlign:"center"}}>{item.quantity}</td>
              <td>
                {item.colors &&
                  item.colors.map((color, index) => (
                    <span key={index} style={{ backgroundColor: color }}>
                      {color}
                    </span>
                  ))}
              </td>
              <td>
                <Button variant="info" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => deleteRow(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalProducts > 0 && !disableBool && (
        <PaginationControl
          page={currentPage}
          total={totalProducts}
          limit={itemsPerPage}
          changePage={(currentPage) => setCurrentPage(currentPage)}
          ellipsis={1}
        />
      )}

      {totalProducts > 0 && disableBool && (
        <PaginationControl
          disabled={true}
          page={currentPage}
          total={totalProducts}
          limit={itemsPerPage}
          changePage={(currentPage) => setCurrentPage(currentPage)}
          ellipsis={1}
        />
      )}

      {/* Bootstrap Modal */}
      <Button
        className="btn btn-primary"
        style={{ height: "40px" }}
        onClick={() => {
          setNewProduct({
            id: "",
            name: "",
            description: "",
            price: "",
            quantity: "",
            color: "",
          });
          setSelectedProduct(null);
          setShowModal(true);
        }}
      >
        Add product
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveProduct}>
            <label>Product id</label>
            <input
              type="text"
              name="id"
              id="id"
              value={newProduct.id}
              onChange={handleInputs}
              className="form-control validate"
            />
            <label>Product name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={newProduct.name}
              onChange={handleInputs}
              className="form-control validate"
            />
            <label>Product description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={newProduct.description}
              onChange={handleInputs}
              className="form-control validate"
            />
            <label>Product price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={newProduct.price}
              onChange={handleInputs}
              className="form-control validate"
            />
            <label>Product quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={newProduct.quantity}
              onChange={handleInputs}
              className="form-control validate"
            />
            <label>Product color</label>
            <input
              type="varchar"
              name="color"
              id="color"
              value={newProduct.color}
              onChange={handleInputs}
              className="form-control validate"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={saveProduct}>
            {selectedProduct ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <label htmlFor="items">No. of items per page</label>
        <select
          name="items"
          id="items"
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value={products.length}>All products</option>
        </select>
      </div>

      {/* <PdpPage currentItems={selectedProduct} /> */}
    </div>
  );
}
