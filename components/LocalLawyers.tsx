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
    <section className="section-spacing bg-surface">
      <div className="page-wrap">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Employment Lawyers in {county}
          </h2>
          <p className="text-lg text-inkMuted">
            Find qualified solicitors specializing in employment law in {county}
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lawyers.map((lawyer, index) => (
            <div
              key={`${lawyer.name}-${index}`}
              className="card p-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Nombre del abogado/despacho */}
              <h3 className="heading-3 mb-3 text-primary group-hover:text-primaryDark transition-colors">
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
                <div className="flex items-start gap-2 mb-3">
                  <svg className="w-4 h-4 text-inkMuted mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-inkMuted">
                    {lawyer.address}
                  </p>
                </div>
              )}

              {/* Teléfono */}
              {lawyer.phone && (
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-inkMuted flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a
                    href={`tel:${lawyer.phone}`}
                    className="text-sm text-inkMuted hover:text-primary transition-colors"
                  >
                    {lawyer.phone}
                  </a>
                </div>
              )}

              {/* Botón de consulta */}
              <button
                className="w-full btn-primary text-sm py-3"
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
        <div className="mt-12 p-6 bg-surfaceAlt rounded-2xl border border-line">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-inkMuted mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-inkMuted">
                <strong className="text-ink">Note:</strong> This directory is provided for informational purposes only. 
                We recommend contacting multiple solicitors to find the best fit for your specific situation. 
                Always verify credentials and check reviews before engaging legal services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
