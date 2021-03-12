import { useEffect, useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { goShoppin, uniqueBeers } from "../../helpers/inventory";
import "./styles.index.css";


const Shopper = ({ cart, setCart, masterList }) => {
  const [beer, setBeer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [choices, setChoices] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    setBeers(uniqueBeers(masterList));
  }, [masterList]);

  const handleChange = e => {
    const input = e.target.value;
    setBeer(input);
    if (!input) {
      return setChoices([]);
    }
    const options = beers.filter(beer => beer.toLowerCase().match(new RegExp(`^${input.toLowerCase()}.*`)));
    setChoices(options);
  };

  const handleQuantityChange = e => {
    const input = parseInt(e.target.value);
    setQuantity(input);
  };

  const handleAdd = () => {
    shoppingList.push({beer, quantity});
    setShoppingList([
      ...shoppingList,
    ]);
    const newCart = goShoppin(cart, shoppingList, masterList);
    setCart(newCart);
    setBeer("");
    setQuantity("");
  };

  return (
    <>
      <Autocomplete
        style={{ width: 300 }}
        onInputChange={handleChange}
        options={beers.sort()}
        value={beers.sort()}
        renderInput={(params) => (
          <TextField fullWidth={false} {...params} margin="normal" />
        )}
      />

      <TextField value={quantity} onChange={handleQuantityChange} />
      <Button onClick={handleAdd}>Add</Button>

    <Typography>Add beer and amount here to auto calculate cases needed to hit that beer amount.</Typography>

      <div>
        {
          shoppingList.map(item => {
            return <p>{item["beer"]} x{item["quantity"]}</p>
          })
        }
      </div>
    </>
  );
};

export default Shopper;



