"use client";

import React, { useState, useRef } from 'react';
import { Download, Loader2, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

const InlineInput = ({ value, onChange, className = "", placeholder = "" }: { value: string, onChange: (v: string) => void, className?: string, placeholder?: string }) => (
  <input 
    className={`bg-transparent border-none outline-none focus:bg-[#fefce8] px-1 rounded transition-colors ${className}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

const InsurancePage = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [doc, setDoc] = useState({
    insured: "// P.I.K KO DOOEL //\n// STR.1523 NO.5, S.GORNO LISICE//\n// Skopje, Republic of North Macedonia //",
    commodity: "Melty CBS",
    value: "28864 USD",
    packaging: {
      packets: false,
      crates: false,
      barrels: false,
      other: true
    },
    otherPackagingDesc: "Картони",
    quantity: "1132 картони",
    weight: "23616 Кг",
    route: "Порт Кланг - Солун - Скопје",
    departurePlace: "Порт Кланг - Солун",
    arrivalPlace: "Солун",
    departureDate: "17.03.2026",
    transportType: {
      sea: false,
      air: false,
      rail: false,
      road: false,
      combined: true
    },
    logisticsId: "1 x 20 DV MSDU1984414",
    vessel: "MSC VAIGA III HV609A",
    transhipment: "Сингапур/Малта/Пиреја/Текирдак",
    risks: "AAR / %",
    appDate: "13/03/2026",
    contractor: "Кон – транс шипинг дооел",
    receiptDate: ""
  });

  const exportPDF = async () => {
    if (!printRef.current) return;
    
    const safeName = doc.logisticsId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `Eurolink_Prijava_${safeName}.pdf`;

    let fileHandle: any = null;
    
    // 1. Ask for file handle synchronously before async generation
    // This maintains the user gesture token which Chrome requires to set filenames
    if ('showSaveFilePicker' in window) {
      try {
        fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: 'PDF Document',
            accept: { 'application/pdf': ['.pdf'] },
          }],
        });
      } catch (err: any) {
        // Stop if user cancels the save dialog
        if (err.name === 'AbortError') return;
        console.warn('File picker failed:', err);
      }
    }

    setIsGenerating(true);
    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      if (fileHandle) {
        // Write directly to the user-approved file handle
        const blob = pdf.output('blob');
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        // Fallback for browsers without File System Access API
        pdf.save(fileName);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateField = (field: string, value: string) => setDoc(prev => ({ ...prev, [field]: value }));
  
  const toggleCheck = (category: 'packaging' | 'transportType', field: string) => {
    setDoc(prev => ({
      ...prev,
      [category]: { 
        ...prev[category], 
        [field]: !prev[category][field as keyof (typeof prev)['packaging' | 'transportType']] 
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 flex flex-col items-center font-serif text-black">
      {/* Control Header */}
      <div className="w-[210mm] mb-6 flex justify-between items-center bg-white p-4 rounded shadow-lg border-b-4 border-[#D42B2B] font-sans">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <ChevronLeft size={20} className="text-gray-400 group-hover:text-[#D42B2B]" />
          </Link>
          <div className="flex items-center gap-4 text-gray-800">
            <FileText size={24} className="text-[#D42B2B]" />
            <div>
              <h1 className="font-bold uppercase tracking-widest text-sm">Eurolink Document System</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Kon-Trans Logistics Internal</p>
            </div>
          </div>
        </div>
        <button
          onClick={exportPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-[#D42B2B] text-white px-6 py-2.5 rounded hover:bg-[#b02222] transition-all disabled:opacity-50 text-sm font-bold uppercase tracking-widest shadow-lg shadow-[#D42B2B]/20"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
          Generate PDF
        </button>
      </div>

      <div 
        ref={printRef}
        className="bg-white shadow-2xl overflow-hidden text-black relative flex flex-col"
        style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-10">
          <img 
            src="/logo-eurolink.jpg" 
            alt="Eurolink Logo" 
            className="h-20 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.insertAdjacentHTML('afterbegin', '<div class="p-4 bg-gray-50 border border-dashed border-gray-300 text-[12px] font-sans font-bold text-gray-400 italic">EUROLINK INSURANCE</div>');
              }
            }}
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-[14px] font-black uppercase tracking-tight border-b-2 border-black inline-block leading-tight pb-0.5" style={{ borderBottomColor: '#000000' }}>ПРИЈАВА</h2>
          <br />
          <h3 className="text-[11.5px] font-black uppercase tracking-tight mt-1.5 flex items-center justify-center gap-2">
            <span className="w-12 h-[1px] bg-black" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}></span>
            ЗА ОСИГУРУВАЊЕ НА ПРАТКИ ВО МЕЃУНАРОДЕН ТРАНСПОРТ
            <span className="w-12 h-[1px] bg-black" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}></span>
          </h3>
        </div>

        <div className="border-[1.5px] border-black text-[10.5px] font-serif" style={{ borderColor: '#000000' }}>
          <div className="border-b-[1.5px] border-black" style={{ borderBottomColor: '#000000' }}>
            <div className="text-center font-bold border-b border-black py-1 bg-[#f9fafb] uppercase tracking-tighter text-[9px]" style={{ backgroundColor: '#f9fafb', borderBottomColor: 'rgba(0,0,0,0.1)' }}>Осигуреник и адреса:</div>
            <textarea 
              className="w-full h-16 bg-transparent border-none outline-none resize-none px-6 py-3 text-center font-bold italic focus:bg-[#fefce8] transition-colors"
              value={doc.insured}
              onChange={(e) => updateField('insured', e.target.value)}
              style={{ backgroundColor: 'transparent' }}
            />
          </div>

          <div className="border-b-[1.5px] border-black flex items-center px-4 py-1.5" style={{ borderBottomColor: '#000000' }}>
            <span className="font-bold shrink-0">Опис на стоката која се осигурува:</span>
            <InlineInput className="flex-grow font-bold ml-2 text-[#1e3a8a]" value={doc.commodity} onChange={(v) => updateField('commodity', v)} />
          </div>

          <div className="border-b-[1.5px] border-black" style={{ borderBottomColor: '#000000' }}>
            <div className="text-center font-bold border-b border-black py-1 bg-[#f9fafb] uppercase tracking-tighter text-[9px]" style={{ backgroundColor: '#f9fafb', borderBottomColor: 'rgba(0,0,0,0.1)' }}>Вредност на пратката:</div>
            <div className="px-4 py-1.5 flex items-center">
               <span className="font-bold">Во странска валута:</span>
               <InlineInput className="ml-2 font-bold text-[#1e3a8a]" value={doc.value} onChange={(v) => updateField('value', v)} />
            </div>
          </div>

          <div className="border-b-[1.5px] border-black px-4 py-3" style={{ borderBottomColor: '#000000' }}>
            <div className="text-center font-bold mb-3 uppercase tracking-tighter text-[9px] text-[#6b7280]" style={{ color: '#6b7280' }}>Начин на пакување:</div>
            <div className="flex justify-around items-center mb-4">
               {[
                 { label: 'пакети', id: 'packets' },
                 { label: 'сандаци(гајби)', id: 'crates' },
                 { label: 'буриња', id: 'barrels' },
                 { label: 'останата амбалажа', id: 'other' }
               ].map(item => (
                 <div key={item.id} onClick={() => toggleCheck('packaging', item.id)} className="flex items-center gap-2 cursor-pointer group">
                    <span className="group-hover:text-[#D42B2B] transition-colors">{item.label}</span>
                    <div className="w-4 h-4 border border-black flex items-center justify-center text-[10px] bg-white transition-colors" style={{ backgroundColor: doc.packaging[item.id as keyof typeof doc.packaging] ? '#f3f4f6' : '#ffffff' }}>
                      {doc.packaging[item.id as keyof typeof doc.packaging] ? '■' : ''}
                    </div>
                 </div>
               ))}
            </div>
            <div className="space-y-2 font-serif italic">
               <div className="flex gap-2 items-end">
                  <span className="text-[10px]">Доколку е под останата, молиме да ја опишете:</span>
                  <InlineInput className="border-b border-dotted border-black flex-grow text-[#1e3a8a] pb-0" value={doc.otherPackagingDesc} onChange={(v) => updateField('otherPackagingDesc', v)} />
               </div>
               <div className="flex gap-2 items-end">
                  <span className="text-[10px]">Број на пакети, сандаци, буриња или останато:</span>
                  <InlineInput className="border-b border-dotted border-black flex-grow text-[#1e3a8a] pb-0" value={doc.quantity} onChange={(v) => updateField('quantity', v)} />
               </div>
               <div className="flex gap-2 items-end">
                  <span className="text-[10px]">Бруто/Нето тежина:</span>
                  <InlineInput className="border-b border-dotted border-black flex-grow text-[#1e3a8a] pb-0" value={doc.weight} onChange={(v) => updateField('weight', v)} />
               </div>
            </div>
          </div>

          <div className="border-b-[1.5px] border-black" style={{ borderBottomColor: '#000000' }}>
             <div className="flex justify-center items-center py-1.5 gap-2 border-b border-black bg-[#f9fafb]" style={{ backgroundColor: '#f9fafb', borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                <span className="font-bold uppercase tracking-tighter text-[9px]">Осигурена релација:</span>
                <InlineInput className="font-bold text-[#1e3a8a]" value={doc.route} onChange={(v) => updateField('route', v)} />
             </div>
             <div className="px-4 py-2 space-y-2">
                <div className="flex">
                  <span className="w-44 font-bold">Место на отпрема:</span>
                  <InlineInput className="flex-grow text-[#1e3a8a]" value={doc.departurePlace} onChange={(v) => updateField('departurePlace', v)} />
                </div>
                <div className="flex">
                  <span className="w-44 font-bold">Место на допрема:</span>
                  <InlineInput className="flex-grow text-[#1e3a8a]" value={doc.arrivalPlace} onChange={(v) => updateField('arrivalPlace', v)} />
                </div>
                <div className="flex items-center">
                  <span className="w-44 font-bold border-b border-black leading-none pb-0.5" style={{ borderBottomColor: '#000000' }}>Датум на испловување:</span>
                  <InlineInput className="flex-grow font-bold text-[#D42B2B]" value={doc.departureDate} onChange={(v) => updateField('departureDate', v)} />
                </div>
             </div>
          </div>

          <div className="border-b-[1.5px] border-black" style={{ borderBottomColor: '#000000' }}>
            <div className="text-center font-bold border-b border-black py-1 bg-[#f9fafb] uppercase tracking-tighter text-[9px]" style={{ backgroundColor: '#f9fafb', borderBottomColor: 'rgba(0,0,0,0.1)' }}>Вид на транспорт:</div>
            <div className="flex justify-around py-2 border-b border-black" style={{ borderBottomColor: 'rgba(0,0,0,0.1)' }}>
               {['Поморски', 'Авионски', 'Железнички', 'Друмски', 'Комбиниран'].map((label, idx) => {
                 const keys = ['sea', 'air', 'rail', 'road', 'combined'] as const;
                 return (
                    <div key={label} onClick={() => toggleCheck('transportType', keys[idx])} className="flex items-center gap-2 cursor-pointer group">
                      <span className="text-[10px] group-hover:text-[#D42B2B] transition-colors">{label}</span>
                      <div className="w-3.5 h-3.5 border border-black flex items-center justify-center text-[9px] bg-white transition-colors" style={{ backgroundColor: doc.transportType[keys[idx]] ? '#f3f4f6' : '#ffffff' }}>
                        {doc.transportType[keys[idx]] ? '■' : ''}
                      </div>
                    </div>
                 );
               })}
            </div>
            <div className="px-4 py-2 space-y-2">
               <div className="flex">
                  <span className="font-bold mr-2 italic border-b border-black leading-none pb-0.5" style={{ borderBottomColor: '#000000' }}>Регистерски број на камион/број на вагон/контејнер:</span>
                  <InlineInput className="flex-grow font-mono text-[11.5px] font-bold text-[#1e3a8a]" value={doc.logisticsId} onChange={(v) => updateField('logisticsId', v)} />
               </div>
               <div className="flex">
                  <span className="font-bold mr-2 italic border-b border-black leading-none pb-0.5" style={{ borderBottomColor: '#000000' }}>Име на брод:</span>
                  <InlineInput className="flex-grow font-bold text-[#1e3a8a]" value={doc.vessel} onChange={(v) => updateField('vessel', v)} />
               </div>
               <div className="flex border-t border-black pt-1.5 mt-1" style={{ borderTopColor: 'rgba(0,0,0,0.1)' }}>
                  <span className="font-bold mr-2 border-b border-black leading-none pb-0.5 text-[#4b5563]" style={{ color: '#4b5563', borderBottomColor: 'rgba(0,0,0,0.2)' }}>Претовар ќе се изврши во:</span>
                  <InlineInput className="flex-grow text-[#1e3a8a]" value={doc.transhipment} onChange={(v) => updateField('transhipment', v)} />
               </div>
            </div>
          </div>

          <div className="flex items-center px-4 py-2 border-b border-black" style={{ borderBottomColor: '#000000' }}>
             <span className="font-bold border-b border-black mr-2 leading-none pb-0.5 uppercase tracking-tighter text-[9px]" style={{ borderBottomColor: 'rgba(0,0,0,0.4)' }}>Осигурени ризици (обем на покритие):</span>
             <InlineInput className="font-bold flex-grow text-[#D42B2B]" value={doc.risks} onChange={(v) => updateField('risks', v)} />
          </div>

          <div className="p-3 text-[7.2px] leading-relaxed text-justify font-sans text-[#4b5563]" style={{ color: '#4b5563' }}>
             <div className="text-center font-bold mb-1.5 underline uppercase text-[8px] text-[#1f2937] tracking-widest" style={{ color: '#1f2937' }}>НАПОМЕНА</div>
             <div className="space-y-1.5">
                <p>1. Осигуреникот/договорувачот на осигурувањето на пратката за која нема целосни податоци, со цел да обезбеди осигурително покритие, може со оваа пријава да ја пријави во осигурување пратката, до поднесување на дефинитивните податоци. Пријавата се пополнува во два примероци и едниот се доставува до осигурувачот.. Осигуреникот/договорувачот е должен веднаш, а најдоцна во рок од 3 дена од сознавањето на дефинитивните податоци, истите да му ги достави на осигурувачот. Сторнирање на привремени пријави не може да се прави, освен кога транспортот не е започнат.</p>
                <p>2. Пријавата може да се достави по телефакс.</p>
                <p>3. Осигурувачот, доколку не ја прифаќа во осигурување пратката во целост или само од пооделни ризици, должен е веднаш по добивањето на пратката, а најдоцна во рок од 24 часа (се сметаат само работни денови) писмено да го извести осигуреникот дека не ја прифаќа во осигурување пратката. Доколку во тој рок писметно не го извести осигуреникот за неприфаќањето во осигурување ќе се смета дека пратката е прифатена во осигурување според условите во пријавата за осигурување.</p>
                <p>4. Доколку не се наведени ризиците против кои се бара осигурително покритие, ќе се смета дека осигурувањето е склучено „Против сите ризици“. Специјалните ризици се пријавуваат перед тргнувањето на пратката и доколку осигурувачот прифати да ги осигура, за нив се пресметува додатна премија според видот на специјалниот ризик.</p>
             </div>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-6 pt-10 font-sans">
           <div className="border-t-2 border-black pt-2 text-center" style={{ borderTopColor: '#000000' }}>
              <span className="block text-[8.5px] font-black uppercase tracking-tighter text-[#6b7280] mb-1" style={{ color: '#6b7280' }}>Дата на пријава</span>
              <InlineInput className="w-full text-center font-bold text-[11px] text-[#1e3a8a]" value={doc.appDate} onChange={(v) => updateField('appDate', v)} />
           </div>
           <div className="border-t-2 border-black pt-2 text-center" style={{ borderTopColor: '#000000' }}>
              <span className="block text-[8.5px] font-black uppercase tracking-tighter text-[#6b7280] mb-1" style={{ color: '#6b7280' }}>Договорувач</span>
              <InlineInput className="w-full text-center font-bold text-[11px] text-[#1e3a8a]" value={doc.contractor} onChange={(v) => updateField('contractor', v)} />
           </div>
           <div className="border-t-2 border-black pt-2 text-center" style={{ borderTopColor: '#000000' }}>
              <span className="block text-[8.5px] font-black uppercase tracking-tighter text-[#6b7280] mb-1" style={{ color: '#6b7280' }}>Дата на прием</span>
              <InlineInput className="w-full text-center font-bold text-[11px] text-[#1e3a8a]" value={doc.receiptDate} placeholder="..." onChange={(v) => updateField('receiptDate', v)} />
           </div>
        </div>

        {/* Dynamic Watermark */}
        <div className="absolute bottom-6 right-6 text-[7px] font-mono text-[#d1d5db] select-none uppercase pointer-events-none tracking-[0.3em] opacity-40 transform rotate-[-90deg] origin-bottom-right" style={{ color: '#d1d5db' }}>
          KON-TRANS LOGISTICS • EUROLINK PRIJAVA • {new Date().getFullYear()}
        </div>
        
        {/* Footer info for print */}
        <div className="absolute bottom-4 left-[50%] -translate-x-1/2 text-[6px] text-[#d1d5db] font-sans uppercase tracking-widest text-center w-full" style={{ color: '#d1d5db' }}>
          Generated via Taurus-11 Framework • Internal Use Only
        </div>
      </div>
      
      <p className="mt-8 text-white/20 text-[0.65rem] uppercase tracking-[0.2em] font-sans">
        &copy; {new Date().getFullYear()} KONTRANS INVOICE SYSTEM &bull; ПРЕМИУМ ПАНЕЛ
      </p>
    </div>
  );
};

export default InsurancePage;
