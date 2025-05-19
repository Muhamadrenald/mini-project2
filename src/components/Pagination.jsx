import { useSelector } from "react-redux";

const Pagination = ({ currentPage, onPageChange }) => {
  const { totalResults, resultsPerPage } = useSelector((state) => state.users);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (totalPages <= 1) return null;

  // Warna untuk styling pagination
  const colors = {
    primary: "#0d6efd",
    active: "#e7f1ff",
    border: "#dee2e6",
    text: "#495057",
    disabled: "#dee2e6",
    background: "#ffffff",
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Tampilkan halaman pertama
    pageNumbers.push(
      <li key={1} className={`page-item ${currentPage === 1 ? "active" : ""}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(1)}
          style={{
            margin: "0 4px",
            minWidth: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: currentPage === 1 ? `1px solid ${colors.primary}` : "none",
            backgroundColor: currentPage === 1 ? colors.active : "transparent",
            color: currentPage === 1 ? colors.primary : colors.text,
            fontWeight: currentPage === 1 ? "bold" : "normal",
            borderRadius: "4px",
          }}
        >
          1
        </button>
      </li>
    );

    // Tampilkan ellipsis jika ada gap besar dari awal
    if (currentPage > 4) {
      pageNumbers.push(
        <li key="start-ellipsis" className="page-item">
          <span
            className="page-link"
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: colors.text,
            }}
          >
            ...
          </span>
        </li>
      );
    }

    // Tampilkan beberapa halaman di sekitar halaman saat ini
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(i)}
              style={{
                margin: "0 4px",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border:
                  currentPage === i ? `1px solid ${colors.primary}` : "none",
                backgroundColor:
                  currentPage === i ? colors.active : "transparent",
                color: currentPage === i ? colors.primary : colors.text,
                fontWeight: currentPage === i ? "bold" : "normal",
                borderRadius: "4px",
              }}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    // Tampilkan ellipsis jika ada gap besar ke akhir
    if (currentPage < totalPages - 3) {
      pageNumbers.push(
        <li key="end-ellipsis" className="page-item">
          <span
            className="page-link"
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: colors.text,
            }}
          >
            ...
          </span>
        </li>
      );
    }

    // Tampilkan halaman terakhir
    if (totalPages > 1) {
      pageNumbers.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
            style={{
              margin: "0 4px",
              minWidth: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:
                currentPage === totalPages
                  ? `1px solid ${colors.primary}`
                  : "none",
              backgroundColor:
                currentPage === totalPages ? colors.active : "transparent",
              color: currentPage === totalPages ? colors.primary : colors.text,
              fontWeight: currentPage === totalPages ? "bold" : "normal",
              borderRadius: "4px",
            }}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav
      aria-label="Page navigation"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <ul
        className="pagination justify-content-center align-items-center"
        style={{
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          backgroundColor: colors.background,
        }}
      >
        {/* Tombol Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous"
            style={{
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.background,
              color: currentPage === 1 ? colors.disabled : colors.text,
              margin: "0 8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            &lt;
          </button>
        </li>

        {renderPageNumbers()}

        {/* Tombol Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next"
            style={{
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.background,
              color: currentPage === totalPages ? colors.disabled : colors.text,
              margin: "0 8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
