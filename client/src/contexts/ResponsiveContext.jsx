import { createContext, useState, useContext, useEffect } from "react"

const ResponsiveContext = createContext();

export function ResponsiveProvider ({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect (() => {
    const mediaMobile = window.matchMedia('(max-width:480px)');
    const mediaTablet = window.matchMedia('(max-width:1023px)');
    setIsMobile(mediaMobile.matches);
    setIsTablet(mediaTablet.matches);

    const matchMobile = ((event) => setIsMobile(event.matches));
    const matchTablet = ((event) => setIsTablet(event.matches));
    mediaMobile.addEventListener('change', matchMobile);
    mediaTablet.addEventListener('change', matchTablet);

    return () => mediaMobile.removeEventListener('change', matchMobile);
    return () => mediaTablet.removeEventListener('change', matchTablet);
  }, [])

  return (
    <ResponsiveContext.Provider value={{isMobile, setIsMobile, isTablet, setIsTablet}}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useIsMobile () {
  const context = useContext(ResponsiveContext);
  return context.isMobile;
}
export function useSetIsMobile () {
  const context = useContext(ResponsiveContext);
  return context.setIsMobile;
}
export function useIsTablet () {
  const context = useContext(ResponsiveContext);
  return context.isTablet;
}
export function useSetIsTablet () {
  const context = useContext(ResponsiveContext);
  return context.setIsTabet;
}