"use client";

import React from 'react';
import lawyersByCounty from '../data/lawyersByCounty.json';

interface Lawyer {
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
}

interface CountyData {
  county: string;
  lawyers: Lawyer[];
}

interface LocalLawyersProps {
  countySlug: string;
}

export default function LocalLawyers({ countySlug }: LocalLawyersProps) {
  // Encontrar los datos del condado
  const countyData = lawyersByCounty.find(
    (data: CountyData) => data.county.toLowerCase() === countySlug.toLowerCase()
  );

  // Si no hay datos para este condado, no renderizar nada
  if (!countyData || countyData.lawyers.length === 0) {
    return null;
  }

  const { county, lawyers } = countyData;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <div className="page-wrap">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Employment Lawyers in {county}
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lawyers.map((lawyer, index) => (
            <div
              key={`${lawyer.name}-${index}`}
              className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Nombre del abogado/despacho */}
              <h3 className="text-lg font-medium text-blue-700 mb-2">
                {lawyer.website ? (
                  <a
                    href={lawyer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {lawyer.name}
                  </a>
                ) : (
                  lawyer.name
                )}
              </h3>

              {/* Dirección */}
              {lawyer.address && (
                <p className="text-sm text-gray-600 mb-2">
                  📍 {lawyer.address}
                </p>
              )}

              {/* Teléfono */}
              {lawyer.phone && (
                <p className="text-sm text-gray-600 mb-3">
                  <a
                    href={`tel:${lawyer.phone}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    📞 {lawyer.phone}
                  </a>
                </p>
              )}

              {/* Botón de consulta */}
              <button
                className="inline-block mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => {
                  // Aquí puedes agregar lógica para manejar la solicitud de consulta
                  // Por ejemplo, abrir un modal, redirigir a un formulario, etc.
                  console.log(`Solicitar consulta con ${lawyer.name}`);
                }}
              >
                Request Consultation
              </button>
            </div>
          ))}
        </div>

        {/* Nota informativa */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This directory is provided for informational purposes only. 
            We recommend contacting multiple solicitors to find the best fit for your specific situation. 
            Always verify credentials and check reviews before engaging legal services.
          </p>
        </div>
      </div>
    </section>
  );
}
