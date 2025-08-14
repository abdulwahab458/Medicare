import React from 'react';
import Image from 'next/image';

interface StatCardProps {
  type: 'appointments' | 'pending' | 'cancelled';
  count: number;
  label: string;
  icon: string; // image path
}

const StatCard = ({ count, label, icon, type }: StatCardProps) => {
  const typeColors = {
    appointments: 'from-green-400/30 to-green-600/30 border-green-500/40',
    pending: 'from-blue-400/30 to-blue-600/30 border-blue-500/40',
    cancelled: 'from-red-400/30 to-red-600/30 border-red-500/40',
  };

  return (
    <div
      className={`flex items-center gap-4 p-5 rounded-xl border backdrop-blur-md shadow-md bg-gradient-to-br ${typeColors[type]} transition-transform duration-200 hover:scale-105`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-white/10">
        <Image src={icon} alt={`${label} icon`} width={32} height={32} />
      </div>

      {/* Count and Label stacked */}
      <div className="flex flex-col leading-tight">
        <h2 className="text-3xl font-bold">{count}</h2>
        <p className="text-sm text-gray-300">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
