// Tip tanımlamalarını içeren dosyadan karakter, sıralama alanı ve yönü import ediliyor
import type { Character, SortField, SortDirection } from '../types/character';
// Bileşene dışarıdan gönderilecek prop'lar tanımlanıyor
interface Props {
  characters: Character[]; // Görüntülenecek karakter listesi
  sortField: SortField; // Şu an aktif sıralama alanı
  sortDirection: SortDirection; // Artan mı azalan mı
  onSortChange: (field: SortField) => void; // Sıralama tıklaması callback'i
  onRowClick: (character: Character) => void; // Satıra tıklanma callback'i
  loading: boolean; // Yüklenme durumu
}

const CharacterTable: React.FC<Props> = ({
  characters,
  sortField,
  sortDirection,
  onSortChange,
  onRowClick,
  loading,
}) => {
  // Sıralama yönüne göre küçük bir ok simgesi döndürülür
  const renderSortArrow = (field: SortField) => {
    if (field !== sortField) return null; // Bu alan aktif değilse ok gösterilmez
    // Yöne göre yukarı ya da aşağı ok
    return sortDirection === 'asc' ? (
      <svg
        className="inline w-3 h-3 ml-1 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg
        className="inline w-3 h-3 ml-1 text-blue-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };


  return (
  <div className="overflow-x-auto rounded-lg shadow-md">
    
    {/* Yükleniyorsa spinner gösterilir */}
    {
      loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) :
      // Veri yoksa kullanıcı bilgilendirilir
      characters.length === 0 ? (
        <div className="text-center text-gray-400 py-6 text-sm sm:text-base">
          No characters found. Try adjusting your filters.
        </div>
    ) : (
      // Aksi halde tablo gösterilir
      <table className="min-w-full text-sm sm:text-base divide-y divide-gray-700 bg-gray-800 rounded-md">
        <thead className="bg-gray-700 text-gray-100 uppercase tracking-wider text-xs ">
          <tr>
            <th
              className="px-4 py-3 cursor-pointer hover:text-blue-400 hover:bg-gray-900"
              onClick={() => onSortChange('name')}
            >
              Name {renderSortArrow('name')}
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-blue-400 hover:bg-gray-900"
              onClick={() => onSortChange('status')}
            >
              Status {renderSortArrow('status')}
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-blue-400 hover:bg-gray-900"
              onClick={() => onSortChange('gender')}
            >
              Gender {renderSortArrow('gender')}
            </th>
            <th className="px-4 py-3">Image</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-700">
          {/* Her karakter için bir tablo satırı render edilir */}
          {characters.map((char) => (
            <tr
              key={char.id}
              onClick={() => onRowClick(char)}
              className="hover:bg-gray-700 cursor-pointer transition duration-200"
            >
              <td className="px-4 py-2 font-medium text-white">{char.name}</td>
              <td className="px-4 py-2 text-gray-300">{char.status}</td>
              <td className="px-4 py-2 text-gray-300">{char.gender}</td>
              <td className="px-4 py-2">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-12 h-12 rounded-md object-cover border border-gray-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
};

export default CharacterTable;