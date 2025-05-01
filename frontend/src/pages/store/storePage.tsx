import { PriceRange } from '../../components/price-range/price-range'
import { SearchBar } from '../../components/search-bar/search-bar'
import { SizeSelector } from '../../components/size-selector/size-selector'
import { useStore } from '../../hooks/useStore'
import { CatalogEmptyPage } from '../service/emptyCatalog'
import { Loader } from '../service/loader'
import { renderProducts } from './service/products'

import './storePage.scss'

export const StorePage = () => {
    const { filteredProducts, setQuery, setPrice, setSize, isLoading } =
        useStore()

    return isLoading ? (
        <Loader />
    ) : (
        <div className="store-page page">
            <div className="page__container">
                <div className="store-page__banner banner">
                    <img
                        src="/icons/dbpk.svg"
                        alt="cat"
                        className="banner__logo"
                    />
                    <h1 className="banner__headline">Welcome to the Store</h1>
                    <p className="banner__text">Find the best products here!</p>
                </div>
                <div className="store-page__container">
                    <div className="filters">
                        <SearchBar onChange={setQuery} />
                        <SizeSelector onChange={setSize} />
                        <PriceRange onChange={setPrice} />
                    </div>
                    {!filteredProducts.length ? (
                        <CatalogEmptyPage />
                    ) : (
                        <div className="store-page__catalog catalog">
                            {renderProducts(filteredProducts)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
