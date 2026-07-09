import { HttpTypes } from "@medusajs/types";
import Dropdown from "@modules/common/components/dropdown";
import { clx } from "@modules/common/components/ui";

type DisplayType = "select" | "button" | "color-swatch";

type OptionDisplay = {
  display: DisplayType;
  swatches: Record<string, string>;
};

function readDisplay(metadata: unknown): OptionDisplay {
  const meta = (metadata ?? {}) as Record<string, unknown>;
  const display = meta.display;
  const swatches =
    meta.swatches && typeof meta.swatches === "object"
      ? (meta.swatches as Record<string, string>)
      : {};
  const valid: DisplayType[] = ["select", "button", "color-swatch"];
  return {
    display: valid.includes(display as DisplayType)
      ? (display as DisplayType)
      : "select",
    swatches,
  };
}

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption;
  current: string | undefined;
  updateOption: (optionId: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const labelClass =
  "font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-text";

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const values = (option.values ?? []).map((v) => v.value);
  const { display, swatches } = readDisplay(option.metadata);

  if (display === "select") {
    return (
      <Dropdown
        id={option.id}
        label={title}
        value={current ?? ""}
        onChange={(val) => updateOption(option.id, val)}
        options={values.map((v) => ({ value: v, label: v }))}
        disabled={disabled}
        data-testid={dataTestId}
      />
    );
  }

  const isSwatch = display === "color-swatch";

  return (
    <div className="flex flex-col gap-2" data-testid={dataTestId}>
      <div className="flex items-baseline gap-2">
        <span className={labelClass}>{title}</span>
        {isSwatch && current && (
          <span className="font-body text-[13px] text-wj-muted normal-case tracking-normal">
            {current}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const selected = current === value;
          const swatch = swatches[value];

          if (isSwatch) {
            return (
              <button
                key={value}
                type="button"
                onClick={() => updateOption(option.id, value)}
                disabled={disabled}
                title={value}
                aria-label={value}
                aria-pressed={selected}
                className={clx(
                  "relative h-10 w-10 border transition-all disabled:cursor-not-allowed disabled:opacity-50",
                  selected
                    ? "border-wj-green ring-2 ring-wj-green ring-offset-2 ring-offset-wj-bg"
                    : "border-wj-border hover:border-wj-muted"
                )}
                style={{ backgroundColor: swatch || "#EDE9E3" }}
              />
            );
          }

          return (
            <button
              key={value}
              type="button"
              onClick={() => updateOption(option.id, value)}
              disabled={disabled}
              aria-pressed={selected}
              className={clx(
                "border px-4 py-2.5 font-body font-medium text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                selected
                  ? "border-wj-green bg-wj-green-light text-wj-green"
                  : "border-wj-border bg-wj-white text-wj-text hover:border-wj-muted"
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
