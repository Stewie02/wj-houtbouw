import { HttpTypes } from "@medusajs/types";
import Dropdown from "@modules/common/components/dropdown";

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption;
  current: string | undefined;
  updateOption: (optionId: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const options = (option.values ?? []).map((v) => ({ value: v.value, label: v.value }));

  return (
    <Dropdown
      id={option.id}
      label={title}
      value={current ?? ""}
      onChange={(val) => updateOption(option.id, val)}
      options={options}
      disabled={disabled}
      data-testid={dataTestId}
    />
  );
};

export default OptionSelect;
