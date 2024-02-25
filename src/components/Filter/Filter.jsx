import './Filter.css';

const Filter = ({ value, onChange }) => {
  return (
    <input
      className="filter"
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
      placeholder="Filter contacts by name"
    />
  );
};

export default Filter;
