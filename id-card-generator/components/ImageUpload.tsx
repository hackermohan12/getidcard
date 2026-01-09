import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  image: string | null;
  onUpload: (result: string | null) => void;
  aspectRatioClass?: string; // e.g., "aspect-square" or "aspect-video"
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  label, 
  image, 
  onUpload, 
  aspectRatioClass = "aspect-square" 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div 
        className={`relative w-full ${aspectRatioClass} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors overflow-hidden group`}
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <>
            <img src={image} alt="Preview" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button 
                onClick={handleRemove}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
               >
                 <X size={20} />
               </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400 p-4 text-center">
            <Upload size={24} className="mb-2" />
            <span className="text-xs">Click to upload</span>
          </div>
        )}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};