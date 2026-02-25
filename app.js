import { CycleButton } from "./components/cycle-button.js";
import { Cell } from "./components/cell.js";
export default function app() {
  return <CycleButton values={["Easy", "Normal", "Hard"]} />;
}
