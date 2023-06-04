import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchString: "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in the basket`
        );
      }
      state.items = newBasket;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

export const { addToBasket, removeFromBasket, setSearchString } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);
export const searchString = (state) => state.basket.searchString;

export default basketSlice.reducer;
