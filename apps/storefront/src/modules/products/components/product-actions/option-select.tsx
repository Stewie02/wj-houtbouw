import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const values = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-3">
      <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-text">
        {title}:{" "}
        {current && <span className="text-wj-green normal-case tracking-normal font-medium">{current}</span>}
      </div>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {values.map((v) => (
          <button
            key={v}
            onClick={() => updateOption(option.id, v)}
            disabled={disabled}
            data-testid="option-button"
            className={clx(
              "px-[18px] py-2.5 border-[1.5px] font-body font-medium text-[13px] transition-colors",
              v === current
                ? "border-wj-green bg-wj-green-light text-wj-green"
                : "border-wj-border bg-transparent text-wj-text hover:border-wj-muted",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OptionSelect
