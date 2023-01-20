function Dashboard({ fullscreen, children }) {
  return (
    <div className={`Dashboard ${fullscreen && "fullscreen"}`}>{children}</div>
  );
}

export { Dashboard };
