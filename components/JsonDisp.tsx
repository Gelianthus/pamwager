import React from "react";

interface JsonDisplayProps {
  data: any; 
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
    return (
        <pre
            className="bg-slate-950 text-gray-300 p-4 rounded-lg overflow-auto text-sm my-4"
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    );
};

export default JsonDisplay;
