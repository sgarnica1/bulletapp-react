import "./error-banner.scss";

function ErrorBanner({ description }) {
  return (
    <div className="ErrorBanner">
      <h2 className="ErrorBanner__title">Error</h2>
      {description && <p className="ErrorBanner__message">{description}</p>}
      {!description && (
        <p className="ErrorBanner__message">
          Ocurrió un error al cargar la información
        </p>
      )}
    </div>
  );
}

export { ErrorBanner };
