"use client";
import Link from "next/link";

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/upload">Upload</Link>
        </li>
      </ul>
      <style jsx>{`
        nav {
          background-color: #white;
          padding: 1rem;
        }
        ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
          margin: 0;
          padding: 0;
        }
        li {
          margin: 0 1rem;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 1.2rem;
        }
      `}</style>
    </nav>
  );
};

export default Menu;
