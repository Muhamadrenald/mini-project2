import { useDispatch, useSelector } from "react-redux";
import { setSortConfig } from "../store/userSlice";

const UserTable = ({ users }) => {
  const dispatch = useDispatch();
  const sortConfig = useSelector((state) => state.users.sortConfig);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    dispatch(setSortConfig({ key, direction }));
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  function getNestedValue(obj, path) {
    return path.split(".").reduce((o, p) => o?.[p], obj);
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th onClick={() => requestSort("name.first")}>
              Name{" "}
              {sortConfig.key === "name.first" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => requestSort("gender")}>
              Gender{" "}
              {sortConfig.key === "gender" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => requestSort("email")}>
              Email{" "}
              {sortConfig.key === "email" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th onClick={() => requestSort("location.country")}>
              Country{" "}
              {sortConfig.key === "location.country" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.location.country}</td>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="rounded-circle"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
