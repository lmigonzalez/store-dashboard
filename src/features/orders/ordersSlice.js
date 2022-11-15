import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 2,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 3,
    product: 'Coffee',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 4,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 5,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 6,
    product: 'Pasta',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 7,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 8,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 9,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 10,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 11,
    product: 'Coca-Cola',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 12,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 13,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 14,
    product: 'Sandwich',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 15,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 16,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 17,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 18,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 19,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 20,
    product: 'Pizza',
    client: 'Richard Smith',
    amount: 5,
    total: 40,
    date: 'Dic 12 2022',
    order: 450,
  },
];

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
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

export const {increment, decrement, incrementByAmount, findByName} = ordersSlice.actions

export default ordersSlice.reducer