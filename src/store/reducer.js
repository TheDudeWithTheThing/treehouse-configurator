import { ADD_TO_CART, GO_SHOP, REMOVE_FROM_CART, REMOVE_FROM_LIST } from "store/actions";
import { goShoppin } from "helpers/inventory";
import BEER_LIST from "datas/beers";

export const DEFAULT_STATE = {
  mainBeerList: BEER_LIST,
  customBeerList: BEER_LIST,
  cart: [],
}

const reducer = (state = DEFAULT_STATE, { type, payload } = {}) => {
  switch(type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat([payload]),
      }

    case REMOVE_FROM_CART:
      const index = state.cart.findIndex(item => item === payload);
      delete state.cart[index];

      return {
        ...state,
        cart: state.cart.filter(item => item !== undefined),
      }

    case REMOVE_FROM_LIST:
      const newCustomBeerList = state.customBeerList.filter(item => item["title"] !== payload);

      return {
        ...state,
        customBeerList: newCustomBeerList
      }

    case GO_SHOP:
      const newCart = goShoppin(state.cart, [{...payload}], state.customBeerList);

      return {
        ...state,
        cart: newCart,
      };

    default:
      return state;
  }
};

export default reducer;
