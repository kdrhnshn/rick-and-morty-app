// React'ten referans oluşturmak için useRef hook'u import ediliyor
import { useRef } from 'react';
import CharacterTable from '../components/CharacterTable';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { useCharacters } from '../hooks/useCharacters';
import CharacterDetails from '../components/CharacterDetails';

function App() {
  // Custom hook'tan gelen tüm state ve fonksiyonlar burada destructure ediliyor.
  // Bu sayede filtreleme, sayfalama, sıralama, detay görüntüleme gibi işlemler merkezi bir şekilde yürütülüyor.
  const {
    setFilters,
    error,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    characterDetails,
    setSelectedCharacterId,
    setCharacterDetails,
    detailRef,
    paginatedCharacters,
    totalPages,
    loading,
  } = useCharacters();

  // Scroll konumunu kontrol etmek için tabloda ilgili yere fererans oluşturuluyor.
  const tableRef = useRef<HTMLDivElement>(null);

  // Karakter detay paneli kapatıldığında bu fonksiyon çağırılır ve seçilen karakter temizlendikten sonra tekrar tabloya dönülür.
  const handleCloseDetails = () => {
    setSelectedCharacterId(null);
    setCharacterDetails(null);
    // Scroll'u tabloya getir
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="App max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-gray-100">
      {/* Başlık ve açıklama */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
          Rick and Morty Characters
        </h1>
        <p className="text-gray-400 mt-2 text-sm">Explore characters using smart filters, search and table tools</p>
      </header>

      {/* Filtreleme Bileşeni */}
      <section className="bg-gray-900 rounded-xl p-6 shadow-md mb-8">
        <FilterBar
          onFilterChange={setFilters}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </section>
      {/* Hata varsa döndürülür */}
      {error && (
        <div className="text-center text-red-400 font-medium mb-4">
          {error}
        </div>
      )}
      {/* Karakter Tablosu */}
      <section ref={tableRef} className="bg-gray-800 rounded-xl p-4 shadow-md overflow-x-auto">
        <CharacterTable
          characters={paginatedCharacters}
          onSortChange={(field) => {
            if (field === sortField) {
              setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            } else {
              setSortField(field);
              setSortDirection('asc');
            }
          }}
          sortField={sortField}
          sortDirection={sortDirection}
          onRowClick={(char) => setSelectedCharacterId(char.id)}
          loading={loading}
        />
      </section>
      {/* Sayfalama Kontrolleri */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {/* Seçilen karakterin karakter detay paneli */}
      {characterDetails && (
        <div ref={detailRef} className="mt-10">
          <CharacterDetails
            character={characterDetails}
            onClose={() => {handleCloseDetails(); // Detay kapanınca tabloya scroll
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;