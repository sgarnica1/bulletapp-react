import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="Footer">
      <p className="Footer__copyright">© {year} Bullet CrossFit</p>
    </footer>
  );
};

export { Footer };
