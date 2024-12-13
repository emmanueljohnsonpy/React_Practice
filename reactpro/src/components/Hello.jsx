const name = " | Inside variable | ";
/* function displayMessage() {
  return " | Inside Function | ";
} */

function Hello({ name, message, emoji }) {
  // const { name, message } = props;
  // console.log(props);
  return (
    <div>
      {/* <h1>
        | Inside h1 tag | {name} {100 * 5} {displayMessage()}
      </h1>
      <h1>hai</h1> */}
      <h1>
        {/* {props.message}
        {props.name} */}
        {message}
        {name}
        {emoji}
      </h1>
    </div>
  );
}

export default Hello;
