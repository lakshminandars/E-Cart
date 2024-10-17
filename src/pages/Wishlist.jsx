import React from 'react'
import {Row,Col,Button,Card  } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../Redux/slice/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';


function Whishlist() {
  const {wishlist} = useSelector((state) => state.wishListReducer)
  const dispatch=useDispatch()

  const handleCart=(product)=>{
    dispatch(removeFromWishlist(product.id))
   dispatch(addToCart(product))
  }

  return (
    <div>
      <Row className='mt-2 container'>
        {
          wishlist?.length>0?wishlist.map(product=>(
            <Col className='mt-5' sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: '18rem', height:'',marginTop:"30px",marginBottom:"30px" }}>
             <Link to={`/view/${product.id}`}>
             <Card.Img variant="top" style={{width:"100%",height:"250px"}} src={product.thumbnail} />
             </Link>
              <Card.Body>
                <Card.Title style={{fontFamily:"z"}}>{product.title}</Card.Title>
               
                <div className="d-flex justify-content-between">
                <td> <Button  onClick={()=>dispatch(removeFromWishlist(product.id))} variant="outline-danger"> <i class="fa-solid  fa-trash"></i></Button></td>

                  <Button onClick={()=>handleCart(product)} variant="outline-primary">
                  <i class="fa-solid fa-cart-shopping"></i>
                  </Button>
                </div>
  
               
              </Card.Body>
            </Card>
          </Col>
          )): <div className='d-flex align-items-center mt-5'>
            <img width={'600px'} className='mt-5' src="https://krosfitsports.com/public/empty-cart.gif" alt="" />
             <h1 className='text-danger fw-bolder mt-5'>Your Wishlist Is Empty....</h1>
          </div>
          
          
          }

      </Row>
    </div>
  )
}

export default Whishlist