import { CartProvider } from "./context/CartProvider";
import Storefront from "./components/Storefront";

function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}

export default App;
