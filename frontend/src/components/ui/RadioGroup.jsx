import React from "react";

export function RadioGroup({ children, value, onValueChange, disabled }) {
  // Clona os filhos e adiciona as props value, onChange e disabled nos inputs
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.props.value === undefined) return child;

    return React.cloneElement(child, {
      checked: child.props.value === value,
      onChange: () => onValueChange(child.props.value),
      disabled,
    });
  });

  return <div>{enhancedChildren}</div>;
}

export function RadioGroupItem({ value, id, checked, onChange, disabled }) {
  return (
    <input
      type="radio"
      value={value}
      id={id}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="mr-2"
    />
  );
}
