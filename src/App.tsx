// @ts-nocheck
import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Tv, Clock, Search, ChevronDown, ChevronUp, 
  Film, Smile, Trophy, Globe, Calculator, Wallet, BarChart3, 
  HelpCircle, ShieldCheck, Star, Users, AlertTriangle, Info, Zap,
  Video, MonitorPlay, Compass, ExternalLink, Play, Music, Languages, Utensils, Lightbulb, MessageCircle, Link as LinkIcon
} from 'lucide-react';

// --- מסד נתונים מלא ומסונכרן ---
const DETAILED_CHANNELS = [
  {
    category: 'ברודקאסט וחדשות ישראל',
    icon: Tv,
    channels: [
      { name: 'כאן 11', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'קשת 12', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'רשת 13', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'עכשיו 14', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ 9', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ 24', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ הכנסת', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'i24 News עברית', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'i24 News English', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'i24 News Arabic', yes: true, sting: true, hot: true, cellcom: true, partner: false, freetv: true },
      { name: 'מכאן 33', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'הלא TV', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ 98', yes: true, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
    ]
  },
  {
    category: 'לייף סטייל, אוכל ופנאי',
    icon: Utensils,
    channels: [
      { name: 'החיים הטובים', yes: true, sting: true, hot: true, cellcom: true, partner: false, freetv: true },
      { name: 'ערוץ האוכל', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'פודי (FOODY)', yes: true, sting: true, hot: false, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ הטיולים', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'בית פלוס', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ DIY', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ הבריאות', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Fashion TV HD', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ אופנה ישראלי', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ אגו', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'אגו טוטאל', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ הקראוון', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'CBS Reality', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
    ]
  },
  {
    category: 'ערוצי ספורט',
    icon: Trophy,
    channels: [
      { name: 'ספורט 5', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5 פלוס', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5 לייב', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5 גולד', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5 4K', yes: true, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ספורט 1 (צ\'רלטון)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ספורט 2', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ספורט 3', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ספורט 4', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ONE', yes: true, sting: true, hot: true, cellcom: true, partner: false, freetv: true },
      { name: 'ONE 2', yes: true, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ONE 4K', yes: true, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'יורוספורט 1', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'יורוספורט 2', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Trace Sport Stars', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Edge Sport', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ המנוע', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
    ]
  },
  {
    category: 'סרטים (yes Movies vs HOT Cinema)',
    icon: MonitorPlay,
    channels: [
      { name: 'yes Movies Drama', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Action', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Comedy', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Israeli', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes Movies Kids', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'HOT Cinema 1-4', yes: false, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'Cinema Boutique', yes: false, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ערוץ הקולנוע הישראלי', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'TCM / MGM', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
    ]
  },
  {
    category: 'סדרות ובידור',
    icon: Play,
    channels: [
      { name: 'yes TV Drama', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes TV Action', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'yes TV Comedy', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'HOT 3', yes: false, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'ויוה', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ויוה פלוס', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ויוה פרימיום', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ הדרמות הטורקיות', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'הדרמות הטורקיות +', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ הדרמות הטורקיות 2', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ערוץ הים תיכוני', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ הריאליטי', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ השעשועונים', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Bollywood', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'E! Entertainment', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
    ]
  },
  {
    category: 'ילדים ונוער',
    icon: Smile,
    channels: [
      { name: 'הופ!', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ הילדים', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'לוגי', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ניקלודיאון', yes: true, sting: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'Nick Jr.', yes: true, sting: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'TeenNick', yes: true, sting: true, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'ג\'וניור', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'זום (ZOOM)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'דיסני', yes: true, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'דיסני Jr.', yes: true, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'בייבי (BabyTV)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'לולי', yes: false, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'יו-יו', yes: true, sting: true, hot: false, cellcom: true, partner: false, freetv: false },
      { name: 'ילדותי', yes: true, sting: true, hot: false, cellcom: true, partner: false, freetv: false },
      { name: 'JimJam', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'קידז (KIDZ)', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
    ]
  },
  {
    category: 'דוקו, טבע ומדע',
    icon: Compass,
    channels: [
      { name: 'yes דוקו', yes: true, sting: true, hot: false, cellcom: false, partner: false, freetv: false },
      { name: 'HOT 8', yes: false, sting: false, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'National Geographic', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Nat Geo Wild', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Discovery', yes: true, sting: true, hot: true, cellcom: false, partner: true, freetv: true },
      { name: 'Investigation Discovery (ID)', yes: true, sting: true, hot: true, cellcom: false, partner: true, freetv: true },
      { name: 'Animal Planet', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'History Channel', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ המדע (Science)', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
    ]
  },
  {
    category: 'בינלאומי וחדשות עולם',
    icon: Languages,
    channels: [
      { name: 'RTL (גרמניה)', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'RAI Uno (איטליה)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'TV5 Monde (צרפת)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'TVE (ספרד)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'DW (גרמניה/אנגלית)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'France 24', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'CNN International', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Fox News', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'BBC World News', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Sky News', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Bloomberg', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Al Jazeera (ENG)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
    ]
  },
  {
    category: 'חבילת ערוצי רוסית',
    icon: Globe,
    channels: [
      { name: 'Rossiya-24', yes: false, sting: false, hot: false, cellcom: false, partner: true, freetv: false },
      { name: 'MOSFILM', yes: false, sting: false, hot: true, cellcom: false, partner: false, freetv: true },
      { name: 'REN TV', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
      { name: 'SHANSON TV', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: true },
      { name: 'Channel One Russia', yes: false, sting: false, hot: true, cellcom: false, partner: true, freetv: false },
      { name: 'DOM KINO', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'RTR Planeta', yes: true, sting: false, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'NTV MIR', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: true },
      { name: 'Carousel', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
    ]
  },
  {
    category: 'מוזיקה',
    icon: Music,
    channels: [
      { name: 'MTV Israel', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'MTV Live HD', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: true },
      { name: 'MTV Hits', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: true },
      { name: 'Mezzo', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'Mezzo Live HD', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'VH1 Classics', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
    ]
  }
];

const OBJECTIONS = [
  { 
    q: `"יקר לי"`, 
    rationale: `לקוח שאומר "יקר לי" בעצם אומר "אני לא רואה מספיק ערך כדי לשלם את הסכום הזה". המטרה היא להוציא אותו מהמספר היבש ולהכניס אותו לחוויה.`,
    script: `"אני מבין אותך לגמרי, כולנו רוצים לשלם פחות. אבל בוא נשים את המספרים רגע בצד – בסוף, כשאתה מתיישב מול הטלוויזיה אחרי יום עבודה ארוך, אתה רוצה שמשהו יעבוד חלק ועם התוכן הכי טוב שיש. ההבדל של ה-20 שקלים בחודש מתגמד כשאתה מקבל פלטפורמה שלא נתקעת, אינטרנט סיבים יציב שכל הבית גולש עליו בכיף, ואת כל הסדרות הישראליות שכולם מדברים עליהן. על איכות ושקט שווה לשלם קצת יותר, לא?"`
  },
  { 
    q: `"מתחרה X (סלקום/פרטנר/הוט) הציעו לי זול יותר"`, 
    rationale: `אסור ללכלך על המתחרים, זה משדר חולשה. במקום זה, מעבירים את השיחה ל"השוואת תפוחים לתפוחים" וחושפים את מה שהלקוח אולי לא שאל את המתחרה.`,
    script: `"תחרות זה מעולה, וזה הגיוני שבדקת. אבל בוא נוודא שאתה משווה תפוחים לתפוחים. ההצעה שלהם כוללת בדיוק את אותה מהירות סיבים? האם יש שם את ספריית ה-VOD העצומה וכל הפקות המקור שיש אצלנו? הרבה פעמים מציעים מחיר רצפה על חבילה בסיסית ורשת שנופלת בשעות העומס. אני מציע לך חבילת פרימיום שהיא הסטנדרט הכי גבוה היום בישראל. שווה לך להתפשר על החוויה בבית בשביל כמה שקלים בודדים?"`
  },
  {
    q: `"אני מסתדר מצוין רק עם נטפליקס, לא צריך יותר"`,
    rationale: `נטפליקס היא שירות משלים, לא תחליף מלא. צריך ללחוץ בעדינות על נקודת ה-FOMO (הפחד להחמיץ) של הישראלי הממוצע – חדשות, ספורט והוויי מקומי.`,
    script: `"נטפליקס זה שירות נהדר, ולרוב הלקוחות שלנו יש גם וגם. אבל מניסיון, כשקורה משהו דרמטי בארץ וכולם צמודים לחדשות, או כשיש משחק ספורט חשוב לייב, נטפליקס לא עוזרת. שלא נדבר על כל הפקות המקור והסדרות הישראליות שכולם מדברים עליהן במשרד בבוקר. אנחנו נותנים לך את המעטפת המלאה – גם האפליקציה של נטפליקס ישר בממיר שלנו, וגם את כל התוכן והחדשות שאתה חייב שיהיו לך בשלט."`
  },
  {
    q: `"אין לי זמן לראות טלוויזיה, חבל לי על הכסף"`,
    rationale: `הלקוח תקוע בתפיסה הישנה של "לשבת מול הערוץ ולזפזפ". צריך לחבר אותו למציאות של צפייה גמישה וניידת.`,
    script: `"בדיוק בגלל שאתה בן אדם עסוק, המערכת שלנו תפורה עליך. היום לא צריך לחכות לשעה 21:00 כדי לראות תוכנית. שירות ה-Catch Up שלנו מאפשר לך לחזור אחורה, ויש לך את כל ה-VOD מתי שנוח לך – בלילה, בסופ"ש, או אפילו מהאפליקציה בטלפון כשאתה מחכה בתור. אתה לא משלם על זמן מסך, אתה משלם על זה שכשכבר יש לך חצי שעה פנויה, יהיה לך מיד מה לראות בלי לחפש שעות."`
  },
  {
    q: `"אני מתחייב עכשיו, ועוד שנה אתם מעלים לי את המחיר"`,
    rationale: `התנגדות שנובעת מטראומות עבר של לקוחות בשוק התקשורת. הפתרון: שקיפות מוחלטת, ביטחון, והדגשת הכוח שנמצא בידיים של הלקוח.`,
    script: `"אני מבין את החשש, פעם ככה השוק עבד. אבל היום החוקים השתנו לחלוטין. קודם כל, המחיר שאני נותן לך עכשיו נעול ומוטמע במערכת למשך שנה, בלי הפתעות בחשבונית. דבר שני – אין היום כבילות ואין קנסות יציאה. אתה אדון לעצמך. אם משהו לא ייראה לך בעתיד, אתה יכול לעצור הכל בלחיצת כפתור או בשיחה קצרה. אין לך שום סיכון כאן, רק להרוויח ציוד חדש ומחיר מעולה שאני מקבע לך מהיום."`
  },
  {
    q: `"אני לא מחליט לבד, אני צריך לשאול את אשתי/בעלי"`,
    rationale: `זהו "מסך עשן". לעיתים קרובות מדובר בתירוץ נימוסי כדי לסיים את השיחה. המטרה היא לכבד את בן/בת הזוג, אך לזהות מהי ההתנגדות האמיתית של הלקוח שאיתו אנו מדברים כעת.`,
    script: `"הכי הגיוני בעולם. החלטות על הבית מקבלים ביחד. אני רק רוצה להיות בטוח שהשארתי אצלך את כל הנתונים לפני שתדברו בערב: כשאתה חושב על השיחה איתה, מה אתה מעריך שתהיה ההתלבטות המרכזית? היא תדאג יותר מהמחיר החודשי שעליו דיברנו, או שאולי יהיה לה חשוב לוודא שיש מספיק ערוצי ילדים ותוכן שמתאים לה? בוא נוודא שיש לך את כל התשובות בשבילה."`
  }
];

const COMPANY_LINKS = [
  { name: 'yes+', url: 'https://www.yes.co.il/', desc: 'האתר הרשמי של yes', classes: 'hover:border-blue-500', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { name: 'STING+', url: 'https://www.stingtv.co.il/', desc: 'האתר הרשמי של STING+', classes: 'hover:border-emerald-500', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { name: 'HOT', url: 'https://www.hot.net.il/', desc: 'האתר הרשמי של הוט', classes: 'hover:border-red-500', iconBg: 'bg-red-50', iconColor: 'text-red-600' },
  { name: 'סלקום TV', url: 'https://cellcom.co.il/tv/', desc: 'האתר הרשמי של סלקום', classes: 'hover:border-purple-500', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
  { name: 'פרטנר TV', url: 'https://www.partner.co.il/tv', desc: 'האתר הרשמי של פרטנר', classes: 'hover:border-teal-500', iconBg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { name: 'FreeTV', url: 'https://www.freetv.tv/', desc: 'האתר הרשמי של פרי טיוי', classes: 'hover:border-rose-500', iconBg: 'bg-rose-50', iconColor: 'text-rose-600' },
  { name: 'NEXT TV', url: 'https://www.nexttv.co.il/', desc: 'האתר הרשמי של NEXT TV', classes: 'hover:border-orange-500', iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
  { name: 'נטפליקס', url: 'https://www.netflix.com/il/', desc: 'האתר הרשמי של נטפליקס', classes: 'hover:border-red-600', iconBg: 'bg-red-50', iconColor: 'text-red-700' },
  { name: 'דיסני+', url: 'https://www.disneyplus.com/il/', desc: 'האתר הרשמי של דיסני+', classes: 'hover:border-blue-400', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { name: 'HBO Max', url: 'https://www.max.com/', desc: 'האתר הרשמי של Max', classes: 'hover:border-indigo-500', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator'); // שיניתי את ברירת המחדל למחירון
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openObjection, setOpenObjection] = useState<number | null>(null);

  const handleCalcInput = (val: string) => {
    if (val === 'C') { setDisplay('0'); setEquation(''); return; }
    if (val === '=') {
      try {
        const sanitized = equation.replace(/x/g, '*').replace(/÷/g, '/');
        const result = new Function(`return ${sanitized}`)();
        setDisplay(String(result)); setEquation(String(result));
      } catch { setDisplay('Error'); }
      return;
    }
    const next = (equation === '0' || equation === '') ? val : equation + val;
    setEquation(next); setDisplay(next);
  };

  const renderIcon = (val) => (
    val ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-200 mx-auto" />
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[40%] bg-emerald-100/30 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 leading-none text-right">Comparison+</h1>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest text-right">Sales Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {activeTab === 'channels' && (
              <a 
                href="https://tiber.co.il/Home/Channels" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-[10px] sm:text-xs font-bold shadow-md animate-in fade-in"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden xs:inline">לא מוצא ערוץ? לחץ כאן</span>
                <span className="xs:hidden">מקור מלא</span>
              </a>
            )}
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 whitespace-nowrap">מרץ 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Responsive Tabs */}
      <nav className="max-w-4xl mx-auto px-2 sm:px-6 mt-6 z-10 relative">
        <div className="bg-white/70 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm flex gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'calculator', icon: Calculator, label: 'מחירון' },
            { id: 'channels', icon: Tv, label: 'ערוצים' },
            { id: 'highlights', icon: ShieldCheck, label: 'התנגדויות' },
            { id: 'links', icon: LinkIcon, label: 'קישורים' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[75px] sm:min-w-[100px] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 rounded-xl font-bold text-[10px] sm:text-sm transition-all duration-200 ${
                activeTab === tab.id 
                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-4 sm:h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 mt-6 sm:mt-10 z-10 relative pb-20">
        
        {/* TAB 1: Calculator Only */}
        {activeTab === 'calculator' && (
          <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-800">
              <div className="flex items-center gap-3 mb-4 sm:mb-6 justify-end">
                <span className="font-black text-slate-100 text-sm">מחשבון עזר מהיר</span>
                <Calculator className="w-5 h-5 text-blue-400" />
              </div>
              <div className="bg-black/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 text-right font-mono border border-white/5 shadow-inner">
                <div className="text-[10px] text-slate-500 h-4 mb-1 italic overflow-hidden">{equation || 'הקלד לחישוב...'}</div>
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tighter truncate">{display}</div>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {['7','8','9','÷','4','5','6','x','1','2','3','-','C','0','=','+'].map(btn => (
                  <button 
                    key={btn} 
                    onClick={() => handleCalcInput(btn)} 
                    className={`h-12 sm:h-14 rounded-xl sm:rounded-2xl font-black text-lg transition-all active:scale-90 ${
                      btn === '=' ? 'bg-blue-600 text-white shadow-lg' : 
                      btn === 'C' ? 'bg-red-500/20 text-red-400' :
                      ['÷','x','-','+'].includes(btn) ? 'bg-white/10 text-blue-400' : 
                      'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {btn === 'x' ? '×' : btn === '÷' ? '÷' : btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Channel Comparison */}
        {activeTab === 'channels' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 text-right">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="חפש ערוץ (למשל: ספורט 5, RTL, ערוץ האוכל)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pr-12 pl-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-right shadow-inner"
                />
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-right">
              <div className="overflow-x-auto scroll-smooth">
                <table className="w-full min-w-[850px] border-collapse text-center">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-100 w-[200px]">שם הערוץ</th>
                      <th className="p-4 text-center text-[10px] font-black text-blue-600 bg-blue-50/20">yes+</th>
                      <th className="p-4 text-center text-[10px] font-black text-emerald-600 bg-emerald-50/20">STING+</th>
                      <th className="p-4 text-center text-[10px] font-black text-red-600">HOT</th>
                      <th className="p-4 text-center text-[10px] font-black text-purple-600">סלקום</th>
                      <th className="p-4 text-center text-[10px] font-black text-teal-600">פרטנר</th>
                      <th className="p-4 text-center text-[10px] font-black text-rose-500">FreeTV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {DETAILED_CHANNELS.map((cat) => (
                      <React.Fragment key={cat.category}>
                        <tr className="bg-slate-100/50">
                          <td colSpan={7} className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{cat.category}</span>
                              <cat.icon className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                          </td>
                        </tr>
                        {cat.channels.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((ch, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors group">
                            <td className="p-3 pr-6 font-bold text-slate-700 text-xs sm:text-sm group-hover:text-blue-600 transition-colors border-l border-slate-100 text-right">{ch.name}</td>
                            <td className="p-3 bg-blue-50/5">{renderIcon(ch.yes)}</td>
                            <td className="p-3 bg-emerald-50/5">{renderIcon(ch.sting)}</td>
                            <td className="p-3 opacity-60">{renderIcon(ch.hot)}</td>
                            <td className="p-3 opacity-60">{renderIcon(ch.cellcom)}</td>
                            <td className="p-3 opacity-60">{renderIcon(ch.partner)}</td>
                            <td className="p-3 opacity-60 bg-rose-50/5">{renderIcon(ch.freetv)}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Highlights & Objections */}
        {activeTab === 'highlights' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right">
            
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden text-right">
              <div className="p-6 border-b border-slate-100 flex items-center justify-end gap-3 bg-slate-900 text-white">
                <h2 className="text-lg font-black tracking-tight italic">מענה מקצועי להתנגדויות</h2>
                <HelpCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div className="divide-y divide-slate-100">
                {OBJECTIONS.map((obj, i) => (
                  <div key={i} className="group">
                    <button 
                      onClick={() => setOpenObjection(openObjection === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-right"
                    >
                      {openObjection === i ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-300 shrink-0" />}
                      <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition-colors ml-4">{obj.q}</span>
                    </button>
                    {openObjection === i && (
                      <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300 text-right">
                        
                        <div className="bg-slate-50 p-4 sm:p-5 rounded-t-2xl border-x border-t border-slate-200 flex flex-col items-end">
                           <div className="flex items-center justify-end gap-2 mb-2 w-full">
                             <span className="text-sm font-black text-amber-600">הטיפ השבועי (הרציונל)</span>
                             <Lightbulb className="w-4 h-4 text-amber-500" />
                           </div>
                           <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed text-right">{obj.rationale}</p>
                        </div>
                        
                        <div className="bg-blue-50 p-4 sm:p-5 rounded-b-2xl border border-blue-200 shadow-inner flex flex-col items-end">
                           <div className="flex items-center justify-end gap-2 mb-2 w-full">
                             <span className="text-sm font-black text-blue-700">תסריט שיחה</span>
                             <MessageCircle className="w-4 h-4 text-blue-600" />
                           </div>
                           <p className="text-sm sm:text-base font-bold text-blue-900 leading-relaxed text-right">{obj.script}</p>
                        </div>

                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                <Users className="w-32 h-32 absolute -bottom-6 -left-6 opacity-10" />
                <h3 className="text-xl font-black mb-4 italic underline decoration-blue-300 decoration-2 underline-offset-4">הכוח של yes בידיים שלך</h3>
                <ul className="space-y-4 text-sm font-bold">
                  <li className="flex gap-2 justify-end items-center">כל הממירים בבית בחינם לכל החיים <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" /></li>
                  <li className="flex gap-2 justify-end items-center">הממשק המהיר ביותר (Apple TV) <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" /></li>
                  <li className="flex gap-2 justify-end items-center">הפקות המקור הטובות בישראל <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" /></li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center items-end text-right relative overflow-hidden border-r-8 border-r-emerald-500">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-black text-slate-800 mb-2">ביטחון במכירה</h3>
                <p className="text-slate-500 font-bold leading-relaxed text-xs italic">
                  זכור להדגיש: אנחנו לא חברת אפליקציה רגילה, אנחנו yes. היציבות של השידור, השירות המהיר והמותג החזק נותנים ללקוח שקט נפשי מלא. בסופו של יום, לקוחות מחפשים פתרון שעובד.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: Links (קישורים) */}
        {activeTab === 'links' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right">
             <div className="flex items-center gap-3 mb-4 justify-end">
              <h2 className="text-xl font-black text-slate-800 text-right underline decoration-blue-500 decoration-2 underline-offset-8">קישורים לאתרי החברות</h2>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 shadow-sm">
                <LinkIcon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {COMPANY_LINKS.map((company, i) => (
                <a 
                  key={i} 
                  href={company.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-white rounded-[2rem] p-6 border-2 border-slate-100 ${company.classes} shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center relative overflow-hidden`}
                >
                  <div className={`w-16 h-16 ${company.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <ExternalLink className={`w-7 h-7 ${company.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">{company.name}</h3>
                  <p className="text-sm font-bold text-slate-500">{company.desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Mobile-friendly Footer */}
      <footer className="mt-10 py-8 text-center border-t border-slate-200/60 bg-white/30 backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-200/50 rounded-full border border-slate-300/30">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[9px] font-black text-slate-500 italic uppercase tracking-widest whitespace-nowrap text-center">Sales Tool • מרץ 2026</span>
        </div>
      </footer>
    </div>
  );
}