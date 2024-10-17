import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Redux/slice/productSlice'
import { addToWishlist } from '../Redux/slice/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';
import Header from '../components/Header';

function Home() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.productReducer)
  const { wishlist } = useSelector((state) => state.wishListReducer)
  const cart = useSelector((state) => state.cartReducer)


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleWishlist = (product) => {
    const existingProduct = wishlist.find(item => item?.id == product?.id)
    if (existingProduct) {
      alert("Product Already Exist in Wishlist")
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const handleCart = (product) => {
    const existingProduct = cart?.find(item => item.id == product.id)
    if (existingProduct) {
      dispatch(addToCart(product))
      alert("Items Added")
    } else {
      dispatch(addToCart(product))
      alert("Item Added")
    }
  }



  return (
    <>
    <Header insideHome={true}/>
     <div>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          Loading...
        </div>
      ) : (
        <div className="container mt-4">
          <Row className="justify-content-center">
            {products?.length > 0 ? (
              products.map((product, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3} className="d-flex justify-content-center mb-4">
                  <Card
                    style={{ width: '18rem', height: '520px', cursor: 'pointer', transition: 'transform 0.3s', marginTop: "30px", marginBottom: "30px" }}
                    className="shadow-lg border-0 custom-card mt-5 p-5"
                  // onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  // onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1.0)"}
                  >
                    <Link to={`/view/${product.id}`}>
                      <Card.Img variant="top" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={product.thumbnail} />
                    </Link>
                    <Card.Body>
                      <Card.Title style={{fontFamily:"z"}}>{product.title.slice(0,15)}</Card.Title>
                      <Card.Text style={{fontFamily:"z"}}>
                        {product.description.slice(0, 20)}...
                      </Card.Text>
                      <Card.Text className='fw-bolder fs-4' style={{fontFamily:"z"}} >
                        {product.price}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button variant="outline-danger" onClick={() => handleWishlist(product)}>
                          <i className="fa-regular fa-heart"></i>
                        </Button>
                        <Button variant="outline-primary" onClick={() => handleCart(product)}>
                          <i className="fa-solid fa-cart-shopping"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div>
                <p>Nothing to show here</p>
              </div>
            )}
          </Row>
        </div>
      )}
    </div>
    </>
   
  );
}

export default Home;


