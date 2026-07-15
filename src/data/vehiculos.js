export const categorias = [
  { key: 'autos', label: 'Autos', icon: 'bi-car-front-fill' },
  { key: 'motos', label: 'Motos', icon: 'bi-scooter' },
  { key: 'camionetas', label: 'Camionetas', icon: 'bi-truck-front-fill' },
];

export const marcas = [
  {
    key: 'toyota',
    nombre: 'Toyota',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
    descripcion: 'Confiabilidad y durabilidad japonesa.',
  },
  {
    key: 'nissan',
    nombre: 'Nissan',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg',
    descripcion: 'Innovación y tecnología en cada modelo.',
  },
  {
    key: 'honda',
    nombre: 'Honda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Honda_Logo.svg',
    descripcion: 'Ingeniería de precisión, motos y autos.',
  },
  {
    key: 'chevrolet',
    nombre: 'Chevrolet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Chevrolet_logo.svg',
    descripcion: 'Potencia americana para cada camino.',
  },
  {
    key: 'ford',
    nombre: 'Ford',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
    descripcion: 'Resistencia probada, herencia de trabajo.',
  },
];

export const vehiculos = {
  autos: [
    {
      nombre: 'Sedán Ejecutivo',
      marca: 'toyota',
      imagen: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
      motor: '2.0L Turbo',
      transmision: 'Automática',
      rendimiento: '18 km/l',
      precio: '$389,000',
    },
    {
      nombre: 'Hatchback Deportivo',
      marca: 'honda',
      imagen: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
      motor: '1.6L',
      transmision: 'Manual',
      rendimiento: '16 km/l',
      precio: '$298,500',
    },
    {
      nombre: 'Sedán Familiar',
      marca: 'nissan',
      imagen: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
      motor: '2.4L',
      transmision: 'Automática',
      rendimiento: '15 km/l',
      precio: '$342,000',
    },
  ],
  motos: [
    {
      nombre: 'Naked 300',
      marca: 'honda',
      imagen: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
      motor: '300cc',
      transmision: '6 velocidades',
      rendimiento: '30 km/l',
      precio: '$89,900',
    },
    {
      nombre: 'Adventure 650',
      marca: 'honda',
      imagen: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
      motor: '650cc',
      transmision: '6 velocidades',
      rendimiento: '22 km/l',
      precio: '$179,000',
    },
  ],
  camionetas: [
    {
      nombre: 'Pickup 4x4',
      marca: 'ford',
      imagen: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?auto=format&fit=crop&w=600&q=80',
      motor: '3.5L V6',
      transmision: 'Automática',
      rendimiento: '12 km/l',
      precio: '$612,000',
    },
    {
      nombre: 'SUV Todo Terreno',
      marca: 'chevrolet',
      imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
      motor: '2.8L Diésel',
      transmision: 'Automática',
      rendimiento: '14 km/l',
      precio: '$558,900',
    },
  ],
};

// Aplana todos los vehículos en un solo arreglo, útil para filtrar por marca
export function getTodosLosVehiculos() {
  return Object.values(vehiculos).flat();
}