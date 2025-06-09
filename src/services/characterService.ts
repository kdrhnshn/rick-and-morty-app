// Character tipi, her bir karakterin sahip olması gereken alanları tanımlar
import type { Character } from '../types/character';

// API'den filtrelenmiş karakter verilerini belirli bir sayıda çekmek için kullanılan fonksiyon
export async function fetchCharactersWithLimit(
  pageSize: number, // Kullanıcının görmek istediği maksimum karakter sayısı
  filters: {
    name?: string;
    status?: string;
    gender?: string;
  } = {} // Filtreler boş geçilirse tüm karakterler çekilir

): Promise<Character[]> {

  // Filtreler URL sorgu parametrelerine çevrilir (örneğin: ?name=rick&status=alive)
  const queryBase = new URLSearchParams(filters).toString();

  let allResults: Character[] = [];
  let currentPage = 1;

  // İstenen sayıda karakter toplanana kadar sayfaları döngüyle gez
  while (allResults.length < pageSize) {
    const url = `https://rickandmortyapi.com/api/character?page=${currentPage}&${queryBase}`;
    try {
      const response = await fetch(url);
      // API cevabı başarılı değilse, hata durumuna göre işlem yapılır
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

      // Gelen karakterleri birleştirerek listeye ekle
      allResults = [...allResults, ...characters];
      currentPage++;

    } catch (error) {
      console.error('Fetch sırasında hata:', error);
      throw error;
    }
  }
  // Toplanan verilerden istenen sayıda karakteri döndür
  return allResults.slice(0, pageSize);
}