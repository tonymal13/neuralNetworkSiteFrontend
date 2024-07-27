import React from 'react';

const InputField = ({ id, label, type, value, onChange, required }) => (
    <div className="form_group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default InputField;