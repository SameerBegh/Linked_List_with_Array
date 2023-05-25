import {
  useContext,
  FC,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import "../styles/Operations.css";
import CustomButton from "../custom/CustomButton";
import { DataContext } from "../context/DataContext";
import { BsLink } from "react-icons/bs";
import { Colors } from "../utils/Data";
import { Node } from "../context/DataContext";
import SearchList from "./SearchList";
import { toast } from "react-toastify";

interface IOperation {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Operation: FC<IOperation> = ({ setOpen }) => {
  const Lists = useContext(DataContext);
  const [data, setData] = useState<string | null>(null);
  const [remove, setRemove] = useState<boolean>(false);
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);
  const [searchColor, setSearchColor] = useState<string>("");
  const [searchList, setSearchList] = useState<Node[]>([]);
  const operations = ["Insertion", "Deletion", "Search"];

  // Toastify for error msgs alert
  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Unshift Button
  const handleAddFirstNode = () => {
    setOpen(true);
    Lists?.setCreate(false);
    Lists?.setAddFirst(true);
  };

  // Push Button
  const handleLastNode = () => {
    setOpen(true);
    Lists?.setCreate(false);
    Lists?.setAddLast(true);
  };

  // Insert Button
  const handleNode = () => {
    setOpen(true);
    Lists?.setCreate(false);
    Lists?.setAddNode(true);
    Lists?.setInsertNode(true);
  };

  // Shift Button
  const handleRemoveFirstNode = () => {
    if (!Lists?.node) return;
    setRemove(false);
    const shiftList = Lists.node;
    shiftList.shift();
    Lists.setNode([...shiftList]);
  };

  // Pop Button
  const handleRemoveLastNode = () => {
    if (!Lists?.node) return;
    setRemove(false);
    const popList = Lists.node;
    popList.pop();
    Lists.setNode([...popList]);
  };

  // Delete Button
  const handleRemove = () => {
    setRemove(true);
  };

  // Delete Node @ specified Index
  const handleRemoveNode = (index: number | null) => {
    if (!Lists?.node) return;
    const filterNode = Lists.node;
    if (index === null || index > filterNode?.length - 1)
      return notifyError("Please enter valid index");
    const newlist = filterNode.filter((data) => {
      return filterNode.indexOf(data) !== index;
    });
    Lists.setNode([...newlist]);
    setRemove(false);
    setRemoveIndex(null);
  };

  // Search Node
  const handleSearch = (color: string) => {
    if (!Lists?.node) return;
    const searchNode = Lists.node;
    const searchFilter = searchNode.filter((data) => data.color === color);
    if (searchFilter?.length) {
      setSearchList(searchFilter);
    } else {
      setSearchList([]);
      notifyError("Error: Node not found.");
    }
  };

  // Input Onchange
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setData(e.target.value);
    setRemove(false);
    setSearchList([]);
  };

  // Reset Button
  const handleResetList = () => {
    Lists?.setNode([]);
    setRemove(false);
    setData(null);
  };

  // Reduce Method
  const initialValue = 0;
  const reduceList = Lists?.node;
  const totalValue = reduceList?.reduce(
    (previousValue, currentValue) => (previousValue += currentValue.data),
    initialValue
  );

  return (
    <>
      <div className="detail_box">
        <div className="detail">
          <p>
            Linked List Length :{" "}
            <span style={{ fontSize: "20px" }}>{Lists?.node.length}</span>
          </p>
          <p style={{ paddingLeft: "30px" }}>
            Total Node Values:{" "}
            <span style={{ fontSize: "20px" }}>{totalValue}</span>
          </p>
        </div>
      </div>
      <div className="opertion_select">
        <label htmlFor="opertion">Basic Operation</label>
        <select
          onChange={handleChange}
          defaultValue="Default"
          style={{ cursor: "pointer" }}
        >
          <option value="Default">--- Select Operation ---</option>
          {operations.map((data, index) => {
            return (
              <option key={index} value={data}>
                {data}
              </option>
            );
          })}
        </select>
        <CustomButton
          type="button"
          className="reset"
          label="Reset"
          onClick={handleResetList}
        />
      </div>
      {data === "Insertion" && (
        <div className="Buttons">
          <CustomButton
            type="button"
            className="btn_1"
            label="Add @ FirstNode"
            onClick={handleAddFirstNode}
          />
          <BsLink size={38} className="BsLink" />

          <CustomButton
            type="button"
            className="btn_2"
            label="Insert Node"
            onClick={handleNode}
          />
          <BsLink size={38} className="BsLink" />

          <CustomButton
            type="button"
            className="btn_3"
            label="Add @ LastNode"
            onClick={handleLastNode}
          />
        </div>
      )}
      {data === "Deletion" && (
        <div className="Buttons">
          <CustomButton
            type="button"
            className="btn_1"
            label="Remove FirstNode"
            onClick={handleRemoveFirstNode}
          />
          <BsLink size={38} className="BsLink" />

          <CustomButton
            type="button"
            className="btn_2"
            label="Remove Node"
            onClick={handleRemove}
          />
          <BsLink size={38} className="BsLink" />

          <CustomButton
            type="button"
            className="btn_3"
            label="Remove LastNode"
            onClick={handleRemoveLastNode}
          />
        </div>
      )}
      {remove && (
        <div className="remove_node">
          <input
            type="number"
            className="index_number"
            placeholder="Enter Index"
            value={removeIndex === null ? undefined : removeIndex}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRemoveIndex(parseInt(e.target.value))
            }
            autoFocus
          />
          <BsLink size={38} className="BsLink" />
          <CustomButton
            type="button"
            className="btn_2"
            label="Remove Node"
            onClick={() => handleRemoveNode(removeIndex)}
          />
        </div>
      )}
      {data === "Search" && (
        <div className="search">
          <label htmlFor="color">Search by Color</label>
          <select
            name="color"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSearchColor(e.target.value)
            }
            defaultValue="Default"
          >
            <option value="Default" disabled>
              ----- Select Color -----
            </option>
            {Colors?.map((color, index) => {
              return (
                <option
                  value={color?.code}
                  key={index}
                  style={{ backgroundColor: color?.code }}
                >
                  {color?.name}
                </option>
              );
            })}
          </select>
          <CustomButton
            type="button"
            className="search_btn"
            label="Search"
            onClick={() => handleSearch(searchColor)}
          />
        </div>
      )}
      <SearchList data={searchList} />
    </>
  );
};

export default Operation;
