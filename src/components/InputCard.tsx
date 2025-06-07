import React from 'react';

interface InputOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

interface InputCardProps {
  title: string;
  description: string;
  type: 'select' | 'radio' | 'range' | 'text';
  options?: InputOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

const InputCard: React.FC<InputCardProps> = ({
  title,
  description,
  type,
  options = [],
  value,
  onChange,
  placeholder,
  min,
  max,
  step
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  value === option.value
                    ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-800 shadow-md'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25 shadow-sm hover:shadow-md'
                }`}
              >
                <input
                  type="radio"
                  name={title}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3 flex-1">
                  {option.icon && <span className="text-xl">{option.icon}</span>}
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                    )}
                  </div>
                </div>
                <div className={`ml-auto w-5 h-5 border-2 rounded-full transition-all duration-300 ${
                  value === option.value ? 'border-pink-400 bg-pink-400 shadow-lg' : 'border-gray-300'
                }`}>
                  {value === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      case 'range':
        return (
          <div className="space-y-4">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-3 bg-gradient-to-r from-pink-200 to-rose-200 rounded-lg appearance-none cursor-pointer slider shadow-sm"
            />
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-1">
                PKR {parseInt(value).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Perfect for finding amazing outfits within your budget! 💕
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none shadow-sm hover:shadow-md transition-all duration-300"
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-6 mb-4 transform hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {renderInput()}
    </div>
  );
};

export default InputCard;