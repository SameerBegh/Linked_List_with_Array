import {
  FC,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import "../styles/Modal.css";
import { DataContext } from "../context/DataContext";
import { Colors } from "../utils/Data";
import CustomButton from "../custom/CustomButton";
import { toast } from "react-toastify";

interface IModal {
  setOpen: Dispatch<SetStateAction<boolean>>;
  nodeIndex: number;
}

const Modal: FC<IModal> = ({ setOpen, nodeIndex }) => {
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const provider = useContext(DataContext);

  useEffect(() => {
    const inputErrorCheck = () => {
      if (provider?.input === null || provider?.input === undefined) {
        setError(false);
      } else if (provider?.input === 0 || provider?.input > 1000) {
        setError(true);
      } else {
        setError(false);
      }
    };
    inputErrorCheck();
  }, [provider?.input]);

  // Toastify for error and success msgs alert
  const notifysuccess = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (message: string) => {
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
  };

  // Onchange event handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    provider?.setInput(parseInt(e.target.value));
  };

  // creating a new node
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!provider?.input) return notifyError("Please enter valid data");
    if (!provider?.color) return notifyError("Please select a color");
    provider.setNode((prev) => {
      return [
        ...prev,
        {
          data: provider.input,
          color: provider.color,
          id: new Date().getTime().toString(),
        },
      ];
    });
    notifysuccess("New Node Created Successfully");
    provider.setInput(null);
    provider.setColor(null);
    setOpen(false);
  };

  //Adding a node at the first index
  const handleAddFirst = () => {
    if (!provider?.node) return;
    if (!provider?.input) return notifyError("Please enter valid data");
    if (!provider?.color) return notifyError("Please select a color");
    const newList = provider?.node;
    newList.unshift({
      data: provider.input,
      color: provider.color,
      id: new Date().getTime().toString(),
    });
    provider.setNode([...newList]);
    provider.setInput(null);
    provider.setColor(null);
    provider.setAddFirst(false);
    setOpen(false);
  };

  // Adding a node at the specified index
  const handleAddNode = (index: number, insertIndex: number | null) => {
    if (!provider?.node) return;
    if (!provider?.input) return notifyError("Please enter valid data");
    if (!provider?.color) return notifyError("Please select a color");
    const newList = provider?.node;
    if (provider?.insertNode) {
      if (insertIndex === null || insertIndex > newList?.length - 1) {
        return notifyError("Please enter valid index");
      }
      newList.splice(insertIndex, 0, {
        data: provider.input,
        color: provider.color,
        id: new Date().getTime().toString(),
      });
      provider.setNode([...newList]);
      provider.setAddNode(false);
      provider.setInsertNode(false);
      provider.setInput(null);
      provider.setColor(null);
    } else {
      newList.splice(index + 1, 0, {
        data: provider.input,
        color: provider.color,
        id: new Date().getTime().toString(),
      });
      provider.setNode([...newList]);
      provider.setAddNode(false);
      provider.setInput(null);
      provider.setColor(null);
    }
    setOpen(false);
  };

  // Adding a node at the last index
  const handleAddLast = () => {
    if (!provider?.node) return;
    if (!provider?.input) return notifyError("Please enter valid data");
    if (!provider?.color) return notifyError("Please select a color");
    const newList = provider.node;
    newList.push({
      data: provider?.input,
      color: provider?.color,
      id: new Date().getTime().toString(),
    });
    provider?.setNode([...newList]);
    provider?.setInput(null);
    provider?.setColor(null);
    setOpen(false);
    provider?.setAddLast(false);
  };

  // Popup Modal Close
  const handleCancle = () => {
    setOpen(false);
    provider?.setAddFirst(false);
    provider?.setAddLast(false);
    provider?.setAddNode(false);
    provider?.setInsertNode(false);
    provider?.setInput(null);
    provider?.setColor(null);
  };

  return (
    <>
      <div className="modal_container" onClick={handleCancle}></div>
      <div className="modal">
        <h2>Add New Node</h2>
        <form
          className="modal_form"
          onSubmit={(e: FormEvent) => handleSubmit(e)}
        >
          {provider?.insertNode && (
            <>
              <label htmlFor="number">Enter Index</label>
              <input
                type="number"
                name="number"
                className="input_number"
                placeholder="Enter Index"
                value={insertIndex === null ? undefined : insertIndex}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInsertIndex(parseInt(e.target.value))
                }
                required
              />
            </>
          )}
          <label htmlFor="number">Enter Data </label>
          <input
            type="number"
            name="number"
            className="input_number"
            placeholder="Enter Data"
            value={provider?.input == null ? undefined : provider.input}
            onChange={handleInputChange}
            min={1}
            max={1000}
            autoFocus
            required
            style={{ outline: error ? "1px solid red" : "1px solid blue" }}
          />
          {error && (
            <label className="error">
              Value must be greater than 0 and less than 1000
            </label>
          )}

          <label htmlFor="color">Select Color</label>
          <select
            name="color"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              provider?.setColor(e.target.value)
            }
            defaultValue="Default"
            style={{
              outline: provider?.color ? "1px solid blue" : "1px solid red",
            }}
          >
            <option value="Default" disabled>
              Choose Color
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
          <div className="modal_buttons">
            {provider?.createNode && (
              <CustomButton
                type="submit"
                className="modal_button_add"
                label="Create Node"
              />
            )}
            {provider?.addFirst && (
              <CustomButton
                type="button"
                className="modal_button_add"
                label="Add First"
                onClick={handleAddFirst}
              />
            )}
            {provider?.addLast && (
              <CustomButton
                type="button"
                className="modal_button_add"
                label="Add Last"
                onClick={handleAddLast}
              />
            )}
            {provider?.addNode && (
              <CustomButton
                type="button"
                className="modal_button_add"
                label="Add Node"
                onClick={() => handleAddNode(nodeIndex, insertIndex)}
              />
            )}
            <CustomButton
              type="reset"
              className="modal_button_cancel"
              onClick={handleCancle}
              label="Cancle"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
