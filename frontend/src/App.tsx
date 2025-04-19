import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "./api/auth";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./components/SidebarContext";
import Footer from "./components/Footer";
import "./styles/App.css";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PostEditor from "./pages/Post/components/PostEditor";
import PostList from './pages/Post/PostList';
import Register from "./pages/Login/Register";
import PostDetail from "./pages/Post/components/PostDetail";





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
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/register" element={<Register />} /> {/* /register 경로 추가 */}
                    <Route path="/posts/new" element={<PostEditor/>}/>
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/posts/:id/edit" element={<PostEditor />} />
                </Routes>
                <Footer />
            </SidebarProvider>
        </Router>
    );
};

export default App;