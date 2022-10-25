import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
	  id: 1,
	  name: 'fume 1',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 2,
	  name: 'product 2',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 3,
	  name: 'product 3',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 4,
	  name: 'product 4',
	  quantity: 8,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 5,
	  name: 'product 5',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 6,
	  name: 'product 6',
	  quantity: 10,
	  price: 19.99,
	  category: 'product category',
	},
	{
	  id: 7,
	  name: 'product 7',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 8,
	  name: 'product 8',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 9,
	  name: 'product 9',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 10,
	  name: 'product 10',
	  quantity: 100,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 11,
	  name: 'product 11',
	  quantity: 220,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 12,
	  name: 'product 12',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 13,
	  name: 'product 13',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 14,
	  name: 'product 14',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 15,
	  name: 'product 15',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 16,
	  name: 'product 16',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 17,
	  name: 'product 17',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 18,
	  name: 'product 18',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 19,
	  name: 'product 19',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	},
	{
	  id: 20,
	  name: 'product 20',
	  quantity: 10,
	  price: 9.99,
	  category: 'product category',
	}
	
  ]

export const productsSlice = createSlice({
	name: 'counter',
	initialState,
	reducers:{
		increment: (state) =>{
			state.value += 1
		},
		decrement: (state) =>{
			state.value -= 1
		},
		incrementByAmount: (state, action) =>{
			state.value += action.payload
		},
		findByName: (state) =>{
			// let values = []
			// state.map(n =>{
			// 	if(n.name.includes(action.payload)){
			// 		values.push(n)
			// 	}
			// })
			
			return console.log(state)
		}
	}
})


export const {increment, decrement, incrementByAmount, findByName} = productsSlice.actions

export default productsSlice.reducer