import type { ElementType, ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  title?: ReactNode;
  titleAs?: ElementType;
  titleClassName?: string;
  children: ReactNode;
};

const joinClasses = (...values: Array<string | undefined>) =>
  values.filter(Boolean).join(" ");

const Section = ({
  id,
  className,
  innerClassName,
  title,
  titleAs: TitleTag = "h2",
  titleClassName,
  children,
}: SectionProps) => {
  const outerClasses = joinClasses(
    "w-full py-12 xs:py-20 px-6",
    className,
  );
  const titleClasses = joinClasses(
    "font-bold text-center tracking-tight",
    titleClassName,
  );
  const innerClasses = innerClassName
    ? joinClasses("h-full w-full", innerClassName)
    : undefined;

  return (
    <section id={id} className={outerClasses}>
      {title ? <TitleTag className={titleClasses}>{title}</TitleTag> : null}
      {innerClasses ? <div className={innerClasses}>{children}</div> : children}
    </section>
  );
};

export default Section;
