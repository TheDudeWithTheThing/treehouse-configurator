import React, { useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import reducer, { DEFAULT_STATE } from "./reducer";
import StoreContext from "./context";

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const store = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
