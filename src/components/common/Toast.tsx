import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    error: 'bg-red-50 border-red-200 text-red-950',
    info: 'bg-sky-50 border-sky-200 text-sky-950',
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-md animate-fade-in shadow-xl rounded-xl border p-4 flex items-start gap-3 backdrop-blur-md bg-opacity-95 bg-white">
      {icons[toast.type]}
      <div className="text-sm font-medium leading-snug">{toast.message}</div>
    </div>
  );
};
