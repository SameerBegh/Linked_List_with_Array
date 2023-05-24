import {
  ReactNode,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface DataProviderProps {
  children: ReactNode;
}

export interface Node {
  data: number;
  color: string;
  id: string;
}

interface IDataProvider {
  node: Node[];
  setNode: Dispatch<SetStateAction<Node[]>>;
  addFirst: boolean;
  setAddFirst: Dispatch<SetStateAction<boolean>>;
  addLast: boolean;
  setAddLast: Dispatch<SetStateAction<boolean>>;
  addNode: boolean;
  setAddNode: Dispatch<SetStateAction<boolean>>;
  createNode: boolean;
  setCreate: Dispatch<SetStateAction<boolean>>;
  insertNode: boolean;
  setInsertNode: Dispatch<SetStateAction<boolean>>;
  color: string;
  setColor: Dispatch<SetStateAction<string | null>>;
  input: number;
  setInput: Dispatch<SetStateAction<number | null>>;
}
export const DataContext = createContext<IDataProvider | null>(null);

const DataProvider = ({ children }: DataProviderProps) => {
  const [node, setNode] = useState<Node[]>([]);
  const [createNode, setCreate] = useState<boolean>(true);
  const [addFirst, setAddFirst] = useState<boolean>(false);
  const [addLast, setAddLast] = useState<boolean>(false);
  const [addNode, setAddNode] = useState<boolean>(false);
  const [insertNode, setInsertNode] = useState<boolean>(false);
  const [input, setInput] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const Values = {
    node,
    setNode,
    addFirst,
    setAddFirst,
    addLast,
    setAddLast,
    addNode,
    setAddNode,
    createNode,
    setCreate,
    input,
    setInput,
    color,
    setColor,
    insertNode,
    setInsertNode,
  };
  return (
    <DataContext.Provider value={Values as IDataProvider}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
