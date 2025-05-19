import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setCurrentPage } from "./store/userSlice";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import GenderFilter from "./components/GenderFilter";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const {
    data: users,
    loading,
    error,
    currentPage,
    resultsPerPage,
    totalResults,
    sortConfig,
    currentGender,
    currentKeyword,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        results: resultsPerPage,
        gender: currentGender === "all" ? null : currentGender,
        keyword: currentKeyword,
      })
    );
  }, [dispatch, currentPage, resultsPerPage, currentGender, currentKeyword]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  if (error)
    return <div className="alert alert-danger">Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Dashboard</h1>

      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar />
        </div>
        <div className="col-md-6">
          <GenderFilter />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-3">
            Showing {users.length} of {totalResults} results
            {currentKeyword && ` for "${currentKeyword}"`}
            {currentGender !== "all" && ` (${currentGender})`}
          </div>
          <UserTable users={users} sortConfig={sortConfig} />
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;
