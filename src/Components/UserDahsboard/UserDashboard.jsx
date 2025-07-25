import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../DataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import ProductNode from "../ProductNode/ProductNode";

export default function UserDashBoard() {
  const { productsData, setProductsData } = useContext(dataContext);

  const [currentUser, setCurrentUser] = useState({});

  const [cartItems, setCartItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(location.state.user);
  }, []);

  const handleAddToCart = (product) => {
    const isproductInCart = cartItems.find((item) => item.id === product.id);
    if (isproductInCart) {
      alert("Product is Already in cart!!");
      return;
    }
    setCartItems([...cartItems, { ...product, qty: 1 }]);
  };

  const increaseQuantity = (product) => {
    const idx = cartItems.findIndex((item) => item.id === product.id);
    cartItems[idx].qty += 1;
    setCartItems([...cartItems]);
  };

  const decreaseQuantity = (product) => {
    const idx = cartItems.findIndex((item) => item.id === product.id);
    if (cartItems[idx].qty <= 1) {
      cartItems.splice(idx, 1);
    } else {
      cartItems[idx].qty -= 1;
    }
    setCartItems([...cartItems]);
  };

  const handleRemoveFromCart = (product)=>{
    const idx = cartItems.findIndex((item)=>item.id===product.id);
    cartItems.splice(idx,1);
    setCartItems([...cartItems]);
  }

  return (
    <div>
      <div
        className="d_flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <h1>User Dashboard</h1>
        <div className="d_flex" style={{ alignItems: "center", gap: "10px" }}>
            <div style={{position:'relative',padding:'20px'}}>
                <button style={{border:'none',background:'white'}}>cart</button>
                {cartItems.length !== 0 && <div style={{color:'white',background:'red',borderRadius:'50%',position:'absolute',top:10,right:20,padding:'0px 5px'}}>{cartItems.length}</div>}
            </div>
          <p>{currentUser.username}</p>
          <button onClick={() => navigate("/")} style={{ padding: "5px" }}>
            Logout
          </button>
        </div>
      </div>
      <hr />
      {/* Products And cart Section */}
      <div className="d_flex">
        {/* Products Section */}
        <div style={{ width: "70%" }}>
          <div className="container">
            <div className="row">
              {productsData.length !== 0 ? (
                productsData.map((item) => {
                  return (
                    <div
                      key={item.id + item.title + item.price}
                      className="col-6 col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <ProductNode
                        product={item}
                        handleAddToCart={handleAddToCart}
                      />
                    </div>
                  );
                })
              ) : (
                <div>No Products Found!!</div>
              )}
            </div>
          </div>
        </div>
        {/* Cart Section */}
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding:'10px',
            // border:'1px solid black',
          }}
        >
            <h1>Cart Items:</h1>
          {cartItems.length !== 0 ? (
            cartItems.map((item) => {
              return (
                <div
                  key={item.id + item.title + item.price}
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    border: "1px solid black",
                    padding: "10px 20px",
                    width: "100%",
                  }}
                >
                  <h2>{item.title}</h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                      <span>{item.qty}</span>
                      <button onClick={() => decreaseQuantity(item)}>-</button>
                    </div>
                    <div>${item.qty * item.price}</div>
                    <button  onClick={()=>handleRemoveFromCart(item)}>Remove</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Items in cart</div>
          )}
          <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid black",
                padding:'20px 10px',
            }}
          >
            <h3>Total:</h3>
            <p>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
