import React, { useState, useRef, useEffect } from 'react';

// --- ICONS (Adjusted to MD Size) ---
const Icon = ({ children, size = 18, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);

const Moon = (p) => <Icon {...p} size={20}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon>;
const Star = (p) => <Icon {...p} size={18}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></Icon>;
const Check = (p) => <Icon {...p} size={20}><polyline points="20 6 9 17 4 12" /></Icon>;
const ImageIcon = (p) => <Icon {...p} size={28}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Icon>;
const Download = (p) => <Icon {...p} size={18}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>;
const X = (p) => <Icon {...p} size={24}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
const RefreshCw = (p) => <Icon {...p} size={18}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></Icon>;
const Maximize = (p) => <Icon {...p} size={18}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></Icon>;
const UserIcon = (p) => <Icon {...p} size={18}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>;
const Trash = (p) => <Icon {...p} size={16}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Icon>;
const Camera = (p) => <Icon {...p} size={16}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></Icon>;
const Layers = (p) => <Icon {...p} size={16}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></Icon>;

const Shirt = (p) => <Icon {...p}><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" /></Icon>;
const Utensils = (p) => <Icon {...p}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></Icon>;
const Gift = (p) => <Icon {...p}><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" /></Icon>;
const Sparkles = (p) => <Icon {...p}><path d="M12 3v1m0 16v1m5-12.5a6.5 6.5 0 11-10 0M12 7v4m-7 5l1.5-1.5M19 16l-1.5-1.5" /></Icon>;
const Smartphone = (p) => <Icon {...p}><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></Icon>;
const Sofa = (p) => <Icon {...p}><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" /></Icon>;

// --- CONFIGURATION ---

const TONE_CONFIG = [
    { id: 'luxury', label: '💎 LUXURY', prompt: 'Elite high-end lighting, expensive marble/silk surfaces, sophisticated cinematic lighting.' },
    { id: 'sticker', label: '🏷️ STICKER', prompt: 'Die-cut graphic sticker style, thick sharp white border around the entire product, solid flat background.' },
    { id: 'chill', label: '🕯️ CHILL', prompt: 'Warm cozy ambiance, soft homey lighting, comfortable and relatable atmosphere.' },
    { id: 'relax', label: '🌿 RELAX', prompt: 'Calm natural environment, organic textures like wood and stone, serene daylight bokeh.' },
    { id: 'vibrant', label: '🔥 VIBRANT', prompt: 'High energy pop aesthetic, bold saturated colors, high contrast dynamic lighting.' },
    { id: 'cinematic', label: '🎬 CINEMATIC', prompt: 'Moody dramatic film grade, deep shadows, rich textures, anamorphic lens flares.' },
];

const CATEGORY_CONFIG = [
    { id: 'f_and_b', label: 'F&B', icon: <Utensils size={24} /> },
    { id: 'fashion', label: 'Fashion', icon: <Shirt size={24} /> },
    { id: 'gift', label: 'Hampers', icon: <Gift size={24} /> },
    { id: 'cosmetic', label: 'Cosmetic', icon: <Sparkles size={24} /> },
    { id: 'gadget', label: 'Gadget', icon: <Smartphone size={24} /> },
    { id: 'home_decor', label: 'Home Decor', icon: <Sofa size={24} /> },
];

const MODEL_OPTIONS = [
    { id: 'wanita_hijab', label: 'WANITA', prompt: 'average Indonesian woman with natural features, wearing casual modern modest attire' },
    { id: 'pria_koko', label: 'PRIA', prompt: 'average Indonesian man with realistic everyday build, wearing casual modern attire' },
    { id: 'keluarga_ceria', label: 'KELUARGA', prompt: 'group of people with average body builds in modest casual festive attire' },
];

const VARIANT_OPTIONS = [1, 2, 3, 4];

// --- API HELPERS ---
const apiKey = "";

const fetchWithRetry = async (url, options, retries = 5) => {
    for (let i = 0; i <= retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return response;
        } catch (err) {
            if (i === retries) throw err;
            await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
        }
    }
};

const fileToBase64 = async (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
});

