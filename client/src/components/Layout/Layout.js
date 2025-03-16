import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

//For seo
// import { Helmet } from "react-helmet-async";

// const Layout = ({
//   children,
//   title = "Ecommerce app - shop now",
//   description = "mern stack project",
//   keywords = "mern,react,node,mongodb",
//   author = "Sayal Karki",
// }) => {
//   return (
//     <div>
//       <Helmet>
//         <meta charSet="utf-8" />
//         <meta name="description" content={description} />
//         <meta name="keywords" content={keywords} />
//         <meta name="author" content={author} />
//         <title>{title}</title>
//       </Helmet>
//       <Header />
//       <main style={{ minHeight: "75vh" }}>

//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// };

export default Layout;
