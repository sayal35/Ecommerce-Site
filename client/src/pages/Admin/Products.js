import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Products List</h1>
            <div className="d-flex flex-wrap justify-content-center">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{
                      width: "18rem",
                      minHeight: "350px", // Ensures all cards have same height
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        height: "200px",
                        objectFit: "cover", // Makes images uniform
                      }}
                    />
                    <div
                      className="card-body d-flex flex-column justify-content-between"
                      style={{ flex: 1 }}
                    >
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description
                          ? `${p.description.substring(0, 20)}...`
                          : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
