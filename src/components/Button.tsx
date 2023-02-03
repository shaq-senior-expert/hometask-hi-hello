const Button = (props: {
  value: string;
  type: string;
  buttonStyle: string;
  label: string;
  onClick: (value: string, type: string) => void;
}) => {
  const { value, type, buttonStyle, label, onClick } = props;

  const handleButtonClick = () => {
    onClick(value, type);
  };
  return (
    <button name={value} className={buttonStyle} onClick={handleButtonClick}>
      {label}
    </button>
  );
};

export default Button;
