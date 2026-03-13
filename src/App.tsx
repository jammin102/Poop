/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, Menu, X, Instagram, Facebook, Twitter, 
  ChevronRight, Star, Globe, Moon, Sun, ArrowRight, Heart
} from 'lucide-react';

// --- i18n Configuration ---
type Language = 'en' | 'ko' | 'fr';

const translations = {
  en: {
    brand: "Häagen-Dazs",
    nav: {
      flavors: "Flavors",
      story: "Our Story",
      shops: "Shops",
      rewards: "Rewards",
      contact: "Contact"
    },
    hero: {
      est: "Established 1960",
      title: "Don't Hold Back",
      cta: "Discover Flavors"
    },
    collection: {
      subtitle: "The Collection",
      title: "Iconic Flavors",
      viewAll: "View All"
    },
    ingredients: {
      title: "Extraordinary Ingredients",
      desc: "Since 1960, our passion for crafting the perfect ice cream has never wavered. We use only the finest ingredients—fresh cream, milk, eggs, and sugar—to create a texture that is uniquely Häagen-Dazs.",
      cream: "Pure Cream",
      creamDesc: "Sourced from local farms for ultimate richness.",
      fruit: "Real Fruit",
      fruitDesc: "Hand-picked at the peak of ripeness.",
      quality: "Natural Quality"
    },
    newsletter: {
      title: "Join the Club",
      desc: "Be the first to know about new flavors, exclusive events, and sweet rewards.",
      placeholder: "Your email address",
      subscribe: "Subscribe"
    },
    footer: {
      desc: "Crafting the world's finest ice cream since 1960. Every scoop is a celebration of quality and taste.",
      explore: "Explore",
      support: "Support",
      rights: "All Rights Reserved."
    }
  },
  ko: {
    brand: "하겐다즈",
    nav: {
      flavors: "플레이버",
      story: "브랜드 스토리",
      shops: "매장 안내",
      rewards: "리워드",
      contact: "고객 센터"
    },
    hero: {
      est: "1960년 설립",
      title: "망설이지 마세요",
      cta: "플레이버 탐색"
    },
    collection: {
      subtitle: "컬렉션",
      title: "아이코닉 플레이버",
      viewAll: "전체 보기"
    },
    ingredients: {
      title: "특별한 원재료",
      desc: "1960년부터 완벽한 아이스크림을 향한 우리의 열정은 단 한 번도 흔들리지 않았습니다. 신선한 크림, 우유, 달걀, 설탕 등 엄선된 재료만을 사용하여 하겐다즈만의 독보적인 텍스처를 완성합니다.",
      cream: "순수 크림",
      creamDesc: "최상의 풍미를 위해 엄선된 농장에서 공급받습니다.",
      fruit: "진짜 과일",
      fruitDesc: "가장 잘 익은 순간에 수확한 과일만을 사용합니다.",
      quality: "천연 퀄리티"
    },
    newsletter: {
      title: "클럽 가입",
      desc: "새로운 플레이버, 독점 이벤트, 달콤한 혜택 소식을 가장 먼저 받아보세요.",
      placeholder: "이메일 주소를 입력하세요",
      subscribe: "구독하기"
    },
    footer: {
      desc: "1960년부터 세계 최고의 아이스크림을 만들어왔습니다. 모든 스쿱은 품질과 맛의 축제입니다.",
      explore: "탐색",
      support: "지원",
      rights: "모든 권리 보유."
    }
  },
  fr: {
    brand: "Häagen-Dazs",
    nav: {
      flavors: "Saveurs",
      story: "Notre Histoire",
      shops: "Boutiques",
      rewards: "Récompenses",
      contact: "Contact"
    },
    hero: {
      est: "Établi en 1960",
      title: "Ne vous retenez pas",
      cta: "Découvrir les saveurs"
    },
    collection: {
      subtitle: "La Collection",
      title: "Saveurs Iconiques",
      viewAll: "Tout voir"
    },
    ingredients: {
      title: "Ingrédients Extraordinaires",
      desc: "Depuis 1960, notre passion pour la création de la crème glacée parfaite n'a jamais faibli. Nous n'utilisons que les meilleurs ingrédients pour créer une texture unique.",
      cream: "Crème Pure",
      creamDesc: "Provenant de fermes locales pour une richesse ultime.",
      fruit: "Vrais Fruits",
      fruitDesc: "Cueillis à la main à l'apogée de leur maturité.",
      quality: "Qualité Naturelle"
    },
    newsletter: {
      title: "Rejoignez le Club",
      desc: "Soyez le premier informé des nouvelles saveurs, des événements exclusifs et des récompenses.",
      placeholder: "Votre adresse e-mail",
      subscribe: "S'abonner"
    },
    footer: {
      desc: "Créer la meilleure crème glacée au monde depuis 1960. Chaque boule est une célébration de la qualité.",
      explore: "Explorer",
      support: "Support",
      rights: "Tous droits réservés."
    }
  }
};

