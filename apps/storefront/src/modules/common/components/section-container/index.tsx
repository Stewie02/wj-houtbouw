import { clx } from "@modules/common/components/ui";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const SectionContainer = ({ children, className }: SectionContainerProps) => {
  return (
    <div
      className={clx("max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12", className)}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
