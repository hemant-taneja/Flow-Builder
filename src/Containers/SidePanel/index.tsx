import { Node, useNodes } from "reactflow";
import { PanelNode } from "../../Components";
import { DragEvent, ReactNode, useMemo } from "react";
import { SettingsPanel } from "../SettingsPanel";
import MessageOutline from "../../assets/message.png";

const NODES = [
  {
    type: "messageNode",
    title: "Message",
    icon: <img src={MessageOutline} width={"16px"} height={"16px"} />,
    color: "#391599",
    data: {
      message: "test message",
    },
  },
];

type NodeProp = {
  type: string;
  title: string;
  icon: ReactNode;
  color: string;
  data: {
    message: string;
  };
};

type SidePanelProps = {
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void;
};

export const SidePanel = ({ setNodes }: SidePanelProps) => {
  const nodes = useNodes();
  const node = useMemo(() => {
    return nodes.find((node) => node?.selected === true) || null;
  }, [nodes]);
  const onDragStart = (event: DragEvent<HTMLDivElement>, node: NodeProp) => {
    const transfer = {
      type: node.type,
      data: { data: node.data, title: node?.title },
    };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(transfer)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-full w-full">
      {node ? (
        <SettingsPanel key={node?.id} node={node} setNodes={setNodes} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-3 p-3">
          {NODES.map((node, idx) => (
            <PanelNode
              key={idx}
              onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
                onDragStart(event, node)
              }
              draggable={true}
              {...node}
            />
          ))}
        </div>
      )}
    </div>
  );
};
