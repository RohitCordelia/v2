import React, { memo } from "react";

export type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const Tooltip: React.FC<TooltipProps> = memo((props) => {
  return (
    <span className="group relative">
      <span
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 shadow-allSide opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-white/0 before:border-t-white before:content-[''] group-hover:opacity-100 text-xs w-[200px] text-wrap z-50"
        style={{
          textWrap: 'wrap'
        }}
        dangerouslySetInnerHTML={{
          __html: props.text,
        }}
      />
      {props.children}
    </span>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
