"use client";

import { ChangeEvent, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";

interface Props {
  id: string;
  type?: string;
  label: string;
  register?: UseFormRegisterReturn<string>;
  errorMsg?: string;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  value?: any;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInput: FC<Props> = ({
  type = "text",
  id,
  label,
  register,
  errorMsg,
  textarea,
  rows,
  placeholder,
  disabled,
  value,
  readOnly,
  onChange,
}): JSX.Element => {
  const Component = textarea ? "textarea" : "input";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-input-label">
        {label}
      </label>
      <Component
        id={id}
        type={!textarea ? type : undefined}
        {...register}
        className={`w-full outline-none border dark:border-slate-700 bg-[#f5f5f5] dark:bg-transparent rounded-sm py-[10px] px-4 ${
          disabled ? "opacity-50" : ""
        }`}
        rows={textarea ? rows : undefined}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        min={type === "number" ? "0" : undefined}
        readOnly={readOnly}
        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register?.onChange(e); 
          onChange?.(e);        
        }}
        onKeyPress={(event) => {
          if (type === "number" && !/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
      {errorMsg && (
        <p className="text-xs text-red-700 mt-1 flex items-center gap-[2px]">
          <AiOutlineWarning />
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default FormInput;
