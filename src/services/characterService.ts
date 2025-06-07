import type { Character } from '../types/character';

export async function fetchCharactersWithLimit(
  pageSize: number,
  filters: {
    name?: string;
    status?: string;
    gender?: string;
  } = {}
): Promise<Character[]> {
  const queryBase = new URLSearchParams(filters).toString();

  let allResults: Character[] = [];
  let currentPage = 1;

  while (allResults.length < pageSize) {
    const url = `https://rickandmortyapi.com/api/character?page=${currentPage}&${queryBase}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          break; // Sayfa bulunamadıysa döngüyü durdur
        } else {
          throw new Error(`API isteği başarısız: ${response.status}`);
        }
      }

      const data = await response.json();
      const characters = data.results as Character[];

      if (!characters || characters.length === 0) {
        break; // Boş sayfa geldiyse döngüyü bitir
      }

      allResults = [...allResults, ...characters];
      currentPage++;

    } catch (error) {
      console.error('Fetch sırasında hata:', error);
      throw error;
    }
  }

  return allResults.slice(0, pageSize);
}