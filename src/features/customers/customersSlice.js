import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 2,
    name: 'Pedro',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 3,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 4,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 5,
    name: 'Jose',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 6,
    name: 'Jose',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 7,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 8,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 9,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 10,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 11,
    name: 'Fernando',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 12,
    name: 'Fernando',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 13,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 14,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 15,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 16,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 17,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 18,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 19,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 20,
    name: 'Luis Gonzalez',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
  {
    id: 21,
    name: 'Julian',
    email: 'luis@gmail.com',
    phone: 7868794441,
    address: '5659 sw 122th place 33183',
    plan: 'Premium',
  },
];

export const customersSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  customersSlice.actions;

export default customersSlice.reducer;
