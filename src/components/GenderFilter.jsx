import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setCurrentPage,
  setCurrentGender,
} from "../store/userSlice";

const GenderFilter = () => {
  const dispatch = useDispatch();
  const currentGender = useSelector((state) => state.users.currentGender);
  const currentKeyword = useSelector((state) => state.users.currentKeyword);

  const handleFilterChange = (e) => {
    const gender = e.target.value;
    dispatch(setCurrentPage(1));
    dispatch(setCurrentGender(gender));
    dispatch(
      fetchUsers({
        page: 1,
        results: 10,
        gender: gender === "all" ? null : gender,
        keyword: currentKeyword,
      })
    );
  };

  return (
    <div className="input-group">
      <select
        className="form-select"
        onChange={handleFilterChange}
        value={currentGender}
      >
        <option value="all">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default GenderFilter;
