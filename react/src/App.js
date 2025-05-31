// // src/App.jsx
// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState("");
//   const [data, setData] = useState(null);
//   const [search, setSearch] = useState("");

//   const fetchData = async () => {
//     const res = await axios.post("http://localhost:3006/api/extract", { url });
//     debugger
//     setData(res.data);
//   };

//   const filtered = data?.keyPoints?.filter(point =>
//     point.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">AI-Powered Content Extractor</h1>
//       <input
//         type="text"
//         className="border p-2 w-full mb-2"
//         placeholder="Enter a public URL"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//       />
//       <button onClick={fetchData} className="bg-blue-600 text-white p-2 rounded">
//         Extract & Summarize
//       </button>

//       {data && (
//         <>
//           <h2 className="mt-6 text-xl font-semibold">Summary</h2>
//           <p className="mb-4">{data.summary}</p>

//           <input
//             type="text"
//             className="border p-2 w-full mb-2"
//             placeholder="Search key points"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <table className="w-full border">
//             <thead>
//               <tr><th className="border p-2">Key Points</th></tr>
//             </thead>
//             <tbody>
//               {filtered.map((point, i) => (
//                 <tr key={i}>
//                   <td className="border p-2">{point}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // const res = await axios.post("http://localhost:3006/api/extract", { url });
      const res = await axios.post("/api/extract", { url });
      setData(res.data);
    } catch (err) {
      alert("Failed to fetch summary.");
    }
    setLoading(false);
  };

  const filtered = data?.keyPoints?.filter((point) =>
    point.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">🔍 AI Content Extractor</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-300 p-2 w-full rounded"
          placeholder="Paste any public URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Extract"}
        </button>
      </div>

      {data && (
        <>
          <h2 className="text-xl font-semibold mt-4 mb-2">Summary</h2>
          <p className="bg-gray-100 p-4 rounded border">{data.summary}</p>

          <input
            type="text"
            placeholder="Search key points..."
            className="border p-2 mt-6 w-full rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="w-full mt-4 border">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left p-2 border">Key Points</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((point, i) => (
                <tr key={i}>
                  <td className="border p-2">{point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
