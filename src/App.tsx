// @ts-nocheck
import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Tv, Clock, Search, ChevronDown, ChevronUp, 
  Film, Smile, Trophy, Globe, Calculator, Wallet, BarChart3, 
  HelpCircle, ShieldCheck, Star, Users, AlertTriangle, Info, Zap,
  Video, MonitorPlay, Compass, ExternalLink, Play, Music, Languages, Utensils
} from 'lucide-react';

// --- נתוני מחירים רשמיים מעודכנים ---
const PRICES = {
  base: [
    { id: 'sting_tv', name: "STING+ TV", now: 49, after: 99.9, note: "אפליקציה (עד 5 מכשירים)", color: "emerald" },
    { id: 'sting_fiber', name: "STING+ Fiber", now: 174, after: 234, note: "סיבים 1000Mb כולל נתב", color: "emerald" },
    { id: 'yes_tv', name: "yes+ TV", now: 99, after: 199, note: "Ultimate (כולל ממיר yes+)", color: "blue" },
    { id: 'yes_fiber', name: "yes+ Fiber", now: 199, after: 329, note: "טריפל סיבים חבילה מלאה", color: "blue" },
  ],
  streaming: [
    { name: "דיסני+ (Disney)", price: 49.9, icon: <Film className="w-4 h-4 text-blue-400" /> },
    { name: "נטפליקס Standard", price: 54.9, icon: <Video className="w-4 h-4 text-red-500" /> },
    { name: "נטפליקס Premium (4K)", price: 69.9, icon: <Video className="w-4 h-4 text-red-600" /> },
    { name: "Max Standard (HBO)", price: 40, icon: <Tv className="w-4 h-4 text-indigo-500" /> },
    { name: "Max Premium (4K)", price: 59, icon: <Tv className="w-4 h-4 text-indigo-700" /> },
  ],
  premium: [
    { name: "ספורט 1-4 (צ'רלטון)", price: 99.9, icon: <Trophy className="w-4 h-4 text-yellow-600" /> },
    { name: "ספורט 5 פרימיום", price: 54, icon: <Trophy className="w-4 h-4 text-orange-500" /> },
    { name: "חבילת ערוצי רוסית", price: 29.9, icon: <Globe className="w-4 h-4 text-blue-500" /> },
    { name: "VOD סרטים / ילדים", price: 19.9, icon: <Film className="w-4 h-4 text-purple-500" /> },
  ]
};

