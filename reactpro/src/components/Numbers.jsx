import Number from "./Number";
export default function Numbers() {
  const Numbers = [
    { spelling: "One", numeric: 1, emoji: "😀", even: false },
    { spelling: "Two", numeric: 2, emoji: "😁", even: true },
    { spelling: "Three", numeric: 3, emoji: "🤣", even: false },
    { spelling: "Four", numeric: 4, emoji: "🙃", even: true },
    { spelling: "Five", numeric: 5, emoji: "😮", even: false },
  ];
  return (
    <div>
      <ul>
        {Numbers.map((number) => (
          <Number
            key={number.spelling}
            spelling={number.spelling}
            numeric={number.numeric}
            emoji={number.emoji}
            even={number.even}
          />
        ))}
      </ul>
    </div>
  );
}
