
import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download, RefreshCw, Printer, AlertCircle, Palette, CreditCard, Settings, User, FileText, Share2 } from 'lucide-react';
import { IDCard } from './components/IDCard';
import { ImageUpload } from './components/ImageUpload';
import { IDCardState, INITIAL_STATE, IDTheme } from './types';

function App() {
  const [data, setData] = useState<IDCardState>(INITIAL_STATE);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      theme: { ...prev.theme, [name]: value }
    }));
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 150));
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `${data.studentName || 'id'}_${activeSide}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('Export failed. Try a different browser.');
    } finally {
      setIsGenerating(false);
    }
  }, [data.studentName, activeSide]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-100 print:bg-white">
      {/* Navbar */}
      <nav className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 px-6 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <CreditCard size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">ID Maker Pro</h1>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Enterprise Edition</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
            <Printer size={18} />
            <span className="hidden md:inline">Print</span>
          </button>
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-100 transition-all disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
            <span>Export {activeSide.toUpperCase()}</span>
          </button>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto p-6 md:p-8 grid grid-cols-1 xl:grid-cols-[1fr_550px] gap-8">
        
        {/* Editor Side */}
        <div className="space-y-8 print:hidden">
          {/* Section: College */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 text-slate-800">
              <Settings size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold">Institution Branding</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InputField label="College Name" name="collegeName" value={data.collegeName} onChange={handleChange} placeholder="Global Tech University" />
                <InputField label="Affiliation" name="affiliation" value={data.affiliation} onChange={handleChange} placeholder="Affiliated to State Board" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Address" name="collegeAddress" value={data.collegeAddress} onChange={handleChange} placeholder="London, UK" />
                <InputField label="Phone" name="collegePhone" value={data.collegePhone} onChange={handleChange} placeholder="+44 20 1234 5678" />
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
              <ImageUpload label="Institution Logo" image={data.logoUrl} onUpload={(url) => setData(d => ({ ...d, logoUrl: url }))} />
              <ImageUpload label="Signature" image={data.principalSignatureUrl} onUpload={(url) => setData(d => ({ ...d, principalSignatureUrl: url }))} aspectRatioClass="aspect-video" />
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Theme Colors</label>
                <div className="flex gap-2">
                  <input type="color" name="primaryColor" value={data.theme.primaryColor} onChange={handleThemeChange} className="w-full h-10 rounded cursor-pointer" title="Primary" />
                  <input type="color" name="secondaryColor" value={data.theme.secondaryColor} onChange={handleThemeChange} className="w-full h-10 rounded cursor-pointer" title="Secondary" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Student */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 text-slate-800">
              <User size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold">Student Identity</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Full Name" name="studentName" value={data.studentName} onChange={handleChange} placeholder="John Doe" />
                  <InputField label="Student ID" name="studentId" value={data.studentId} onChange={handleChange} placeholder="STU-2024-001" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="Course" name="program" value={data.program} onChange={handleChange} placeholder="B.Sc CS" />
                  <InputField label="Blood Group" name="bloodGroup" value={data.bloodGroup} onChange={handleChange} placeholder="O+" />
                  <InputField label="Expiry" name="expiryDate" type="date" value={data.expiryDate} onChange={handleChange} />
                </div>
              </div>
              <ImageUpload label="Student Portrait" image={data.photoUrl} onUpload={(url) => setData(d => ({ ...d, photoUrl: url }))} aspectRatioClass="aspect-[3/4]" />
            </div>
          </section>

          {/* Section: Back Side */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-6 text-slate-800">
              <FileText size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold">Reverse Side Details</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">Instructions / Terms</label>
                <textarea 
                  name="instructions" 
                  value={data.instructions} 
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm p-4 border outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Emergency Mobile" name="emergencyContact" value={data.emergencyContact} onChange={handleChange} placeholder="+1 234 567 890" />
                <InputField label="Website" name="website" value={data.website} onChange={handleChange} placeholder="www.college.edu" />
              </div>
            </div>
          </section>
        </div>

        {/* Preview Side */}
        <div className="xl:sticky xl:top-24 h-fit">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 print:p-0 print:shadow-none print:border-none">
            <div className="flex items-center justify-between mb-8 print:hidden">
              <h3 className="font-bold text-slate-800">Live Preview</h3>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveSide('front')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeSide === 'front' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  FRONT
                </button>
                <button 
                  onClick={() => setActiveSide('back')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeSide === 'back' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  BACK
                </button>
              </div>
            </div>

            <div className="flex justify-center bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-200 print:bg-white print:p-0 print:border-none">
              <div id="printable-card-wrapper" className="scale-[0.6] sm:scale-[0.85] lg:scale-100 transition-all origin-center">
                <IDCard ref={cardRef} data={data} side={activeSide} />
              </div>
            </div>

            <div className="mt-8 flex gap-4 print:hidden">
              <div className="p-4 bg-blue-50 rounded-xl flex gap-3 flex-1">
                <AlertCircle className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  <strong>Pro Tip:</strong> Use high-resolution images for the best printing results. 
                  The QR code is automatically updated with student data.
                </p>
              </div>
              <button 
                onClick={() => setData(INITIAL_STATE)}
                className="p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex flex-col items-center justify-center gap-1 border border-transparent hover:border-red-100"
                title="Reset"
              >
                <RefreshCw size={20} />
                <span className="text-[10px] font-bold">RESET</span>
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center print:hidden">
             <p className="text-xs text-slate-400 font-medium">Built for Institutional Quality Output</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text", placeholder }: any) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{label}</label>
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm outline-none placeholder:text-slate-300"
    />
  </div>
);

export default App;
