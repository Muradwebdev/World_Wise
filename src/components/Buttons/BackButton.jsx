import Button from "./Button";

function BackButton({ onclick }) {
  return (
    <Button type="primary" onClick={onclick}>
      &larr; Back
    </Button>
  );
}

export default BackButton;
