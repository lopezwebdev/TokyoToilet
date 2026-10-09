export interface ToiletLocation {
  id: string;
  name: string;
  nameJa: string;
  architect: string;
  architectJa: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  addressJa: string;
  description: string;
}

// Names, creators, addresses and coordinates: https://tokyotoilet.jp/en/ (2026-10-09).
// Legacy IDs are retained for existing locally saved photos and check-ins.
export const toiletLocations: ToiletLocation[] = [
  {
    id: 'yoyogi-fukamachi',
    name: "Yoyogi Fukamachi Mini Park",
    nameJa: "代々木深町小公園トイレ",
    architect: "Shigeru Ban",
    architectJa: "坂 茂",
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Hukamachi_230524.jpg',
    coordinates: { lat: 35.66948, lng: 139.69054 },
    address: "1-54-1 Tomigaya, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区富ヶ谷1-54-1",
    description: 'Famous transparent glass toilet that becomes opaque when locked'
  },
  {
    id: 'haru-no-ogawa',
    name: "Haru-no-Ogawa Community Park",
    nameJa: "はるのおがわ コミュニティパークトイレ",
    architect: "Shigeru Ban",
    architectJa: "坂 茂",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Harunoogawa_230512.jpg',
    coordinates: { lat: 35.67144, lng: 139.69081 },
    address: "5-68-1 Yoyogi, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区代々木5-68-1",
    description: 'Colorful transparent toilet with smart glass technology'
  },
  {
    id: 'shibuya-yoyogi-hachiman',
    name: "Yoyogi-Hachiman",
    nameJa: "代々木八幡公衆トイレ",
    architect: "Toyo Ito",
    architectJa: "伊東豊雄",
    image: '',
    coordinates: { lat: 35.67196, lng: 139.68879 },
    address: "5-1-2 Yoyogi, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区代々木5-1-2",
    description: "Three mushroom-shaped buildings designed to blend with the surrounding forest"
  },
  {
    id: 'jingu-dori-park',
    name: "Jingu-Dori Park",
    nameJa: "神宮通公園トイレ",
    architect: "Tadao Ando",
    architectJa: "安藤忠雄",
    image: '',
    coordinates: { lat: 35.664272, lng: 139.701942 },
    address: "6-22-8 Jingumae, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区神宮前6-22-8",
    description: 'Minimalist concrete design by renowned architect Tadao Ando'
  },
  {
    id: 'ebisu-east-park',
    name: "Ebisu East Park",
    nameJa: "恵比寿東公園トイレ",
    architect: "Fumihiko Maki",
    architectJa: "槇文彦",
    image: '',
    coordinates: { lat: 35.6482, lng: 139.71148 },
    address: "1-2-16 Ebisu, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区恵比寿1-2-16",
    description: 'Modern geometric design with clean lines and functional aesthetics'
  },
  {
    id: 'ebisu-station',
    name: "Ebisu Station, West Exit",
    nameJa: "恵比寿駅西口公衆トイレ",
    architect: "Kashiwa Sato",
    architectJa: "佐藤可士和",
    image: '',
    coordinates: { lat: 35.64743, lng: 139.70944 },
    address: "1-5-8 Ebisu-Minami, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区恵比寿南1-5-8",
    description: 'Bold graphic design with striking visual identity'
  },
  {
    id: 'nabeshima-shoto-park',
    name: "Nabeshima Shoto Park",
    nameJa: "鍋島松濤公園トイレ",
    architect: "Kengo Kuma",
    architectJa: "隈研吾",
    image: '',
    coordinates: { lat: 35.6598, lng: 139.69113 },
    address: "2-10-7 Shoto, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区松濤2-10-7",
    description: 'Beautiful wooden structure blending with natural surroundings'
  },
  {
    id: 'harajuku-house',
    name: "Jingumae",
    nameJa: "神宮前公衆トイレ",
    architect: "NIGO®",
    architectJa: "NIGO®",
    image: '',
    coordinates: { lat: 35.672439102108854, lng: 139.7079836857047 },
    address: "1-3-14 Jingumae, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区神宮前1-3-14",
    description: "A house-like toilet designed to feel like a familiar old home"
  },
  {
    id: 'shibuya-triangle',
    name: "Higashi Sanchome",
    nameJa: "東三丁目公衆トイレ",
    architect: "Nao Tamura",
    architectJa: "田村奈穂",
    image: '',
    coordinates: { lat: 35.64895, lng: 139.70914 },
    address: "3-27-1 Higashi, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区東3-27-1",
    description: "A red triangular building inspired by the Japanese art of wrapping"
  },
  {
    id: 'sasazuka-greenway',
    name: "Sasazuka Greenway",
    nameJa: "笹塚緑道公衆トイレ",
    architect: "Junko Kobayashi / Gondola Architects",
    architectJa: "小林純子",
    image: '',
    coordinates: { lat: 35.673359, lng: 139.666768 },
    address: "1-29 Sasazuka, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区渋谷区笹塚1-29",
    description: "Cylindrical toilet booths beneath a yellow canopy, with playful rabbit silhouettes"
  },
  {
    id: 'hiroo-east-park',
    name: "Hiroo East Park",
    nameJa: "広尾東公園トイレ",
    architect: "Tomohito Ushiro",
    architectJa: "後智仁",
    image: '',
    coordinates: { lat: 35.65332, lng: 139.72112 },
    address: "4-2-27 Hiroo, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区広尾4-2-27",
    description: 'Contemporary design with focus on accessibility and comfort'
  },
  {
    id: 'nishihara-itchome',
    name: "Nishihara Itchome Park",
    nameJa: "西原一丁目公園トイレ",
    architect: "Takenosuke Sakakura",
    architectJa: "坂倉竹之助",
    image: '',
    coordinates: { lat: 35.67758, lng: 139.67925 },
    address: "1-29-1 Nishihara, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区西原1-29-1",
    description: 'Sculptural form with emphasis on natural materials'
  },
  {
    id: 'hatagaya-station',
    name: "Hatagaya",
    nameJa: "幡ヶ谷公衆トイレ",
    architect: "UTokyo DLX Design Lab Miles Pennington",
    architectJa: "マイルス・ ペニントン / 東京大学DLXデザインラボ",
    image: '',
    coordinates: { lat: 35.6777176, lng: 139.6705265 },
    address: "3-37-8 Hatagaya, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区幡ヶ谷3-37-8",
    description: 'Industrial-inspired design with functional urban aesthetics'
  },
  {
    id: 'shibuya-spherical',
    name: "Nanago Dori Park",
    nameJa: "七号通り公園トイレ",
    architect: "Kazoo Sato",
    architectJa: "佐藤カズー",
    image: '',
    coordinates: { lat: 35.67905, lng: 139.67482 },
    address: "2-53-5 Hatagaya, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区幡ヶ谷2-53-5",
    description: 'Unique spherical design creating an otherworldly experience'
  },
  {
    id: 'shibuya-cylindrical',
    name: "Nishisando",
    nameJa: "西参道公衆トイレ",
    architect: "Sou Fujimoto",
    architectJa: "藤本壮介",
    image: '',
    coordinates: { lat: 35.683832493614716, lng: 139.6914512528563 },
    address: "3-27-1 Yoyogi, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区代々木3-27-1",
    description: "A white, curved public toilet with hand-washing stations at different heights"
  },
  {
    id: 'shibuya-modern-kawaya',
    name: "Ebisu Park",
    nameJa: "恵比寿公園トイレ",
    architect: "Masamichi Katayama / Wonderwall",
    architectJa: "片山正通 / ワンダーウォール",
    image: '',
    coordinates: { lat: 35.64684, lng: 139.70687 },
    address: "1-19-1 Ebisu-Nishi, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区恵比寿西1-19-1",
    description: 'Modern interpretation of traditional Japanese toilet design'
  },
  {
    id: 'shibuya-newson',
    name: "Urasando",
    nameJa: "裏参道公衆トイレ",
    architect: "Marc Newson",
    architectJa: "マーク・ニューソン",
    image: '',
    coordinates: { lat: 35.68029, lng: 139.70377 },
    address: "4-28-1 Sendagaya, Shibuya City, Tokyo",
    addressJa: "東京都渋谷区千駄ヶ谷4-28-1",
    description: 'Sleek, futuristic design with signature Newson aesthetics'
  }
];

export const getToiletById = (id: string): ToiletLocation | undefined => {
  return toiletLocations.find(toilet => toilet.id === id);
};

export const getToiletsByArchitect = (architect: string): ToiletLocation[] => {
  return toiletLocations.filter(toilet => toilet.architect === architect);
};