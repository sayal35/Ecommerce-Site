import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length === 0
              ? "No Product found"
              : `Found ${values?.results?.length} products`}
          </h6>
          <div className="row mb-5 pb-5">
            <div className="d-flex flex-wrap">
              {values?.results.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem", height: "100%" }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description
                        ? `${p.description.substring(0, 20)}...`
                        : ""}
                    </p>

                    <p className="card-text">${p.price}</p>
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
