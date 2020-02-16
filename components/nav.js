import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

const links = [
  { href: "/events", label: "Events" },
  { href: "/accounts", label: "Accounts" },
  { href: "/photobooth", label: "Photobooth" },
  { href: "/slideshow", label: "Slideshow" }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

const Nav = ({ router }) => (
  <nav className="side-nav">
    <ul>
      <li>
        <Link href="/">
          <a className="brand">PICT</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href} className={router.pathname == href ? "active" : ""}>
            {label}
          </a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      .side-nav {
        background-color: #f4f4f4;
        font-family: "Bebas Neue";
        margin: 0;
        width: 269px;
      }
      .side-nav ul {
        list-style: none;
        margin: 0;
        padding: 10px;
      }
      .side-nav li {
        font-size: 24px;
      }
      .side-nav ul li a {
        color: #000;
        display: block;
        padding: 10px;
        text-decoration: none;
      }
      .side-nav ul li a.active,
      .side-nav ul li a:hover {
        background-color: #fff;
        border-radius: 25px;
      }
      .brand {
        font-size: 64px;
      }
      a.brand:hover {
        background-color: #f4f4f4 !important;
        border-radius: 0 !important;
      }
    `}</style>
  </nav>
);

export default withRouter(Nav);
