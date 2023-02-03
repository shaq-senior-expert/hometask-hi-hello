const Display = (props: { value: string }) => {
  const { value } = props;
  return (
    <div id="display" className="flex">
      <input type="text" tabIndex={-1} value={value} />
    </div>
  );
};

export default Display;
