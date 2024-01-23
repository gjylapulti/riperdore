import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";
import ProductDetails from "../components/Products/ProductDetails";
const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);

  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    console.log("allProducts:", allProducts);
    console.log("productName:", productName);

    const normalizedProductName = productName.replace(/ /g, "-");
    console.log("normalizedProductName:", normalizedProductName);

    allProducts.forEach((product) => {
      const normalizedProductInList = product.name.replace(/ /g, "-");
      console.log("Product name in allProducts:", normalizedProductInList);

      if (normalizedProductInList === normalizedProductName) {
        console.log("Match found for", normalizedProductName);
      }
    });

    const data =
      allProducts &&
      allProducts.find(
        (i) => i.name.replace(/ /g, "-") === normalizedProductName
      );
    console.log("Data:", data);
    setData(data);
  }, [allProducts, productName]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
