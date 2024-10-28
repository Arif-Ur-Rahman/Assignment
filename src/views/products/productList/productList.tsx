// import React from "react";
// import { Product } from "@/types";

// interface ProductListProps {
//   products: Product[];
//   onOpenModal: (product: Product) => void;
// }

// export const ProductList: React.FC<ProductListProps> = ({
//   products,
//   onOpenModal,
// }) => (
//   <div>
//     {products.map((product) => (
//       <div key={product.id} className="flex border p-2 justify-between">
//         <div className="flex">
//           <div>{product.id}</div>. {product.name}
//         </div>
//         <button onClick={() => onOpenModal(product)}>Details</button>
//       </div>
//     ))}
//   </div>
// );
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { ProductModal } from "../productModal/productModal";

interface ProductListProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load selected product from localStorage if it exists
    const savedProduct = localStorage.getItem("selectedProduct");
    if (savedProduct) {
      setSelectedProduct(JSON.parse(savedProduct));
    }
  }, []);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product)); // Save to localStorage
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    localStorage.removeItem("selectedProduct"); // Clear from localStorage
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex border p-2 justify-between">
          <div className="flex">
            <div>{product.id}</div>. {product.name}
          </div>
          <button onClick={() => handleOpenModal(product)}>Details</button>
        </div>
      ))}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

