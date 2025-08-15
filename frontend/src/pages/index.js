// LogsPage.jsx
import React, { useState, useEffect } from "react";

const initialFilters = {
    level: "",
    resourceId: "",
    since: "",
    until: "",
    keyword: ""
}
export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const fetchLogs = async () => {
     const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });

    fetch(`http://localhost:3001/logs?${params}`)
      .then(res => res.json())
      .then(({result}) => setLogs(result.logs))
      .catch(console.error);
  }

  const clearLogs = () => {
    setFilters(initialFilters)
  }
  
  useEffect(() => {
   fetchLogs()
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case "error": return "bg-red-100 text-red-700";
      case "warn": return "bg-yellow-100 text-yellow-700";
      case "info": return "bg-blue-100 text-blue-700";
      case "debug": return "bg-gray-100 text-gray-700";
      default: return "";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📜 Server Logs Dashboard</h2>
      
      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            className="border p-2 rounded w-full"
            value={filters.level}
            onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
          >
            <option value="">All</option>
            <option value="error">Error</option>
            <option value="warn">Warn</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resource ID</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="server-1234"
            value={filters.resourceId}
            onChange={e => setFilters(f => ({ ...f, resourceId: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={filters.since}
            onChange={e => setFilters(f => ({ ...f, since: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={filters.until}
            onChange={e => setFilters(f => ({ ...f, until: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Keyword</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Search in message"
            value={filters.keyword}
            onChange={e => setFilters(f => ({ ...f, keyword: e.target.value }))}
          />
        </div>
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={fetchLogs}
          >
            Filter Logs
          </button>
          <button
            className="bg-gray-400 text-white ml-2 px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={clearLogs}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-md overflow-auto max-h-[70vh]">
        <table className="w-full text-sm text-left">
          <thead className="sticky top-0 bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Resource ID</th>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Trace ID</th>
              <th className="px-4 py-2">Span ID</th>
              <th className="px-4 py-2">Commit</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className={`px-4 py-2 font-medium rounded ${getLevelColor(log.level)}`}>
                    {log.level}
                  </td>
                  <td className="px-4 py-2">{log.message}</td>
                  <td className="px-4 py-2">{log.resourceId}</td>
                  <td className="px-4 py-2">{log.timestamp}</td>
                  <td className="px-4 py-2">{log.traceId}</td>
                  <td className="px-4 py-2">{log.spanId}</td>
                  <td className="px-4 py-2">{log.commit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
