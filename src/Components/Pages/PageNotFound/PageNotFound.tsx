import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="page-not-found-wrapper">
      <h1 className="page-not-found-404-text">404</h1>
      <h3 className="page-not-found-title">Page not found!</h3>
      <p className="page-not-found-message">
        You tried to access a page that does not exist or you may have mistyped
        the address
      </p>
    </div>
  );
};

export default PageNotFound;
