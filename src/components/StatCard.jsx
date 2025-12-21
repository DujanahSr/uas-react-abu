import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const StatCard = ({ title, value, change, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="p-6 transition-colors bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <AiOutlineArrowUp className="mr-1 text-green-500" />
            ) : (
              <AiOutlineArrowDown className="mr-1 text-red-500" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">dari bulan lalu</span>
          </div>
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          {React.cloneElement(icon, { size: 24, className: 'text-white' })}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
