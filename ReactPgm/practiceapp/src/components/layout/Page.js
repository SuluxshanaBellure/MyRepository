import { Routes, Route } from "react-router-dom";
// import BlogPage from "../pages/BlogPage.js";
// import CommunityPage from "../pages/CommunityPage.js";
import ReferencePage from "../pages/ReferencePage.js";
import LearnPage from "../pages/LearnPage.js";
import HomePage from "../pages/Homepage.js";
import NotFound from "./NotFound.js";
import LoginPage from "../pages/LoginPage.js";
import Users from "../Users.js";
import StateManagement from "../StateManagement.js";
import MenuDisplay from "../context/MenuDisplay.js";
import MyEffect from "../effects/MyEffect.js";
import SideBar from "../SideBar.js";
import CreateProject from "../pages/CreateProject.js";
// import Product from "../products/Product.js";
import ProductInput from "../products/ProductInput.js";
import ProductProvider from "../products/ProductProvider.js";
import ProductList from "../products/ProductList.js";
import Refs from "../useRefs/Refs.js";
import Reducer from "../useReducer/Reducer.js";
import Calculator from "../useReducer/Calculator.js";
import CallBack from "../callback/CallBack.js";
import Parent from "../callback/Parent.js";
import ApiCall from "../ApiCall/ApiCall.js";
import AxiosCall from "../ApiCall/AxiosCall.js";
import Home from "../AxiosCrud/Home.js";
import Create from "../AxiosCrud/Create.js";
import Delete from "../AxiosCrud/Delete.js";
import Read from "../AxiosCrud/Read.js";
import Update from "../AxiosCrud/Update.js";

export default function Page() {
  return (
    <>
      {/* <h2>Pagesssssss</h2> */}
      <Routes>
        {/* <Route
          path="/"
          element={
            <HomePage
              pone="React lets you build user interfaces out of individual pieces called components."
              ptwo="Create your own React components like Thumbnail, LikeButton, and Video."
            />
          }
        /> */}
        <Route path="/learn" element={<LearnPage />} />
        {/* <Route path="/blog" element={<BlogPage />} />
        <Route path="/community" element={<CommunityPage />} /> */}
        <Route path="/reference" element={<ReferencePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/states" element={<StateManagement />} />
        <Route path="/context" element={<MenuDisplay />} />
        <Route path="/effects" element={<MyEffect />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/createproject" element={<CreateProject />} />
        {/* <Route path="/product" element={<ProductInput />} /> */}
         <Route path="/product" element={<ProductList />} />
         <Route path="/refs" element={<Refs />} /> 
         <Route path="/reducer" element={<Reducer />} /> 
         <Route path="/calculator" element={<Calculator />} />
         <Route path="/callback" element={<Parent />} />
         <Route path="/api" element={<ApiCall />} />
         <Route path="/axios" element={<AxiosCall />} />
         <Route path="/" element={<Home />} />
         <Route path="/create" element={<Create />} />
         <Route path="/delete/:id" element={<Delete />} />
         <Route path="/read/:id" element={<Read />} />
         <Route path="/update/:id" element={<Update />} />

      </Routes>
    </>
  );
}