// --- CORE LOGIC ---
const generateVisuals = async (params) => {
    const { file, tone, useModel, model, isRamadanEdition, extraPrompt, variantCount, category, variantMode } = params;
    const toneObj = TONE_CONFIG.find(t => t.id === tone);
    const modelObj = MODEL_OPTIONS.find(m => m.id === model);

    const imageBase64 = file ? await fileToBase64(file) : null;
    const count = parseInt(variantCount);

    const availableAngles = [
        "straight eye-level front", "45-degree professional side", "top-down flat lay",
        "hero low-angle", "elegant close-up macro", "dynamic candid look"
    ];

    const compilerPrompt = variantMode === 'angle' ?
        `Role: Professional Creative Director.
    Task: Create 1 single SCENE description for a photo shoot.
    Product Category: ${category}
    Style: ${toneObj.label} (${toneObj.prompt})
    Model Req: ${useModel ? `YES, model MUST BE WEARING/HOLDING product. Model is ${modelObj.prompt}.` : 'NONE'}
    Theme: ${isRamadanEdition ? 'Ramadan (Minimalist background)' : 'Standard'}
    Custom Input: ${extraPrompt}
    
    STRICT CATEGORY RULE:
    - If Category is 'Fashion' and model is ON, the model MUST BE WEARING the product. The product is fitted to their body.
    - If Category is 'Cosmetic' or 'F&B' and model is ON, the model is HOLDING or USING the product.
    
    IDENTITY LOCK:
    - The product shape is IMMUTABLE. Do NOT change branding or structure.
    - Focus description on the ENVIRONMENT, POSE, and LIGHTING.
    
    Output: ONE PARAGRAPH SCENARIO ONLY.` :

        `Role: Professional Creative Director.
    Task: Create ${count} unique advertising photography briefs.
    Category: ${category}
    Style: ${toneObj.label}
    Model Req: ${useModel ? `Model is ${modelObj.prompt}. Model MUST WEAR/HOLD product.` : 'NONE'}
    Theme: ${isRamadanEdition ? 'Ramadan' : 'Standard'}
    Custom Input: ${extraPrompt}
    
    STRICT RULES:
    1. FASHION RULE: If Category is 'Fashion', the model MUST WEAR the clothes. Describe the fit and pose.
    2. PRODUCT LOCK: Every prompt starts with "Professional commercial photo of the source product, preserving its design 100%."
    3. VARIANTS: Only the background, model pose, and props change. The product remains static.
    
    Output: JSON array of ${count} strings ONLY.`;

    const copyRes = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: compilerPrompt }] }],
            generationConfig: { responseMimeType: variantMode === 'angle' ? "text/plain" : "application/json" }
        })
    });

    const resultJson = await copyRes.json();
    let textRes = resultJson.candidates?.[0]?.content?.parts?.[0]?.text;

    let compiledPrompts = [];
    if (variantMode === 'angle') {
        const baseScene = textRes.trim();
        compiledPrompts = availableAngles.slice(0, count).map(angle => `A photo of the original product. ${baseScene}. Camera angle: ${angle}.`);
    } else {
        try {
            compiledPrompts = JSON.parse(textRes);
        } catch (e) {
            const cleaned = textRes.replace(/```json/g, '').replace(/```/g, '').trim();
            try { compiledPrompts = JSON.parse(cleaned); } catch (e2) { compiledPrompts = [textRes]; }
        }
    }
    if (!Array.isArray(compiledPrompts)) compiledPrompts = [compiledPrompts];

    const imagePromises = compiledPrompts.slice(0, count).map(async (finalPrompt, idx) => {
        const url = imageBase64 ?
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}` :
            `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

        const fashionConstraint = (category === 'fashion' && useModel) ? `[CLOTHING LOCK]: The model MUST BE WEARING the product from the source image. Match the clothing fit to the model's body naturally.` : `[PRODUCT LOCK]: The product is the central focus.`;
        const lockdown = `[HARD IDENTITY LOCK]: DO NOT CHANGE PRODUCT PIXELS. ${fashionConstraint}`;

        const payload = imageBase64 ?
            {
                contents: [{ parts: [{ text: `${lockdown} ${finalPrompt} 8k, sharp focus, professional grading.` }, { inlineData: { data: imageBase64, mimeType: file.type } }] }],
                generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
            } :
            { instances: [{ prompt: finalPrompt }], parameters: { sampleCount: 1, seed: variantMode === 'angle' ? 666 : Math.floor(Math.random() * 1000000) } };

        try {
            const res = await fetchWithRetry(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const data = await res.json();
            let imgData = imageBase64 ? data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data : data.predictions?.[0]?.bytesBase64Encoded;
            if (!imgData) return { id: Math.random(), error: "FAILED", description: finalPrompt };
            return { id: Date.now() + idx + Math.random(), imageUrl: `data:image/png;base64,${imgData}`, description: finalPrompt };
        } catch (e) { return { id: Math.random(), error: "ERROR", description: finalPrompt }; }
    });

    return await Promise.all(imagePromises);
};

