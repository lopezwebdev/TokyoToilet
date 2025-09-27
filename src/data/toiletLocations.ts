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

export const toiletLocations: ToiletLocation[] = [
  {
    id: 'yoyogi-fukamachi',
    name: 'Yoyogi Fukamachi Mini Park',
    nameJa: '代々木深町小公園',
    architect: 'Shigeru Ban',
    architectJa: '坂茂',
    image: '/shigeru-ban-transparent-tokyo-toilet-yo-yogi-fukamachi-park-haru-no-ogawa_dezeen_2364_sq_24.jpg',
    coordinates: { lat: 35.6762, lng: 139.6993 },
    address: '1-54 Tomigaya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区富ヶ谷1-54',
    description: 'Famous transparent glass toilet that becomes opaque when locked'
  },
  {
    id: 'haru-no-ogawa',
    name: 'Haru-no-Ogawa Community Park',
    nameJa: '春の小川コミュニティパーク',
    architect: 'Shigeru Ban',
    architectJa: '坂茂',
    image: '/toilet-shigeru-ban-sq-1704x1704.jpg',
    coordinates: { lat: 35.6751, lng: 139.6985 },
    address: '2-10 Tomigaya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区富ヶ谷2-10',
    description: 'Colorful transparent toilet with smart glass technology'
  },
  {
    id: 'shibuya-yoyogi-hachiman',
    name: 'Yoyogi Hachiman Shrine',
    nameJa: '代々木八幡神社',
    architect: 'Toyo Ito',
    architectJa: '伊東豊雄',
    image: '/toyo-ito-tokyo-toilet-shibuya-yoyogi-hachiman-tiles_dezeen_2364_sq_77.jpg',
    coordinates: { lat: 35.6719, lng: 139.6947 },
    address: '5-1 Shibuya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区渋谷5-1',
    description: 'Elegant tiled design inspired by traditional Japanese architecture'
  },
  {
    id: 'jingu-dori-park',
    name: 'Jingu-Dori Park',
    nameJa: '神宮通公園',
    architect: 'Tadao Ando',
    architectJa: '安藤忠雄',
    image: '/tadao-ando-tokyo-toilet-project-jingu-dori-park_dezeen_2364_sq_2.jpg',
    coordinates: { lat: 35.6658, lng: 139.7036 },
    address: '6-20 Jingumae, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区神宮前6-20',
    description: 'Minimalist concrete design by renowned architect Tadao Ando'
  },
  {
    id: 'ebisu-east-park',
    name: 'Ebisu East Park',
    nameJa: '恵比寿東公園',
    architect: 'Fumihiko Maki',
    architectJa: '槇文彦',
    image: '/fumihiko-maki-tokyo-toilet-project-ebisu-east-park_dezeen_2364_sq_3.jpg',
    coordinates: { lat: 35.6464, lng: 139.7106 },
    address: '1-2 Ebisu, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区恵比寿1-2',
    description: 'Modern geometric design with clean lines and functional aesthetics'
  },
  {
    id: 'ebisu-station',
    name: 'Ebisu Station Area',
    nameJa: '恵比寿駅周辺',
    architect: 'Kashiwa Sato',
    architectJa: '佐藤可士和',
    image: '/kashiwa-sato-tokyo-toilet-ebisu-station_dezeen_2364_sq_3.jpg',
    coordinates: { lat: 35.6462, lng: 139.7101 },
    address: '1-5 Ebisu, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区恵比寿1-5',
    description: 'Bold graphic design with striking visual identity'
  },
  {
    id: 'nabeshima-shoto-park',
    name: 'Nabeshima Shoto Park',
    nameJa: '鍋島松濤公園',
    architect: 'Kengo Kuma',
    architectJa: '隈研吾',
    image: '/kengo-kuma-tokyo-toilet-wood_dezeen_2364_hero_9.jpg',
    coordinates: { lat: 35.6565, lng: 139.6934 },
    address: '2-10 Shoto, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区松濤2-10',
    description: 'Beautiful wooden structure blending with natural surroundings'
  },
  {
    id: 'harajuku-house',
    name: 'Harajuku Area',
    nameJa: '原宿エリア',
    architect: 'NIGO',
    architectJa: 'NIGO',
    image: '/nigo-tokyo-toilet-harajuku-house-shaped_dezeen_2364_sq_9.jpg',
    coordinates: { lat: 35.6702, lng: 139.7026 },
    address: '1-19 Jingumae, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区神宮前1-19',
    description: 'Playful house-shaped design reflecting Harajuku culture'
  },
  {
    id: 'shibuya-triangle',
    name: 'Shibuya Triangle Area',
    nameJa: '渋谷トライアングルエリア',
    architect: 'Nao Tamura',
    architectJa: '田村奈穂',
    image: '/nao-tamura-triangle-toilet-shibuya-tokyo-japan_dezeen_2364_sq_3.jpg',
    coordinates: { lat: 35.6598, lng: 139.7006 },
    address: '2-24 Shibuya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区渋谷2-24',
    description: 'Geometric triangular design with modern LED lighting'
  },
  {
    id: 'sasazuka-greenway',
    name: 'Sasazuka Greenway',
    nameJa: '笹塚緑道',
    architect: 'Sou Fujimoto',
    architectJa: '藤本壮介',
    image: '/sou-fujimoto-tokyo-toilet_dezeen_2364_sq_1.jpg',
    coordinates: { lat: 35.6736, lng: 139.6644 },
    address: '1-58 Sasazuka, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区笹塚1-58',
    description: 'Innovative forest-like structure integrating with urban greenery'
  },
  {
    id: 'hiroo-east-park',
    name: 'Hiroo East Park',
    nameJa: '広尾東公園',
    architect: 'Tomohito Ushiro',
    architectJa: '後藤智仁',
    image: '/tomohito-ushiro-tokyo-toilet-project-hiroo-east-park-2_dezeen_2364_sq_3.jpg',
    coordinates: { lat: 35.6506, lng: 139.7186 },
    address: '4-2 Hiroo, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区広尾4-2',
    description: 'Contemporary design with focus on accessibility and comfort'
  },
  {
    id: 'nishihara-itchome',
    name: 'Nishihara Itchome Park',
    nameJa: '西原一丁目公園',
    architect: 'Takenosuke Sakakura',
    architectJa: '坂倉竹之助',
    image: '/takenosuke-sakakura-tokyo-toilet-project-nishihara-itchome-park_dezeen_2364_sq_3.jpg',
    coordinates: { lat: 35.6789, lng: 139.6856 },
    address: '1-40 Nishihara, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区西原1-40',
    description: 'Sculptural form with emphasis on natural materials'
  },
  {
    id: 'hatagaya-station',
    name: 'Hatagaya Station Area',
    nameJa: '幡ヶ谷駅周辺',
    architect: 'Miles Pennington',
    architectJa: 'マイルス・ペニントン',
    image: '/miles-pennington-hatagaya-tokyo-toilet-project_dezeen_2364_sq_2.jpg',
    coordinates: { lat: 35.6736, lng: 139.6744 },
    address: '1-35 Hatagaya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区幡ヶ谷1-35',
    description: 'Industrial-inspired design with functional urban aesthetics'
  },
  {
    id: 'shibuya-spherical',
    name: 'Shibuya Spherical Location',
    nameJa: '渋谷球体ロケーション',
    architect: 'Kazoo Sato',
    architectJa: '佐藤カズー',
    image: '/kazoo-sato-spherical-tokyo-toilet-project_dezeen_2364_sq_5.jpg',
    coordinates: { lat: 35.6612, lng: 139.7019 },
    address: '3-15 Shibuya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区渋谷3-15',
    description: 'Unique spherical design creating an otherworldly experience'
  },
  {
    id: 'shibuya-cylindrical',
    name: 'Shibuya Cylindrical Location',
    nameJa: '渋谷円筒ロケーション',
    architect: 'Junko Kobayashi',
    architectJa: '小林純子',
    image: '/junko-kobayashi-tokyo-toilet-cylindrical_dezeen_2364_sq_0.jpg',
    coordinates: { lat: 35.6584, lng: 139.7012 },
    address: '2-19 Shibuya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区渋谷2-19',
    description: 'Cylindrical form with innovative spatial design'
  },
  {
    id: 'shibuya-modern-kawaya',
    name: 'Modern Kawaya',
    nameJa: 'モダン川屋',
    architect: 'Wonderwall',
    architectJa: 'ワンダーウォール',
    image: '/modern-kawaya-wonderwall-sq-1704x1704.jpg',
    coordinates: { lat: 35.6591, lng: 139.7025 },
    address: '1-12 Shibuya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区渋谷1-12',
    description: 'Modern interpretation of traditional Japanese toilet design'
  },
  {
    id: 'shibuya-newson',
    name: 'Shibuya Newson Design',
    nameJa: '渋谷ニューソンデザイン',
    architect: 'Marc Newson',
    architectJa: 'マーク・ニューソン',
    image: '/marc-newson-tokyo-toilet-sq-1704x1704.jpg',
    coordinates: { lat: 35.6605, lng: 139.7031 },
    address: '2-8 Shibuya, Shibuya City, Tokyo',
    addressJa: '東京都渋谷区渋谷2-8',
    description: 'Sleek, futuristic design with signature Newson aesthetics'
  }
];

export const getToiletById = (id: string): ToiletLocation | undefined => {
  return toiletLocations.find(toilet => toilet.id === id);
};

export const getToiletsByArchitect = (architect: string): ToiletLocation[] => {
  return toiletLocations.filter(toilet => toilet.architect === architect);
};