import { useEffect, useState } from "react";
import { Button, List, Space, Typography } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { byTitle } from "helpers/inventory";
import { selectByTitle, selectCart } from "store/selectors";
import { useStore } from "store";
import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_LIST } from "store/actions";

const { Text, Title } = Typography;

const Product = ({ title }) => {
  const { state, dispatch } = useStore();
  const beers = selectByTitle(state, title);
  const cart = selectCart(state);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (cart) {
      setCount(cart.filter(x => x === title).length);
    }
  }, [title, cart]);

  const handleAdd = () => {
    dispatch({type: ADD_TO_CART, payload: title});
    setCount(count + 1);
  };

  const handleRemove = () => {
    dispatch({type: REMOVE_FROM_CART, payload: title});
    if (count > 0) {
      setCount(count -1);
    }
  };

  const handleRemoveProduct = e => {
    dispatch({type: REMOVE_FROM_LIST, payload: title});
    handleRemove();
  };

  const inCart = beer => {
    const isInCart = cart.some(title => {
      return byTitle(title).some(b => b["beer"] === beer);
    });

    if (isInCart) {
      return { fontWeight: 600, color: "#18a343" };
    }

    return {};
  };

  const getColumnCount = beers => {
    if (beers.length < 5) return beers.length;

    return 5;
  };

  return (
    <Space direction="vertical" style={{ width: "100%", padding: "8px 16px" }}>
      <Title level={5}>{title}</Title>
      <List
        grid={{ gutter: 8, column: getColumnCount(beers) }}
        dataSource={beers}
        renderItem={beer=> (
          <List.Item>
            <Text style={inCart(beer.beer)}>{`${beer["quantity"]}x ${beer["beer"]}`}</Text>
          </List.Item>
        )}
      />
      <Space direction="horizontal">
        <Button variant="outlined" onClick={handleAdd}>Add</Button>
        <Button variant="outlined" onClick={handleRemove}>Remove</Button>
        <Button>{count}</Button>
        <Button onClick={handleRemoveProduct}><StopOutlined/></Button>
      </Space>
    </Space>
  );
};

export default Product;
