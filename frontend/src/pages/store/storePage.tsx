import { PriceRange } from "../../components/price-range/price-range";
import { SearchBar } from "../../components/search-bar/search-bar";
import { SizeSelector } from "../../components/size-selector/size-selector";
import { useStore } from "../../hooks/useStore";
import { renderProducts } from "./service/products";

import './storePage.scss';

export const StorePage = () => {
  const { filteredProducts, setQuery, setPrice, setSize } = useStore();

  return (
    <div>
      <div className="store-page__banner banner">
        <h1>Welcome to the Store</h1>
        <p>Find the best products here!</p>
      </div>
      <div className="filters">
        <SearchBar onChange={setQuery}/>
        <SizeSelector onChange={setSize}/>
        <PriceRange onChange={setPrice}/>
      </div>
      <div className="store-page__catalog catalog">
        {renderProducts(filteredProducts)}
      </div>
    </div>
  );
};