// --- מילון ערוצים מסונכרן ---
const DETAILED_CHANNELS = [
  {
    category: 'ברודקאסט וחדשות ישראל',
    icon: Tv,
    channels: [
      { name: 'כאן 11', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'קשת 12', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'רשת 13', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'עכשיו 14', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ 9', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ 24', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'i24 News עברית', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
    ]
  },
  {
    category: 'לייף סטייל, אוכל ופנאי',
    icon: Utensils,
    channels: [
      { name: 'החיים הטובים', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ האוכל', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ערוץ הטיולים', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'בית פלוס', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
    ]
  },
  {
    category: 'ספורט',
    icon: Trophy,
    channels: [
      { name: 'ספורט 5', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5 פלוס', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: '5 לייב', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'ספורט 1 (צ\'רלטון)', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: false },
      { name: 'ONE', yes: true, sting: true, hot: true, cellcom: true, partner: true, freetv: true },
      { name: 'יורוספורט 1', yes: true, sting: true, hot: true, cellcom: false, partner: false, freetv: false },
    ]
  }
];

const COMPARISON_DATA = [
  { label: "מחיר טלוויזיה (מבצע)", yes: "₪99", sting: "₪49", hot: "₪199", cellcom: "₪99", partner: "₪69" },
  { label: "מחיר אחרי שנה", yes: "₪199", sting: "₪99.9", hot: "₪219", cellcom: "₪99", partner: "₪99" },
  { label: "כל הממירים בבית", yes: "חינם", sting: "חינם", hot: "₪30/יח", cellcom: "1 חינם", partner: "₪25/יח" },
  { label: "איכות שידור (ספורט)", yes: "Low Latency", sting: "Low Latency", hot: "טובה", cellcom: "דיליי", partner: "דיליי" },
];

const OBJECTIONS = [
  { q: "למה המחיר קופץ אחרי שנה?", a: "המחיר בשנה הראשונה הוא הטבת הצטרפות. גם במחיר המלא, בזכות הממירים שהם בחינם ללא הגבלה, אנחנו נשארים ההצעה המשתלמת ביותר." },
  { q: "קיבלתי הצעה זולה יותר מהמתחרה.", a: "בדוק אם המחיר כולל את כל הטלוויזיות בבית. מתחרים נוהגים לפרסם מחיר למסך אחד, ועל כל מסך נוסף גובים דמי שכירות חודשיים. אצלנו המחיר הוא לכל הבית." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator');
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
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600">מרץ 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Responsive Tabs */}
      <nav className="max-w-4xl mx-auto px-2 sm:px-6 mt-6 z-10 relative">
        <div className="bg-white/70 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-sm flex gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'calculator', icon: Calculator, label: 'מחירון' },
            { id: 'channels', icon: Tv, label: 'ערוצים' },
            { id: 'comparison', icon: BarChart3, label: 'חברות' },
            { id: 'highlights', icon: ShieldCheck, label: 'טיפול' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 rounded-xl font-bold text-[11px] sm:text-sm transition-all duration-200 ${
                activeTab === tab.id 
                ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 mt-6 sm:mt-10 z-10 relative pb-20">
        
        {/* TAB: Calculator & Pricing */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Calculator Card - First on Mobile via lg:order-last */}
            <div className="lg:col-span-4 lg:order-last">
              <div className="bg-slate-900 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl sticky top-24 border border-slate-800">
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

            {/* Pricing Section - Second on Mobile via lg:order-first */}
            <div className="lg:col-span-8 lg:order-first space-y-6 sm:y-8">
              <section>
                <div className="flex items-center gap-3 mb-4 sm:mb-6 justify-end text-right">
                  <h2 className="text-lg font-black text-slate-800">חבילות בסיס וסיבים</h2>
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                    <Wallet className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRICES.base.map((p) => (
                    <div key={p.id} className="group bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all text-right">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-right">
                          <div className={`text-[9px] font-black px-2 py-0.5 rounded-full mb-2 inline-block ${p.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            {p.color === 'emerald' ? 'STING+' : 'yes+'}
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-slate-800 leading-tight">{p.name}</h3>
                          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1">{p.note}</p>
                        </div>
                        <div className="text-left shrink-0">
                          <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none">₪{p.now}</div>
                          <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">לחודש</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between flex-row-reverse">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500">בתום שנה</span>
                        <div className="flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100">
                          <span className="text-xs sm:text-sm font-black text-red-600">₪{p.after}</span>
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <section className="bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                  <h3 className="text-xs sm:text-sm font-black text-slate-400 mb-4 flex items-center justify-end gap-2 text-right">
                     סטרימינג ו-VOD <MonitorPlay className="w-4 h-4" />
                  </h3>
                  <div className="space-y-2">
                    {PRICES.streaming.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 text-right">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-white rounded-lg border border-slate-100 flex items-center justify-center shadow-sm">
                            {s.icon}
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-700">{s.name}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-blue-600">₪{s.price}</span>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                  <h3 className="text-xs sm:text-sm font-black text-slate-400 mb-4 flex items-center justify-end gap-2 text-right">
                    ערוצי פרימיום <Trophy className="w-4 h-4" />
                  </h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {PRICES.premium.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-right">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-white rounded-lg border border-slate-100 flex items-center justify-center shadow-sm text-blue-600">
                            {p.icon}
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-700">{p.name}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-black text-blue-600">₪{p.price}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Channel Comparison */}
        {activeTab === 'channels' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 text-right">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="חפש ערוץ..."
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

        {/* Other tabs remain largely the same but with mobile-optimized spacing */}
        {activeTab === 'comparison' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 text-right">
            <div className="flex items-center gap-3 mb-2 justify-end">
              <h2 className="text-lg font-black text-slate-800 text-right underline decoration-blue-500 decoration-2 underline-offset-8">השוואת חברות</h2>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden border-t-4 border-t-blue-600">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-center">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="p-4 text-right text-[10px] font-black text-slate-400 uppercase border-l border-slate-100">קריטריון</th>
                      <th className="p-4 text-center text-[10px] font-black text-blue-700 bg-blue-50/40">yes+</th>
                      <th className="p-4 text-center text-[10px] font-black text-emerald-700 bg-emerald-50/40">STING+</th>
                      <th className="p-4 text-center text-[10px] font-black text-slate-600">HOT</th>
                      <th className="p-4 text-center text-[10px] font-black text-slate-600">סלקום</th>
                      <th className="p-4 text-center text-[10px] font-black text-slate-600">פרטנר</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-[11px] font-black text-slate-500 border-l border-slate-100 text-right">{row.label}</td>
                        <td className="p-4 text-center font-black text-blue-900 bg-blue-50/10 text-xs">{row.yes}</td>
                        <td className="p-4 text-center font-black text-emerald-900 bg-emerald-50/10 text-xs">{row.sting}</td>
                        <td className="p-4 text-center font-bold text-slate-700 text-xs">{row.hot}</td>
                        <td className="p-4 text-center font-bold text-slate-700 text-xs">{row.cellcom}</td>
                        <td className="p-4 text-center font-bold text-slate-700 text-xs">{row.partner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'highlights' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                <Users className="w-32 h-32 absolute -bottom-6 -left-6 opacity-10" />
                <h3 className="text-xl font-black mb-4 italic underline decoration-blue-300 decoration-2 underline-offset-4">הכוח של yes בידיים שלך</h3>
                <ul className="space-y-4 text-sm font-bold">
                  <li className="flex gap-2 justify-end items-center">כל הממירים בחינם לכל החיים <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" /></li>
                  <li className="flex gap-2 justify-end items-center">הממשק המהיר ביותר (Apple TV) <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" /></li>
                  <li className="flex gap-2 justify-end items-center">הפקות המקור הטובות בישראל <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 shrink-0" /></li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center items-end text-right relative overflow-hidden border-r-8 border-r-emerald-500">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-lg font-black text-slate-800 mb-2">ביטחון במכירה</h3>
                <p className="text-slate-500 font-bold leading-relaxed text-xs italic">
                  זכור להדגיש: אנחנו לא חברת אפליקציה רגילה, אנחנו yes. היציבות של השידור, השירות המהיר והמותג החזק נותנים ללקוח שקט נפשי מלא.
                </p>
              </div>
            </div>

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
                      {openObjection === i ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-300" />}
                      <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{obj.q}</span>
                    </button>
                    {openObjection === i && (
                      <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300 text-right">
                        <div className="bg-blue-50 p-4 rounded-2xl border-r-4 border-blue-600 shadow-inner">
                          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">{obj.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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