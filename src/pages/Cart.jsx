import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../Redux/slice/cartSlice';
import { emptyCart } from '../Redux/slice/cartSlice';
import emptycartIcon from '../assets/empty-cart.png'

function Cart() {
  const cart = useSelector((state) => state.cartReducer)
  const dispatch=useDispatch()
  
  const [total,setTotal]=useState(0)

  useEffect(()=>{
    if(cart.length>0)
    {
      setTotal(cart.map(product=>product.totalPrice).reduce((p1,p2)=>p1+p2))
    }else{
       setTotal(0)
    }
  },[cart])

 
  return (
    <div className="container" style={{ marginTop: '100px' }}>
      {
        cart?.length > 0 ?
          <div className="row mt-5">
            <div className="col-lg-8">
              <table className='table shadow'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                 { 
                  cart?.map((product,index)=>(
                    <tr>
                    <td style={{fontFamily:"z"}} className='fw-bolder'>{index+1}</td>
                    <td style={{fontFamily:"z"}} className='fw-bolder fs-4'>{product.title}</td>
                    <td><img style={{ width: "100%", height: "100%" }} src={product.thumbnail}/></td>
                    <td><input style={{fontFamily:"z",width:"30px",textAlign:"center"}} readOnly type="text" className='fw-bolder border border-2 fs-5 rounded'  value={product?.quantity}  /></td>

                    <td className='text-danger fw-bolder fs-5'>${product?.totalPrice}</td>
                    <td> <Button  onClick={()=>dispatch(removeFromCart(product.id))} variant="outline-danger"> <i class="fa-solid  fa-trash"></i></Button></td>

                  </tr>
                  ))
                 }
                </tbody>

              </table>
              <div className="d-flex justify-content-between">
                <button onClick={()=>dispatch(emptyCart())} style={{fontFamily:"z"}} className='btn btn-danger fs-5'>Empty Cart</button>
                <Link to={'/'} style={{ textDecoration: 'none' ,fontFamily:"z"}} className='btn btn-outline-success fs-5'>Shop More</Link>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-3">
              <div className="container border rounded shadow mt-5 p-5 w-100">
                <h1 style={{fontFamily:"z"}}>Cart Summary</h1>
                <h4 style={{fontFamily:"z"}}>Total Products :  {cart.length}</h4>
                <h5 style={{fontFamily:"z"}}>Total: <span className='text-danger fw-bolder'>${total}</span></h5>
              </div>
              <div className="d-grid">
                <Button style={{fontFamily:"z"}} className='btn btn-success m-3 rounded fs-5'>Checkout</Button>
              </div>
            </div>
          </div>
          : <div className='d-flex align-items-center mt-5'>
            <img width={'600px'} className='mt-5' src={emptycartIcon} alt="emptycart" />
            <h1 className='text-danger fw-bolder mt-5'>Your Cart Is Empty....</h1>
          </div>
      }
    </div>
  )
}

export default Cart