const FLAVORS = [
  {
    id: 1,
    name: { en: "Vanilla Bean", ko: "바닐라 빈", fr: "Gousse de Vanille" },
    description: { 
      en: "Made with only five ingredients, our vanilla is the gold standard.",
      ko: "단 5가지 재료로 완성된, 바닐라의 정석입니다.",
      fr: "Fabriquée avec seulement cinq ingrédients, notre vanille est la référence."
    },
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop",
    color: "#F3E5AB"
  },
  {
    id: 2,
    name: { en: "Belgian Chocolate", ko: "벨지안 초콜릿", fr: "Chocolat Belge" },
    description: { 
      en: "Rich, velvety chocolate ice cream with finely shaved Belgian chocolate.",
      ko: "진하고 부드러운 초콜릿 아이스크림에 벨기에 초콜릿 칩이 듬뿍.",
      fr: "Crème glacée au chocolat riche et veloutée avec du chocolat belge finement râpé."
    },
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop",
    color: "#3D1E1E"
  },
  {
    id: 3,
    name: { en: "Strawberry", ko: "스트로베리", fr: "Fraise" },
    description: { 
      en: "Sweet summer strawberries introduced to our pure cream.",
      ko: "순수 크림에 달콤한 여름 딸기가 어우러진 맛.",
      fr: "Des fraises d'été sucrées introduites dans notre crème pure."
    },
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800&auto=format&fit=crop",
    color: "#FFB7B2"
  },
  {
    id: 4,
    name: { en: "Caramel Biscuit", ko: "카라멜 비스킷", fr: "Biscuit Caramel" },
    description: { 
      en: "Speculoos biscuits swirled into our signature caramel ice cream.",
      ko: "시그니처 카라멜 아이스크림에 스펙큘러스 비스킷이 듬뿍.",
      fr: "Biscuits Speculoos tourbillonnés dans notre crème glacée au caramel signature."
    },
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop",
    color: "#C68E17"
  }
];

// --- Contexts ---
const AppContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  isDark: boolean;
  setIsDark: (d: boolean) => void;
  t: any;
}>({
  lang: 'en',
  setLang: () => {},
  isDark: false,
  setIsDark: () => {},
  t: translations.en
});

const useApp = () => useContext(AppContext);

// --- Components ---

