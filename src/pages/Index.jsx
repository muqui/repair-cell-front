import '../App.css';
import Header from '../components/Header';
import Servicios from '../components/Servicios';
import Contacto from '../components/Contacto';
import Registro from '../components/Registro';
import { Hero } from '../components/Hero';
import { OrderFolioForm } from '../components/OrderFolioForm';

function Index() {
  return (
    <div>
      <Header />

      {/* Hero con texto que sube sobre la imagen fija */}
      <Hero />

      {/* Contenido que sube y TAPA la imagen fija */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto pt-5 mt-3 px-4">
          <OrderFolioForm />
          <Servicios />
          <Contacto />
        </div>
      </div>
    </div>
  );
}

export default Index;