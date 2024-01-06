import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
    name:'wishlist',
    initialState:{
        wishlist:[]
    },
    reducers:{
        addToWishlist:(state,action)=>{
            state.wishlist.push(action.payload)
            // localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
        },
        removeFromWishlist:(state,action)=>{
            
            state.wishlist = state.wishlist.filter(item=>item.id!=action.payload)
        }
    }
})

export const {addToWishlist,removeFromWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer