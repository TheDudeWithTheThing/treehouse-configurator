import { useEffect } from "react";
import { Button, Card, List, Typography } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { getCartCode, setCartByCode } from "helpers/inventory";
import { getCodeParam } from "helpers/urls";
import { useStore } from "store";
import { REMOVE_FROM_CART } from "store/actions";
import { selectMainList, selectByTitle, selectCart, selectUniqueBeers } from "store/selectors";
import CartItem from "./CartItem";

const { Text } = Typography;

const beersWithCounts = (state, allBeers, cartDatas) => {
  const newList = {};
  const zeroList = {};

  allBeers.forEach(beer => {
    zeroList[beer] = 0;
  });

  cartDatas.forEach(title => {
    const beerByTitle = selectByTitle(state, title);
    beerByTitle.forEach(bbt => {
      const beer = bbt["beer"];
      delete zeroList[bbt["beer"]];
      if (!(beer in newList)) {
        newList[beer] = 0;
      }
      newList[bbt["beer"]] += parseInt(bbt["quantity"]);
    });
  });

  const sortedNewList = {};
  Object.keys(newList).sort().forEach(key => {
    sortedNewList[key] = newList[key];
  });

  const sortedZeroList = {};
  Object.keys(zeroList).sort().forEach(key => {
    sortedZeroList[key] = zeroList[key];
  });

  return {...sortedNewList, ...sortedZeroList};
};

const Cart = () => {
  const { state, dispatch } = useStore();
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const cartDatas = selectCart(state);
  const mainBeerList = selectMainList(state);
  const allBeers = selectUniqueBeers(state);
  const beerList = beersWithCounts(state, allBeers, cartDatas);
  const code = getCodeParam();

  const beerListTitle = `Beer Totals ( ${Object.values(beerList).reduce(reducer, 0)} cans )`;

  const removeFromCart = title => {
    dispatch({type: REMOVE_FROM_CART, payload: title});
  };

  useEffect(() => {
    setCartByCode(mainBeerList, code, dispatch);
  }, [code, dispatch, mainBeerList]);

  const cartCode = getCartCode(mainBeerList, cartDatas);

  return (
    <>
      <Card title={<Text copyable={{ text: `${window.location.origin}/treehouse-cases?code=${cartCode}` }}>What to Buy</Text>} bodyStyle={{ padding: "16px 8px"}}>
        <List
          size="small"
          dataSource={cartDatas.sort()}
          renderItem={item => (
            <List.Item style={{ padding: "0px" }}>
              <Button style={{ color: "red" }} key={item} type="link" onClick={() => removeFromCart(item)}><CloseSquareOutlined /></Button> {item}
            </List.Item>
          )}
        />
      </Card>

      <Card title={beerListTitle}>
        <List
          dataSource={Object.keys(beerList)}
          renderItem={item => (
            <List.Item>
              <CartItem key={`ci-${item}`} beer={item} quantity={beerList[item]} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default Cart;
