import React from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Events" },
  { href: "/", label: "Accounts" },
  { href: "/photobooth", label: "Photobooth" },
  { href: "/slideshow", label: "Slideshow" }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>PICT</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
