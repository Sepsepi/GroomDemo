'use client';

import { useState } from 'react';

interface ServiceImageProps {
  src: string;
  alt: string;
  serviceName: string;
}

export function ServiceImage({ src, alt, serviceName }: ServiceImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-100 to-gray-200">
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-lg font-semibold text-gray-600">
              {serviceName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
