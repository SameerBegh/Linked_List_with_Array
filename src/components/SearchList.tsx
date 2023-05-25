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
    <div className="search">
      {data?.map((list) => {
        return (
          <div className="search_list" key={list.id}>
            <div
              className="search_list_node"
              style={{ backgroundColor: list?.color }}
            >
              <div className="search_node_data">
                <p>{list?.data}</p>
              </div>
              <div className="search_edit_icon">
                <IoIosAddCircle size={24} className="CgAdd" />
                <IoRemoveCircle size={24} className="IoRemoveCircle" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchList;
