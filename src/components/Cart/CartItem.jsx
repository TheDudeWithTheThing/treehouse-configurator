import { InputNumber, Space, Typography } from "antd";
import { GO_SHOP } from "store/actions";
import { useStore } from "store";

const { Text } = Typography;

const CartItem = ({ beer, quantity }) => {
  const { dispatch } = useStore();

  const onInputChange = e => {
    const quantity = parseInt(e.currentTarget.value);
    dispatch({ type: GO_SHOP, payload: { beer, quantity }});
  };


  const textType = (quantity > 0) ? "success" : "primary";

  return (
    <Space direction="horizontal">
      <InputNumber
        style={{ width: 64 }}
        maxLength={3}
        defaultValue={0}
        onBlur={onInputChange}
        value={quantity}
      />
      <Text type={textType}>x {beer}</Text>
    </Space>
  );
};

export default CartItem;
