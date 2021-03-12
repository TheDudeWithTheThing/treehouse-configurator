import { useContext } from "react";
import context from "./context";

const useStore = () => useContext(context);

export default useStore;
