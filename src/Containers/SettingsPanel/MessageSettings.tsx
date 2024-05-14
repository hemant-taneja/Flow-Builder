import { useEffect, useState } from "react";
import { Node } from "reactflow";

type MessageSettingsProps = {
  node: Node;
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void;
};

export const MessageSettings = ({ node, setNodes }: MessageSettingsProps) => {
  const [value, setValue] = useState(node.data.data.message || "");

  useEffect(() => {
    setValue(node.data.data.message);
  }, [node.data.data.message, node.id]);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((item) => {
        if (item.id === node.id) {
          item.data.data = { ...item.data.data, message: value };
        }
        return item;
      })
    );
  }, [node.id, setNodes, value]);

  return (
    <div className="flex flex-col bg-red px-4 py-8 border-b-2 gap-3">
      <span className="text-gray-400">Text</span>
      <textarea
        value={value}
        className="border-[1px] rounded-md p-2"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