// --- MAIN APP ---
export default function App() {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('f_and_b');
    const [tone, setTone] = useState('luxury');
    const [isRamadanEdition, setIsRamadanEdition] = useState(true);
    const [variantMode, setVariantMode] = useState('variasi');
    const [useModel, setUseModel] = useState(false);
    const [model, setModel] = useState('wanita_hijab');
    const [variantCount, setVariantCount] = useState(4);
    const [extraPrompt, setExtraPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef(null);
    const galleryRef = useRef(null);

    const handleGenerate = async () => {
        if (!file) return setError("UPLOAD FOTO PRODUKMU DULU, JI!");
        setIsGenerating(true);
        setError('');
        try {
            const res = await generateVisuals({ file, tone, useModel, model, isRamadanEdition, variantCount, category, variantMode, extraPrompt });
            setResults(prev => [...res, ...prev]);
        } catch (e) {
            setError(e.message || "GAGAL MERACIK VISUAL.");
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (results.length > 0 && !isGenerating) {
            galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [results, isGenerating]);

    const handleReset = () => {
        setResults([]);
        setFile(null);
        setExtraPrompt('');
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-emerald-100 antialiased flex flex-col">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .box-timbul { background: white; border: 2px solid #e2e8f0; border-bottom: 4px solid #cbd5e1; border-radius: 24px; transition: all 0.2s; }
        .input-pro { background: #fcfcfc; border: 2px solid #e2e8f0; border-bottom: 3px solid #cbd5e1; border-radius: 12px; font-weight: 800; outline: none; transition: 0.15s; font-size: 13px; }
        .input-pro:focus { border-color: #10b981; }
        .btn-main { background: #10b981; border: 2px solid #059669; border-bottom: 6px solid #047857; color: white; border-radius: 16px; font-weight: 900; transition: all 0.1s; text-transform: uppercase; letter-spacing: 0.05em; font-size: 13px; }
        .btn-main:active { border-bottom-width: 2px; transform: translateY(3px); }
        .shimmer { background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shim 1.5s infinite; }
        @keyframes shim { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .text-label-pro { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: #64748b; margin-bottom: 8px; display: block; }
        
        /* Sidebar Scrollbar */
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>

            {selectedImage && !selectedImage.error && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                    <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shadow-2xl"><X size={24} /></button>
                    <div className="max-w-4xl w-full h-full flex flex-col items-center justify-center gap-4" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage.imageUrl} className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl ring-1 ring-white/10" alt="Preview" />
                        <button onClick={() => { const link = document.createElement('a'); link.href = selectedImage.imageUrl; link.download = `adsmakr-${Date.now()}.png`; link.click(); }} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase hover:bg-emerald-500 border-b-4 border-emerald-900 active:border-b-0 active:translate-y-1 shadow-xl"><Download size={18} className="inline mr-2" /> Simpan</button>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <header className="fixed top-0 inset-x-0 h-14 bg-white/90 backdrop-blur-md border-b border-slate-100 z-40 flex items-center justify-between px-8">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200 rotate-2"><Moon size={20} className="text-white fill-white" /></div>
                    <div>
                        <h1 className="text-lg font-black leading-none tracking-tight text-slate-900 uppercase">Adsmakr <span className="text-emerald-600 italic">Studio</span></h1>
                        <p className="text-[9px] font-black text-emerald-500 tracking-[0.3em] uppercase mt-0.5">Automated Multiverse Generator</p>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <div className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest shadow-sm">Pro Mode Active</div>
                </div>
            </header>

            <div className="flex flex-1 pt-14 h-screen">

                {/* SIDE NAV CONFIGURATION */}
                <aside className="w-80 bg-white border-r border-slate-100 flex flex-col shrink-0">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 sidebar-scroll">

                        {/* STEP 1: PRODUCT */}
                        <section>
                            <label className="text-label-pro">1. Produk & Kategori</label>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {CATEGORY_CONFIG.map(c => (
                                    <button key={c.id} onClick={() => setCategory(c.id)} className={`py-3 px-1 rounded-xl border-2 text-[9px] font-black transition-all flex flex-col items-center justify-center gap-1.5 h-16 ${category === c.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}>
                                        {c.icon} <span className="tracking-tighter uppercase text-[8px] mt-1">{c.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div onClick={() => fileInputRef.current.click()} className={`cursor-pointer border-2 border-dashed rounded-[20px] p-4 text-center transition-all group ${file ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-slate-200 hover:border-emerald-300 bg-slate-50/50'}`}>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={e => setFile(e.target.files[0])} accept="image/*" />
                                {file ? (
                                    <div className="flex flex-col items-center gap-1 overflow-hidden">
                                        <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg shadow-emerald-200"><Check size={14} /></div>
                                        <p className="text-[10px] font-black text-emerald-900 w-full truncate text-center uppercase tracking-tight">{file.name}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1 py-1">
                                        <ImageIcon size={24} className="mx-auto text-slate-300 group-hover:text-emerald-400 transition-colors" />
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Unggah Foto</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* STEP 2: VISUALS */}
                        <section className="space-y-4">
                            <label className="text-label-pro">2. Visual Settings</label>
                            <div className="flex items-center justify-between bg-emerald-900/5 p-3 rounded-xl border-2 border-emerald-100 border-b-4 shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-emerald-900 flex items-center gap-1.5 uppercase tracking-widest"><Star size={14} className="fill-emerald-600 text-emerald-600" /> Ramadan Ed.</span>
                                    <span className="text-[8px] font-black text-emerald-700/60 uppercase">Minimalist</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={isRamadanEdition} onChange={(e) => setIsRamadanEdition(e.target.checked)} className="sr-only peer" />
                                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 shadow-inner"></div>
                                </label>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Tone Visual</label>
                                <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-2.5 input-pro text-[11px] font-black bg-white cursor-pointer shadow-sm uppercase">
                                    {TONE_CONFIG.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                </select>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-[20px] border-2 border-slate-100 shadow-inner space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><UserIcon size={14} /> Model?</span>
                                    <div className="flex bg-white p-1 rounded-lg border-2 border-slate-200">
                                        <button onClick={() => setUseModel(false)} className={`px-3 py-1 text-[9px] font-black rounded transition-all ${!useModel ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400'}`}>TIDAK</button>
                                        <button onClick={() => setUseModel(true)} className={`px-3 py-1 text-[9px] font-black rounded transition-all ${useModel ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400'}`}>YA</button>
                                    </div>
                                </div>
                                {useModel && (
                                    <div className="grid grid-cols-3 gap-1 animate-fade-in">
                                        {MODEL_OPTIONS.map(m => (
                                            <button key={m.id} onClick={() => setModel(m.id)} className={`py-2 text-[9px] font-black rounded-lg border-2 transition-all leading-none ${model === m.id ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-400'}`}>
                                                {m.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* STEP 3: ENGINE */}
                        <section className="space-y-4 pb-4">
                            <label className="text-label-pro">3. AI Config</label>
                            <div className="flex bg-slate-100 p-1 rounded-xl gap-1 shadow-inner">
                                <button onClick={() => setVariantMode('variasi')} className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all flex items-center justify-center gap-1.5 ${variantMode === 'variasi' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-400'}`}><Layers size={14} /> VARIASI</button>
                                <button onClick={() => setVariantMode('angle')} className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all flex items-center justify-center gap-1.5 ${variantMode === 'angle' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-400'}`}><Camera size={14} /> ANGLE</button>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Extra Concept</label>
                                <input value={extraPrompt} onChange={e => setExtraPrompt(e.target.value)} placeholder="Contoh: Di pantai..." className="w-full p-2.5 input-pro text-[11px] font-black placeholder:text-slate-300 uppercase tracking-tight shadow-sm" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Jumlah Hasil</label>
                                <div className="flex gap-1">
                                    {VARIANT_OPTIONS.map(v => (
                                        <button key={v} onClick={() => setVariantCount(v)} className={`flex-1 py-1.5 rounded-lg font-black text-[10px] transition-all border-2 ${variantCount === v ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'bg-white border-slate-100 text-slate-400'}`}>{v}</button>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ACTION BUTTON FIXED AT BOTTOM OF SIDEBAR */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                        {error && <p className="text-[9px] font-black text-red-600 text-center animate-pulse uppercase px-2 mb-3 tracking-widest">{error}</p>}
                        <button onClick={handleGenerate} disabled={isGenerating} className="w-full py-3.5 btn-main flex items-center justify-center gap-3 shadow-xl disabled:grayscale disabled:opacity-50 active:scale-95 transition-all">
                            {isGenerating ? <><RefreshCw className="animate-spin" size={18} /> MERACIK...</> : <><Moon size={18} className="fill-white" /> GENERATE</>}
                        </button>
                    </div>
                </aside>

                {/* MAIN GALLERY CONTENT */}
                <main className="flex-1 overflow-y-auto p-8 sidebar-scroll bg-white" ref={galleryRef}>
                    <div className="max-w-5xl mx-auto space-y-8">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-1.5 bg-emerald-600 rounded-full shadow-lg shadow-emerald-200" />
                                <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Visual Multiverse</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                {results.length > 0 && (
                                    <button onClick={handleReset} className="text-[9px] font-black text-red-500 bg-white px-3 py-1.5 rounded-full border-2 border-red-50 hover:bg-red-50 transition-all uppercase tracking-widest flex items-center gap-1.5 shadow-sm"><Trash size={14} /> Reset</button>
                                )}
                                <div className="text-[9px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm uppercase tracking-widest">
                                    {results.length} Variasi Selesai
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                            {isGenerating && Array.from({ length: parseInt(variantCount) }).map((_, i) => (
                                <div key={`loading-${i}`} className="box-timbul overflow-hidden aspect-square shimmer border-none shadow-lg rounded-[32px]" />
                            ))}

                            {results.length > 0 ? results.map((res) => (
                                <div key={res.id} className="box-timbul overflow-hidden group relative bg-white ring-1 ring-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[36px]">
                                    {res.error ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50 text-center gap-3 text-red-400 font-black uppercase text-[10px]">
                                            <Star size={32} className="text-red-100" />
                                            <span>Filter Keamanan AI</span>
                                        </div>
                                    ) : (
                                        <>
                                            <img src={res.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 cursor-zoom-in" alt="Visual" onClick={() => setSelectedImage(res)} />
                                            <div className="absolute top-5 right-5 flex opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                                <button onClick={(e) => { e.stopPropagation(); setSelectedImage(res); }} className="bg-white/95 backdrop-blur p-3.5 rounded-2xl shadow-xl hover:text-emerald-600 transition-all border border-slate-100 active:scale-90">
                                                    <Maximize size={20} className="stroke-[3px]" />
                                                </button>
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-[10px] text-white/95 font-black leading-snug line-clamp-3 italic uppercase tracking-wider drop-shadow-md">
                                                    {res.description}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )) : !isGenerating && (
                                <div className="col-span-full h-[60vh] border-[5px] border-dashed border-slate-100 rounded-[56px] flex flex-col items-center justify-center text-center p-12 bg-white/50 backdrop-blur-sm shadow-inner mt-4">
                                    <div className="bg-white p-8 rounded-full shadow-2xl mb-8 rotate-12 ring-1 ring-slate-100"><ImageIcon size={64} className="text-emerald-500" /></div>
                                    <h3 className="text-xl font-black mb-3 text-slate-800 tracking-tighter uppercase">Galeri Masih Kosong</h3>
                                    <p className="text-xs text-slate-400 font-black max-w-sm uppercase leading-relaxed tracking-tight">Gunakan panel di samping kiri untuk meracik campaign visual produkmu secara otomatis.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}