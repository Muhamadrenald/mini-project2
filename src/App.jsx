import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setCurrentPage } from "./store/userSlice";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import GenderFilter from "./components/GenderFilter";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import PropertyCard from "./components/PropertyCard";
import PropertyDetailsModal from "./components/PropertyDetailsModal";
import PropertyMap from "./components/PropertyMap";
import "bootstrap-icons/font/bootstrap-icons.css";

// Data contoh properti
const sampleProperties = [
  {
    id: 1,
    title: "Rumah minimalis dijual di Bandung Jawa Barat",
    shortDescription:
      "Rip 326 | Cocoa in Argentina. Minimalis modern dengan fasilitas lengkap.",
    address: "J. Sukajadi No.1 Bandung, Jawa Barat",
    fullDescription:
      "Rumah minimalis dengan desain modern, 2 kamar tidur, 2 kamar mandi, luas tanah 66m². Lokasi strategis di pusat kota Bandung.",
    bedrooms: 2,
    bathrooms: 2,
    area: 66,
    image: "https://picsum.photos/200",
    mapDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  // Tambahkan properti lain sesuai kebutuhan
];

function App() {
  // Redux state untuk user dashboard
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

  // State untuk properti
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState("users"); // 'users' atau 'properties'

  useEffect(() => {
    if (activeTab === "users") {
      dispatch(
        fetchUsers({
          page: currentPage,
          results: resultsPerPage,
          gender: currentGender === "all" ? null : currentGender,
          keyword: currentKeyword,
        })
      );
    }
  }, [
    dispatch,
    currentPage,
    resultsPerPage,
    currentGender,
    currentKeyword,
    activeTab,
  ]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowDetails(true);
  };

  const handleShowMap = () => {
    setShowDetails(false);
    setShowMap(true);
  };

  if (error) {
    return <div className="alert alert-danger">Error: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            User Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "properties" ? "active" : ""}`}
            onClick={() => setActiveTab("properties")}
          >
            Property Listing
          </button>
        </li>
      </ul>

      {activeTab === "users" ? (
        <>
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
        </>
      ) : (
        <>
          <h1 className="mb-4">Property Listing</h1>
          <div className="row">
            {sampleProperties.map((property) => (
              <div className="col-md-4 mb-4" key={property.id}>
                <PropertyCard
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>

          <PropertyDetailsModal
            property={selectedProperty}
            show={showDetails}
            onHide={() => setShowDetails(false)}
            onShowMap={handleShowMap}
          />

          <PropertyMap
            property={selectedProperty}
            show={showMap}
            onHide={() => setShowMap(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
