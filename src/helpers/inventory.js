import { ADD_TO_CART } from "store/actions";
import OPTIONS from "../datas/beers";

const sortByKey = key => {
  const compare = (a, b) => {
    return a[key].localeCompare(b[key]);
  };

  return compare;
}

const DATAS = OPTIONS.sort(sortByKey("title"));

const byType = ( type, datas = DATAS ) => {
  return datas.filter(data => data["type"] === type);
};

const byBeer = (beer, datas = DATAS) => {
  return datas.filter(data => data["beer"] === beer);
};

const byTitle = (title, data = DATAS) => {
  return data.filter(data => data["title"] === title);
};

const byTitleAndBeer = (title, beer, data = DATAS) => {
  const titleResults = byTitle(title, data);
  return byBeer(beer, titleResults);
};

const sortByQuantity = data => {
  data.sort(sortByKey("quantity"));
};

const uniqueBeers = (datas = DATAS) => {
  let beers = {};
  datas.forEach(data => {
    if (data["beer"]) {
      beers[data["beer"]] = 1;
    }
  });

  return Object.keys(beers);
};

const getAmountInCart = ((beer, cart) => {
  let amount = 0;
  cart.forEach(title => {
    const result = byTitleAndBeer(title, beer);
    if (result.length > 0) {
      amount += parseInt(result[0]["quantity"]);
    }
  })
  return amount;
});

const goShoppin = (cart, shoppingList, datas) => {
  const newCart = [...cart];
  let amountInCart = 0;
  // for each beer in shopping list
  shoppingList.forEach(listItem => {
    // get amount from cart
    let beer = listItem["beer"];
    let desiredAmount = parseInt(listItem["quantity"]);
    amountInCart = getAmountInCart(beer, cart);
    let remaining = desiredAmount - amountInCart;
    while (remaining > 0) {
      const theTypes = byType("mixed", datas);
      const beerCandidates = byBeer(beer, theTypes).sort(sortByKey("quantity")).reverse();

      if (beerCandidates.length === 0) {
        return newCart;
      }

      // eslint-disable-next-line
      beerCandidates.forEach(beerCandidate => {
        const candidateQuantity = parseInt(beerCandidate["quantity"]);
        const candidateTitle = beerCandidate["title"];
        if (candidateQuantity <= remaining || (remaining - candidateQuantity < 0 && remaining > 0)) {
          newCart.push(candidateTitle);
          remaining = remaining - candidateQuantity;
        }
      })
    }
  });

  return newCart;
};

const setCartByCode = (masterList, code, dispatch) => {
  if (!code) return;

  const codeStruct = JSON.parse(atob(code));

  for (const [index, amount] of Object.entries(codeStruct)) {
    for(let i = 0; i < amount; i++) {
      dispatch({type: ADD_TO_CART, payload: masterList[index].title});
    }
  }
};

const getCartCode = (masterList, cart) => {
  const codeStruct = {};
  cart.forEach(item => {
    const index = masterList.findIndex(masterItem => masterItem.title === item);
    if (!(index in codeStruct)) {
      codeStruct[index] = 0;
    }
    codeStruct[index]++;
  });

  return btoa(JSON.stringify(codeStruct));
};

export { DATAS, byBeer, byTitle, byType, getCartCode, goShoppin, setCartByCode, sortByQuantity, uniqueBeers };
