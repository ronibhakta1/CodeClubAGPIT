import * as React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  children?: React.ReactNode; // ✅ Allow children inside Avatar
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback = "?", className = "", children }) => {
  return (
    <div className={`relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-gray-600 font-semibold">{fallback}</span>
      )}
      {children} {/* ✅ Ensure children can be rendered inside */}
    </div>
  );
};
