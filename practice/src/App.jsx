import Button from "./Button";
import Card from "./Card";
function App() {
  const handleClick = () => alert("Button clicked");

  return (
    <div>
      {/* <Button label="Submit" onClick={handleClick} color="green" />
      <Button label="Yo" onClick={handleClick} color="red" />
      <Button label="Messi" onClick={handleClick} /> */}
      <Card title="Attack on titan" actor="Eren Yeager" />
      <Card title="One piece" actor="Monkey D Luffy" />
    </div>
  );
}

export default App;
