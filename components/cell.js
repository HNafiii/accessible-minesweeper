export default function Cell({ row, column, isMine, revealed, flagged, count, neighbours }) {
  if (!neighbours) return;
  // Labelling Function
  const filterNeighbours = (key, value) => neighbours.filter(neighbour => !neighbour.revealed && neighbour[key] === value);
  const getCount = (neighbours) => neighbours.length;
  const manipulateDirectionsText = (neighbours) => neighbours.map(neighbour => `at the ${neighbour.direction}`);
  const generateDirectionsLabel = (count, directions) => count < neighbours.length ? ` ${count > 2 ? `${[directions.slice(0, -1).join(", "), directions.at(-1)].join(", and ")}` : directions.join(" and ")}` : "";
  const generateLabel = (count, text, directionsLabel, direction) => count ? `${count} ${text} neighbour cell${count > 2 ? "s" : ""}${directionsLabel}` : "";
  // Neighbours cells labelling
  const concealedNeighbours = filterNeighbours("revealed", false);
  const fullyFlaggedNeighbours = filterNeighbours("flagged", true);
  const halfFlaggedNeighbours = filterNeighbours("flagged", "?");
  const concealedNeighbourCount = getCount (concealedNeighbours);
  const fullyFlaggedNeighbourCount = getCount (fullyFlaggedNeighbours);  const halfFlaggedNeighbourCount = getCount (halfFlaggedNeighbours);
  const concealedNeighbourDirections = manipulateDirectionsText(concealedNeighbours);
  const fullyFlaggedNeighbourDirections = manipulateDirectionsText(fullyFlaggedNeighbours);
  const halfFlaggedNeighbourDirections = manipulateDirectionsText(halfFlaggedNeighbours);
  const concealedNeighbourDirectionsLabel = generateDirectionsLabel(concealedNeighbourCount, concealedNeighbourDirections);
  const fullyFlaggedNeighbourDirectionsLabel = generateDirectionsLabel(fullyFlaggedNeighbourCount, fullyFlaggedNeighbourDirections);
  const halfFlaggedNeighbourDirectionsLabel = generateDirectionsLabel(halfFlaggedNeighbourCount, halfFlaggedNeighbourDirections);
  const concealedNeighboursLabel = generateLabel(concealedNeighbourCount, "concealed", concealedNeighbourDirectionsLabel);
  const fullyFlaggedNeighboursLabel = generateLabel(fullyFlaggedNeighbourCount, "fully flagged", fullyFlaggedNeighbourDirectionsLabel);
  const halfFlaggedNeighboursLabel = generateLabel(halfFlaggedNeighbourCount, "half-flagged", halfFlaggedNeighbourDirectionsLabel);
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
