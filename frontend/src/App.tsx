import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "./api";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./components/SidebarContext";
import Footer from "./components/Footer";
import "./styles/App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Login from "./pages/Login";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PostEditor from "./components/PostEditor";
import Posts from "./pages/Posts";
import Resister from "./pages/Register";
import Register from "./pages/Register";
import Editor from "./components/PostEditor";





const App: React.FC = () => {


    return (
        <Router> {/* BrowserRouter로 감싸기 */}
            <SidebarProvider>
                <Header />
                <Sidebar />
                <Routes> {/* Routes로 감싸서 각 경로 설정 */}
                    <Route path="/" element={<Main />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/posts" element={<Posts/>} />
                    <Route path="/register" element={<Register />} /> {/* /register 경로 추가 */}
                    <Route path="/post/new" element={<Editor/>}/>
                </Routes>
                <Footer />
            </SidebarProvider>
        </Router>
    );
};

export default App;