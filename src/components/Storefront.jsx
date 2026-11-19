import { useEffect, useState } from "react";
import Banner from "./Banner";
import Cart from "./Cart";
import Description from "./Description";
import Footer from "./Footer";
import Header from "./Header";
import ShoppingList from "./ShoppingList";
import { plantList } from "../datas/plantList";
import { useCart } from "../context/CartContext";

function getPlantIdFromUrl() {
  return new URLSearchParams(window.location.search).get("plante");
}

function Storefront() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlantId, setSelectedPlantId] = useState(getPlantIdFromUrl);
  const { count, open, items, isOpen, close, addItem, updateQuantity } =
    useCart();
  const selectedPlant = plantList.find(
    (plant) => plant.id === selectedPlantId,
  );

  useEffect(() => {
    const syncSelectedPlant = () => setSelectedPlantId(getPlantIdFromUrl());
    window.addEventListener("popstate", syncSelectedPlant);
    return () => window.removeEventListener("popstate", syncSelectedPlant);
  }, []);

  const showPlant = (plantId) => {
    window.history.pushState(null, "", `?plante=${encodeURIComponent(plantId)}`);
    setSelectedPlantId(plantId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showCatalog = (sectionId = "accueil") => {
    const target = sectionId === "accueil" ? "" : `#${sectionId}`;
    window.history.pushState(null, "", `${window.location.pathname}${target}`);
    setSelectedPlantId(null);
    window.requestAnimationFrame(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <Header
        cartCount={count}
        onCartOpen={open}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onHome={showCatalog}
        isViewingProduct={Boolean(selectedPlant)}
      />
      <main className="overflow-hidden">
        <div hidden={Boolean(selectedPlant)}>
          <Banner />
          <ShoppingList
            searchQuery={searchQuery}
            onAddToCart={addItem}
            onSelectPlant={showPlant}
          />
        </div>
        {selectedPlant && (
          <Description
            plant={selectedPlant}
            onBack={showCatalog}
            onSelectPlant={showPlant}
            onAddToCart={addItem}
          />
        )}
      </main>
      <Footer />
      <Cart
        isOpen={isOpen}
        items={items}
        onClose={close}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}

export default Storefront;
