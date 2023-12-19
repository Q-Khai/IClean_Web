import {useState, useEffect} from "react";

interface getWindowDimensionsProps {
  width: number;
  height: number;
}

function getWindowDimensions(): getWindowDimensionsProps {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions(): getWindowDimensionsProps {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
