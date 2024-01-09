import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('allProducts/fetchProducts',async()=>{
    const response = await axios.get('https://dummyjson.com/products')
    
    //storing item in local storage to permanently store the item
    localStorage.setItem("products",JSON.stringify(response.data.products))

    return response.data.products
})

const productSlice = createSlice({
    name:'allProducts',
    initialState:{
        products:[],
        productContainer:[],
        loading:false,
        error:"",
        productsPerPage:10,
        currentPage:1
    },
    
    reducers:{
        productSearch:(state,action)=>{
           state.products = state.productContainer.filter(product=>product.title.toLowerCase().includes(action.payload))
        },
        onNavigateNext:(state)=>{
            state.currentPage++
        },
        onNavigatePrev:(state)=>{
            state.currentPage--
        }
    },

    
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
            state.productContainer = action.payload
        })
        builder.addCase(fetchProducts.rejected,(state)=>{
            state.loading = false
            state.products = []
            state.error = "API call Failed!!!"
        })
    }
    
})

export const {productSearch,onNavigateNext,onNavigatePrev} = productSlice.actions
export default productSlice.reducer