import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'app.title': 'Tokyo Toilet Explorer',
    'app.subtitle': 'A guided journey through Tokyo\'s groundbreaking public restroom designs — celebrating architecture, accessibility, and dignity in urban space.',
    
    // Map section
    'map.title': 'Architectural Meditations',
    'map.viewLocation': 'View Location',
    'map.location': 'Location',
    'map.capture': 'Capture',
    'map.visited': 'Visited',
    'map.about.title': 'About the Tokyo Toilet Project',
    'map.about.description': 'A meditation on the intersection of necessity and beauty, the Tokyo Toilet Project is a visionary initiative by The Nippon Foundation, where world-renowned architects transform the most humble of public spaces into profound statements about human dignity and urban poetry.',
    
    // Camera
    'camera.title': 'Capture at',
    'camera.starting': 'Starting camera...',
    'camera.error': 'Unable to access camera. Please ensure permissions are granted in your browser settings (e.g., via the padlock icon in the address bar).',
    'camera.tryAgain': 'Try Again',
    'camera.retake': 'Retake',
    'camera.savePhoto': 'Save Photo',
    'camera.instructions.capture': 'Position yourself at the location and capture your perspective',
    'camera.instructions.save': 'Save your architectural meditation or retake the photo',
    
    // Progress celebration
    'progress.locationCaptured': 'Location Captured',
    'progress.documented': 'Architectural meditation documented',
    'progress.progress': 'Progress',
    'progress.continueJourney': 'Continue Journey',
    'progress.complete': 'Tokyo Toilet Explorer Complete! You\'ve experienced all architectural meditations.',
    'progress.nearlyThere': 'Nearly there! You\'re becoming a true architectural pilgrim.',
    'progress.halfway': 'Halfway through your journey of contemplation and discovery.',
    'progress.deepening': 'Your architectural meditation is deepening with each location.',
    'progress.begun': 'Your journey through Tokyo\'s architectural poetry has begun.',
    'progress.completionQuote': 'In the most humble spaces, we find the most profound beauty. Your journey through Tokyo\'s architectural poetry is complete.',
    
    // Toilet descriptions
    'toilet.yoyogi-fukamachi.description': 'Famous transparent glass toilet that becomes opaque when locked',
    'toilet.haru-no-ogawa.description': 'Colorful transparent toilet with smart glass technology',
    'toilet.shibuya-yoyogi-hachiman.description': 'Elegant tiled design inspired by traditional Japanese architecture',
    'toilet.jingu-dori-park.description': 'Minimalist concrete design by renowned architect Tadao Ando',
    'toilet.ebisu-east-park.description': 'Modern geometric design with clean lines and functional aesthetics',
    'toilet.ebisu-station.description': 'Bold graphic design with striking visual identity',
    'toilet.nabeshima-shoto-park.description': 'Beautiful wooden structure blending with natural surroundings',
    'toilet.harajuku-house.description': 'Playful house-shaped design reflecting Harajuku culture',
    'toilet.shibuya-triangle.description': 'Geometric triangular design with modern LED lighting',
    'toilet.sasazuka-greenway.description': 'Innovative forest-like structure integrating with urban greenery',
    'toilet.hiroo-east-park.description': 'Contemporary design with focus on accessibility and comfort',
    'toilet.nishihara-itchome.description': 'Sculptural form with emphasis on natural materials',
    'toilet.hatagaya-station.description': 'Industrial-inspired design with functional urban aesthetics',
    'toilet.shibuya-spherical.description': 'Unique spherical design creating an otherworldly experience',
    'toilet.shibuya-cylindrical.description': 'Cylindrical form with innovative spatial design',
    'toilet.shibuya-modern-kawaya.description': 'Modern interpretation of traditional Japanese toilet design',
    'toilet.shibuya-newson.description': 'Sleek, futuristic design with signature Newson aesthetics'
  },
  ja: {
    // Header
    'app.title': '東京トイレエクスプローラー',
    'app.subtitle': '東京の画期的な公衆トイレデザインを巡る旅 — 建築、アクセシビリティ、そして都市空間における尊厳を讃えて。',
    
    // Map section
    'map.title': '建築的瞑想',
    'map.viewLocation': '場所を見る',
    'map.location': '場所',
    'map.capture': '撮影',
    'map.visited': '訪問済み',
    'map.about.title': '東京トイレプロジェクトについて',
    'map.about.description': '必要性と美の交差点についての瞑想である東京トイレプロジェクトは、日本財団による先見的な取り組みであり、世界的に有名な建築家たちが最も謙虚な公共空間を人間の尊厳と都市の詩についての深遠な声明に変えています。',
    
    // Camera
    'camera.title': '撮影場所：',
    'camera.starting': 'カメラを起動中...',
    'camera.error': 'カメラにアクセスできません。ブラウザの設定で権限が許可されていることを確認してください（アドレスバーの南京錠アイコンなど）。',
    'camera.tryAgain': '再試行',
    'camera.retake': '撮り直し',
    'camera.savePhoto': '写真を保存',
    'camera.instructions.capture': '場所に位置して、あなたの視点を撮影してください',
    'camera.instructions.save': '建築的瞑想を保存するか、写真を撮り直してください',
    
    // Progress celebration
    'progress.locationCaptured': '場所を撮影しました',
    'progress.documented': '建築的瞑想が記録されました',
    'progress.progress': '進捗',
    'progress.continueJourney': '旅を続ける',
    'progress.complete': '東京トイレエクスプローラー完了！すべての建築的瞑想を体験しました。',
    'progress.nearlyThere': 'もうすぐです！真の建築巡礼者になりつつあります。',
    'progress.halfway': '瞑想と発見の旅の半分を終えました。',
    'progress.deepening': '各場所で建築的瞑想が深まっています。',
    'progress.begun': '東京の建築詩への旅が始まりました。',
    'progress.completionQuote': '最も謙虚な空間に、最も深遠な美を見つけます。東京の建築詩への旅が完了しました。',
    
    // Toilet descriptions
    'toilet.yoyogi-fukamachi.description': '施錠すると不透明になる有名な透明ガラストイレ',
    'toilet.haru-no-ogawa.description': 'スマートガラス技術を使用したカラフルな透明トイレ',
    'toilet.shibuya-yoyogi-hachiman.description': '日本の伝統建築にインスパイアされたエレガントなタイルデザイン',
    'toilet.jingu-dori-park.description': '著名な建築家安藤忠雄によるミニマリストなコンクリートデザイン',
    'toilet.ebisu-east-park.description': 'クリーンなラインと機能的な美学を持つモダンな幾何学デザイン',
    'toilet.ebisu-station.description': '印象的なビジュアルアイデンティティを持つ大胆なグラフィックデザイン',
    'toilet.nabeshima-shoto-park.description': '自然環境と調和する美しい木造構造',
    'toilet.harajuku-house.description': '原宿文化を反映した遊び心のある家型デザイン',
    'toilet.shibuya-triangle.description': 'モダンなLED照明を備えた幾何学的三角形デザイン',
    'toilet.sasazuka-greenway.description': '都市の緑と統合された革新的な森のような構造',
    'toilet.hiroo-east-park.description': 'アクセシビリティと快適性に焦点を当てた現代的デザイン',
    'toilet.nishihara-itchome.description': '自然素材を重視した彫刻的形態',
    'toilet.hatagaya-station.description': '機能的な都市美学を持つ工業的インスパイアデザイン',
    'toilet.shibuya-spherical.description': '異世界的な体験を創造するユニークな球形デザイン',
    'toilet.shibuya-cylindrical.description': '革新的な空間デザインを持つ円筒形',
    'toilet.shibuya-modern-kawaya.description': '伝統的な日本のトイレデザインの現代的解釈',
    'toilet.shibuya-newson.description': 'ニューソンの特徴的な美学を持つ洗練された未来的デザイン'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};