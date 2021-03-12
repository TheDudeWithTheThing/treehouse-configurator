const selectCart = state => state.cart;
const selectCustomList = state => state.customBeerList;
const selectMainList = state => state.mainBeerList;

const selectByType = (state, type) => {
  return selectCustomList(state).filter(data => data["type"] === type);
};

const selectByTitle = (state, title) => {
  const datas = selectCustomList(state);
  return datas.filter(data => data["title"] === title);
}

const selectUniqueTitles = (state, options = {}) => {
  let datas = [];

  if (options["type"]) {
    datas = selectByType(state, options["type"]);
  } else {
    datas = selectCustomList(state);
  }

  const titles = {};
  datas.forEach(data => {
    titles[data["title"]] = 1;
  });
  return Object.keys(titles);
};

const selectUniqueBeers = (state) => {
  let beers = {};
  const datas = selectCustomList(state);

  datas.forEach(data => {
    if (data["type"] !== "merch" && data["beer"]) {
      beers[data["beer"]] = 1;
    }
  });

  return Object.keys(beers);
};


export { selectByType, selectByTitle, selectCart, selectCustomList, selectMainList, selectUniqueBeers, selectUniqueTitles };
