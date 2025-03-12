import { useState, useEffect } from "react";

const useStickyNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if (navbar) setNavbarHeight(navbar.offsetHeight);

    const handleScroll = () => {
      const scrollTop = window.scrollY; // Posición del scroll
      const shouldBeSticky = scrollTop > navbarHeight;

      // Solo cambia el estado si realmente es diferente
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky, navbarHeight]);

  return { isSticky, navbarHeight };
};

export default useStickyNavbar;
