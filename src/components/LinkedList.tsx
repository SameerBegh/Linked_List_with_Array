import { useState, useContext } from "react";
import "../styles/LinkedList.css";
import Modal from "./Modal";
import { CgArrowLongRightC, CgArrowLongLeftC } from "react-icons/cg";
import { TbArrowDownCircle } from "react-icons/tb";
import { IoIosAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import { DataContext } from "../context/DataContext";
import { BsLink } from "react-icons/bs";
import Operation from "./Operation";

const LinkedList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [nodeIndex, setNodeIndex] = useState<number>(0);
  const Lists = useContext(DataContext);

  // Popup Modal
  const handleClickOpen = () => {
    setOpen(true);
    Lists?.setCreate(true);
  };

  // Adding the specified index on icon click
  const handleAddNode = (index: number) => {
    setOpen(true);
    Lists?.setCreate(false);
    Lists?.setAddNode(true);
    setNodeIndex(index);
    Lists?.setInput(null);
    Lists?.setColor(null);
  };

  // Removing the specified index on icon click
  const handleRemoveNode = (id: string) => {
    if (!Lists?.node) return;
    const nodeFilter = Lists?.node;
    const filter = nodeFilter.filter((item) => {
      return item?.id !== id;
    });
    Lists.setNode([...filter]);
  };

  return (
    <>
      {/* Titele */}
      <div className="title">
        <div className="h1">
          <h1>Linked</h1>
        </div>
        <BsLink size={38} />
        <div className="h1">
          <h1>List</h1>
        </div>
        <BsLink size={38} />
        <div className="h1">
          <h1>Operation</h1>
        </div>
      </div>
      <div className="list_container">
        {/* Linked List Point to null */}
        {Lists?.node?.length === 0 && (
          <div className="node">
            <div className="node_box">
              <div className="head">
                <p>Head</p>
              </div>
              <CgArrowLongRightC size={48} style={{marginLeft:"-5px"}} />
              <div className="null">
                <p>Null</p>
              </div>
              <CgArrowLongLeftC size={48} style={{marginRight:"-5px"}}/>
              <div className="tail">
                <p>Tail</p>
              </div>
            </div>
            <button className="create_btn" onClick={handleClickOpen}>
              <span>Create Node</span>
            </button>
          </div>
        )}
        {open && <Modal setOpen={setOpen} nodeIndex={nodeIndex} />}

        {/* LinkedList chain */}
        {Lists?.node?.map((list, index) => {
          return (
            <div className="list_chain" key={index}>
              {index === 0 && (
                <>
                  {Lists?.node?.length === 1 ? (
                    <div className="head_node">
                      <div className="head">
                        <p>Head</p>
                      </div>
                      <CgArrowLongRightC
                        size={48}
                        style={{ marginLeft: "-5px" }}
                      />
                    </div>
                  ) : (
                    <div className="head_box">
                      <div className="head_2">
                        <p>Head</p>
                      </div>
                      <div className="TbArrowDownCircle">
                        <TbArrowDownCircle size={48} />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div
                className="list_node"
                style={{ backgroundColor: list?.color }}
              >
                <div className="node_data">
                  <p>{list?.data}</p>
                </div>
                <div className="edit_icon">
                  <IoIosAddCircle
                    size={24}
                    onClick={() => handleAddNode(index)}
                    title="Add Node"
                    className="CgAdd"
                  />
                  <IoRemoveCircle
                    size={24}
                    onClick={() => handleRemoveNode(list?.id)}
                    title="Remove Node"
                    className="IoRemoveCircle"
                  />
                </div>
              </div>
              {index === Lists?.node?.length - 1 && (
                <div className={index === 0 ? "tail_box1" : "tail_box"}>
                  <div className="tail_2">
                    <p>Tail</p>
                  </div>
                  <div className="TbArrowDownCircle">
                    <TbArrowDownCircle size={48} />
                  </div>
                </div>
              )}
              <CgArrowLongRightC className="arrow" size={60} />
              {index === Lists?.node?.length - 1 && (
                <>
                  <div className="null">
                    <p>Null</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {Lists?.node?.length !== 0 && <Operation setOpen={setOpen} />}
    </>
  );
};

export default LinkedList;
