// React'ten gerekli hook'ları içe aktar
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Character, SortDirection, SortField } from '../types/character';

// Filtreleme için kullanılacak tip tanımı
interface Filters {
  name: string;
  status: string;
  gender: string;
}

// API'den filtrelere göre tüm sayfalardaki karakterleri getirir
const fetchAllCharactersWithFilters = async (filters: Filters): Promise<Character[]> => {
  // Filtre alanları doluysa URL parametrelerine eklenir
  const params = new URLSearchParams();
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.gender) params.append('gender', filters.gender);
  params.append('page', '1');

  // İlk sayfa verisi çekilir
  const firstRes = await fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
  if (!firstRes.ok) throw new Error('API isteği başarısız.');
  const firstJson = await firstRes.json();
  let allResults: Character[] = [...firstJson.results];
  const totalPages = firstJson.info.pages;

  // Kalan sayfalar için fetch işlemleri hazırlanır
  const pagePromises = [];
  for (let i = 2; i <= totalPages; i++) {
    const pageParams = new URLSearchParams(params);
    pageParams.set('page', i.toString());
    pagePromises.push(fetch(`https://rickandmortyapi.com/api/character/?${pageParams.toString()}`));
  }
  // Tüm sayfalardan gelen veriler toplanır
  const responses = await Promise.all(pagePromises);
  for (const res of responses) {
    if (res.ok) {
      const json = await res.json();
      allResults = [...allResults, ...json.results];
    }
  }

  return allResults;
};

// Karakterleri sıralamak için yardımcı fonksiyon
const sortCharacters = (
  characters: Character[],
  sortField: SortField,
  sortDirection: SortDirection
): Character[] => {
  return [...characters].sort((a, b) => {
    const aValue = a[sortField]?.toLowerCase?.() || '';
    const bValue = b[sortField]?.toLowerCase?.() || '';
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

// Sayfalama işlemi için yardımcı fonksiyon
const paginateCharacters = (
  characters: Character[],
  currentPage: number,
  pageSize: number
): Character[] => {
  const start = (currentPage - 1) * pageSize;
  return characters.slice(start, start + pageSize);
};

// Detay verisini ID'ye göre çeker
const fetchCharacterDetailsById = async (id: number): Promise<Character> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error('Detay API isteği başarısız.');
  return res.json();
};

// Özel hook useCharacters
export const useCharacters = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ name: '', status: '', gender: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [characterDetails, setCharacterDetails] = useState<Character | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const detailRef = useRef<HTMLDivElement | null>(null);

  // Filter + Fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const characters = await fetchAllCharactersWithFilters(filters);
        setAllCharacters(characters);
        setCurrentPage(1);
      } catch (err) {
        setError((err as Error).message);
        setAllCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  // Fetch Detayları
  useEffect(() => {
    const getDetails = async () => {
      if (selectedCharacterId === null) return;
      setDetailsLoading(true);
      try {
        const character = await fetchCharacterDetailsById(selectedCharacterId);
        setCharacterDetails(character);
      } catch {
        setCharacterDetails(null);
      } finally {
        setDetailsLoading(false);
      }
    };

    getDetails();
  }, [selectedCharacterId]);

  // Detay penceresine scroll
  useEffect(() => {
    if (characterDetails && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [characterDetails]);

  const sortedCharacters = useMemo(
    () => sortCharacters(allCharacters, sortField, sortDirection),
    [allCharacters, sortField, sortDirection]
  );

  const paginatedCharacters = useMemo(
    () => paginateCharacters(sortedCharacters, currentPage, pageSize),
    [sortedCharacters, currentPage, pageSize]
  );

  const totalPages = Math.ceil(sortedCharacters.length / pageSize);

  // Hook'un dışa verdiği veriler ve fonksiyonlar
  return {
    filters,
    setFilters,
    loading,
    error,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    selectedCharacterId,
    setSelectedCharacterId,
    characterDetails,
    setCharacterDetails,
    detailRef,
    detailsLoading,
    paginatedCharacters,
    totalPages,
  };
};