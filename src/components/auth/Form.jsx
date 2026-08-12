import React from "react";
import "./Form.css";

const Form = ({ data, handleChange }) => {
  return (
    <div className="form-container">
      {data.map((value) => {
        return (
          <div className="form-group" key={value.id || value.name}>
            {/* Label */}
            {value.label && value.type !== "checkbox" && (
              <label
                htmlFor={value.id || value.name}
                className="form-label"
              >
                {value.label}
              </label>
            )}

            {/* Select */}
            {value.type === "select" ? (
              <select
                name={value.name}
                id={value.id || value.name}
                value={value.state}
                onChange={handleChange}
                className="form-input form-select"
              >
                <option value="">
                  Select {value.label || value.name}
                </option>

                {value.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : value.type === "textarea" ? (
              /* Textarea */
              <textarea
                name={value.name}
                id={value.id || value.name}
                value={value.state}
                onChange={handleChange}
                placeholder={
                  value.placeholder ||
                  `Enter your ${value.label || value.name}`
                }
                rows={4}
                className="form-input form-textarea"
              />
            ) : value.type === "radio" ? (
              /* Radio */
              <div className="radio-group">
                {value.options?.map((option) => (
                  <label
                    key={option.value}
                    className="radio-option"
                  >
                    <input
                      type="radio"
                      name={value.name}
                      value={option.value}
                      checked={value.state === option.value}
                      onChange={handleChange}
                      className="form-radio"
                    />

                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            ) : value.type === "checkbox" ? (
              /* Checkbox */
              <label
                htmlFor={value.id || value.name}
                className="checkbox-option"
              >
                <input
                  type="checkbox"
                  name={value.name}
                  id={value.id || value.name}
                  checked={value.state}
                  onChange={handleChange}
                  className="form-checkbox"
                />

                <span>{value.label || value.name}</span>
              </label>
            ) : (
              /* Input */
              <input
                type={value.type}
                name={value.name}
                value={value.state}
                id={value.id || value.name}
                onChange={handleChange}
                placeholder={
                  value.placeholder ||
                  `Enter your ${value.label || value.name}`
                }
                className="form-input"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Form;