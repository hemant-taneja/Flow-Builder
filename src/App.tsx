import { ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { SidePanel, FlowPanel } from "./Containers";
import { useEffect, useState } from "react";
import { Toast } from "./Components/Toast";

const TIMEOUT = 2000;
type toastMessage = {
  status: string;
  title: string;
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    JSON.parse(localStorage.getItem("nodes") || "[]")
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    JSON.parse(localStorage.getItem("edges") || "[]")
  );
  const [msg, setMsg] = useState<toastMessage>({ status: "", title: "" });

  const saveFlow = () => {
    if (nodes.length - 1 === edges.length) {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
      localStorage.setItem("id", String(nodes.length));
      setMsg({ status: "success", title: "Flow saved successfully" });
    } else {
      setMsg({ status: "error", title: "Cannot save flow" });
    }
  };

  useEffect(() => {
    if (msg.status) {
      setTimeout(() => {
        setMsg({ status: "", title: "" });
      }, TIMEOUT);
    }
  }, [msg]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-10 bg-gray w-full bg-gray-100 py-1 flex flex-row-reverse">
        <div className="w-1/4 flex justify-center">
          <button
            className="w-auto border-[1px] border-[#391599] text-[#391599] bg-white text-sm px-[40px] rounded-md"
            onClick={saveFlow}
          >
            Save Changes
          </button>
        </div>
      </div>
      {msg.status && <Toast status={msg.status} title={msg.title} />}
      <div className="flex w-full flex-1">
        <ReactFlowProvider>
          <div className="h-full flex-1">
            <FlowPanel
              edges={edges}
              setEdges={setEdges}
              onEdgesChange={onEdgesChange}
              nodes={nodes}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
            />
          </div>
          <div className="h-full w-1/4 border-l-2">
            <SidePanel setNodes={setNodes} />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default App;
