import { FC } from "react";
import { Node } from "../context/DataContext";
import { IoIosAddCircle } from "react-icons/io";
import { IoRemoveCircle } from "react-icons/io5";
import "../styles/Search.css";

interface ISearchList {
  data: Node[];
}

const SearchList: FC<ISearchList> = ({ data }) => {
  return (
    <>
      {data?.map((list, index) => {
        return (
          <div className="Search_list_box" key={index}>
            <div className="list_node" style={{ backgroundColor: list?.color }}>
              <p>{list?.data}</p>
              <div className="div">
                <IoIosAddCircle size={24} />
                <IoRemoveCircle size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchList;
