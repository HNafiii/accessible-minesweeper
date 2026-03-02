export default function Cell({ row, column, isMine, revealed, flagged, count, neighbours }) {
  if (!neighbours) return;
  // Labelling Function
  const filterNeighbours = (key, value) => neighbours.filter(neighbour => !neighbour.revealed && neighbour[key] === value);
  const getCount = (neighbours) => neighbours.length;
  const generatePrepositions = (neighbours) => neighbours.map(neighbour => `at the ${neighbour.relativePosition}`);
  const generateRelativePositionsLabel = (count, relativePositions) => count < neighbours.length ? ` ${count > 2 ? `${[relativePositions.slice(0, -1).join(", "), relativePositions.at(-1)].join(", and ")}` : relativePositions.join(" and ")}` : "";
  const generateLabel = (count, text, relativePositionsLabel) => count ? `${count} ${text} neighbour cell${count > 2 ? "s" : ""}${relativePositionsLabel}` : "";
  // Neighbours cells labelling
  const concealedNeighbours = filterNeighbours("revealed", false);
  const fullyFlaggedNeighbours = filterNeighbours("flagged", true);
  const halfFlaggedNeighbours = filterNeighbours("flagged", "?");
  const concealedNeighbourCount = getCount (concealedNeighbours);
  const fullyFlaggedNeighbourCount = getCount (fullyFlaggedNeighbours);
  const halfFlaggedNeighbourCount = getCount (halfFlaggedNeighbours);
  const concealedNeighbourPrepositions = generatePrepositions(concealedNeighbours);
  const fullyFlaggedNeighbourPrepositions = generatePrepositions(fullyFlaggedNeighbours);
  const halfFlaggedNeighbourPrepositions = generatePrepositions(halfFlaggedNeighbours);
  const concealedNeighbourRelativePositionsLabel = generateRelativePositionsLabel(concealedNeighbourCount, concealedNeighbourPrepositions);
  const fullyFlaggedNeighbourRelativePositionsLabel = generateRelativePositionsLabel(fullyFlaggedNeighbourCount, fullyFlaggedNeighbourPrepositions);
  const halfFlaggedNeighbourRelativePositionsLabel = generateRelativePositionsLabel(halfFlaggedNeighbourCount, halfFlaggedNeighbourPrepositions);
  const concealedNeighboursLabel = generateLabel(concealedNeighbourCount, "concealed", concealedNeighbourRelativePositionsLabel);
  const fullyFlaggedNeighboursLabel = generateLabel(fullyFlaggedNeighbourCount, "fully flagged", fullyFlaggedNeighbourRelativePositionsLabel);
  const halfFlaggedNeighboursLabel = generateLabel(halfFlaggedNeighbourCount, "half-flagged", halfFlaggedNeighbourRelativePositionsLabel);
  const neighboursLabels = [concealedNeighboursLabel, fullyFlaggedNeighboursLabel, halfFlaggedNeighboursLabel].filter(Boolean);
  const neighboursLabel = neighboursLabels.length ? ` (${neighboursLabels.join(", ")})` : "";
  // Current cell labelling
  const countLabel = count ? `${count} mine${count > 1 ? " is" : "s are"} concealed ` : "Safe ";
  const revealedLabel = isMine ? "BOOM!!! " : countLabel;
  const concealedLabel = flagged === "?" ? "Half-flagged " : flagged ? "Fully Flagged " : "Concealed ";
  const cellLabel = revealed ? revealedLabel : concealedLabel;
  // Current cell texting
  const countText = count ? count : "";
  const revealedText = isMine ? "X" : countText;
  const concealedText = flagged === "?" ? flagged : flagged ? "F" : "";
  const cellText = revealed? revealedText : concealedText;
  return <button aria-label={`${cellLabel} at row  ${row} column ${column}${neighboursLabel}.`}>{cellText}</button>;
}
  return <button aria-label={`${cellLabel} at row  ${row} column ${column}${neighboursLabel}.`}>{cellText}</button>;
}
}
