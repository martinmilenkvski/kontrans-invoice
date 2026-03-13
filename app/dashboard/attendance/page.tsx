"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Printer, 
  Calendar, 
  User, 
  FileSpreadsheet,
  Settings2,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react";

const EMPLOYEES = [
  "Мартин Миленковски",
  "Марина Миленковска",
  "Катерина Јанческа",
  "Александар Филиповски"
];

const MONTHS = [
  "Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", 
  "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"
];

export default function AttendancePage() {
  const currentDate = new Date();
  
  // States for controls
  const [selectedEmployee, setSelectedEmployee] = useState(EMPLOYEES[0]);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [defaultArrivalTime, setDefaultArrivalTime] = useState("08:30");
  const [defaultDepartureTime, setDefaultDepartureTime] = useState("16:30");
  
  // State for the generated table data
  const [tableData, setTableData] = useState<any[]>([]);

  // Generate table logic
  useEffect(() => {
    generateTableData();
  }, [selectedEmployee, selectedMonth, selectedYear, defaultArrivalTime, defaultDepartureTime]);

  const generateTableData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const newData = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayOfWeek = date.getDay();
      
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      newData.push({
        day: day,
        name: isWeekend ? "" : selectedEmployee,
        arrivalTime: isWeekend ? "" : defaultArrivalTime,
        departureTime: isWeekend ? "" : defaultDepartureTime,
        isWeekend: isWeekend
      });
    }

    setTableData(newData);
  };

  const handleCellEdit = (index: number, field: string, value: string) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    setTableData(updatedData);
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-0 md:py-8 font-sans flex flex-col items-center print:bg-white print:py-0">
      
      {/* A4 Paper Container */}
      <div className="w-full max-w-[210mm] bg-white shadow-2xl print:shadow-none mx-auto min-h-[297mm] flex flex-col relative transition-all">
        
        {/* PREMIUM CONTROL BAR */}
        <div className="bg-[#111111] border-b border-white/5 p-4 flex flex-col gap-4 text-white print:hidden transition-all sticky top-0 z-50">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                <ArrowLeft className="w-4 h-4 text-white/60 group-hover:text-white" />
              </Link>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                <h1 className="text-[0.75rem] font-black uppercase tracking-widest">Присутност</h1>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[0.65rem] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              <Printer className="w-3.5 h-3.5" />
              Печати (A4)
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
            {/* Employee Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.6rem] text-white/40 uppercase font-black tracking-widest ml-1">
                Вработен
              </label>
              <select 
                value={selectedEmployee} 
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-[0.75rem] font-bold rounded-xl p-2.5 outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                {EMPLOYEES.map(emp => (
                  <option key={emp} value={emp} className="bg-[#111111] text-white">{emp}</option>
                ))}
              </select>
            </div>

            {/* Month Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.6rem] text-white/40 uppercase font-black tracking-widest ml-1">
                Месец
              </label>
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="bg-white/5 border border-white/10 text-white text-[0.75rem] font-bold rounded-xl p-2.5 outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
              >
                {MONTHS.map((month, idx) => (
                  <option key={month} value={idx} className="bg-[#111111] text-white">{month}</option>
                ))}
              </select>
            </div>

            {/* Year Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.6rem] text-white/40 uppercase font-black tracking-widest ml-1">
                Година
              </label>
              <input 
                type="number" 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-white/5 border border-white/10 text-white text-[0.75rem] font-bold rounded-xl p-2.5 outline-none focus:border-emerald-500 transition-all text-center"
              />
            </div>

            {/* Default Times */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.6rem] text-white/40 uppercase font-black tracking-widest ml-1">
                Време (Од / До)
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={defaultArrivalTime} 
                  onChange={(e) => setDefaultArrivalTime(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-[0.75rem] font-bold rounded-xl p-2.5 w-full outline-none text-left pl-4 focus:border-emerald-500 transition-all"
                  placeholder="Од"
                />
                <input 
                  type="text" 
                  value={defaultDepartureTime} 
                  onChange={(e) => setDefaultDepartureTime(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-[0.75rem] font-bold rounded-xl p-2.5 w-full outline-none text-left pl-4 focus:border-emerald-500 transition-all"
                  placeholder="До"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PRINTABLE A4 CONTENT */}
        <div className="p-10 md:p-14 flex-1 flex flex-col text-black print:p-8 print:pt-10">
          
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-[0.12em] uppercase">
                KON<span className="text-[#D42B2B]">TRANS</span>
              </span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#D42B2B]" />
            </div>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              Евиденција на присутност
            </div>
          </div>

          <div className="w-full text-center border-t border-x border-black p-2 font-bold text-[0.75rem] uppercase tracking-widest bg-slate-50">
            Распоред за присутност
          </div>
          <div className="w-full text-center border border-black p-2 mb-6 font-black text-sm uppercase tracking-[0.2em] bg-white">
            {MONTHS[selectedMonth]} {selectedYear}
          </div>

          <table className="w-full border-collapse text-[10px]">
            <thead>
              <tr className="bg-slate-50 font-black uppercase tracking-widest text-[9px]">
                <th className="border border-black p-2 text-center w-12">Датум</th>
                <th className="border border-black p-2 text-left w-1/3">Име и Презиме</th>
                <th className="border border-black p-2 text-left pl-4">Пристигнување</th>
                <th className="border border-black p-2 text-left pl-4">Одење</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={row.isWeekend ? "bg-slate-50/50" : "bg-white"}>
                  <td className="border border-black p-2 text-center font-bold">
                    {row.day}
                  </td>
                  
                  <td className="border border-black p-0">
                    <input 
                      type="text" 
                      value={row.name}
                      onChange={(e) => handleCellEdit(index, 'name', e.target.value)}
                      className="w-full h-full px-2 py-1.5 bg-transparent outline-none focus:bg-emerald-50/50 font-medium"
                    />
                  </td>
                  
                  <td className="border border-black p-0">
                    <input 
                      type="text" 
                      value={row.arrivalTime}
                      onChange={(e) => handleCellEdit(index, 'arrivalTime', e.target.value)}
                      className="w-full h-full px-4 py-1.5 bg-transparent outline-none text-left focus:bg-emerald-50/50 font-medium"
                    />
                  </td>
                  
                  <td className="border border-black p-0">
                    <input 
                      type="text" 
                      value={row.departureTime}
                      onChange={(e) => handleCellEdit(index, 'departureTime', e.target.value)}
                      className="w-full h-full px-4 py-1.5 bg-transparent outline-none text-left focus:bg-emerald-50/50 font-medium"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-12 text-[9px] text-slate-400 font-bold uppercase tracking-widest flex justify-between px-2">
            <div className="flex flex-col gap-1">
              <span>Изработено на: {currentDate.toLocaleDateString('mk-MK')}</span>
              <span className="text-[7px]">Kontrans Invoice System &bull; Attendance Module</span>
            </div>
            <div className="text-right">
              <div className="w-40 border-b border-black mb-2"></div>
              <span>Потпис на одговорно лице</span>
            </div>
          </div>

        </div>

        <div className="mt-auto px-14 py-8 border-t border-slate-100 bg-slate-50/30 print:hidden flex justify-between items-center text-[7px] text-slate-300 font-black uppercase tracking-[0.3em]">
          <span>© 2024 KONTRANS ATTENDANCE</span>
          <span>Internal Use Only</span>
        </div>
      </div>
    </div>
  );
}
