
import React from 'react';
import { CVData, TemplateType } from '../types';

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, template }) => {
  const { personalInfo, education, employment, certificates, skills } = data;

  const renderDescription = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <div key={i} className="flex gap-2 mb-1 pl-1">
            <span className="shrink-0">•</span>
            <span>{trimmed.substring(1).trim()}</span>
          </div>
        );
      }
      return <p key={i} className="mb-2">{trimmed}</p>;
    });
  };

  const ModernTemplate = () => (
    <div className="bg-white min-h-[1050px] shadow-sm text-slate-800 font-sans print-area print:shadow-none print:bg-white print:m-0" id="cv-content">
      <div className="grid grid-cols-12 min-h-[1050px]">
        {/* Left Sidebar */}
        <div className="col-span-4 bg-slate-900 text-white p-8 print:bg-slate-900 !bg-slate-900" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <div className="mb-10 text-center">
            <div className="w-32 h-32 bg-slate-800 mx-auto rounded-full mb-4 border-4 border-slate-700 overflow-hidden flex items-center justify-center">
              {personalInfo.avatarUrl ? (
                <img src={personalInfo.avatarUrl} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-slate-600">{personalInfo.fullName.charAt(0)}</span>
              )}
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-1">{personalInfo.fullName}</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4 border-b border-slate-700 pb-2">Contact</h2>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Email</span>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Phone</span>
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Location</span>
                  <span>{personalInfo.address}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4 border-b border-slate-700 pb-2">Skills</h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold">{skill.name}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full print:bg-blue-600"
                        style={{ 
                          width: skill.proficiency === 'Expert' ? '100%' : skill.proficiency === 'Advanced' ? '80%' : skill.proficiency === 'Intermediate' ? '60%' : '40%',
                          WebkitPrintColorAdjust: 'exact', 
                          printColorAdjust: 'exact' 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {certificates.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4 border-b border-slate-700 pb-2">Certificates</h2>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <p className="font-bold text-slate-200">{cert.title}</p>
                      <p className="text-slate-400 text-[10px] uppercase font-medium">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-8 p-12 bg-white print:bg-white">
          <section className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600 print:bg-blue-600" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}></span>
              Profile
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm font-medium italic">
              {personalInfo.summary}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600 print:bg-blue-600" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}></span>
              Experience
            </h2>
            <div className="space-y-8">
              {employment.map((emp) => (
                <div key={emp.id} className="relative pl-4 border-l-2 border-slate-100 print:border-slate-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-blue-600 rounded-full print:border-blue-700" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-extrabold text-slate-900 uppercase tracking-tight">{emp.role}</h3>
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      {emp.startDate} — {emp.current ? 'Present' : emp.endDate}
                    </span>
                  </div>
                  <div className="text-blue-600 text-sm font-bold mb-3 uppercase tracking-wide">{emp.company}</div>
                  <div className="text-slate-600 text-sm leading-relaxed">
                    {renderDescription(emp.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600 print:bg-blue-600" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}></span>
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                    <p className="text-sm text-slate-600">{edu.degree} in {edu.course}</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const ClassicTemplate = () => (
    <div className="bg-white min-h-[1050px] p-12 text-slate-900 leading-normal font-serif print-area print:shadow-none print:bg-white print:m-0" id="cv-content">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-medium tracking-tight border-b-2 border-slate-900 inline-block pb-2 px-8 mb-4">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center divide-x divide-slate-400 text-xs font-sans font-bold uppercase tracking-widest text-slate-600">
          <span className="px-4">{personalInfo.email}</span>
          <span className="px-4">{personalInfo.phone}</span>
          <span className="px-4">{personalInfo.address}</span>
        </div>
        <div className="flex justify-center gap-6 mt-3 text-[10px] font-sans font-black text-blue-800 uppercase tracking-tighter">
          {personalInfo.mediaLinks.linkedin && <span>LinkedIn: {personalInfo.mediaLinks.linkedin}</span>}
          {personalInfo.mediaLinks.github && <span>GitHub: {personalInfo.mediaLinks.github}</span>}
        </div>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-200 pb-1 mb-3 uppercase font-sans tracking-widest">Professional Summary</h2>
          <p className="text-[13px] leading-relaxed text-slate-800 italic">
            {personalInfo.summary}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-200 pb-1 mb-4 uppercase font-sans tracking-widest">Employment History</h2>
          <div className="space-y-6">
            {employment.map(emp => (
              <div key={emp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex gap-2">
                    <h3 className="font-bold text-[14px] uppercase tracking-tight">{emp.company}</h3>
                    <span className="text-slate-400 text-sm">|</span>
                    <span className="italic text-[14px] font-medium">{emp.role}</span>
                  </div>
                  <span className="text-xs font-sans font-bold text-slate-500 uppercase tracking-tighter">
                    {emp.startDate} — {emp.current ? 'Present' : emp.endDate}
                  </span>
                </div>
                <div className="text-[12px] leading-relaxed text-slate-700 pl-4 border-l border-slate-100 print:border-slate-200">
                  {renderDescription(emp.description)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b-2 border-slate-200 pb-1 mb-4 uppercase font-sans tracking-widest">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[14px]">{edu.institution}</h3>
                  <p className="text-[13px] italic text-slate-600">{edu.degree}, {edu.course}</p>
                </div>
                <span className="text-xs font-sans font-bold text-slate-500 uppercase tracking-tighter">
                  {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-sm font-bold border-b-2 border-slate-200 pb-1 mb-3 uppercase font-sans tracking-widest">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px]">
              {skills.map(skill => (
                <span key={skill.id} className="font-bold text-slate-700">{skill.name} <span className="text-[10px] font-normal text-slate-400">({skill.proficiency})</span></span>
              ))}
            </div>
          </section>
          {certificates.length > 0 && (
            <section>
              <h2 className="text-sm font-bold border-b-2 border-slate-200 pb-1 mb-3 uppercase font-sans tracking-widest">Certificates</h2>
              <div className="space-y-1">
                {certificates.map(cert => (
                  <div key={cert.id} className="text-[12px]">
                    <span className="font-bold">{cert.title}</span> — <span className="text-slate-500 italic">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const MinimalTemplate = () => (
    <div className="bg-white min-h-[1050px] p-16 text-slate-800 print-area font-sans selection:bg-blue-100 print:shadow-none print:bg-white print:m-0" id="cv-content">
      <header className="mb-16">
        <h1 className="text-6xl font-extralight tracking-tighter text-slate-900 mb-6">{personalInfo.fullName}</h1>
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 border-t border-slate-100 pt-6 print:border-slate-200">
          <span className="hover:text-slate-900 transition-colors">{personalInfo.email}</span>
          <span className="hover:text-slate-900 transition-colors">{personalInfo.phone}</span>
          <span className="hover:text-slate-900 transition-colors">{personalInfo.address}</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-4 space-y-16">
          <section>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Expertise</h3>
            <div className="space-y-6">
              {skills.map(skill => (
                <div key={skill.id}>
                  <div className="font-bold text-sm tracking-tight mb-1">{skill.name}</div>
                  <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{skill.proficiency}</div>
                </div>
              ))}
            </div>
          </section>

          {certificates.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">Honors</h3>
              <div className="space-y-6">
                {certificates.map(cert => (
                  <div key={cert.id}>
                    <div className="font-bold text-sm tracking-tight mb-1">{cert.title}</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-8 space-y-16">
          <section>
            <p className="text-2xl text-slate-600 font-light leading-snug tracking-tight">
              {personalInfo.summary}
            </p>
          </section>

          <section>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 border-b border-slate-50 pb-4 print:border-slate-200">Professional Record</h3>
            <div className="space-y-12">
              {employment.map(emp => (
                <div key={emp.id} className="group">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 group-hover:text-blue-500 transition-colors">
                    {emp.startDate} — {emp.current ? 'CURRENT' : emp.endDate}
                  </div>
                  <div className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{emp.role} <span className="font-light text-slate-300">/</span> {emp.company}</div>
                  <div className="text-sm text-slate-500 leading-relaxed font-medium">
                    {renderDescription(emp.description)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 border-b border-slate-50 pb-4 print:border-slate-200">Education</h3>
            <div className="space-y-8">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="text-[10px] font-bold text-slate-400 mb-2">{edu.startDate} — {edu.current ? 'PRESENT' : edu.endDate}</div>
                  <div className="font-bold text-slate-900 tracking-tight">{edu.institution}</div>
                  <div className="text-sm text-slate-500 font-medium">{edu.degree} in {edu.course}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="shadow-2xl overflow-hidden rounded-lg mx-auto max-w-[850px] border border-slate-200 print:shadow-none print:border-none">
      {template === 'modern' && <ModernTemplate />}
      {template === 'classic' && <ClassicTemplate />}
      {template === 'minimal' && <MinimalTemplate />}
    </div>
  );
};

export default CVPreview;
