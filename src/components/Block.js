export default function Block(props) {
  let classes = `block ${props.clicked ? props.clicked : ""} ${
    props.winnerBlock ? props.winnerBlock : ""
  }`;

  return (
    <button
      className={classes}
      onClick={props.handleClick}
      disabled={props.disabled ? true : false}
    >
      {props.value}
    </button>
  );
}
