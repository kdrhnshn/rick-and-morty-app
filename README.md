# React + TypeScript + Vite + Tailwind

----------------------


# Rick and Morty Karakter Tarayıcı (React + TypeScript)

Bu proje, Rick and Morty API’sinden alınan verilerle bir karakter listeleme uygulamasıdır. Modern frontend mimarisi, component tasarımı, performans bilinci ve kod kalitesi gibi konular ön planda tutulmuştur.

---

## Projenin Amacı

Bu proje; React, TypeScript ve Tailwind gibi teknolojilerle modern bir SPA geliştirerek aşağıdaki yetkinlikleri sergilemek amacıyla oluşturulmuştur:

- React bileşen mimarisi ve custom hook kullanımı
- API senkronizasyonu ve filtre/sıralama/pagination senaryoları
- Performans ve kullanıcı deneyimi öncelikli frontend geliştirme
- UI/UX detayları, boş sonuçlar ve hata yönetimi
- TypeScript ile tip güvenliği ve okunabilirlik
- Tailwind CSS ile utility-first modern UI yaklaşımı

---

## Klasör Yapısı

src/
├── components/ # Yeniden kullanılabilir UI bileşenleri
├── hooks/ # useCharacters: tüm state ve fetch mantığı
├── services/ # API işlemleri
├── types/ # Tip tanımlamaları
├── App.tsx # Uygulamanın omurgası
└── main.tsx # Giriş noktası



> Yapı, Separation of Concerns prensibine uygun olarak, her dosyayı tek sorumluluk alanına sahip olacak şekilde ayrıştırır. Bu, sürdürülebilirlik ve test edilebilirlik açısından tercih edilmiştir.

---

## ⚙️ Kullanılan Teknolojiler

| Teknoloji         | Açıklama                                               |
|-------------------|--------------------------------------------------------|
| **React**         | Fonksiyonel bileşenlerle modern UI oluşturma           |
| **TypeScript**    | Tip güvenliği ve IDE desteği                           |
| **Tailwind CSS**  | Utility-first CSS framework ile hızlı ve esnek stil    |
| **Vite**          | Modern ve hızlı build sistemi                          |


##  Özellikler

### Filtreleme

- `status`, `gender`, `name` alanlarına göre filtreleme yapılır.
- Filtreleme doğrudan API üzerinden yapılır (query parametreleriyle).
  
> **Neden?** Büyük veri setlerinde client-side filtre yerine server-side yapılması performans ve doğruluk açısından daha uygundur.

###  Sıralama

- `name`, `status`, `gender` gibi alanlarda client-side sıralama yapılır.
- Sıralama API tarafından desteklenmediği için local yapılmaktadır.
- Sıralama, aynı başlığa tekrar tıklanarak yön (asc/desc) değiştirilebilir.

###  Sayfalama

- Sayfa başına gösterilecek karakter sayısı kullanıcı tarafından seçilebilir.
- Pagination sunucu tarafında (`page`) parametresi ile API'den alınır.
- Toplam sayfa sayısı API'nin response’undaki meta bilgiden çekilir.

### Sayfa Başı Gösterilecek Veri Sayısı (pageSize)

Rick and Morty API sabit olarak her sayfada 20 karakter döndürmektedir. Kullanıcının seçtiği `pageSize` değerine göre bu verileri sınırlamak için:

- API'den gelen 20 karakterlik veri, frontend tarafında `slice()` yöntemiyle sınırlandırılır.
- Örneğin kullanıcı 10 karakter görmek isterse, ilk 10 veri gösterilir ama 1 sayfa yani 20 karakter fetch edilir.


###  Karakter Detay Paneli

- Her karaktere tıklanınca detay bilgisi API üzerinden `id` ile alınır.
- Panel tablo altında görünür, kullanıcı isterse kapanabilir.

---

##  Mimari & State Yönetimi

- Tüm karakter listeleme, filtre, sıralama, detay ve pagination state’leri `useCharacters` adlı custom hook içinde yönetilir.
- `App.tsx`, sadece bu hook'tan alınan state ve fonksiyonları UI bileşenlerine dağıtır.
- Böylece bileşenler sadeleştirilmiş, reusable ve test edilebilir hale gelmiştir.

```tsx
const {
  setFilters,
  sortField,
  sortDirection,
  characters,
  loading,
  error,
  ...
} = useCharacters();
```
Uygulamanın Çalıştırılması:

git clone https://github.com/kdrhnshn/rick-and-morty-app.git
cd rick-and-morty-app
npm install
npm run dev

CANLI DEMO (VERCEL)

https://rick-and-morty-app-two-nu.vercel.app/