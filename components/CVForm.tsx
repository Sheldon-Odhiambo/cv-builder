
import React, { useState, useMemo } from 'react';
import { CVData, Education, Employment, SkillEntry, Certificate } from '../types';
import { enhanceText } from '../services/geminiService';
import {
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Link as LinkIcon,
  Trash2,
  Plus,
  FileText,
  Linkedin,
  Github,
  Sparkles,
  ChevronDown,
  Calendar,
  Clock,
  Image as ImageIcon,
  User
} from 'lucide-react';

interface CVFormProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

/**
 * Robust Month-Year Picker Component
 * Optimized for accessibility and professional CV input.
 */
const MonthYearPicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  label: string;
}> = ({ value, onChange, disabled, label }) => {
  const months = useMemo(() => [
    { val: "01", label: "Jan" }, { val: "02", label: "Feb" }, { val: "03", label: "Mar" },
    { val: "04", label: "Apr" }, { val: "05", label: "May" }, { val: "06", label: "Jun" },
    { val: "07", label: "Jul" }, { val: "08", label: "Aug" }, { val: "09", label: "Sep" },
    { val: "10", label: "Oct" }, { val: "11", label: "Nov" }, { val: "12", label: "Dec" }
  ], []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 60 }, (_, i) => (currentYear + 5 - i).toString());
  }, []);

  const [vYear, vMonth] = useMemo(() => {
    if (!value || !value.includes('-')) return ['', ''];
    return value.split('-');
  }, [value]);
  
  const handleUpdate = (year: string, month: string) => {
    if (!year && !month) {
      onChange('');
      return;
    }
    const finalYear = year || new Date().getFullYear().toString();
    const finalMonth = month || '01';
    onChange(`${finalYear}-${finalMonth}`);
  };

  const selectBaseStyle = "w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-black dark:text-white rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#facc15] focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-40 disabled:bg-slate-50 dark:disabled:bg-slate-900 pr-8";

  return (
    <div className="flex items-center gap-3 w-full group">
      <div className="flex-shrink-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-focus-within:bg-black dark:group-focus-within:bg-[#facc15] transition-colors">
        <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 group-focus-within:text-white dark:group-focus-within:text-black" />
      </div>
      <div className="grid grid-cols-2 gap-2 flex-grow">
        <div className="relative">
          <select
            value={vMonth}
            onChange={(e) => handleUpdate(vYear, e.target.value)}
            disabled={disabled}
            aria-label={`Select Month for ${label}`}
            className={selectBaseStyle}
          >
            <option value="" disabled>Month</option>
            {months.map((m) => (
              <option key={m.val} value={m.val}>{m.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={vYear}
            onChange={(e) => handleUpdate(e.target.value, vMonth)}
            disabled={disabled}
            aria-label={`Select Year for ${label}`}
            className={selectBaseStyle}
          >
            <option value="" disabled>Year</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateMediaLinks = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        mediaLinks: { ...data.personalInfo.mediaLinks, [field]: value }
      }
    });
  };

  const handleEnhanceSummary = async () => {
    if (!data.personalInfo.summary) return;
    setIsEnhancing('summary');
    const enhanced = await enhanceText(data.personalInfo.summary, 'summary');
    updatePersonalInfo('summary', enhanced);
    setIsEnhancing(null);
  };

  const addItem = (listName: keyof CVData) => {
    const id = Date.now().toString();
    if (listName === 'employment') {
      onChange({ ...data, employment: [...data.employment, { id, company: '', role: '', description: '', startDate: '', endDate: '', current: false }] });
    } else if (listName === 'education') {
      onChange({ ...data, education: [...data.education, { id, institution: '', course: '', degree: '', startDate: '', endDate: '', current: false }] });
    } else if (listName === 'skills') {
      onChange({ ...data, skills: [...data.skills, { id, name: '', proficiency: 'Intermediate', description: '' }] });
    } else if (listName === 'certificates') {
      onChange({ ...data, certificates: [...data.certificates, { id, title: '', issuer: '', issue_date: '', category: 'Certificate', description: '' }] });
    }
  };

  const removeItem = (listName: keyof CVData, id: string) => {
    const list = data[listName] as any[];
    onChange({ ...data, [listName]: list.filter(item => item.id !== id) });
  };

  const updateItem = (listName: keyof CVData, id: string, field: string, value: any) => {
    const list = data[listName] as any[];
    onChange({
      ...data,
      [listName]: list.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const labelStyle = "text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest block mb-2";
  const inputStyle = "w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-[#facc15] focus:border-transparent transition-all placeholder-slate-400 dark:placeholder-slate-500";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden no-print transition-colors">
      {/* Header Preview Section */}
      <div className="h-48 relative overflow-hidden group">
        {data.personalInfo.bannerUrl ? (
          <img src={data.personalInfo.bannerUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Banner Preview" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-black dark:from-black dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
             <Sparkles className="w-12 h-12 text-white/5 dark:text-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
        
        <div className="absolute -bottom-12 left-10 p-2 bg-white dark:bg-slate-900 rounded-3xl shadow-xl z-20">
          <div className="w-32 h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-800 overflow-hidden shadow-inner">
            {data.personalInfo.avatarUrl ? (
              <img src={data.personalInfo.avatarUrl} className="w-full h-full object-cover" alt="Avatar Preview" />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <User className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                <span className="text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-tighter">Profile</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 p-10 space-y-12">
        {/* Contact & Profile Media */}
        <section className="space-y-8">
          <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3 border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <Mail className="w-5 h-5 text-[#facc15]" /> Profile & Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelStyle}>Full Name</label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                className={inputStyle}
                placeholder="Ex: Alex Rivera"
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Contact Email</label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className={inputStyle}
                placeholder="alex@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Phone Number</label>
              <input
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className={inputStyle}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Address</label>
              <input
                type="text"
                value={data.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                className={inputStyle}
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Avatar Image URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={data.personalInfo.avatarUrl}
                  onChange={(e) => updatePersonalInfo('avatarUrl', e.target.value)}
                  className={`${inputStyle} pl-10`}
                  placeholder="https://example.com/photo.jpg"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>Banner Image URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={data.personalInfo.bannerUrl}
                  onChange={(e) => updatePersonalInfo('bannerUrl', e.target.value)}
                  className={`${inputStyle} pl-10`}
                  placeholder="https://example.com/banner.jpg"
                />
                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Media Links */}
        <section className="space-y-8">
          <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3 border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <LinkIcon className="w-5 h-5 text-[#facc15]" /> Social Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelStyle}>LinkedIn URL</label>
              <input
                type="url"
                value={data.personalInfo.mediaLinks.linkedin}
                onChange={(e) => updateMediaLinks('linkedin', e.target.value)}
                className={inputStyle}
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div className="space-y-1">
              <label className={labelStyle}>GitHub URL</label>
              <input
                type="url"
                value={data.personalInfo.mediaLinks.github}
                onChange={(e) => updateMediaLinks('github', e.target.value)}
                className={inputStyle}
                placeholder="github.com/username"
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#facc15]" /> Professional Summary
            </h2>
            <button
              onClick={handleEnhanceSummary}
              disabled={isEnhancing === 'summary' || !data.personalInfo.summary}
              className="px-4 py-2 bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg active:scale-95"
            >
              <Sparkles className="w-3 h-3" /> {isEnhancing === 'summary' ? 'Enhancing...' : 'AI Enhance Content'}
            </button>
          </div>
          <textarea
            rows={5}
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            className={`${inputStyle} resize-none h-32`}
            placeholder="Write a few sentences about your professional background and goals..."
          />
        </section>

        {/* Skills */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3">
              <Award className="w-5 h-5 text-[#facc15]" /> Skills & Expertise
            </h2>
            <button
              onClick={() => addItem('skills')}
              className="px-4 py-2 bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <Plus className="w-3 h-3" /> Add Skill
            </button>
          </div>
          <div className="space-y-6">
            {data.skills.map((skill) => (
              <div key={skill.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800 space-y-4 relative group">
                <button
                  onClick={() => removeItem('skills', skill.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelStyle}>Skill Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
                      className={inputStyle}
                      placeholder="e.g., Python, Project Management"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Proficiency</label>
                    <div className="relative">
                      <select
                        value={skill.proficiency}
                        onChange={(e) => updateItem('skills', skill.id, 'proficiency', e.target.value)}
                        className={`${inputStyle} appearance-none cursor-pointer`}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#facc15]" /> Education
            </h2>
            <button
              onClick={() => addItem('education')}
              className="px-4 py-2 bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <Plus className="w-3 h-3" /> Add Education
            </button>
          </div>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800 space-y-4 relative">
                <button
                  onClick={() => removeItem('education', edu.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className={labelStyle}>Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)}
                      className={inputStyle}
                      placeholder="University or School"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                      className={inputStyle}
                      placeholder="e.g., Bachelor of Arts"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className={labelStyle}>Field of Study</label>
                    <input
                      type="text"
                      value={edu.course}
                      onChange={(e) => updateItem('education', edu.id, 'course', e.target.value)}
                      className={inputStyle}
                      placeholder="e.g., Business Administration"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Start Date</label>
                    <MonthYearPicker
                      value={edu.startDate}
                      label="Education Start"
                      onChange={(val) => updateItem('education', edu.id, 'startDate', val)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>End Date</label>
                    <MonthYearPicker
                      value={edu.endDate}
                      label="Education End"
                      onChange={(val) => updateItem('education', edu.id, 'endDate', val)}
                      disabled={edu.current}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => updateItem('education', edu.id, 'current', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 accent-black dark:accent-[#facc15] cursor-pointer"
                      />
                      <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors">Currently Studying Here</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#facc15]" /> Employment History
            </h2>
            <button
              onClick={() => addItem('employment')}
              className="px-4 py-2 bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <Plus className="w-3 h-3" /> Add Experience
            </button>
          </div>
          <div className="space-y-6">
            {data.employment.map((emp) => (
              <div key={emp.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800 space-y-4 relative">
                <button
                  onClick={() => removeItem('employment', emp.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={emp.company}
                      onChange={(e) => updateItem('employment', emp.id, 'company', e.target.value)}
                      className={inputStyle}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Job Title</label>
                    <input
                      type="text"
                      value={emp.role}
                      onChange={(e) => updateItem('employment', emp.id, 'role', e.target.value)}
                      className={inputStyle}
                      placeholder="Your role"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>Start Date</label>
                    <MonthYearPicker
                      value={emp.startDate}
                      label="Employment Start"
                      onChange={(val) => updateItem('employment', emp.id, 'startDate', val)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyle}>End Date</label>
                    <MonthYearPicker
                      value={emp.endDate}
                      label="Employment End"
                      onChange={(val) => updateItem('employment', emp.id, 'endDate', val)}
                      disabled={emp.current}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={emp.current}
                        onChange={(e) => updateItem('employment', emp.id, 'current', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 accent-black dark:accent-[#facc15] cursor-pointer"
                      />
                      <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors">Currently Working Here</span>
                    </label>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className={labelStyle}>Achievements & Description</label>
                    <textarea
                      rows={4}
                      value={emp.description}
                      onChange={(e) => updateItem('employment', emp.id, 'description', e.target.value)}
                      className={`${inputStyle} resize-none`}
                      placeholder="Use bullet points for better impact..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-slate-50 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-3">
              <Award className="w-5 h-5 text-[#facc15]" /> Certificates
            </h2>
            <button
              onClick={() => addItem('certificates')}
              className="px-4 py-2 bg-black dark:bg-[#facc15] text-[#facc15] dark:text-black text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              <Plus className="w-3 h-3" /> Add Certificate
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.certificates.map((cert) => (
              <div key={cert.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800 space-y-4 relative group">
                <button
                  onClick={() => removeItem('certificates', cert.id)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-1">
                  <label className={labelStyle}>Certificate Title</label>
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => updateItem('certificates', cert.id, 'title', e.target.value)}
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className={labelStyle}>Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateItem('certificates', cert.id, 'issuer', e.target.value)}
                    className={inputStyle}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVForm;
