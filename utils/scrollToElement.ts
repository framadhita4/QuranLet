const scrollToElement = (element: HTMLElement) => {
  const y = element.getBoundingClientRect().top + window.scrollY - 130;
  window.scroll({
    top: y,
    behavior: "smooth",
  });
};

export default scrollToElement;
