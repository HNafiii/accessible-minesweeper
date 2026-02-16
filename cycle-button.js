import { useLayoutEffect, useRef, useState } from "react";
export default function CycleButton({ values, maxWidth = "auto" }) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const sourceRefs = useRef([]);
  useLayoutEffect(() => {
    setBox((b) => ({ width: Math.max(...sourceRefs.current.map((sourceRef) => sourceRef.getBoundingClientRect().width)), height: Math.max(...sourceRefs.current.map((sourceRef) => sourceRef.getBoundingClientRect().height)) }));
  }, [values]);

  function handleClick() {
    setIndex((index + 1) % values.length);
  }
  const { width, height } = box;
  return (
    <>
      {values.map((value, index) => (
        <button key={index} ref={(el) => (sourceRefs.current[index] = el)} style={{ maxWidth, position: "fixed", visibility: "hidden" }}>
          {value}
        </button>
      ))}
      <button style={{ height, visibility: width && height ? "visible" : "hidden", width }} onClick={handleClick} aria-label={`You are in ${values[index].toLowerCase()} mode. Double tap to change to ${values[(index + 1) % values.length].toLowerCase()} mode`}>
        {values[index]}
      </button>
    </>
  );
}
