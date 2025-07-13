import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=2b0b491aa44947ca802520c4ffafb5b6`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe)
    return <div className="text-center text-lg font-semibold">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-auto rounded-lg shadow-md mb-6"
      />
      <p
        className="text-gray-700 leading-relaxed mb-6"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Instructions:
      </h3>
      <p
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
      />
    </div>
  );
}
