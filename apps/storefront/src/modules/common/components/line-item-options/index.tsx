type LineItemOptionsProps = {
  metadata?: Record<string, unknown> | null;
  "data-testid"?: string;
};

const LineItemOptions = ({
  metadata,
  "data-testid": dataTestid,
}: LineItemOptionsProps) => {
  const label = metadata?.options_label as string | undefined;
  if (!label) return null;

  return (
    <div data-testid={dataTestid} className="flex flex-col">
      {label.split(", ").map((part, i) => (
        <p key={i} className="font-body text-[13px] text-wj-muted">
          {part}
        </p>
      ))}
    </div>
  );
};

export default LineItemOptions;
