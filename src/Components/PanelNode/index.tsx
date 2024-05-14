import { DragEvent, ReactNode } from "react";

type PanelNodeType = {
  title: string;
  icon: ReactNode;
  color: string;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  draggable: boolean;
};

export const PanelNode = ({
  title,
  icon,
  color,
  onDragStart,
  draggable,
}: PanelNodeType) => {
  return (
    <div
      className={`flex flex-col py-3 border border-solid border-1 justify-center rounded-md items-center gap-2`}
      style={{
        borderColor: color,
        color: color,
      }}
      onDragStart={onDragStart}
      draggable={draggable}
    >
      <div>{icon}</div>
      <span className="text-xs">{title}</span>
    </div>
  );
};
