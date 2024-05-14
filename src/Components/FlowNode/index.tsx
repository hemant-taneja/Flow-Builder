import { Handle, Position, useEdges } from "reactflow";
import { useNodes } from "reactflow";
import { ReactNode } from "react";

type FlowNodeProps = {
  id: string;
  isConnectable: boolean;
  icon: ReactNode;
  title: string;
  NodeIcon: ReactNode;
  children: ReactNode;
  bgColor: string;
  edges: edgesTypes;
  selected: boolean;
};

type edgesTypes = {
  source: edgeType[];
  target: edgeType[];
};

type edgeType = {
  type: string;
};

export const FlowNode = ({
  id,
  isConnectable,
  icon,
  title,
  NodeIcon,
  children,
  bgColor,
  edges,
  selected,
}: FlowNodeProps) => {
  const nodes = useNodes();
  const Edges = useEdges();

  return (
    <div
      key={id}
      className="flex flex-col items-center w-[300px] rounded-md shadow-lg"
      style={{
        border: selected ? "1px solid" : "0",
        borderColor: selected ? "#391599" : "inherit",
      }}
    >
      <div
        className="flex justify-between items-center px-[10px] py-[2px] rounded-t-md w-full"
        style={{ background: bgColor }}
      >
        <div className="flex gap-2 items-center">
          {icon}
          <span className="font-semibold text-sm">{title}</span>
        </div>
        <div>{NodeIcon}</div>
      </div>
      <div className="w-full h-full">{children}</div>
      {edges?.source &&
        edges?.source.map((edge: edgeType, idx: number) => (
          <Handle
            key={`${edge.type}_${idx}`}
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
          />
        ))}
      {edges?.target &&
        edges?.target.map((edge: edgeType, idx: number) => (
          <Handle
            key={`${edge.type}_${idx}`}
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            isValidConnection={(connection) => {
              const source = nodes.find(
                (node) => node?.id === connection?.source
              );
              const target = nodes.find(
                (node) => node?.id === connection?.target
              );
              const existing = Edges.find((Edge) =>
                Edge.id.startsWith(`reactflow__edge-${source?.id}`)
              );

              return existing ? false : source?.type === target?.type;
            }}
          />
        ))}
    </div>
  );
};
