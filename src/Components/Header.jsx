import React, { useEffect, useState } from 'react'
import { Badge, Container, Nav,  Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { productSearch } from '../Redux/Slices/productSlice'


function Header({insideHome}) {
  const dispatch = useDispatch()
  const [wishlistCount,setWishlistCount] = useState(0)
  const [cartCount,setCartCount] = useState(0)
  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
  const cart = useSelector((state)=>state.cartReducer)

  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])
  return (
    <Navbar style={{zIndex:'1'}} expand='lg' className="bg-primary position-fixed top-0 w-100 mb-5">
    <Container>
      <Navbar.Brand  style={{color:'white',fontSize:'25px'}}>
     <Link to={'/'} style={{textDecoration:'none',color:'White'}}>
     <i class="fa-solid fa-cart-shopping" style={{height:'26px'}}></i>
          E-cart
     </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        {insideHome&& <Nav.Link className='me-lg-5'>
          <input onChange={e=>dispatch(productSearch(e.target.value.toLowerCase()))} style={{width:'400px'}} type="text" className="form-control" placeholder='Search Products'/>
        </Nav.Link>}
       
        <Nav.Link className='btn  rounded'>
          <Link to={'/wishlist'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white'}}>
            <i className="fa-solid fa-heart text-danger me-2"></i>Wishlist
          <Badge className='ms-2 rounded' bg="light">{wishlistCount}</Badge>
          </Link>
        </Nav.Link>
        <Nav.Link className='btn  rounded ms-5'>
          <Link to={'/cart'} className='d-flex align-items-center' style={{textDecoration:'none',color:'white'}}>
            <i className="fa-solid fa-heart text-danger me-2"></i>Cart
          <Badge className='ms-2 rounded' bg="light">{cartCount}</Badge>
          </Link>
        </Nav.Link>

      </Nav>
      </Navbar.Collapse>
      
    </Container>
  </Navbar>
  )
}

export default Header