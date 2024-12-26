import React, { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const fetchInfo = async (debouncedQuery) => {
    if(debouncedQuery.trim() === "") {
      setSuggestions([]);
      return;
    }
    const data = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&sroffset=0&srsearch=${debouncedQuery}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });
    const info = await data.json();
    setSuggestions(info.query.search);
  }

  useEffect(() => {
    fetchInfo(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    }
  }, [search]);

  return (
    <div className="App">
      <input type="text" placeholder="enter your query here" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <ul>
        {suggestions.map((item) => (
          <li>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
