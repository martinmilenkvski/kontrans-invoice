"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Ship, 
  MapPin, 
  Package, 
  DollarSign, 
  ShieldAlert, 
  Copy, 
  CheckCircle2, 
  Printer, 
  PenSquare, 
  Plus, 
  Trash2, 
  Settings, 
  Info, 
  Box, 
  ThermometerSnowflake, 
  Layers, 
  Globe, 
  Truck, 
  ArrowLeft 
} from 'lucide-react';

const InputField = ({ value, onChange, className = "", type = "text", placeholder = "" }: any) => (
  <div className="relative group flex-1">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-transparent border-b border-transparent group-hover:border-blue-300 focus:border-blue-600 outline-none transition-colors py-0.5 ${className}`}
    />
    <PenSquare className="w-3 h-3 text-gray-300 absolute right-0 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none print:hidden" />
  </div>
);

const AutoTextArea = ({ value, onChange, className = "", minRows = 1 }: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <div className="relative group w-full flex-1 h-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className={`w-full h-full bg-transparent border border-transparent group-hover:border-blue-200 focus:border-blue-500 rounded p-1 outline-none transition-colors resize-none overflow-hidden ${className}`}
        rows={minRows}
      />
      <PenSquare className="w-3 h-3 text-gray-300 absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none print:hidden" />
    </div>
  );
};

// --- DICTIONARIES & PRESETS ---

const TRANSLATIONS: any = {
  mk: {
    appTitle: "ПОНУДА ЗА ТРАНСПОРТ",
    ref: "Реф:",
    date: "Датум:",
    validUntil: "Важи до:",
    pol: "Утовар (POL)",
    incoterms: "Инкотермс",
    cargoSpecs: "Карактеристики на товарот",
    equipment: "Опрема",
    commodity: "Вид на стока",
    grossWeight: "Бруто Теж.",
    volume: "Волумен",
    optionsAndCosts: "Опции и Трошоци",
    addRoute: "додади рута",
    podDest: "POD / Дестинација",
    oceanFreight: "1. Возарина",
    thcTruck: "2. THC & Транспорт",
    blFee: "3. BL Fee",
    transit: "Транзит",
    included: "Вклучено во понудата:",
    excluded: "Не е вклучено:",
    legalNotes: "Општи Напомени",
    dispositionTitle: "ДИСПОЗИЦИЈА",
    dispositionText: "Ја прифаќаме Вашата понуда (доколку има повеќе, ве молиме означете ја избраната опција) и Ви даваме налог за реализација на транспортот.",
    placeDate: "Место и Датум",
    stampSign: "Печат и Потпис",
    emailGreeting: "Здраво,",
    emailBodyPrefix: "Повели подолу нашата понуда:",
    emailValidity: "Валидност:",
    emailIncluded: "Понудата вклучува:",
    emailExcluded: "Во цената не е вклучено:",
    emailFooter: "За сите дополнителни информации Ви стоиме на располагање.\nИмајте убав ден!",
    truckFreight: "1. Камионски Транспорт",
    truckingExtra: "2. Дополнителни трошоци",
    adminFee: "3. Админ / Документи"
  },
  en: {
    appTitle: "TRANSPORT QUOTATION",
    ref: "Ref:",
    date: "Date:",
    validUntil: "Valid until:",
    pol: "Loading Port (POL)",
    incoterms: "Incoterms",
    cargoSpecs: "Cargo Specifications",
    equipment: "Equipment",
    commodity: "Commodity",
    grossWeight: "Gross Wt.",
    volume: "Volume",
    optionsAndCosts: "Options & Costs",
    addRoute: "add route",
    podDest: "POD / Destination",
    oceanFreight: "1. Ocean Freight",
    thcTruck: "2. THC & Transport",
    blFee: "3. BL Fee",
    transit: "Transit",
    included: "Included in the quote:",
    excluded: "Not included:",
    legalNotes: "General Terms",
    dispositionTitle: "DISPOSITION",
    dispositionText: "We accept your offer (if multiple options, please select one) and order the execution of the transport.",
    placeDate: "Place and Date",
    stampSign: "Stamp and Signature",
    emailGreeting: "Hello,",
    emailBodyPrefix: "Please find our quotation below:",
    emailValidity: "Validity:",
    emailIncluded: "The offer includes:",
    emailExcluded: "Not included in the price:",
    emailFooter: "We remain at your disposal for any further information.\nHave a great day!",
    truckFreight: "1. Truck Transport",
    truckingExtra: "2. Additional Costs",
    adminFee: "3. Admin / Docs"
  }
};

const COMMON_TEXTS: any = {
  mk: {
    note1Title: "Важни Информации & Рутинг",
    note1Content: "** Плаќање на фактурата за транспорт пред подигање на контејнерите од Пристаниште Солун.\nИнформациите за рутингот и траењето на патувањето се темелат на про-форма распоред на пловидба и бродарот го задржува правото на промена без претходна најава.",
    note3Title: "Општи Напомени (General Average & Осигурување)",
    note3Content: "*Општи напомени: Према поморското право секоја поединечна пловидба се смета како заедничка на сопственикот на бродот и сите останати сопственици на робата товарена на бродот. За време на пловидбата во случај на хаварија или дефект на бродот, према точно утврдени критериуми, Бродарот има право да објави Генерална Хаварија (General Average). Иако во најголем број случаи не постои опасност бродот да потоне или да го изгуби товарот, Бродарот го користи своето право да ги задолжи сопствениците на роба да учествуваат во трошоците на хаваријата односно поправка на бродот. General Average Adjuster/водителот на хаваријата (неутрална лиценцирана куќа) во Пристаништето на претовар, става забрана за понатамошен транспорт на сите контејнери додека:\n1. За сите пратки чии сопственици го осигурале товарот (каргото), нивните Осигурувачи не потпишат Average Guarantee/Bond (гаранција дека осигурителната куќа по основа на Полисата за осигурување ќе учествуваат во трошоците на хаваријата) после што контејнерите се ослободуваат да продолжат до крајната транспортна дестинација.\n2. За пратки за кои нема карго осигурување нивните сопственици депонираат парични депозити или банкарски гаранции. Процесот на ликвидација на Генералната хаварија во просек трае најмалку година, две па и повеќе а износот на депозитот или банкарската гаранција се движи од 10% од вредноста на робата па нагоре.\n\nОсигурувањето на робата не е обавезно но го препорачуваме како многу поволен инструмент за заштита на ВАШИОТ КАПИТАЛ. Стапката на осигурување зависи од видот на робата. Ако сакате понуда за осигурување, треба да се достави информација за видот и вредноста на робата.",
    incData: "- Поморска возарина од предметното пристаниште до Солун.\n- THC Солун (Манипулација и транзитно царински формалности во Пристаниште Солун)\n- ISPS\n- CMR осигурување на камионскиот транспорт до Скопје\n- Камионски транспорт на полниот контејнер од Пристаниште и враќање на празниот до истото.",
    excData: "- Карго осигурување * погледнете објаснување подолу\n- Увозно/Извозно царинење\n- Евентуална инспекција (царинска/фито/ветеринарна)\n- Трошок за Фитосанитарен преглед ако робата подлежи на истото",
    truckNote3Title: "Општи Напомени (CMR & Осигурување)",
    truckNote3Content: "*Општи напомени: Транспортот се одвива исклучиво според одредбите на меѓународната CMR конвенција. Одговорноста на превозникот е ограничена согласно истата. За целосна заштита на ВАШИОТ КАПИТАЛ, строго препорачуваме дополнително Карго осигурување на стоката за време на транспортот.",
    truckIncData: "- Камионски транспорт од место на утовар до место на истовар\n- CMR осигурување на стоката\n- Патарини и транзитни такси",
    truckExcData: "- Карго осигурување на стоката\n- Увозно/Извозно царинење\n- Трошоци за задржување на камионот (стојнина)\n- Трошоци за истовар или претовар"
  },
  en: {
    note1Title: "Important Routing Information",
    note1Content: "** Payment of the transport invoice must be settled before picking up the containers from the Port of Thessaloniki.\nInformation on the routing and transit time is based on the carrier's pro-forma sailing schedule, and the Carrier reserves the right to change it without prior notice.",
    note3Title: "General Terms (General Average & Insurance)",
    note3Content: "*General remarks: According to maritime law, every individual voyage is considered a joint venture between the shipowner and all other owners of the cargo loaded on the ship. During the voyage, in the event of an accident or defect of the ship, according to strictly determined criteria, the Shipowner has the right to declare General Average. Although in most cases there is no danger of the ship sinking or losing the cargo, the Shipowner uses their right to oblige the cargo owners to participate in the costs of the average, i.e., repair of the ship. The General Average Adjuster (a neutral licensed house) at the transshipment port places a ban on further transport of all containers until:\n1. For all shipments whose owners have insured the cargo, their Insurers sign an Average Guarantee/Bond (a guarantee that the insurance company will participate in the average costs based on the Insurance Policy), after which the containers are released to continue to their final destination.\n2. For shipments without cargo insurance, their owners must deposit cash or bank guarantees. The process of liquidation of the General Average usually takes at least a year or more, and the amount of the deposit or bank guarantee ranges from 10% of the value of the goods upwards.\n\nCargo insurance is not mandatory, but we strongly recommend it as a highly favorable instrument to protect YOUR CAPITAL. The insurance rate depends on the type of goods. If you would like an insurance quote, please provide information on the type and value of the goods.",
    incData: "- Ocean freight from the subject port to Thessaloniki.\n- THC Thessaloniki (Handling and transit customs formalities in Port of Thessaloniki)\n- ISPS\n- CMR insurance for truck transport to Skopje\n- Truck transport of the full container from the Port and return of the empty one to the same.",
    excData: "- Cargo insurance * see explanation below\n- Import/Export customs clearance\n- Possible inspections (customs/phyto/veterinary)\n- Cost for Phytosanitary inspection if the goods are subject to it",
    truckNote3Title: "General Terms (CMR & Insurance)",
    truckNote3Content: "*General remarks: Transport is carried out strictly in accordance with the provisions of the international CMR convention. Carrier liability is limited accordingly. For full protection of YOUR CAPITAL, we strongly recommend additional Cargo insurance for the goods during transport.",
    truckIncData: "- Truck transport from place of loading to place of unloading\n- CMR insurance of goods\n- Tolls and transit fees",
    truckExcData: "- Cargo insurance\n- Import/Export customs clearance\n- Truck waiting time costs (demurrage)\n- Unloading or transshipment costs"
  }
};

const PRESETS: any = {
  dry: {
    mk: { cargo: { type: "40' HC (Dry)", commodity: "Генерална стока", weight: "18000 кг", volume: "68 CBM" }, customNote2: { title: "Дополнителни трошоци", content: "" } },
    en: { cargo: { type: "40' HC (Dry)", commodity: "General Cargo", weight: "18000 kg", volume: "68 CBM" }, customNote2: { title: "Additional Costs", content: "" } }
  },
  reefer: {
    mk: {
      cargo: { type: "40' HRF (Фриго)", commodity: "Замрзната стока", weight: "22000 кг", volume: "60 CBM" },
      customNote2: { title: "Стандардни Фриго Трошоци", content: "* Иницијално вклучување со електричен систем Euro 165/40'RF (3 дена се вклучени)\nСледува по 55 ЕUR на ден\n\n(Вкупните трошоци со вклучен камионски превоз и фриго обично изнесуваат околу +- 1800 EUR)" }
    },
    en: {
      cargo: { type: "40' HRF (Reefer)", commodity: "Frozen Goods", weight: "22000 kg", volume: "60 CBM" },
      customNote2: { title: "Standard Reefer Costs", content: "* Initial plug-in to electrical system Euro 165/40'RF (3 days included)\nFollowed by 55 EUR per day\n\n(Total costs including truck transport and frigo usually amount to around +- 1800 EUR)" }
    }
  },
  lcl: {
    mk: {
      cargo: { type: "Збирен (LCL)", commodity: "Генерален товар", weight: "3379 кг", volume: "8.6 CBM" },
      customNote2: { title: "Дестинациски трошоци (ЈЦС)", content: "- Трошоци во ЈЦС Скопје до 7 дена од истовар: 4900 денари\n- Пријавување на стоката ДЕД: 1420 денари" }
    },
    en: {
      cargo: { type: "LCL Cargo", commodity: "General Cargo", weight: "3379 kg", volume: "8.6 CBM" },
      customNote2: { title: "Destination Charges (CFS)", content: "- CFS Charges Skopje up to 7 days from discharge: 4900 MKD\n- Customs declaration (DED): 1420 MKD" }
    }
  },
  trucking: {
    mk: {
      cargo: { type: "Шлепер (FTL)", commodity: "Генерална стока", weight: "24000 кг", volume: "90 CBM" },
      customNote2: { title: "Стојнина (Waiting Time)", content: "* Слободно време за утовар/истовар е 24 часа.\nЗадржување надвор од слободното време се наплаќа 150 EUR/ден." }
    },
    en: {
      cargo: { type: "Truck (FTL)", commodity: "General Cargo", weight: "24000 kg", volume: "90 CBM" },
      customNote2: { title: "Waiting Time (Demurrage)", content: "* Free time for loading/unloading is 24 hours.\nWaiting time beyond free time is charged 150 EUR/day." }
    }
  }
};

// Lifehack: Smart translation for dynamic user inputs so we don't lose numbers
const translateDynamicText = (text: string, toLang: string) => {
  if (!text) return text;
  let res = text;
  if (toLang === 'en') {
    res = res.replace(/Солун/g, 'Thessaloniki')
             .replace(/Скопје/g, 'Skopje')
             .replace(/Дена/g, 'Days')
             .replace(/Ново Пристаниште/g, 'New Port')
             .replace(/Нова Дестинација/g, 'New Destination');
  } else {
    res = res.replace(/Thessaloniki/g, 'Солун')
             .replace(/Skopje/g, 'Скопје')
             .replace(/Days/g, 'Дена')
             .replace(/New Port/g, 'Ново Пристаниште')
             .replace(/New Destination/g, 'Нова Дестинација');
  }
  return res;
};

export default function OffersPage() {
  const [copied, setCopied] = useState(false);
  const [activeMode, setActiveMode] = useState('dry');
  const [lang, setLang] = useState('mk');

  const [quoteData, setQuoteData] = useState({
    ref: "ПОН-01290-26",
    date: new Date().toLocaleDateString('mk-MK'),
    validUntil: "28/02",
    pol: "Shanghai/Ningbo/Tianjin",
    cargo: PRESETS.dry.mk.cargo,
    options: [
      {
        id: 1,
        pod: "Солун",
        finalDest: "Скопје",
        freight: "USD 1970",
        localTrucking: "EUR 1120", 
        blFee: "EUR 25", 
        transitTime: "35 Дена",
      }
    ],
    customNote1: { title: COMMON_TEXTS.mk.note1Title, content: COMMON_TEXTS.mk.note1Content },
    customNote2: PRESETS.dry.mk.customNote2,
    customNote3: { title: COMMON_TEXTS.mk.note3Title, content: COMMON_TEXTS.mk.note3Content },
    terms: {
      incoterms: "FOB -> FOB / DAP",
      included: COMMON_TEXTS.mk.incData,
      exclusions: COMMON_TEXTS.mk.excData
    }
  });

  const t = TRANSLATIONS[lang];

  // Apply Mode & Language simultaneously
  const updateQuotePresets = (newMode: string, newLang: string) => {
    setActiveMode(newMode);
    setLang(newLang);
    setQuoteData(prev => ({
      ...prev,
      cargo: { ...PRESETS[newMode][newLang].cargo },
      options: prev.options.map(opt => ({
        ...opt,
        pod: translateDynamicText(opt.pod, newLang),
        finalDest: translateDynamicText(opt.finalDest, newLang),
        transitTime: translateDynamicText(opt.transitTime, newLang)
      })),
      customNote1: { title: COMMON_TEXTS[newLang].note1Title, content: COMMON_TEXTS[newLang].note1Content },
      customNote2: { ...PRESETS[newMode][newLang].customNote2 },
      customNote3: { 
        title: newMode === 'trucking' ? COMMON_TEXTS[newLang].truckNote3Title : COMMON_TEXTS[newLang].note3Title, 
        content: newMode === 'trucking' ? COMMON_TEXTS[newLang].truckNote3Content : COMMON_TEXTS[newLang].note3Content 
      },
      terms: {
        ...prev.terms,
        included: newMode === 'trucking' ? COMMON_TEXTS[newLang].truckIncData : COMMON_TEXTS[newLang].incData,
        exclusions: newMode === 'trucking' ? COMMON_TEXTS[newLang].truckExcData : COMMON_TEXTS[newLang].excData
      }
    }));
  };

  const handleNestedChange = (category: string, field: string, value: string) => {
    setQuoteData((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleOptionChange = (id: number, field: string, value: string) => {
    setQuoteData(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id === id ? { ...opt, [field]: value } : opt)
    }));
  };

  const addOption = () => {
    setQuoteData(prev => ({
      ...prev,
      options: [
        ...prev.options, 
        { 
          id: Date.now(), 
          pod: lang === 'mk' ? "Ново Пристаниште" : "New Port", 
          finalDest: lang === 'mk' ? "Нова Дестинација" : "New Destination", 
          freight: "USD 0", 
          localTrucking: "EUR 0", 
          blFee: "EUR 25", 
          transitTime: lang === 'mk' ? "30 Дена" : "30 Days" 
        }
      ]
    }));
  };

  const removeOption = (id: number) => {
    if (quoteData.options.length === 1) return;
    setQuoteData(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== id)
    }));
  };

  // HYBRID EMAIL GENERATOR WITH TRANSLATION SUPPORT
  const generateEmailText = () => {
    const optionsText = quoteData.options.map((opt, index) => {
      if (activeMode === 'trucking') {
        return `
1. ${t.truckFreight.split('.')[1].trim()} ${quoteData.pol} - ${opt.pod} .......... ${opt.freight}/${quoteData.cargo.type.split(' ')[0]}
2. ${t.truckingExtra.split('.')[1].trim()} ..... ${opt.localTrucking}/${quoteData.cargo.type.split(' ')[0]}
3. ${t.adminFee.split('.')[1].trim()} ..... ${opt.blFee}
-------------------------------------------------------------------------
${t.transit}: ${opt.transitTime}
`;
      } else {
        return `
1. ${t.oceanFreight.split('.')[1].trim()} FOB ${quoteData.pol} - FOB ${opt.pod} .......... ${opt.freight}/${quoteData.cargo.type.split(' ')[0]}
2. THC ${opt.pod} & Transport -> ${opt.finalDest} ..... ${opt.localTrucking}/${quoteData.cargo.type.split(' ')[0]}
3. BL fee ..... ${opt.blFee}
-------------------------------------------------------------------------
${t.transit}: ${opt.transitTime}
`;
      }
    }).join('');

    const note1Block = quoteData.customNote1.content.trim() ? `\n${quoteData.customNote1.content}\n` : "";
    const note2Block = quoteData.customNote2.content.trim() ? `\n${quoteData.customNote2.title.toUpperCase()}:\n****************************************************\n${quoteData.customNote2.content}\n****************************************************\n` : "";
    const note3Block = quoteData.customNote3.content.trim() ? `\n${quoteData.customNote3.content}\n` : "";

    return `${t.emailGreeting}

${t.emailBodyPrefix}

-----------------------------------------------------------------------${optionsText}${note1Block}${note2Block}
* ${t.emailValidity} ${quoteData.validUntil}

${t.emailIncluded}
${quoteData.terms.included}

${t.emailExcluded}
${quoteData.terms.exclusions}
${note3Block}
${t.emailFooter}`.trim();
  };

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = generateEmailText();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-0 md:py-8 font-sans flex flex-col items-center print:bg-white print:py-0">
      
      {/* A4 Paper Container */}
      <div className="w-full max-w-[210mm] bg-white shadow-2xl print:shadow-none mx-auto min-h-[297mm] flex flex-col relative transition-all">
        
        {/* NON-PRINTABLE CONTROL BAR */}
        <div className="bg-[#111111] border-b border-white/5 p-4 flex flex-col lg:flex-row justify-between items-center text-white print:hidden gap-4 sticky top-0 z-50">
          
          <div className="flex gap-4 items-center w-full lg:w-auto">
            <Link href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
              <ArrowLeft className="w-4 h-4 text-white/60 group-hover:text-white" />
            </Link>

            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {/* Mode Switcher */}
              <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                <button onClick={() => updateQuotePresets('dry', lang)} title="Dry Container" className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg transition-all ${activeMode === 'dry' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  <Box className="w-3 h-3" /> DRY
                </button>
                <button onClick={() => updateQuotePresets('reefer', lang)} title="Reefer Container" className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg transition-all ${activeMode === 'reefer' ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  <ThermometerSnowflake className="w-3 h-3" /> REEFER
                </button>
                <button onClick={() => updateQuotePresets('lcl', lang)} title="Less than Container Load" className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg transition-all ${activeMode === 'lcl' ? 'bg-purple-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  <Layers className="w-3 h-3" /> LCL
                </button>
                <button onClick={() => updateQuotePresets('trucking', lang)} title="Road Transport" className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-lg transition-all ${activeMode === 'trucking' ? 'bg-amber-600 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  <Truck className="w-3 h-3" /> TRUCK
                </button>
              </div>

              {/* Language Switcher */}
              <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-white">
                <button onClick={() => updateQuotePresets(activeMode, 'mk')} className={`flex items-center gap-1 px-3 py-1.5 text-[0.65rem] font-black rounded-lg transition-all ${lang === 'mk' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  MK
                </button>
                <button onClick={() => updateQuotePresets(activeMode, 'en')} className={`flex items-center gap-1 px-3 py-1.5 text-[0.65rem] font-black rounded-lg transition-all ${lang === 'en' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  EN
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0 w-full lg:w-auto">
            <button onClick={handleCopy} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-[0.65rem] font-black uppercase tracking-widest rounded-xl border border-blue-500/20 transition-all">
              {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              Копирај Е-маил
            </button>
            <button onClick={() => window.print()} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#D42B2B] hover:bg-[#b02222] text-white text-[0.65rem] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#D42B2B]/20">
              <Printer className="w-3 h-3" />
              Печати A4
            </button>
          </div>
        </div>

        {/* PRINTABLE A4 CONTENT */}
        <div className="p-10 md:p-14 flex-1 flex flex-col text-slate-900 border-[12px] border-transparent">
          
          {/* Logo / Branding Header */}
          <div className="flex justify-between items-end mb-10">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-[0.12em] uppercase text-slate-900">
                KON<span className="text-[#D42B2B]">TRANS</span>
              </span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#D42B2B]" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              International Cargo Logistics
            </div>
          </div>

          {/* Title Section */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">{t.appTitle}</h1>
              <div className="flex items-center text-[10px] font-black text-slate-400 gap-1 uppercase tracking-widest">
                {t.ref} <InputField className="w-32 font-black text-slate-900" value={quoteData.ref} onChange={(e: any) => setQuoteData({...quoteData, ref: e.target.value})} />
              </div>
            </div>
            <div className="text-right text-[10px]">
              <div className="flex justify-end items-center gap-3 mb-1.5">
                <span className="font-bold text-slate-400 uppercase tracking-widest">{t.date}</span>
                <InputField className="w-24 text-right font-bold" value={quoteData.date} onChange={(e: any) => setQuoteData({...quoteData, date: e.target.value})} />
              </div>
              <div className="flex justify-end items-center gap-3">
                <span className="font-bold text-slate-400 uppercase tracking-widest">{t.validUntil}</span>
                <InputField className="w-24 text-right font-bold text-[#D42B2B]" value={quoteData.validUntil} onChange={(e: any) => setQuoteData({...quoteData, validUntil: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1 mb-8">
            
            {/* Cargo & POL Setup */}
            <div className="col-span-2 grid grid-cols-3 gap-6">
              <div className="col-span-1 border-l-[3px] border-[#D42B2B] pl-4 bg-slate-50/50 py-3 rounded-r print:bg-transparent">
                <label className="text-[9px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-2 mb-1">
                  <MapPin className="w-3 h-3 text-[#D42B2B]"/> {t.pol}
                </label>
                <InputField className="font-bold text-[13px] text-slate-900" value={quoteData.pol} onChange={(e: any) => setQuoteData({...quoteData, pol: e.target.value})} />
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <label className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1 block">{t.incoterms}</label>
                  <InputField className="text-[11px] text-slate-700 font-bold" value={quoteData.terms.incoterms} onChange={(e: any) => handleNestedChange('terms', 'incoterms', e.target.value)} />
                </div>
              </div>
              
              <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-transparent print:border-slate-300">
                <label className="text-[10px] text-slate-900 uppercase font-black tracking-[0.1em] flex items-center gap-2 mb-3 border-b border-slate-200 pb-2 print:border-slate-300">
                  <Package className="w-4 h-4 text-[#D42B2B]"/> {t.cargoSpecs}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">{t.equipment}</label>
                    <InputField className={`font-black text-[11px] ${activeMode === 'reefer' ? 'text-emerald-600' : activeMode === 'lcl' ? 'text-purple-600' : activeMode === 'trucking' ? 'text-amber-600' : 'text-blue-600'}`} value={quoteData.cargo.type} onChange={(e: any) => handleNestedChange('cargo', 'type', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">{t.commodity}</label>
                    <InputField className="font-black text-[11px]" value={quoteData.cargo.commodity} onChange={(e: any) => handleNestedChange('cargo', 'commodity', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">{t.grossWeight}</label>
                    <InputField className="font-black text-[11px]" value={quoteData.cargo.weight} onChange={(e: any) => handleNestedChange('cargo', 'weight', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1 block">{t.volume}</label>
                    <InputField className="font-black text-[11px]" value={quoteData.cargo.volume} onChange={(e: any) => handleNestedChange('cargo', 'volume', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="col-span-2 print:break-inside-avoid">
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-3 flex justify-between items-center bg-slate-50 px-4 py-2 rounded-t-lg border-x border-t border-slate-200 print:bg-transparent">
                <span className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-[#D42B2B]"/> {t.optionsAndCosts}</span>
                <button onClick={addOption} className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 print:hidden cursor-pointer bg-white px-3 py-1 rounded-lg border border-blue-200 transition-all text-[9.5px] lowercase font-bold">
                  <Plus className="w-3 h-3" /> {t.addRoute}
                </button>
              </h2>
              
              <div className="border border-slate-200 rounded-b-lg overflow-hidden bg-white shadow-sm print:shadow-none">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#F8FAFC] text-slate-400 uppercase text-[8.5px] font-black tracking-widest print:bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 border-b border-slate-200 w-1/5">{t.podDest}</th>
                      <th className="px-5 py-3 border-b border-slate-200">{activeMode === 'trucking' ? t.truckFreight : t.oceanFreight}</th>
                      <th className="px-5 py-3 border-b border-slate-200">{activeMode === 'trucking' ? t.truckingExtra : t.thcTruck}</th>
                      <th className="px-5 py-3 border-b border-slate-200">{activeMode === 'trucking' ? t.adminFee : t.blFee}</th>
                      <th className="px-5 py-3 border-b border-slate-200">{t.transit}</th>
                      <th className="w-10 border-b border-slate-200 print:hidden text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteData.options.map((opt, i) => (
                      <tr key={opt.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors group print:hover:bg-transparent">
                        <td className="px-5 py-4 align-top">
                          <InputField className="font-bold text-slate-900 text-[11.5px]" placeholder="POD" value={opt.pod} onChange={(e: any) => handleOptionChange(opt.id, 'pod', e.target.value)} />
                          <InputField className="text-slate-400 font-bold mt-1 text-[9px]" placeholder="Final Dest" value={opt.finalDest} onChange={(e: any) => handleOptionChange(opt.id, 'finalDest', e.target.value)} />
                        </td>
                        <td className="px-5 py-4 align-top font-black text-slate-800">
                          <InputField value={opt.freight} onChange={(e: any) => handleOptionChange(opt.id, 'freight', e.target.value)} />
                        </td>
                        <td className="px-5 py-4 align-top font-bold text-slate-600">
                          <InputField value={opt.localTrucking} onChange={(e: any) => handleOptionChange(opt.id, 'localTrucking', e.target.value)} />
                        </td>
                        <td className="px-5 py-4 align-top font-bold text-slate-600">
                          <InputField value={opt.blFee} onChange={(e: any) => handleOptionChange(opt.id, 'blFee', e.target.value)} />
                        </td>
                        <td className="px-5 py-4 align-top">
                          <InputField className="text-slate-500 font-bold" value={opt.transitTime} onChange={(e: any) => handleOptionChange(opt.id, 'transitTime', e.target.value)} />
                        </td>
                        <td className="px-5 py-4 align-middle print:hidden text-center">
                          {quoteData.options.length > 1 && (
                            <button onClick={() => removeOption(opt.id)} className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="col-span-2 grid grid-cols-2 gap-8 print:break-inside-avoid">
              <div className="flex flex-col">
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.included}
                </h3>
                <AutoTextArea 
                  value={quoteData.terms.included} 
                  onChange={(e: any) => handleNestedChange('terms', 'included', e.target.value)} 
                  className="text-[10px] text-slate-600 leading-relaxed font-medium"
                  minRows={5}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-[#D42B2B]" /> {t.excluded}
                </h3>
                <AutoTextArea 
                  value={quoteData.terms.exclusions} 
                  onChange={(e: any) => handleNestedChange('terms', 'exclusions', e.target.value)} 
                  className="text-[10px] text-slate-600 leading-relaxed font-medium"
                  minRows={5}
                />
              </div>
            </div>

            {/* Chameleon Notes 1 & 2 */}
            <div className="col-span-2 grid grid-cols-2 gap-8 print:break-inside-avoid px-1">
              
              <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100 print:border-slate-200 print:bg-transparent flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2.5 border-b border-blue-50 print:border-slate-100 pb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <InputField 
                    className="text-[10px] font-black text-blue-800 uppercase tracking-wider" 
                    value={quoteData.customNote1.title} 
                    onChange={(e: any) => handleNestedChange('customNote1', 'title', e.target.value)} 
                  />
                </div>
                <AutoTextArea 
                  value={quoteData.customNote1.content} 
                  onChange={(e: any) => handleNestedChange('customNote1', 'content', e.target.value)} 
                  className="text-[10px] text-slate-700 font-semibold leading-relaxed"
                />
              </div>

              <div className={`p-4 rounded-2xl border flex flex-col h-full print:bg-transparent transition-colors ${activeMode === 'reefer' ? 'border-emerald-100 bg-emerald-50/30 print:border-slate-200' : 'border-slate-200 bg-slate-50/50 print:border-slate-200'}`}>
                 <div className={`flex items-center gap-2 mb-2.5 border-b pb-2 ${activeMode === 'reefer' ? 'border-emerald-50 print:border-slate-100' : 'border-slate-100'}`}>
                  <Settings className={`w-4 h-4 ${activeMode === 'reefer' ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <InputField 
                    className={`text-[10px] font-black uppercase tracking-wider ${activeMode === 'reefer' ? 'text-emerald-800' : 'text-slate-900'}`} 
                    value={quoteData.customNote2.title} 
                    onChange={(e: any) => handleNestedChange('customNote2', 'title', e.target.value)} 
                    placeholder="Note Title"
                  />
                </div>
                <AutoTextArea 
                  value={quoteData.customNote2.content} 
                  onChange={(e: any) => handleNestedChange('customNote2', 'content', e.target.value)} 
                  className={`text-[10px] font-bold leading-relaxed flex-1 ${activeMode === 'reefer' ? 'text-emerald-900' : 'text-slate-500'}`}
                  placeholder="..."
                />
              </div>

            </div>

            {/* Note 3 */}
            <div className="col-span-2 print:break-inside-avoid mt-2 border-t-2 border-slate-900 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-[#D42B2B]"/>
                <InputField 
                  className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]" 
                  value={quoteData.customNote3.title} 
                  onChange={(e: any) => handleNestedChange('customNote3', 'title', e.target.value)} 
                />
              </div>
              <div className="bg-slate-50 print:bg-transparent p-4 rounded-2xl border border-slate-100 print:border-none print:p-0 shadow-inner print:shadow-none">
                <AutoTextArea 
                  value={quoteData.customNote3.content} 
                  onChange={(e: any) => handleNestedChange('customNote3', 'content', e.target.value)} 
                  className="text-[8.5px] leading-[1.6] text-slate-500 font-medium text-justify"
                  minRows={8}
                />
              </div>
            </div>

          </div>

          {/* Disposition Footer */}
          <div className="mt-8 border-t border-dashed border-slate-300 pt-6 print:break-inside-avoid">
            <h3 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-widest">{t.dispositionTitle}</h3>
            <p className="text-[9px] text-slate-400 font-bold leading-relaxed mb-10 max-w-2xl">
              {t.dispositionText}
            </p>
            <div className="flex justify-between items-end px-4">
              <div className="text-center group">
                <div className="w-40 border-b-2 border-slate-900 mb-2 transition-all"></div>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">{t.placeDate}</p>
              </div>
              <div className="text-center group">
                <div className="w-52 border-b-2 border-slate-900 mb-2 h-10 transition-all"></div>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">{t.stampSign}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Brand/Legal Footer (Printable) */}
        <div className="mt-auto px-14 py-8 border-t border-slate-100 bg-slate-50/30 print:bg-transparent flex justify-between items-center text-[8px] text-slate-300 font-black uppercase tracking-[0.3em]">
          <span>© 2024 KONTRANS TRANSPORT</span>
          <span>Quality Certified Logistics</span>
        </div>
      </div>
    </div>
  );
}
