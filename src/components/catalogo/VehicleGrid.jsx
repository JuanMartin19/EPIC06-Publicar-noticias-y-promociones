import VehicleCard from './VehicleCard';

export default function VehicleGrid({ vehiculos }) {
  return (
    <div className="row g-4">
      {vehiculos.map((v, index) => (
        <div className="col-12 col-md-6 col-lg-4" key={index}>
          <VehicleCard vehiculo={v} />
        </div>
      ))}
    </div>
  );
}