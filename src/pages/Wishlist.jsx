import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/Slices/wishlistSlice'

function Wishlist() {
  const dispatch = useDispatch()
  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)

  return (
    <div style={{marginTop:'60px'}}>
      <Row className='mt-5 container'>
       { wishlist?.length>0?wishlist?.map(product=>(
       <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
         <Card className='shadow rounded' style={{ width: '18rem' }}>
          <Link to={`/view/${product.id}`}><Card.Img style={{height:'250px'}} variant="top" src={product.thumbnail} /></Link>
            <Card.Body>
            <Card.Title>{product.title.slice(0,20)}...</Card.Title>
          <div className="d-flex justify-content-between">
          <button onClick={()=>dispatch(removeFromWishlist(product.id))} className="btn btn-light fs-5"><i className='fa-solid fa-heart-circle-xmark text-danger'></i></button>
          <button className="btn btn-light fs-5"><i className='fa-solid fa-cart-plus text-success'></i></button>
          </div>
          </Card.Body>
        </Card>
      </Col>
      )): <div className='text-center'>
        <img width={'50%'} height={'400px'} src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png" alt="" />
        <h1>Your Wishlist is Empty</h1>
      </div>
      }
      </Row>
    </div>
  )
}

export default Wishlist