import Ronaldo from "./Ronaldo";
import Messi from "./Messi";

export default function ConditionalComponent() {
  let display = true;
  return display ? <Ronaldo /> : <Messi />;
}
