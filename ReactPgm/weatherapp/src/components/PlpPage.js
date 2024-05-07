import "./plppage.css";

export default function PlpPage(){
    return(
        <>
            <main>
    <section class="products">
      <article class="product">
        <img src="product1.jpg" alt="Product 1"/>
        <h2>Product Name</h2>
        <p>Description of the product goes here.</p>
        <span>$99.99</span>
        <button>Add to Cart</button>
      </article>

    </section>
  </main>

  <footer>
    <p>&copy; 2024 Product Listing Page</p>
  </footer>
        </>
    );
}