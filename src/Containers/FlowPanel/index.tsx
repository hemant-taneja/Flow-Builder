import { useState, useCallback, DragEvent } from "react";
import ReactFlow, {
  EdgeChange,
  addEdge,
  Controls,
  NodeTypes,
  OnConnect,
  Connection,
  ReactFlowInstance,
  Node,
  Edge,
  NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { MessageNode } from "../../Components";

let id = Number(localStorage.getItem("id")) || 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes: NodeTypes = {
  messageNode: MessageNode,
};

type FlowPanelProps = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (payload: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (payload: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
};

export const FlowPanel = ({
  nodes,
  setNodes,
  edges,
  setEdges,
  onEdgesChange,
  onNodesChange,
}: FlowPanelProps) => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect: OnConnect = useCallback(
    (connections: Connection) => {
      setEdges((eds) => addEdge(connections, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const { data, type } = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      if (position) {
        const newNode = {
          id: getId(),
          type,
          data,
          position,
        };
        setNodes((prev) => prev.concat(newNode));
      } else {
        const newNode = {
          id: getId(),
          type,
          data,
          position: { x: 0, y: 0 },
        };
        setNodes((prev) => prev.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Controls />
    </ReactFlow>
  );
};
