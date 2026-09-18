import React from 'react';

export const Hero = () => {
  return (
    <>
      {/* Imagen FIJA global - nunca se mueve, cubre TODO el viewport */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/main.jpg")', zIndex: -1 }}
      />

      {/* Sección del Hero: solo el texto, que sube con el scroll */}
      <section className="relative h-screen">
        <div className="flex h-screen items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold uppercase text-outline">
              REPARACIÓN DE CELULARES
            </h1>

            <h5 className="mt-4 text-2xl md:text-5xl font-bold uppercase text-outline">
              alarga la vida de tu celular
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 max-w-xl mx-auto">
              <a
                href="https://wa.me/+5213320874874"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                WhatsApp
              </a>

              <a
                href="tel:3320874874"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Llámanos
              </a>

              <a
                href="#contacto"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Escríbenos
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};