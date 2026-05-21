"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ChevronDown from "@modules/common/icons/chevron-down";
import { clx } from "@modules/common/components/ui";

export type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  "data-testid"?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Kies een optie",
  disabled,
  id,
  "data-testid": dataTestId,
}) => {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-text"
        >
          {label}
        </label>
      )}
      <Menu>
        <MenuButton
          id={id}
          disabled={disabled}
          data-testid={dataTestId}
          className={clx(
            "flex w-full items-center justify-between border border-wj-border bg-wj-white px-4 py-2.5 font-body font-medium text-[13px] outline-none transition-colors",
            "hover:border-wj-muted",
            "data-[open]:border-wj-green",
            selectedLabel ? "text-wj-text" : "text-wj-muted",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {selectedLabel ?? placeholder}
          <ChevronDown />
        </MenuButton>
        <MenuItems
          anchor={{ to: "bottom start", gap: 4 }}
          transition
          className={clx(
            "z-50 w-[var(--button-width)] border border-wj-border bg-wj-white py-1 shadow-sm",
            "transition duration-100 ease-out",
            "data-[closed]:scale-95 data-[closed]:opacity-0"
          )}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className={clx(
                  "w-full px-4 py-2.5 text-left font-body font-medium text-[13px] text-wj-text transition-colors",
                  "data-[focus]:bg-wj-surface",
                  opt.value === value && "bg-wj-green-light text-wj-green"
                )}
              >
                {opt.label}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Dropdown;
