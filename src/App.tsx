import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, XCircle, MonitorPlay, Tv, RefreshCcw, 
  Clock, Info, Search, ChevronDown, ChevronUp, Film, Smile, Trophy, Leaf, Globe, Zap, Wifi, Music, Video, Heart, ExternalLink, Star, Award, ThumbsUp, ShieldCheck
} from 'lucide-react';

// --- ספקיות הטלוויזיה, נתונים מורחבים ומדויקים ---
const PROVIDERS = {
  sting: {
    id: 'sting', name: 'STING+', link: 'https://www.stingplus.co.il',
    theme: 'bg-emerald-500 text-white', lightTheme: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    price: '₪49.00', priceNote: 'לחודש (שנה ראשונה)',
    bundlePrice: '₪149.00', bundleNote: 'לחודש (סיבים 1000Mb)',
    router: '₪25.00 לחודש', mesh: '₪30 לחודש (חודשיים מתנה)',
    devices: 'עד 5 מכשירים במקביל', catchup: 'עד 7 ימים לאחור',
    vod: 'ספריית yes (ללא HBO)', perks: 'גישה ל-Max (בנפרד), 3 חודשי ספורט 1 מתנה',
    boxesIncluded: 'כל הממירים בבית כלולים!', extraBox: 'ללא עלות (חינם)',
    installApt: 'חינם (בבניין 5+ דירות)', installHome: '₪499 חד פעמי'
  },
  yes: {
    id: 'yes', name: 'yes+', link: 'https://www.yes.co.il',
    theme: 'bg-blue-600 text-white', lightTheme: 'bg-blue-50 text-blue-900 border-blue-200',
    price: '₪199.00', priceNote: 'לחודש (yes+ ULTIMATE)',
    bundlePrice: '₪199.00', bundleNote: 'לחודש (סיבים 1000Mb)',
    router: '₪20.00 לחודש', mesh: '₪30 לחודש (חודשיים מתנה)',
    devices: 'עד 7 טלוויזיות + 2 ניידים', catchup: 'עד 7 ימים לאחור',
    vod: 'הספרייה הגדולה בישראל', perks: 'דיסני+ לשנה (בחלק מהמסלולים)',
    boxesIncluded: 'כל הממירים בבית כלולים!', extraBox: 'ללא עלות (חינם)',
    installApt: 'חינם (בבניין 5+ דירות)', installHome: '₪499 חד פעמי'
  },
  hot: {
    id: 'hot', name: 'HOT', link: 'https://www.hot.net.il',
    theme: 'bg-red-600 text-white', lightTheme: 'bg-red-50 text-red-900 border-red-200',
    price: '₪199.00', priceNote: 'לחודש (TV מורחבת)',
    bundlePrice: '₪169.00', bundleNote: 'לחודש (טריפל 1000Mb)',
    router: 'כלול במחיר הטריפל!', mesh: '₪19.90 לחודש',
    devices: 'עד 5 מכשירים / ממירים', catchup: 'StartOver (חלקי)',
    vod: 'ספרייה מקומית עשירה', perks: 'קאשבק למצטרפים באונליין',
    boxesIncluded: '2 סטרימרים כלולים', extraBox: '₪10.00 לממיר נוסף',
    installApt: '₪49 חד פעמי', installHome: '₪499 חד פעמי'
  },
  cellcom: {
    id: 'cellcom', name: 'סלקום TV', link: 'https://cellcom.co.il',
    theme: 'bg-purple-600 text-white', lightTheme: 'bg-purple-50 text-purple-900 border-purple-200',
    price: '₪99.00', priceNote: 'לחודש (כולל ממיר)',
    bundlePrice: '₪119.00', bundleNote: 'לחודש (אינטרנט ו-TV, 1000Mb)',
    router: 'כלול במחיר (או ₪29.90 ל-WiFi 7)', mesh: '₪20.00 לחודש',
    devices: 'עד 5 מכשירים במקביל', catchup: 'עד 7 ימים לאחור',
    vod: 'VOD ללא תשלום נוסף', perks: 'חבילות טריפל ייעודיות עם Netflix',
    boxesIncluded: 'ממיר 1 כלול', extraBox: '₪29.90 לממיר נוסף',
    installApt: 'חינם (בבניין 5+ דירות)', installHome: '₪499 חד פעמי'
  },
  partner: {
    id: 'partner', name: 'פרטנר TV', link: 'https://www.partner.co.il',
    theme: 'bg-teal-500 text-white', lightTheme: 'bg-teal-50 text-teal-900 border-teal-200',
    price: '₪69.00', priceNote: 'לחודש (אפליקציה בלבד)',
    bundlePrice: '₪175.00', bundleNote: 'לחודש (טריפל 1000Mb)',
    router: '₪25.00 לחודש', mesh: '₪19.90 לחודש',
    devices: 'עד 5 מסכים במקביל', catchup: 'עד 14 ימים (היחידים בשוק)',
    vod: 'VOD בסיסי מאוד', perks: 'באנדלים משולבים עם מנוי Netflix מובנה',
    boxesIncluded: 'ללא (אלא בחבילת ₪99)', extraBox: '₪15-25 לממיר נוסף',
    installApt: 'חינם (בבניין 5+ דירות)', installHome: '₪499 חד פעמי'
  },
  freetv: {
    id: 'freetv', name: 'FreeTV', link: 'https://www.freetv.co.il',
    theme: 'bg-pink-600 text-white', lightTheme: 'bg-pink-50 text-pink-900 border-pink-200',
    price: '₪39.90', priceNote: 'לחודש (ל-2 מסכים)',
    bundlePrice: '---', bundleNote: 'לא משווקים אינטרנט',
    router: '---', mesh: '---',
    devices: '2 או 4 מסכים', catchup: 'שירות חלקי בלבד (24 שעות)',
    vod: 'ספריית VOD בסיסית', perks: 'חודש ראשון חינם (במבצעים מתחלפים)',
    boxesIncluded: 'אפליקציה בלבד', extraBox: '---',
    installApt: 'התקנה עצמית', installHome: 'התקנה עצמית'
  }
};

