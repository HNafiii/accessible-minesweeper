import { useLayoutEffect, useRef, useState } from "react";
export default function CycleButton({ values, maxWidth = "auto" }) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const refs = useRef([]);

  useLayoutEffect(() => {
    const validRefs = refs.current.filter(Boolean);
    if (validRefs.length === 0) return;

    const maxWidthCalc = Math.max(...validRefs.map((ref) => ref.getBoundingClientRect().width));
    const maxHeightCalc = Math.max(...validRefs.map((ref) => ref.getBoundingClientRect().height));

    setBox({ width: maxWidthCalc, height: maxHeightCalc });
  }, [values]);

  function handleClick() {
    setIndex((i) => (i + 1) % values.length);
  }

  return (
    <>
      {values.map((value, valueIndex) => (
        <button key={valueIndex} ref={(el) => (refs.current[valueIndex] = el)} style={{ maxWidth, pointerEvents: "none", position: "absolute", userSelect: "none", visibility: "hidden" }} aria-hidden="true">
          {value}
        </button>
      ))}

      <button style={{ height: box.height > 0 ? box.height : "auto", textAlign: "center", userSelect: "none", width: box.width > 0 ? box.width : "auto" }} onClick={handleClick} aria-label={`You are in ${values[index].toLowerCase()} mode. Double tap to change to ${values[(index + 1) % values.length].toLowerCase()} mode`}>
        {values[index]}
      </button>
    </>
  );
}
