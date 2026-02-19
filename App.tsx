
import React, { useState, useEffect, useRef } from 'react';
import { CVData, TemplateType } from './types';
import { INITIAL_CV_DATA } from './constants';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { 
  FileText, 
  ArrowLeft, 
  Sparkles, 
  Wand2, 
  Download, 
  CheckCircle2, 
  Sun, 
  Moon,
  Info,
  Printer,
  Loader2
} from 'lucide-react';

declare var html2pdf: any;

const App: React.FC = () => {
  const [data, setData] = useState<CVData>(INITIAL_CV_DATA);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [mode, setMode] = useState<'EDITING' | 'GENERATED'>('EDITING');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processType, setProcessType] = useState<'PRINT' | 'DOWNLOAD' | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const cvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handlePrint = () => {
    setProcessType('PRINT');
    setIsProcessing(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsProcessing(false);
        setProcessType(null);
      }, 500);
    }, 300);
  };

  const handleDownload = async () => {
    if (!cvRef.current) return;
    
    setProcessType('DOWNLOAD');
    setIsProcessing(true);

    const element = cvRef.current;
    const opt = {
      margin: 0,
      filename: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Download failed:", error);
    } finally {
      setIsProcessing(false);
      setProcessType(null);
    }
  };

  const handleGenerate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMode('GENERATED');
  };

  const handleBackToEditor = () => {
    setMode('EDITING');
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-50 no-print transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black dark:bg-[#facc15] p-2.5 rounded-xl shadow-lg transition-colors">
              <FileText className="w-6 h-6 text-[#facc15] dark:text-black" />
            </div>
            <div>
              <h1 className="text-xl font-black text-black dark:text-white tracking-tighter uppercase leading-none">Architect</h1>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Professional Resume Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {mode === 'GENERATED' && (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['modern', 'classic', 'minimal'] as TemplateType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        template === t 
                          ? 'bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black shadow-lg' 
                          : 'text-slate-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleDownload}
                  disabled={isProcessing}
                  className="bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 shadow-xl active:scale-95 disabled:opacity-50"
                >
                  {isProcessing && processType === 'DOWNLOAD' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download PDF
                </button>
                <button
                  onClick={handlePrint}
                  disabled={isProcessing}
                  className="hidden sm:flex items-center gap-2 p-3 text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                  title="Alternative Print Method"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {mode === 'EDITING' ? (
          <div className="space-y-10">
            <div className="bg-black dark:bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-transparent dark:border-slate-800">
              <Sparkles className="absolute -right-4 -top-4 w-32 h-32 text-[#facc15]/10 group-hover:rotate-12 transition-transform duration-700" />
              <div className="relative z-10">
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Build Your Portfolio</h2>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xl">
                  Draft your CV with clarity. Use our AI tools to polish your language for maximum professional impact.
                </p>
              </div>
            </div>

            <CVForm data={data} onChange={setData} />

            <div className="flex justify-center pt-6 pb-12">
              <button
                onClick={handleGenerate}
                className="group relative bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-4"
              >
                <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Generate CV Portfolio
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between no-print">
              <button
                onClick={handleBackToEditor}
                className="flex items-center gap-2 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Editor
              </button>
              <div className="flex items-center gap-4 md:hidden">
                <select 
                  value={template} 
                  onChange={(e) => setTemplate(e.target.value as TemplateType)}
                  className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none dark:text-white"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center pb-20">
              <div className={`w-full max-w-[850px] transition-all duration-300 ${isProcessing ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
                {isProcessing && (
                  <div className="fixed inset-0 bg-white/95 dark:bg-slate-950/95 z-[60] flex items-center justify-center no-print px-6">
                    <div className="max-w-md w-full text-center space-y-6">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Download className="w-10 h-10 text-black dark:text-[#facc15]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tighter dark:text-white mb-2">
                          {processType === 'DOWNLOAD' ? 'Generating Your File' : 'Preparing Your PDF'}
                        </h3>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                          {processType === 'DOWNLOAD' 
                            ? 'Creating a high-resolution PDF package of your resume. Your download will start automatically.' 
                            : 'Opening the professional print dialog. Ensure "Save as PDF" is selected in your destination menu.'}
                        </p>
                      </div>
                      <div className="flex justify-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-black dark:bg-[#facc15] animate-bounce [animation-delay:-0.3s]"></div>
                         <div className="w-2 h-2 rounded-full bg-black dark:bg-[#facc15] animate-bounce [animation-delay:-0.15s]"></div>
                         <div className="w-2 h-2 rounded-full bg-black dark:bg-[#facc15] animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={cvRef}>
                  <CVPreview data={data} template={template} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 py-12 no-print transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-30 dark:opacity-100 dark:grayscale-0">
            <FileText className="w-5 h-5 dark:text-[#facc15]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] dark:text-slate-300">Architect v2.8 Pro Edition</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
            {mode === 'EDITING' ? 'Drafting student profile for direct download' : 'Direct PDF download enabled. File generation may take a few seconds.'}
          </p>
          <div className="flex gap-4">
             <div className={`w-2 h-2 rounded-full ${mode === 'EDITING' ? 'bg-[#facc15]' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
             <div className={`w-2 h-2 rounded-full ${mode === 'GENERATED' ? 'bg-black dark:bg-[#facc15]' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
