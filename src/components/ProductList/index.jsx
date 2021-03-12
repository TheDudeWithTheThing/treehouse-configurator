import { Space } from 'antd';
import Product from "../Product";

const ProductList = ({items, cart}) => {
  return (
    <Space direction="vertical" size="large">
        {items.map(value => {
          return (
              <Product title={value} key={`p-${value}`} />
          );
        })}
    </Space>
  );
};

export default ProductList;
