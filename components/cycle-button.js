import { useLayoutEffect, useRef, useState } from "react";
export default function CycleButton({ values, maxWidth = "auto", padding = "0.5rem" }) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const refs = useRef([]);
  let reflow = false;
  useLayoutEffect(() => {
    setBox((b) => ({ width: Math.max(...refs.current.map((ref) => ref.getBoundingClientRect().width)), height: Math.max(...refs.current.map((ref) => ref.getBoundingClientRect().height)) }));
  }, [reflow]);

  function handleClick() {
    setIndex((index + 1) % values.length);
  }
  const { width, height } = box;
  return (
    <>
      {values.map((value, index) => (
        <button
          key={index}
          ref={(el) => {
            refs.current[index] = el;
            reflow = index + 1 < values.length;
          }}
          style={{ maxWidth, padding, position: "fixed", textAlign: "center", visibility: "hidden" }}
        >
          {value}
        </button>
      ))}
      <button style={{ height, padding, textAlign: "center", width }} onClick={handleClick} aria-label={`You are in ${values[index].toLowerCase()} mode. Double tap to change to ${values[(index + 1) % values.length].toLowerCase()} mode`}>
        {values[index]}
      </button>
    </>
  );
}
