import React, { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);

  if (!visible) {
    return false;
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="scroll-to-top cursor-pointer text-center"
      onClick={scrollToTop}
      style={{ cursor: "pointer" }}
    >
      <i className="icon fas fa-chevron-up"></i>
    </div>
  );
};

export default ScrollToTop;
