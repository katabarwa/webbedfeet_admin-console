import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <p className="footer-copyright-text">
        © webbed feet admin console {new Date().getFullYear()}, All Rights
        Reserved
      </p>
    </div>
  );
};

export default Footer;
