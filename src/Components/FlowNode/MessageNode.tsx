import { FlowNode } from ".";
import { NodeProps } from "reactflow";
import Message from "../../assets/message.svg";
import MessageOutline from "../../assets/message.png";

const edges = {
  source: [{ type: "messageNode" }],
  target: [{ type: "messageNode" }],
};

type NodeData = {
  message: string;
};

type MessageNodeProps = {
  id: string;
  data: NodeProps<NodeData>;
  isConnectable: boolean;
  selected: boolean;
};

export const MessageNode = ({
  id,
  data,
  isConnectable,
  selected,
}: MessageNodeProps) => {
  return (
    <FlowNode
      id={id}
      isConnectable={isConnectable}
      title="Send Message"
      NodeIcon={
        <div className="rounded-full p-[1px] bg-white ">
          <img src={Message} width={"16px"} height={"16px"} />
        </div>
      }
      selected={selected}
      icon={<img src={MessageOutline} width={"16px"} height={"16px"} />}
      bgColor={"#bfede4"}
      edges={edges}
    >
      <div className="flex-col bg-white rounded-md px-[10px] py-[15px]">
        <span className="text-sm whitespace-pre-wrap break-words	">
          {data.data.message}
        </span>
      </div>
    </FlowNode>
  );
};
