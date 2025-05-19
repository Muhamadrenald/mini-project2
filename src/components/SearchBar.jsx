import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setCurrentPage,
  setCurrentKeyword,
} from "../store/userSlice";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    dispatch(setCurrentKeyword(keyword));
    dispatch(
      fetchUsers({
        page: 1,
        results: 10,
        keyword,
        gender: useSelector((state) => state.users.currentGender),
      })
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
        {keyword && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setKeyword("");
              dispatch(setCurrentKeyword(""));
              dispatch(
                fetchUsers({
                  page: 1,
                  results: 10,
                  keyword: "",
                  gender: useSelector((state) => state.users.currentGender),
                })
              );
            }}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
