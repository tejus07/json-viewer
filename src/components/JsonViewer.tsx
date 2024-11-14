import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Copy, Check } from 'lucide-react';

interface JsonViewerProps {
  data: any;
  level?: number;
  isLast?: boolean;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, level = 0, isLast = true }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const getDataType = (value: any): string => {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    return typeof value;
  };

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderValue = (value: any): JSX.Element => {
    const type = getDataType(value);
    
    switch (type) {
      case 'string':
        return <span className="text-green-600">"{value}"</span>;
      case 'number':
        return <span className="text-blue-600">{value}</span>;
      case 'boolean':
        return <span className="text-purple-600">{value.toString()}</span>;
      case 'null':
        return <span className="text-gray-500">null</span>;
      case 'object':
      case 'array':
        return (
          <JsonViewer 
            data={value} 
            level={level + 1} 
            isLast={isLast}
          />
        );
      default:
        return <span>{String(value)}</span>;
    }
  };

  if (typeof data !== 'object' || data === null) {
    return renderValue(data);
  }

  const isArray = Array.isArray(data);
  const isEmpty = Object.keys(data).length === 0;
  const bracketType = isArray ? ['[', ']'] : ['{', '}'];

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center">
        {Object.keys(data).length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        <span>{bracketType[0]}</span>
        {isEmpty && <span>{bracketType[1]}</span>}
        <button
          onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
          className="ml-2 p-1 hover:bg-gray-100 rounded text-gray-500"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {!isEmpty && isExpanded && (
        <div className="ml-6">
          {Object.entries(data).map(([key, value], index, arr) => (
            <div key={key} className="my-1">
              <span className="text-gray-800">
                {isArray ? '' : <span className="text-purple-800">"{key}"</span>}
                {!isArray && <span className="text-gray-600">: </span>}
              </span>
              {renderValue(value)}
              {index < arr.length - 1 && <span className="text-gray-600">,</span>}
            </div>
          ))}
        </div>
      )}
      {!isEmpty && <div className={`${isExpanded ? 'ml-4' : 'ml-0 inline'}`}>{bracketType[1]}</div>}
    </div>
  );
};

export default JsonViewer;