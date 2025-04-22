"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setrecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setrecipes(data));
  }, []);

  return (
    <div>
      <h1>recipes</h1>
      <ul>
        {recipes.map((p: any) => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