const Navbar = () => {
  const { lang, setLang, isDark, setIsDark, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-brand-gold z-50"
        style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
      />
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-brand-gold transition-colors">{t.nav.flavors}</a>
            <a href="#" className="hover:text-brand-gold transition-colors">{t.nav.story}</a>
            <a href="#" className="hover:text-brand-gold transition-colors">{t.nav.shops}</a>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="luxury-text text-3xl md:text-4xl font-bold tracking-tighter text-brand-burgundy dark:text-brand-gold transition-colors">
            {t.brand}
          </h1>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-brand-gold transition-colors">{t.nav.rewards}</a>
            <a href="#" className="hover:text-brand-gold transition-colors">{t.nav.contact}</a>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 border-l border-brand-burgundy/10 dark:border-white/10 pl-4 md:pl-8">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-brand-burgundy/5 dark:hover:bg-white/5 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-full hover:bg-brand-burgundy/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">{lang}</span>
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 glass-card rounded-xl overflow-hidden py-2"
                  >
                    {(['en', 'ko', 'fr'] as Language[]).map(l => (
                      <button 
                        key={l}
                        onClick={() => { setLang(l); setIsLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-brand-burgundy/5 dark:hover:bg-white/5 transition-colors ${lang === l ? 'text-brand-gold' : ''}`}
                      >
                        {l === 'en' ? 'English' : l === 'ko' ? '한국어' : 'Français'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="relative p-2">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-brand-gold text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-bold">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-cream dark:bg-brand-dark z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <h2 className="luxury-text text-2xl font-bold">{t.brand}</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 luxury-text text-4xl">
              <a href="#" onClick={() => setIsMenuOpen(false)}>{t.nav.flavors}</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>{t.nav.story}</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>{t.nav.shops}</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>{t.nav.rewards}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useApp();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2000&auto=format&fit=crop" 
          alt="Ice Cream Luxury" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
           <div className="w-20 h-[1px] bg-brand-gold mx-auto mb-4" />
           <p className="uppercase tracking-[0.4em] text-[10px] font-bold">
            {t.hero.est}
          </p>
        </motion.div>
        
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="luxury-text text-7xl md:text-9xl lg:text-[10rem] mb-12 leading-[0.9] tracking-tighter"
        >
          {t.hero.title.split(' ').map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="group relative bg-brand-cream text-brand-burgundy px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <span className="relative z-10">{t.hero.cta}</span>
            <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
          
          <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors">
            {t.nav.story} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

interface ProductCardProps {
  flavor: typeof FLAVORS[0];
  key?: React.Key;
}

const ProductCard = ({ flavor }: ProductCardProps) => {
  const { lang } = useApp();
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-8 glass-card">
        <img 
          src={flavor.image} 
          alt={flavor.name[lang]} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-brand-gold transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="px-2">
        <div className="flex justify-between items-start mb-3">
          <h3 className="luxury-text text-3xl">{flavor.name[lang]}</h3>
          <div className="flex items-center gap-1 text-brand-gold">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-bold">4.9</span>
          </div>
        </div>
        <p className="text-sm text-brand-burgundy/60 dark:text-brand-cream/60 leading-relaxed mb-6 line-clamp-2">
          {flavor.description[lang]}
        </p>
        <button className="w-full py-3 rounded-xl border border-brand-burgundy/10 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-burgundy hover:text-white dark:hover:bg-brand-gold transition-all duration-300">
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
};

const IngredientsSection = () => {
  const { t } = useApp();
  return (
    <section className="py-32 bg-white dark:bg-brand-dark/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <p className="uppercase tracking-widest text-[10px] font-bold text-brand-gold mb-6">Our Secret</p>
          <h2 className="luxury-text text-5xl md:text-7xl mb-10 leading-tight">{t.ingredients.title}</h2>
          <p className="text-lg text-brand-burgundy/70 dark:text-brand-cream/70 mb-12 leading-relaxed max-w-xl">
            {t.ingredients.desc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-cream dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-[10px] mb-3">{t.ingredients.cream}</h4>
                <p className="text-sm text-brand-burgundy/50 dark:text-brand-cream/50 leading-relaxed">{t.ingredients.creamDesc}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-cream dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-[10px] mb-3">{t.ingredients.fruit}</h4>
                <p className="text-sm text-brand-burgundy/50 dark:text-brand-cream/50 leading-relaxed">{t.ingredients.fruitDesc}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 relative"
        >
          <div className="aspect-square rounded-[4rem] overflow-hidden border-[12px] border-brand-cream dark:border-brand-dark shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop" 
              alt="Ingredients" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 glass-card p-10 rounded-[2rem] shadow-2xl max-w-[240px]"
          >
            <p className="luxury-text text-6xl font-bold mb-4 text-brand-gold">100%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">{t.ingredients.quality}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useApp();
  return (
    <footer className="bg-brand-burgundy text-brand-cream py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="luxury-text text-5xl mb-8">{t.brand}</h2>
            <p className="text-brand-cream/50 max-w-sm mb-12 leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex gap-8">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-brand-gold transition-colors" />
              <Facebook className="w-6 h-6 cursor-pointer hover:text-brand-gold transition-colors" />
              <Twitter className="w-6 h-6 cursor-pointer hover:text-brand-gold transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-10 opacity-40">{t.footer.explore}</h4>
            <ul className="flex flex-col gap-6 text-sm font-medium">
              <li className="hover:text-brand-gold cursor-pointer transition-colors">{t.nav.flavors}</li>
              <li className="hover:text-brand-gold cursor-pointer transition-colors">{t.nav.story}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t.nav.shops}</li>
              <li className="hover:text-white cursor-pointer transition-colors">Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-10 opacity-40">{t.footer.support}</h4>
            <ul className="flex flex-col gap-6 text-sm font-medium">
              <li className="hover:text-brand-gold cursor-pointer transition-colors">{t.nav.contact}</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Use</li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-cream/20">
          <p>© 2026 {t.brand}. {t.footer.rights}</p>
          <div className="flex gap-8">
            <span>Paris</span>
            <span>Seoul</span>
            <span>New York</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const contextValue = {
    lang,
    setLang,
    isDark,
    setIsDark,
    t: translations[lang]
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen selection:bg-brand-gold selection:text-white">
        <Navbar />
        
        <main>
          <Hero />

          <section className="py-32 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-brand-gold mb-6">{translations[lang].collection.subtitle}</p>
                <h2 className="luxury-text text-6xl md:text-8xl leading-none">{translations[lang].collection.title}</h2>
              </div>
              <button className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-brand-burgundy/20 dark:border-white/20 pb-2 hover:text-brand-gold hover:border-brand-gold transition-all">
                {translations[lang].collection.viewAll} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16">
              {FLAVORS.map(flavor => (
                <ProductCard key={flavor.id} flavor={flavor} />
              ))}
            </div>
          </section>

          <IngredientsSection />

          <section className="relative py-40 overflow-hidden bg-brand-burgundy text-brand-cream text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto px-6 relative z-10"
            >
              <h2 className="luxury-text text-6xl md:text-8xl mb-10">{translations[lang].newsletter.title}</h2>
              <p className="text-xl text-brand-cream/60 mb-16 leading-relaxed max-w-2xl mx-auto">
                {translations[lang].newsletter.desc}
              </p>
              <form className="flex flex-col sm:flex-row gap-6 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={translations[lang].newsletter.placeholder} 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-brand-gold transition-all placeholder:text-white/20"
                />
                <button className="bg-brand-gold text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-burgundy transition-all duration-500 shadow-xl">
                  {translations[lang].newsletter.subscribe}
                </button>
              </form>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
               <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-brand-gold blur-[150px]" 
               />
               <motion.div 
                animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute -bottom-40 -right-40 w-[50rem] h-[50rem] rounded-full bg-brand-gold blur-[180px]" 
               />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}
