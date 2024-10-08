import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {TbSearch} from "react-icons/tb";
import {CgShoppingCart} from "react-icons/cg";
import {AiOutlineHeart} from "react-icons/ai";

import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";

import "./Header.scss";

const Header = () => {

    const [scrolled, setScrolled] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { cartCount } = useContext(Context);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleLogin = () => {
        navigate("/login"); // ส่งไปยังหน้า login เมื่อคลิกที่ปุ่ม Login
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
    <>
        <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
            <div className="header-content">
                <ul className="left">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li>About</li>
                    <li>Categories</li>
                </ul>
                <div className="center" onClick={() => navigate("/")}>ECOMIFY</div>
                <div className="right">
                    <TbSearch onClick={() => setShowSearch(true)} />
                    <AiOutlineHeart />
                    <span className="cart-icon" onClick={() => setShowCart(true)}>
                        <CgShoppingCart />
                        {!!cartCount && <span>{cartCount}</span>}
                    </span>
                    {/* ปุ่ม Login */}
                    <button className="login-btn" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </header>
        {showCart && <Cart setShowCart={setShowCart} />}
        {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
    );
};

export default Header;
