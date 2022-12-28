function ContentContainer({ children, sidePadding = true }) {
  return (
    <main className={`ContentContainer ${sidePadding ? "padding" : ""} `}>
      {children}
    </main>
  );
}

export { ContentContainer };
