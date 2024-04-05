import React from "react";

const Footer = () => {
  const date = (new Date().getFullYear());

  return <footer className='wrapper'>&copy; {date} Quotivation</footer>;
};

export default Footer;
