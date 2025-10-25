'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="mb-8 justify-center j">
      <div className="relative w-full aspect-video mb-4">
  {images.length > 0 ? (
    <Image
      src={images[selectedImage]}
      alt={`${title} - รูปที่ ${selectedImage + 1}`}
      fill
      className="object-cover rounded-lg" // object-cover จะช่วยให้ภาพไม่บิดเบี้ยว
      unoptimized
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg text-gray-500">
      ไม่มีรูปภาพ
    </div>
  )}
</div>
      <div>
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`shrink-0 w-20 h-20 relative ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
          >
            <Image
              src={image}
              alt={`${title} - รูปย่อที่ ${index + 1}`}
              fill
              className="object-cover rounded"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;