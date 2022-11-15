import React from "react";
import Header from '../Header';
import Footer from '../Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLayout({component: Component}) {
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="main">
        <Component />
      </div>
      <Footer />
    </>
  );
}
export default UserLayout;
