import React from "react";
import { Icon } from "@iconify/react";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

function MyInput({ label, name, placeholder, required, type }: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  if (type === "password") {
    return (
      <div className="space-y-1">
        <label htmlFor={name}>{label}</label>
        <div className="relative flex items-center">
          <input
            id={name}
            name={name}
            className="border block p-2 rounded-md w-full"
            placeholder={placeholder}
            required={required}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute right-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon icon="mdi:eye" />
            ) : (
              <Icon icon="mdi:eye-off" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className="border block p-2 rounded-md w-full"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default MyInput;
