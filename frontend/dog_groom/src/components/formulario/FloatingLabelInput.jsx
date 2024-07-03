const FloatingLabelInput = ({ name, label, value, onChange, type = "text", required, disabled, readOnly }) => {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className="block w-full h-12 p-5 border bg-slate-200 border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-200 pl-2 pr-2 pointer-events-none
          peer-focus:pl-2 peer-focus:pr-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5
          ${value ? 'text-black font-bold' : 'text-gray-500 peer-focus:text-blue-600 peer-placeholder-shown:text-gray-500'}`}
        style={{ left: '0.50rem' }}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
