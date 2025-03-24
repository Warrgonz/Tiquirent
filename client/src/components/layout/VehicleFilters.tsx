import { useVehicleFilters } from "../../hooks/useVehicleFilters";
import { VehicleFiltersProps, VehicleFiltersState } from "../../interface";

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  categories,
  onFilterChange,
}) => {
  const { selectedFilters, handleCheckboxChange, isOptionSelected } =
    useVehicleFilters(
      categories.reduce((acc, category) => {
        acc[category.id] = [];
        return acc;
      }, {} as VehicleFiltersState)
    );

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5
          className="card-title mb-2"
          style={{ color: "#000", fontWeight: "bold" }}
        >
          Filtrar vehículos por:
        </h5>
        <hr
          className="mt-2 mb-4"
          style={{ height: "2px", backgroundColor: "#28a745", opacity: 1 }}
        />

        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <h6
              className="mb-3"
              style={{ color: "#0275d8", fontWeight: "bold" }}
            >
              {category.title}
            </h6>

            {category.options.map((option) => (
              <div key={option.id} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`${category.id}-${option.id}`}
                  checked={isOptionSelected(category.id, option.id)}
                  onChange={(e) => {
                    handleCheckboxChange(
                      category.id,
                      option.id,
                      e.target.checked
                    );
                    onFilterChange && onFilterChange(selectedFilters);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${category.id}-${option.id}`}
                  style={{ color: "#6c757d" }}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleFilters;
