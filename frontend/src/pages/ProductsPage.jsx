// ProductsPage.jsx

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("highest"); // Sort by price: "highest" or "lowest"

  useEffect(() => {
    if (allProducts) {
      if (categoryData === null) {
        setData(allProducts);
      } else {
        setData(allProducts.filter((i) => i.category === categoryData));
      }
    }
  }, [allProducts, categoryData]);

  // Filtering function based on price and sorting order
  const filterByPrice = () => {
    let filteredData = [...data];

    if (sortByPrice === "highest") {
      filteredData.sort((a, b) => {
        const priceA = a.discountPrice > 0 ? a.discountPrice : a.originalPrice;
        const priceB = b.discountPrice > 0 ? b.discountPrice : b.originalPrice;
        return priceB - priceA;
      });
    } else {
      filteredData.sort((a, b) => {
        const priceA = a.discountPrice > 0 ? a.discountPrice : a.originalPrice;
        const priceB = b.discountPrice > 0 ? b.discountPrice : b.originalPrice;
        return priceA - priceB;
      });
    }

    setData(filteredData);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            {/* Sort by price UI */}
            <div className="flex items-center justify-start space-x-4 mb-6">
              <label
                htmlFor="priceSort"
                className="text-gray-600 font-semibold"
              >
                Sort by Price:
              </label>
              <select
                id="priceSort"
                className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-pink-500"
                value={sortByPrice}
                onChange={(e) => setSortByPrice(e.target.value)}
              >
                <option value="highest">Highest Price</option>
                <option value="lowest">Lowest Price</option>
              </select>
              <button
                className="bg-pink-500 hover:bg-pink-600  text-white font-semibold px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                onClick={filterByPrice}
              >
                Apply
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((product, index) => (
                <ProductCard key={index} data={product} />
              ))}
            </div>
            {data.length === 0 && (
              <h1 className="text-center text-lg font-bold text-gray-600 mt-8">
                No products found!
              </h1>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
