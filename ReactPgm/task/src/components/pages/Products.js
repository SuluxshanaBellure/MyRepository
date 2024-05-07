import { NavLink } from 'react-router-dom';

export default function Products() {
  return (
    <div
      style={{
        width: "750px",
        marginRight: "100px",
        textAlign: "center",
      }}
    >
        <h3>Products</h3>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <img
              class="card-img-top"
              src="images/product1.png"
              alt="Card image cap"
            />

            <div class="card-body">
              <h5 class="card-text">Money Wallet Zipper Coin Purse</h5>
              <p class="card-text">Rs.499</p>
              <NavLink className="nav-link"  to="/product1">
               <button className='btn btn-primary'>View Product</button> 
              </NavLink>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <img
              class="card-img-top"
              src="images/product2.png"
              alt="Card image cap"
            />

            <div class="card-body">
              <h5 class="card-text">Universal travel adapter</h5>
              <p class="card-text">Rs.587</p>
              <NavLink className="nav-link"  to="/product2">
              <button className='btn btn-primary'>View Product</button> 
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
