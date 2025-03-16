import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout
      title="About Us - Ecommerce App"
      description="Learn more about our ecommerce platform, our mission, and our vision."
      keywords="about ecommerce, online shopping, ecommerce mission"
      author="Sayal Karki"
    >
      <div className="row contactus" style={{ padding: "20px" }}>
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="About Our Ecommerce Platform"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to our ecommerce platform! We are committed to providing the
            best shopping experience with a wide range of products, secure
            transactions, and fast delivery. Our goal is to make online shopping
            easy, reliable, and enjoyable.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
