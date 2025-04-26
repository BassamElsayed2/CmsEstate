import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const [operation, setOperation] = useState("sale"); // default: للبيع
  const [locationInput, setLocationInput] = useState("");

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("operation", operation);
    searchParams.set("location", locationInput.trim());
    router.push(`/apartment?${searchParams.toString()}`);
  };

  return (
    <div className="search-bar-container p-3 p-md-4 rounded-4 shadow-sm">
      <div className="d-flex flex-wrap align-items-center gap-2">
        {/* زرار البيع / الايجار */}
        <div className="operation-toggle d-flex border rounded-pill overflow-hidden">
          <button
            className={`btn btn-light flex-grow-1 ${operation === "sale" ? "active" : ""}`}
            onClick={() => setOperation("sale")}
          >
            للبيع
          </button>
          <button
            className={`btn btn-light flex-grow-1 ${operation === "rent" ? "active" : ""}`}
            onClick={() => setOperation("rent")}
          >
            للإيجار
          </button>
        </div>

        {/* حقل البحث عن المنطقة */}
        <div className="flex-grow-1">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث عن موقع، مدينة أو منطقة"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        {/* زرار البحث */}
        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={handleSearch}
        >
          بحث
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
