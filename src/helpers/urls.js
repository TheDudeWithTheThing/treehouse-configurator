const getCodeParam = () => {
  const url = new URL(window.location.href);
  const z = new URLSearchParams(url.search);
  return z.get("code");
};

export { getCodeParam };
