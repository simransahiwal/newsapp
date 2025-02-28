import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebook, FaGithub, FaLinkedin, FaGoogle } from 'react-icons/fa';
import "./Home.css"; 

const Footer = () => {
  return (
    <div className="container-fluid footer">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1 ps-3">
            <img src="/favicon.ico" alt="logo" width="30" height="24" />
          </Link>
          <span className="mb-3 mb-md-0 text-white">© 2025 NewsApp, Inc.</span>
        </div>

        <ul className="col-md-4 justify-content-end list-unstyled d-flex pe-3">
          <li className="ms-3">
            <Link className="text-white" to="https://www.google.com" target="_blank">
              <FaGoogle size={24} />
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-white" to="https://www.linkedin.com/in/simran-sahiwal" target="_blank">
              <FaLinkedin size={24} />
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-white" to="https://www.github.com/simransahiwal/newsapp" target="_blank">
              <FaGithub size={24} />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
