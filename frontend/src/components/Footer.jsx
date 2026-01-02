import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (<footer className="bg-gradient-to-r from-purple-900 to-violet-900 text-white py-14 mt-10">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo & About */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex flex-col items-start">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-400 rounded-xl flex items-center justify-center shadow-lg mb-4 ring-4 ring-purple-800/30">
                            <span className="text-white text-2xl font-bold font-heading">QC</span>
                        </div>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-white font-heading mb-2">
                            QuickCart
                        </h2>
                    </Link>
                    <p className="text-purple-100 text-sm mt-3 leading-relaxed">
                        Your one-stop shop for premium products, delivered to your doorstep with speed and excellence.
                    </p>
                </div>                    {/* Quick Links */}
                <div className="col-span-1">
                    <h3 className="text-xl font-semibold text-white mb-5 font-heading relative inline-block">
                        <span className="relative z-10">Quick Links</span>
                        <span className="absolute bottom-0 left-0 w-3/4 h-1 bg-purple-400 rounded-full"></span>
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>                    {/* Customer Service */}
                <div className="col-span-1">
                    <h3 className="text-xl font-semibold text-white mb-5 font-heading relative inline-block">
                        <span className="relative z-10">Customer Service</span>
                        <span className="absolute bottom-0 left-0 w-3/4 h-1 bg-purple-400 rounded-full"></span>
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/contact" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                Shipping Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/returns" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                                Returns & Refunds
                            </Link>
                        </li>
                    </ul>
                </div>                    {/* Newsletter */}
                <div className="col-span-1">
                    <h3 className="text-xl font-semibold text-white mb-5 font-heading relative inline-block">
                        <span className="relative z-10">Stay Connected</span>
                        <span className="absolute bottom-0 left-0 w-3/4 h-1 bg-purple-400 rounded-full"></span>
                    </h3>
                    <p className="text-purple-200 text-sm mb-5 leading-relaxed">
                        Subscribe to our newsletter for updates and exclusive offers
                    </p>                        <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full border-2 border-transparent focus:border-purple-200 transition-all text-sm"
                        />
                        <button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-5 py-3 rounded-r-lg transition-all font-medium shadow-md hover:shadow-lg">
                            Subscribe
                        </button>
                    </div>                        {/* Social Icons */}
                    <div className="flex space-x-4 mt-6">
                        <a href="#" className="h-11 w-11 rounded-full bg-purple-700/30 flex items-center justify-center hover:bg-gradient-to-r from-purple-500 to-violet-500 transition-all transform hover:scale-110 duration-200 shadow-md ring-2 ring-purple-600/20">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                        <a href="#" className="h-11 w-11 rounded-full bg-purple-700/30 flex items-center justify-center hover:bg-gradient-to-r from-purple-500 to-violet-500 transition-all transform hover:scale-110 duration-200 shadow-md ring-2 ring-purple-600/20">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"></path>
                            </svg>
                        </a>
                        <a href="#" className="h-11 w-11 rounded-full bg-purple-700/30 flex items-center justify-center hover:bg-gradient-to-r from-purple-500 to-violet-500 transition-all transform hover:scale-110 duration-200 shadow-md ring-2 ring-purple-600/20">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                            </svg>
                        </a>
                    </div>
                </div>                </div>

            {/* Bottom Bar */}
            <div className="border-t border-purple-700/30 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center">
                <p className="text-purple-200 text-sm font-medium">
                    &copy; {currentYear} <span className="text-white">QuickCart</span>. All rights reserved.
                </p>
                <div className="flex space-x-8 mt-4 md:mt-0">
                    <Link to="/privacy" className="text-purple-200 text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-purple-200 text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                        Terms of Service
                    </Link>
                    <Link to="/cookies" className="text-purple-200 text-sm hover:text-white transition-colors flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-purple-400 group-hover:bg-white transition-colors"></span>
                        Cookie Policy
                    </Link>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
