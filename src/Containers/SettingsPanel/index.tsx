import { MessageSettings } from "./MessageSettings";
import arrowBack from "../../assets/arrowBack.png";
import { Node } from "reactflow";
import { ReactNode } from "react";

type SettingsPanelProps = {
  node: Node;
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void;
};

type mapperProps = {
  [key: string]: ReactNode;
};

export const SettingsPanel = ({ node, setNodes }: SettingsPanelProps) => {
  const mapper: mapperProps = {
    messageNode: <MessageSettings node={node} setNodes={setNodes} />,
    default: <>NO Settings</>,
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full cursor-pointer items-center p-1 border-y-2">
        <button
          className="z-50"
          onClick={() => {
            setNodes((prev) =>
              prev.map((item) => {
                if (item.id === node.id) {
                  item = { ...item, selected: false };
                }
                return item;
              })
            );
          }}
        >
          <img src={arrowBack} width={"16px"} height={"16px"} />
        </button>
        <div className="flex flex-1 justify-center items-center ml-[-16px]">
          <span>{node.data.title}</span>
        </div>
      </div>
      <div className="w-full flex-1">{mapper[node.type || "default"]}</div>
    </div>
  );
};