const COMPARISON_FEATURES = [
  { key: 'price', noteKey: 'priceNote', label: 'מחיר TV בלבד', isHighlight: true },
  { key: 'bundlePrice', noteKey: 'bundleNote', label: 'מחיר באנדל אינטרנט', isHighlight: true, isBundle: true },
  { key: 'router', label: 'עלות נתב (ראוטר) חודשית' },
  { key: 'mesh', label: 'מגדיל טווח (Mesh) חודשי' },
  { key: 'devices', label: 'צפייה במקביל / כמות מכשירים' },
  { key: 'catchup', label: 'הקלטה בענן / CatchUp' },
  { key: 'vod', label: 'ספריית VOD' },
  { key: 'perks', label: 'הטבות מיוחדות (Netflix/Max/Disney)' },
  { key: 'boxesIncluded', label: 'ממירים כלולים (בסיס)' },
  { key: 'extraBox', label: 'עלות ממיר נוסף' },
  { key: 'installApt', label: 'עלות התקנה (בניין דירות)' },
  { key: 'installHome', label: 'עלות התקנה (בית פרטי / עד 4 דירות)' }
];

const DETAILED_CHANNELS = [
  {
    category: 'ערוצי ברודקאסט וכללי',
    icon: Tv,
    channels: [
      { name: 'כאן 11', keywords: ['ערוץ 11', 'תאגיד'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'קשת 12', keywords: ['ערוץ 12'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'רשת 13', keywords: ['ערוץ 13'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'עכשיו 14', keywords: ['ערוץ 14', 'מורשת'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ 9', keywords: ['ערוץ תשע', 'רוסית', '9'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ 24', keywords: ['מוזיקה 24', 'ערוץ עשרים וארבע'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'מכאן 33', keywords: ['ערוץ 33', 'ערבית'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ הכנסת', keywords: ['כנסת', '99'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'הלא TV', keywords: ['hala', 'ערבית'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false }
    ]
  },
  {
    category: 'סרטים (Movies)',
    icon: Film,
    channels: [
      { name: 'yes Movies Drama', keywords: ['יס דרמה', 'יס סרטים'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Action', keywords: ['יס אקשן', 'יס סרטים'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Comedy', keywords: ['יס קומדי', 'יס סרטים'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Kids', keywords: ['יס קידס', 'יס ילדים', 'סרטים ילדים'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes ישראלי', keywords: ['יס ישראלי', 'סרטים ישראליים'], sting: false, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema 1', keywords: ['הוט סינמה 1', 'הוט סרטים'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema 2', keywords: ['הוט סינמה 2', 'הוט סרטים'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema 3', keywords: ['הוט סינמה 3', 'הוט סרטים'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema 4', keywords: ['הוט סינמה 4', 'הוט סרטים'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema Family', keywords: ['הוט סינמה משפחה', 'הוט סרטים'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema ישראלי', keywords: ['הוט סינמה ישראלי', 'סרטים ישראלים'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'סדרות ובידור',
    icon: Video,
    channels: [
      { name: 'yes TV Drama', keywords: ['יס טיוי דרמה', 'סדרות דרמה'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes TV Action', keywords: ['יס טיוי אקשן', 'סדרות אקשן'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes TV Comedy', keywords: ['יס טיוי קומדי', 'סדרות קומדיה'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'HOT 3', keywords: ['הוט 3', 'הוט שלוש'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT HBO', keywords: ['הוט hbo'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Zone', keywords: ['הוט זון'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Comedy Central', keywords: ['הוט קומדי סנטרל', 'קומדיה'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ויוה', keywords: ['viva', 'טלנובלות'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ויוה פלוס / פרימיום', keywords: ['viva plus', 'viva premium'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ויוה וינטג׳', keywords: ['viva vintage'], sting: true, yes: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'ויוה איסטנבול', keywords: ['viva istanbul', 'טורקיות'], sting: true, yes: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'E! Entertainment', keywords: ['ערוץ אי', 'בידור'], sting: true, yes: true, hot: true, cellcom: true, partner: false, freetv: false },
      { name: 'ערוץ הריאליטי', keywords: ['ריאליטי'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ השעשועונים', keywords: ['שעשועונים'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'ילדים ונוער',
    icon: Smile,
    channels: [
      { name: 'כאן חינוכית', keywords: ['חינוכית 23', 'חינוכית', 'ערוץ 23'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'הופ!', keywords: ['ערוץ הופ', 'hop'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ניקלודיאון', keywords: ['ניק', 'nick'], sting: true, yes: true, hot: true, cellcom: false, partner: true, freetv: true },
      { name: 'ניק ג׳וניור', keywords: ['nick jr'], sting: true, yes: true, hot: true, cellcom: false, partner: true, freetv: true },
      { name: 'TeenNick', keywords: ['טין ניק', 'teennick'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ הילדים', keywords: ['ילדים'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'דיסני', keywords: ['disney'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'דיסני ג׳וניור', keywords: ['disney jr'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'לוגי', keywords: ['logi'], sting: false, yes: false, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'זום / TOON ZOOM', keywords: ['zoom', 'טון זום'], sting: true, yes: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'ג׳וניור', keywords: ['junior'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'בייבי / ילדות ישראלית', keywords: ['baby', 'ילדות'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'WIZ', keywords: ['וויז', 'ויז'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'FOMO', keywords: ['פומו'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'ספורט',
    icon: Trophy,
    channels: [
      { name: '5SPORT', keywords: ['ספורט 5', 'ספורט5', 'ערוץ הספורט'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5PLUS', keywords: ['ספורט 5 פלוס', 'ספורט 5+', '5 פלוס'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5LIVE (בתשלום)', keywords: ['ספורט 5 לייב', '5 לייב', 'live'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5GOLD (בתשלום)', keywords: ['ספורט 5 גולד', '5 גולד', 'gold'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5STARS (בתשלום)', keywords: ['ספורט 5 סטארס', '5 סטארס', 'stars'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5SPORT 4K', keywords: ['ספורט 5 4k', '4k'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ספורט 1 (צ׳רלטון)', keywords: ['ספורט1', 'צארלטון', 'ליגת העל'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ספורט 2 (צ׳רלטון)', keywords: ['ספורט2', 'צארלטון'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ספורט 3 (צ׳רלטון)', keywords: ['ספורט3', 'צארלטון'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ספורט 4 (צ׳רלטון)', keywords: ['ספורט4', 'צארלטון'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ONE', keywords: ['וואן', 'ערוץ 50'], sting: true, yes: true, hot: true, cellcom: true, partner: false, freetv: false },
      { name: 'ONE 2', keywords: ['וואן 2', 'one2'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Eurosport 1', keywords: ['יורוספורט 1', 'יורוספורט'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Eurosport 2', keywords: ['יורוספורט 2'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'TRACE Extreme', keywords: ['אקסטרים', 'trace'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'דוקו, טבע והיסטוריה',
    icon: Leaf,
    channels: [
      { name: 'yes דוקו', keywords: ['יס דוקו', 'דוקו'], sting: true, yes: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'HOT 8', keywords: ['הוט 8', 'ערוץ 8', 'דוקו'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'נשיונל גיאוגרפיק', keywords: ['national geographic', 'טבע'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'Nat Geo Wild', keywords: ['נשיונל גיאוגרפיק ווילד', 'wild'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ ההיסטוריה', keywords: ['היסטוריה', 'history'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'דיסקברי', keywords: ['discovery', 'מדע'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Discovery Science', keywords: ['דיסקברי סיינס', 'מדע'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Animal Planet', keywords: ['אנימל פלאנט', 'חיות'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'CGTN Docu', keywords: ['דוקו סיני'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'לייף סטייל ופנאי',
    icon: Heart,
    channels: [
      { name: 'החיים הטובים', keywords: ['good life'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ האוכל', keywords: ['אוכל', 'food'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ הטיולים', keywords: ['טיולים', 'travel'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ הבריאות', keywords: ['בריאות', 'health'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'FOODY', keywords: ['פודי', 'אוכל'], sting: true, yes: true, hot: true, cellcom: true, partner: false, freetv: false },
      { name: 'ערוץ העיצוב (DIY)', keywords: ['עיצוב', 'diy', 'בית פלוס'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'אגו', keywords: ['ego', 'רכבים'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Fashion TV', keywords: ['אופנה', 'פשן טיבי'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'מוזיקה',
    icon: Music,
    channels: [
      { name: 'MTV (הבינלאומי)', keywords: ['אמ טי וי', 'mtv'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'MTV Hits / 00s', keywords: ['אמ טי וי להיטים', 'שירים'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ מוזיקה IL', keywords: ['מוזיקה ישראלית', 'music il'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'Mezzo', keywords: ['מצו', 'קלאסית'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Classica', keywords: ['קלאסיקה', 'מוזיקה קלאסית'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ הקריוקי', keywords: ['קריוקי', 'שירה'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false }
    ]
  },
  {
    category: 'חדשות, אקטואליה ובינלאומי',
    icon: Globe,
    channels: [
      { name: 'CNN', keywords: ['סי אן אן', 'חדשות'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'Fox News', keywords: ['פוקס ניוז', 'חדשות'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'Sky News', keywords: ['סקיי ניוז'], sting: true, yes: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'BBC News', keywords: ['בי בי סי', 'bbc'], sting: false, yes: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'France 24', keywords: ['צרפת 24', 'france24'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'Bloomberg', keywords: ['בלומברג', 'כלכלה'], sting: true, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'CNBC', keywords: ['סי אן בי סי', 'כלכלה'], sting: false, yes: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Channel 1 (רוסיה)', keywords: ['רוסיה 1', 'ערוץ 1'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'הערוץ הים תיכוני', keywords: ['ים תיכוני', 'יוונית'], sting: true, yes: true, hot: true, cellcom: true, partner: true, freetv: false }
    ]
  }
];

export default function App() {
  const [competitorId, setCompetitorId] = useState('hot');
  const [viewMode, setViewMode] = useState('single'); 
  const [lastUpdated, setLastUpdated] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [expandedCategories, setExpandedCategories] = useState(
    DETAILED_CHANNELS.map(c => c.category) 
  );

  useEffect(() => {
    const calculateLastUpdate = () => {
      const now = new Date();
      const today7 = new Date(now); today7.setHours(7, 0, 0, 0);
      const today13 = new Date(now); today13.setHours(13, 0, 0, 0);

      let updateTime = now >= today13 ? today13 : now >= today7 ? today7 : new Date(now.setDate(now.getDate() - 1)).setHours(13, 0, 0, 0);
      return `${new Date(updateTime).toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} בשעה ${new Date(updateTime).getHours() === 7 ? '07:00' : '13:00'}`;
    };

    setLastUpdated(calculateLastUpdate());
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 800);
    return () => clearTimeout(timer);
  }, [competitorId]);

  const toggleCategory = (catName) => {
    if (expandedCategories.includes(catName)) {
      setExpandedCategories(expandedCategories.filter(c => c !== catName));
    } else {
      setExpandedCategories([...expandedCategories, catName]);
    }
  };

  const sting = PROVIDERS['sting'];
  const yes = PROVIDERS['yes'];
  const comp = PROVIDERS[competitorId];
  const allProvidersList = ['hot', 'cellcom', 'partner', 'freetv'];

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const { isSearching, searchResults } = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return { isSearching: false, searchResults: [] };

    const normalize = (str) => str.toLowerCase().replace(/[\s\-׳'"`]/g, '');
    const normalizedQuery = normalize(query);
    const results = [];

    DETAILED_CHANNELS.forEach(cat => {
      cat.channels.forEach(c => {
        const matchesName = normalize(c.name).includes(normalizedQuery);
        const matchesKeyword = c.keywords && c.keywords.some(k => normalize(k).includes(normalizedQuery));
        
        if (matchesName || matchesKeyword) {
          results.push({ ...c, categoryName: cat.category });
        }
      });
    });

    return { isSearching: true, searchResults: results };
  }, [searchQuery]);

  const renderIcon = (val) => {
    return val ? (
      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
    ) : (
      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 mx-auto" />
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100 font-sans pb-20 overflow-x-hidden">
      
      {/* Header */}
      <header className="bg-slate-900 text-white py-6 px-4 shadow-xl relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-700 to-blue-500 px-4 py-2 rounded-xl font-black text-2xl shadow-lg border border-blue-400/30">
              השוואה פלוס
            </div>
            <h1 className="text-xl md:text-3xl font-black tracking-tight">STING+ / yes מול המתחרים</h1>
          </div>
          
          <div className={`flex items-center gap-2 bg-slate-800 border border-slate-700 py-2 px-4 rounded-full text-sm font-medium transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>מחירון מעודכן: {lastUpdated}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 mt-8 space-y-12">
        
        {/* Selector & View Mode */}
        <div className="text-center space-y-6">
          <div className="inline-flex bg-slate-200 p-1.5 rounded-2xl shadow-inner">
            <button 
              onClick={() => setViewMode('single')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all ${viewMode === 'single' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-600 hover:text-slate-800'}`}
            >
              השוואה מול מתחרה יחיד
            </button>
            <button 
              onClick={() => setViewMode('all')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all ${viewMode === 'all' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-600 hover:text-slate-800'}`}
            >
              הצג את כל המתחרים
            </button>
          </div>

          {viewMode === 'single' && (
            <div>
              <h2 className="text-lg text-slate-600 font-bold mb-4">בחר מתחרה להשוואה מול STING+ ו-yes:</h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {allProvidersList.map(key => {
                  const p = PROVIDERS[key];
                  const isSelected = competitorId === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setCompetitorId(key)}
                      className={`px-4 py-2 sm:px-7 sm:py-4 rounded-2xl font-black text-sm sm:text-lg transition-all duration-200 shadow-sm border-2 flex items-center gap-2 ${
                        isSelected ? `${p.theme} border-transparent scale-105 shadow-xl` : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* --- טבלת ההשוואה הטכנית והמחירים --- */}
        <section>
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <MonitorPlay className="w-6 h-6 text-blue-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">מחירון, חומרה והטבות</h2>
          </div>

          <div className="bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-slate-200 relative">
            <div className="overflow-x-auto pb-4">
              <div className={`min-w-[800px] ${viewMode === 'all' ? 'lg:min-w-[1200px]' : ''}`}>
                
                {/* Headers */}
                <div className={`grid bg-slate-100 border-b-2 border-slate-300 ${viewMode === 'single' ? 'grid-cols-4' : 'grid-cols-7'}`}>
                  <div className="p-4 border-l border-slate-200 flex items-center justify-center font-bold text-slate-400">קריטריון</div>
                  
                  {[sting, yes, ...(viewMode === 'single' ? [comp] : allProvidersList.map(k => PROVIDERS[k]))].map(p => (
                    <div key={p.id} className={`p-4 text-center border-l border-slate-200 flex flex-col items-center justify-center ${p.lightTheme}`}>
                      <div className={`font-black mb-1 leading-tight ${p.theme.split(' ')[0].replace('bg-', 'text-')} text-xl sm:text-2xl`}>{p.name}</div>
                      <button 
                        onClick={() => openLink(p.link)} 
                        className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 mt-2 cursor-pointer transition-colors"
                      >
                        לאתר הרשמי <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100">
                  {COMPARISON_FEATURES.map((row, idx) => (
                    <div key={idx} className={`grid hover:bg-slate-50 transition-colors ${viewMode === 'single' ? 'grid-cols-4' : 'grid-cols-7'} ${row.isBundle ? 'bg-slate-50/50' : ''}`}>
                      <div className="p-4 flex items-center font-bold text-slate-700 border-l border-slate-100 text-[11px] sm:text-sm">
                        {row.isBundle && <Wifi className="w-4 h-4 text-indigo-500 ml-2 inline flex-shrink-0" />}
                        <span>{row.label}</span>
                      </div>
                      
                      {[sting, yes, ...(viewMode === 'single' ? [comp] : allProvidersList.map(k => PROVIDERS[k]))].map(p => (
                        <div key={`${row.key}-${p.id}`} className={`p-4 flex items-center justify-center border-l border-slate-100 ${row.isHighlight ? p.lightTheme.split(' ')[0] + '/30' : ''}`}>
                          {row.isHighlight ? (
                            <div className="text-center w-full">
                              <span className={`font-black block text-slate-800 ${row.isBundle ? 'text-lg sm:text-xl text-indigo-800' : 'text-lg sm:text-xl'}`}>{p[row.key]}</span>
                              <span className="text-[10px] text-slate-500 font-bold block mt-1 leading-tight">{p[row.noteKey]}</span>
                            </div>
                          ) : (
                            <span className={`text-center font-medium leading-tight px-1 ${
                              (row.key === 'boxesIncluded' || row.key === 'extraBox') && (p.id === 'yes' || p.id === 'sting') ? 'text-blue-700 font-black text-sm sm:text-base' : 'text-slate-700 text-[11px] sm:text-sm'
                            }`}>
                              {p[row.key]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- חלק 2: השוואת ערוצים מפורטת (תומך בתצוגת 'כל המתחרים') --- */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2.5 rounded-xl">
                <Tv className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">השוואת ערוצים מפורטת</h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">כולל כ-{DETAILED_CHANNELS.reduce((acc, cat) => acc + cat.channels.length, 0)} ערוצים המשודרים בישראל</p>
              </div>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="חיפוש חכם (למשל: ספורט 5, החיים הטובים)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-300 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 shadow-sm transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden relative">
             <div className="overflow-x-auto pb-4">
              <div className={`min-w-[800px] ${viewMode === 'all' ? 'lg:min-w-[1200px]' : ''}`}>
                
                {/* Headers עבור טבלת הערוצים */}
                <div className={`grid bg-slate-100 border-b-2 border-slate-300 sticky top-0 z-30 ${viewMode === 'single' ? 'grid-cols-4' : 'grid-cols-7'}`}>
                  <div className="p-2 sm:p-4 font-bold text-slate-500 border-l border-slate-200 flex items-center justify-center text-[11px] sm:text-base text-center">שם הערוץ</div>
                  
                  {[sting, yes, ...(viewMode === 'single' ? [comp] : allProvidersList.map(k => PROVIDERS[k]))].map(p => (
                    <div key={`header-${p.id}`} className={`p-2 sm:p-4 text-center font-black ${p.lightTheme.split(' ')[1]} border-l border-slate-200 text-sm sm:text-xl leading-tight flex items-center justify-center`}>
                      {p.name}
                    </div>
                  ))}
                </div>

                {isSearching ? (
                  
                  <div className="bg-white">
                    <div className="bg-blue-50/80 p-3 text-sm font-bold text-blue-800 text-center border-b border-slate-200">
                      {searchResults.length > 0 ? `נמצאו ${searchResults.length} תוצאות:` : `לא נמצאו ערוצים בשם "${searchQuery}"`}
                    </div>

                    {searchResults.length > 0 && (
                      <div className="divide-y divide-slate-100">
                        {searchResults.map((channel, idx) => (
                          <div key={`search-res-${idx}`} className={`grid hover:bg-slate-50 transition-colors ${viewMode === 'single' ? 'grid-cols-4' : 'grid-cols-7'}`}>
                            <div className="p-2 sm:p-4 border-l border-slate-100 flex flex-col justify-center text-center sm:text-right">
                              <span className="font-bold text-slate-800 text-[11px] sm:text-base leading-tight">{channel.name}</span>
                              <span className="text-[9px] sm:text-xs text-slate-500 mt-1 font-medium">{channel.categoryName}</span>
                            </div>
                            
                            {[sting, yes, ...(viewMode === 'single' ? [comp] : allProvidersList.map(k => PROVIDERS[k]))].map(p => (
                               <div key={`search-icon-${p.id}`} className={`p-2 sm:p-4 border-l border-slate-100 flex items-center justify-center ${p.id === 'sting' ? 'bg-emerald-50/10' : p.id === 'yes' ? 'bg-blue-50/10' : ''}`}>
                                  {renderIcon(channel[p.id])}
                               </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                ) : (
                  
                  <div className="divide-y-4 divide-slate-100/50">
                    {DETAILED_CHANNELS.map((category, catIdx) => {
                      const isExpanded = expandedCategories.includes(category.category);
                      const CatIcon = category.icon;
                      
                      return (
                        <div key={catIdx} className="bg-white">
                          <button 
                            onClick={() => toggleCategory(category.category)}
                            className="w-full flex items-center justify-between p-3 sm:p-4 bg-slate-50/80 hover:bg-slate-100 transition-colors border-b border-slate-200 sticky left-0"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <CatIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0" />
                              <h3 className="font-bold text-[13px] sm:text-lg text-slate-800 text-right whitespace-nowrap">{category.category}</h3>
                              <span className="bg-slate-200 text-slate-600 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">
                                {category.channels.length}
                              </span>
                            </div>
                            {isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />}
                          </button>

                          {isExpanded && (
                            <div className="divide-y divide-slate-100">
                              {category.channels.map((channel, chIdx) => (
                                <div key={`cat-res-${chIdx}`} className={`grid hover:bg-slate-50 transition-colors ${viewMode === 'single' ? 'grid-cols-4' : 'grid-cols-7'}`}>
                                  <div className="p-2 sm:p-4 border-l border-slate-100 flex items-center justify-center sm:justify-start font-bold text-slate-700 text-[11px] sm:text-base leading-tight text-center sm:text-right">
                                    {channel.name}
                                  </div>
                                  
                                  {[sting, yes, ...(viewMode === 'single' ? [comp] : allProvidersList.map(k => PROVIDERS[k]))].map(p => (
                                    <div key={`cat-icon-${p.id}`} className={`p-2 sm:p-4 border-l border-slate-100 flex items-center justify-center ${p.id === 'sting' ? 'bg-emerald-50/10' : p.id === 'yes' ? 'bg-blue-50/10' : ''}`}>
                                        {renderIcon(channel[p.id])}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
             </div>
          </div>
        </section>

        {/* --- אזור כלי מכירה לצוות - למה יס וסטינג --- */}
        <section className="mt-16 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-3">למה אנחנו? (yes / STING+)</h2>
            <p className="text-slate-500 font-medium text-lg">נקודות המכירה והחוזקות שהופכות אותנו למובילים בשוק</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <Film className="w-24 h-24 absolute -bottom-4 -left-4 opacity-10" />
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-5 backdrop-blur-md">
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <h3 className="text-xl font-black mb-3">מעצמת תוכן ויצירה ישראלית</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                אנו משקיעים את התקציבים הגדולים ביותר ביצירת דרמות וסרטים ישראליים. עם yes+, הלקוח מקבל גישה לספריית ה-VOD הגדולה בישראל, ולהפקות המקור עטורות הפרסים שלנו.
              </p>
              <ul className="text-sm font-medium space-y-2 text-blue-50">
                <li>✓ הפקות המקור המדוברות בארץ</li>
                <li>✓ ערוצי סדרות וסרטים עשירים</li>
                <li>✓ שיתופי פעולה עם Max ודיסני+</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <Zap className="w-24 h-24 absolute -bottom-4 -left-4 opacity-10" />
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-5 backdrop-blur-md">
                <ShieldCheck className="w-6 h-6 text-emerald-100" />
              </div>
              <h3 className="text-xl font-black mb-3">ממירים בחינם וטכנולוגיה מובילה</h3>
              <p className="text-emerald-50 text-sm leading-relaxed mb-4">
                בזמן שמתחרות גובות עד 30 ש"ח על כל ממיר נוסף – אצלנו כל הממירים בבית כלולים בחינם! זאת בנוסף למערכות ההפעלה המתקדמות ביותר בשוק (Apple TV ו-Android TV).
              </p>
              <ul className="text-sm font-medium space-y-2 text-emerald-50">
                <li><strong className="text-white bg-teal-800 px-1 rounded">✓ כל הממירים בבית כלולים ללא עלות!</strong></li>
                <li>✓ תמיכה בממירים מתקדמים מבית אפל</li>
                <li>✓ חווית צפייה 4K ו-CatchUp ל-7 ימים</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 text-slate-800 shadow-xl border border-slate-200 relative overflow-hidden">
              <Award className="w-24 h-24 absolute -bottom-4 -left-4 opacity-5 text-slate-800" />
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                <ThumbsUp className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-black mb-3">מקום 1 בשירות הלקוחות</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                לפי דו"חות משרד התקשורת וסקרי השוק העדכניים, אנו מובילים באופן עקבי את טבלאות שביעות הרצון של הלקוחות. מינימום תקלות וזמן המתנה קצר.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-500">שביעות רצון (דו"ח משרד התקשורת)</span>
                  <span className="text-xs font-black text-blue-600">yes המובילה</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-slate-800 text-slate-300 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4 shadow-lg mb-8">
          <div className="bg-slate-700 p-2 sm:p-3 rounded-xl sm:rounded-2xl flex-shrink-0 hidden sm:block">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <div className="text-xs sm:text-sm leading-relaxed space-y-2">
            <p>
              <strong className="text-white">מידע פנימי למכירות:</strong> הנתונים נשאבים מאתרי החברות. שימו לב שערוץ הסדרות HBO הופרד ונמכר תחת אפליקציית Max כחבילה נפרדת.
            </p>
            <p>
              <strong>הערות ציוד:</strong> מחירי הבאנדל תמיד מוצגים <i>ללא</i> עלויות השכרת נתבים ומגדילי טווח (למעט ב-HOT/סלקום שמגלמות בחלק מהמקרים זאת במחיר הבאנדל). התקנה בבית פרטי אצל כל החברות כרוכה לרוב בעלות של כ-499 ₪.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}