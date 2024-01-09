import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decrementQuantity, emptyCart, incrementQuantity, removeCart } from '../Redux/Slices/cartSlice'
import Header from '../Components/Header'

function Cart() { 
  const cart = useSelector((state)=>state. cartReducer)
  const dispatch = useDispatch()
  const [cartAmount,setCartAmount] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    if(cart?.length>0){
      setCartAmount(cart?.map(product=>product?.totalPrice).reduce((p1,p2)=>p1+p2))
    }else{
      setCartAmount(0)
    }
  },[cart])

  const handleCheckout = () =>{
    alert("Your Order has Successfull placed...Thank you for purchasing!!!")
    dispatch(emptyCart())
    navigate('/')
  }

  const handleDecrement = (product) =>{
    if(product.quantity==1){
      dispatch(removeCart(product.id))
    }else{
      dispatch(decrementQuantity(product))
    }
  }

  return (
   <>
   <Header/>
      <div className='container mt-5'>
        {cart?.length>0? <div className="row mt-5">
          <div className="col-lg-8">
            <div className="mt-5">Cart Summary</div>
            <table className="table shadow mt-3">
             <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
             </thead>
             <tbody>
             {cart.map((product,index)=>(
              <tr key={index}>
              <td>{index+1}</td>
              <td>{product?.title}</td>
              <td><img style={{height:'60px',width:'60px'}} src={product?.thumbnail} alt="product" /></td>
              <td>
                <div className='d-flex'>
                <button onClick={()=>handleDecrement(product)} className='btn fw-bolder'>-</button>
                 <input style={{width:'50px'}} className='form-control' type="text" value={product.quantity} readOnly/>
                <button onClick={()=>dispatch(incrementQuantity(product))} className='btn fw-bolder'>+</button>
              </div>
              </td>
              <td>{product?.totalPrice}</td>
              <td><button onClick={()=>dispatch(removeCart(product.id))} className='btn'><i className='fa-solid fa-trash text-danger'></i></button></td>
              </tr>
             )) }
             </tbody>
            </table>
            <div className='float-end'>
              <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
              <Link to={'/'} className='btn btn-primary me-3'>Shop More </Link>
            </div>
          </div>
          <div className="col-lg-4 mt-5">
            <div className="d-flex flex-column border rounded p-4">
              <h5>Total Product: <span className="fw-bolder">{cart?.length}</span></h5>
              <h3>Total Amount: <span className="fw-bolder">$ {cartAmount}</span></h3>
              <hr />
              <div className="d-grid">
                <button onClick={handleCheckout} className="btn btn-success">Checkout</button>
              </div>
            </div>
          </div>
        </div>:<div className='text-center'>
          <img width={'50%'} height={'400px'} src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png" alt="" />
          <h1>Your Cart is Empty</h1>
          <Link to={'/'} className='btn btn-success'>Click here to Shop More</Link>
        </div>
        
      }
      </div>
   </>
  )
}

export default Cart