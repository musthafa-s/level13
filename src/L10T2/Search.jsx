import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Search() {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=2b0b491aa44947ca802520c4ffafb5b6&query=${query}`
        );
        const data = await res.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <>
      <style>
        {`
          .recipe-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }

          @media (min-width: 640px) {
            .recipe-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .recipe-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .recipe-card {
            background-color: #fff;
            border-radius: 0.75rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: box-shadow 0.3s ease;
          }

          .recipe-card:hover {
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .recipe-image {
            width: 100%;
            height: 12rem;
            object-fit: cover;
          }

          .recipe-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #2d3748;
            padding: 1rem;
            text-align: center;
          }
        `}
      </style>

      <div className="recipe-grid">
        {results.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <h4 className="recipe-title">{recipe.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
