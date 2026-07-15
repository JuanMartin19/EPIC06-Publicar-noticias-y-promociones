import BrandCard from './BrandCard';

export default function BrandGrid({ marcas }) {
  return (
    <div className="row g-4">
      {marcas.map((marca) => (
        <div className="col-12 col-sm-6 col-lg-4" key={marca.key}>
          <BrandCard marca={marca} />
        </div>
      ))}
    </div>
  );
}