import { useState } from "react";
import { Affix, Col, Menu, Row, Typography } from "antd";
import { useStore } from "store";
import { selectUniqueTitles } from "store/selectors";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import './App.css';

const { Title } = Typography;

const titleStyle = {
  marginLeft: "16px",
  textTransform: "capitalize",
};

const types = ["mixed", "case", "four", "six", "twelve", "single", "merch", "unknown"];

function App() {
  const { state } = useStore();
  const [productType, setProductType] = useState("mixed");

  const updateProducts = e => {
    setProductType(e.key);
  };

  return (
    <>
      <Affix>
        <Menu mode="horizontal" defaultSelectedKeys={[productType]}>
          {types.map(type => (
            <Menu.Item key={type} onClick={updateProducts}>{type}({selectUniqueTitles(state, { type: type }).length})</Menu.Item>
          ))}
        </Menu>
      </Affix>

      <Row>
        <Col xs={23} sm={16} style={{ overflow: "auto", height: "100vh" }}>
          <Title level={3} style={titleStyle}>{productType}</Title>
          <ProductList items={selectUniqueTitles(state, { type: productType })} />
        </Col>
        <Col xs={1} sm={8} className="sider-padding" theme="light">
          <Cart key={"cart"} />
        </Col>
      </Row>
    </>
  );
}

export default App;
