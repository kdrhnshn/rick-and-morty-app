import React from 'react';
import type { Character } from '../types/character';

interface CharacterDetailsProps {
  character: Character;
  onClose: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, onClose }) => {
  console.log("details worked...");
  
  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-xl text-white relative shadow-md w-full max-w-xl mx-auto">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-2xl font-bold focus:outline-none"
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">{character.name}</h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-40 h-40 rounded-lg object-cover border border-gray-700"
        />

        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <p><span className="text-gray-400">Status:</span> {character.status}</p>
          <p><span className="text-gray-400">Species:</span> {character.species}</p>
          <p><span className="text-gray-400">Gender:</span> {character.gender}</p>
          <p><span className="text-gray-400">Origin:</span> {character.origin?.name}</p>
          <p><span className="text-gray-400">Last Location:</span> {character.location?.name}</p>
          <p><span className="text-gray-400">Episodes:</span> {character.episode.length}</p>
          <p><span className="text-gray-400">Created:</span> {new Date(character.created).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;