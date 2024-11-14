import React, { useState } from 'react';
import { FileJson } from 'lucide-react';
import JsonViewer from './components/JsonViewer';

const sampleJson = {
  name: "JSON Viewer",
  version: 1.0,
  features: ["Syntax highlighting", "Collapsible sections", "Copy to clipboard"],
  settings: {
    theme: "light",
    autoExpand: true,
    maxDepth: null
  },
  examples: [
    { type: "string", value: "Hello World" },
    { type: "number", value: 42 },
    { type: "boolean", value: true }
  ]
};

function App() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(sampleJson, null, 2));
  const [parsedJson, setParsedJson] = useState<any>(sampleJson);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setParsedJson(parsed);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <FileJson className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">JSON Viewer</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Input JSON</h2>
            <textarea
              className={`w-full h-[500px] p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-200'
              }`}
              value={jsonInput}
              onChange={handleInputChange}
              placeholder="Paste your JSON here..."
            />
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </div>

          {/* Viewer Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Parsed JSON</h2>
            <div className="border border-gray-200 rounded-lg p-4 h-[500px] overflow-auto bg-gray-50">
              {!error && <JsonViewer data={parsedJson} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;