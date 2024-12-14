export default function Number({ spelling, numeric, emoji, even }) {
  return (
    <>
      {/* {emoji} {spelling} {numeric} */}
      {numeric > 2 ? (
        <li>
          <h3>
            {emoji} {spelling} {numeric} {even ? "Even" : ""}
          </h3>
        </li>
      ) : (
        ""
      )}
    </>
  );
}
