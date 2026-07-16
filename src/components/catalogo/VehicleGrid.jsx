import VehicleCard from "./VehicleCard";

export default function VehicleGrid({ vehiculos }) {
  return (
    <div className="row g-4">
      {vehiculos.map((v) => (
        <div className="col-12 col-md-6 col-lg-4" key={v.id}>
          <VehicleCard vehiculo={v} />
        </div>
      ))}
    </div>
  );
}