import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 2,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 3,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 4,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 5,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 6,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 7,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 8,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 9,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 1,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 10,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 11,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 12,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 13,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 14,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 15,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 16,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 17,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 18,
    client: 'Mario Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 19,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 20,
    client: 'Richard Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
    date: 'Dic 12 2022',
    order: 450,
  },
  {
    id: 21,
    client: 'Juan Smith',
    products: [
      {
        id: 1,
        product: 'pizza',
        amount: 3,
        price: 5.99,
      },
      {
        id: 2,
        product: 'sandwich',
        amount: 2,
        price: 3.99,
      },
      {
        id: 3,
        product: 'ice cream',
        amount: 1,
        price: 1.99,
      }
    ],
    quantity: 3,
    total: 27.94,
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