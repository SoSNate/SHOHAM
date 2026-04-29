import React, { useState, useEffect, useRef } from 'react';

// --- Vocabulary: STRICTLY 6th Grade Test Material (from the doc) ---
const wordsData = [
    // Irregular Verbs (V1 - V2)
    { en: "see - saw", he: "לראות - ראה" },
    { en: "have - had", he: "יש - היה" },
    { en: "know - knew", he: "לדעת - ידע" },
    { en: "get - got", he: "לקבל/להשיג - קיבל" },
    { en: "ride - rode", he: "לרכוב - רכב" },
    { en: "win - won", he: "לנצח - ניצח" },
    { en: "find - found", he: "למצוא - מצא" },
    { en: "leave - left", he: "לעזוב - עזב" },
    { en: "buy - bought", he: "לקנות - קנה" },
    { en: "cut - cut", he: "לחתוך - חתך (ללא שינוי)" },
    { en: "go - went", he: "ללכת - הלך" },
    { en: "think - thought", he: "לחשוב - חשב" },
    { en: "eat - ate", he: "לאכול - אכל" },

    // Regular Verbs
    { en: "save - saved", he: "לשמור/להציל - שמר" },
    { en: "watch - watched", he: "לצפות - צפה" },
    { en: "plan - planned", he: "לתכנן - תכנן (הכפלת אות)" },

    // To Be (was/were)
    { en: "was / wasn't", he: "היה / לא היה (ליחיד)" },
    { en: "were / weren't", he: "היו / לא היו (לרבים)" }
];

// --- Grammar Builder: Past Simple Rules (Challenging & Educational) ---
const grammarData = [
    { prompt: "I (go) to the park yesterday.", options: ["went", "goed", "go"], correct: 0, rule: "הפועל go הוא יוצא דופן ובעבר הופך ל-went." },
    { prompt: "She (not/see) the movie last night.", options: ["didn't saw", "didn't see", "wasn't see"], correct: 1, rule: "במשפט שלילה בעבר משתמשים ב-didn't ואז הפועל נשאר בצורת המקור (V1)!" },
    { prompt: "___ they happy yesterday?", options: ["Did", "Was", "Were"], correct: 2, rule: "לגוף 'הם' (They) משתמשים ב-Were בעבר." },
    { prompt: "Dan (plan) a big party.", options: ["planed", "planned", "plant"], correct: 1, rule: "בפועל קצר שמסתיים באות ניקוד ועיצור (P-L-A-N), מכפילים את האות האחרונה: planned." },
    { prompt: "___ he buy a new car?", options: ["Did", "Was", "Does"], correct: 0, rule: "שאלת כן/לא בעבר על פעולה מתחילה ב-Did. הפועל נשאר בצורת המקור." },
    { prompt: "We (buy) a lot of food.", options: ["buyed", "bought", "buy"], correct: 1, rule: "הפועל buy הוא יוצא דופן והופך בעבר ל-bought." },
    { prompt: "I (not/be) tired yesterday.", options: ["didn't be", "wasn't", "weren't"], correct: 1, rule: "הפועל To Be בעבר בשלילה (ליחיד) הוא wasn't." },
    { prompt: "She (cut) the cake.", options: ["cutted", "cut", "cat"], correct: 1, rule: "הפועל cut הוא מיוחד - הוא נשאר זהה גם בהווה וגם בעבר!" }
];

// --- Analogies Data (Past Simple logic) ---
const analogiesData = [
    { word1: "Go", word2: "Went", relation: "הווה לעבר", word3: "See", options: ["Saw", "Seen", "Seed", "Seeing"], correct: "Saw" },
    { word1: "Buy", word2: "Bought", relation: "הווה לעבר", word3: "Think", options: ["Thinked", "Thought", "Thank", "Thinks"], correct: "Thought" },
    { word1: "I / He / She", word2: "Was", relation: "התאמת פועל עזר", word3: "We / You / They", options: ["Was", "Is", "Were", "Are"], correct: "Were" },
    { word1: "Eat", word2: "Didn't eat", relation: "חיוב לשלילה", word3: "Ride", options: ["Rode", "Didn't ride", "Didn't rode", "Not ride"], correct: "Didn't ride" },
    { word1: "Watch", word2: "Watched", relation: "פועל רגיל", word3: "Save", options: ["Saved", "Saveed", "Sove", "Saven"], correct: "Saved" },
    { word1: "Find", word2: "Found", relation: "V1 -> V2", word3: "Know", options: ["Knew", "Knowed", "Known", "Knews"], correct: "Knew" }
];

// --- Word Bank Completion (Test format) ---
const completionData = [
    { sentence: "They _______ a great movie last night.", bank: ["went", "watched", "bought", "were"], correct: "watched" },
    { sentence: "Shoham didn't _______ to the park because it rained.", bank: ["go", "went", "saw", "was"], correct: "go" },
    { sentence: "I _______ very happy when I passed the test.", bank: ["did", "were", "was", "had"], correct: "was" },
    { sentence: "We _______ a new computer at the store.", bank: ["knew", "bought", "left", "thought"], correct: "bought" },
    { sentence: "_______ she ride her bike yesterday?", bank: ["Was", "Did", "Were", "Do"], correct: "Did" },
    { sentence: "He _______ the door open when he left.", bank: ["found", "left", "saw", "planned"], correct: "left" }
];

// --- Reading Comprehension (Unseen) ---
const storiesData = [
    {
        title: "The Weekend Adventure 🌳",
        content: [
            "Yesterday, Shoham and her family [[went|הלכו|וונט|learned]] to the park. The weather [[was|היה|ווז|learned]] very beautiful. They [[planned|תכננו|פלאנד|learned]] to have a picnic.",
            "Her dad [[bought|קנה|בוט|learned]] a big pizza, and they [[ate|אכלו|אייט|learned]] it under a tree. After that, Shoham [[rode|רכבה|רוד|learned]] her bike and her brother [[watched|צפה|ווטצ'ד|learned]] a game.",
            "Suddenly, Shoham [[saw|ראתה|סו|learned]] a small dog. She [[found|מצאה|פאונד|learned]] the owner. They didn't [[leave|לעזוב|ליב|learned]] until it was dark. Shoham [[thought|חשבה|ת'וט|learned]] it was a great day!"
        ],
        audio: "Yesterday, Shoham and her family went to the park. The weather was very beautiful. They planned to have a picnic. Her dad bought a big pizza, and they ate it under a tree. After that, Shoham rode her bike and her brother watched a game. Suddenly, Shoham saw a small dog. She found the owner. They didn't leave until it was dark. Shoham thought it was a great day!",
        questions: [
            { q: "Where did Shoham go yesterday?", options: ["To the school", "To the park", "To the store"], correct: 1 },
            { q: "What did her dad buy?", options: ["A dog", "A bike", "A pizza"], correct: 2 },
            { q: "Why didn't they leave early?", options: ["Because they had fun", "Because it was raining", "Because they were lost"], correct: 0 }
        ]
    }
];

export default function App() {
    // --- State ---
    const [view, setView] = useState('learn'); 
    const [masteredIndexes, setMasteredIndexes] = useState(() => {
        const saved = localStorage.getItem('shoham_test_mastered');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [step, setStep] = useState(1);
    const [feedback, setFeedback] = useState(null);
    const [options, setOptions] = useState([]);
    const [activeAnim, setActiveAnim] = useState(null);
    const [isListening, setIsListening] = useState(false);

    // Specific game states
    const [grammarIndex, setGrammarIndex] = useState(0);
    const [grammarSolved, setGrammarSolved] = useState(false);
    const [compIndex, setCompIndex] = useState(0);
    const [analogyIndex, setAnalogyIndex] = useState(0);
    const [storyMode, setStoryMode] = useState('read');
    const [storyQuestionIndex, setStoryQuestionIndex] = useState(0);
    
    // Quiz state
    const [quizSet, setQuizSet] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);

    const currentWord = wordsData[activeWordIndex] || wordsData[0];

    useEffect(() => {
        localStorage.setItem('shoham_test_mastered', JSON.stringify(masteredIndexes));
    }, [masteredIndexes]);

    // --- Helpers ---
    const playSound = (type) => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (type === 'success') {
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        } else {
            osc.frequency.setValueAtTime(150, ctx.currentTime);
        }
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    };

    const triggerAnim = (type) => {
        setActiveAnim(type);
        setTimeout(() => setActiveAnim(null), 1500);
    };

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'en-US';
        utt.rate = 0.8;
        window.speechSynthesis.speak(utt);
    };

    // --- Games Logic ---
    const startQuiz = () => {
        const set = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 10).map(w => {
            const others = wordsData.filter(x => x.he !== w.he).sort(() => 0.5 - Math.random()).slice(0, 3);
            const opts = [...others.map(x => x.he), w.he].sort(() => 0.5 - Math.random());
            return { q: w.en, correct: w.he, options: opts };
        });
        setQuizSet(set);
        setQuizIndex(0);
        setQuizScore(0);
        setView('quiz');
    };

    const handleSpeech = () => {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) return;
        const rec = new Recognition();
        rec.lang = 'en-US';
        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onresult = (e) => {
            const transcript = e.results[0][0].transcript.toLowerCase();
            const target = currentWord.en.toLowerCase().split('-')[1]?.trim() || currentWord.en.toLowerCase();
            if (transcript.includes(target)) {
                playSound('success');
                setFeedback({ type: 'success', message: 'כל הכבוד! הגייה מצוינת' });
                setMasteredIndexes(prev => prev.includes(activeWordIndex) ? prev : [...prev, activeWordIndex]);
                triggerAnim('success-check');
                setTimeout(() => {
                    setStep(1);
                    setActiveWordIndex(prev => (prev + 1) % wordsData.length);
                    setFeedback(null);
                }, 1500);
            } else {
                playSound('error');
                setFeedback({ type: 'error', message: `שמעתי "${transcript}", נסי שוב` });
            }
        };
        rec.start();
    };

    const renderStoryText = (text) => {
        return text.split(/(\[\[.*?\]\])/g).map((part, i) => {
            if (part.startsWith('[[') && part.endsWith(']]')) {
                const [word, he] = part.slice(2, -2).split('|');
                return (
                    <span key={i} className="font-bold text-pink-600 border-b-2 border-pink-200 cursor-help group relative px-1">
                        {word}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">{he}</span>
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    // --- UI Blocks ---
    const NavBtn = ({ icon, label, target, action }) => (
        <button 
            onClick={() => { if(action) action(); else { setView(target); setFeedback(null); }}}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${view === target ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-white text-slate-700 hover:bg-pink-50'}`}
        >
            <span>{icon}</span> {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-rose-50 p-4 md:p-8 font-sans text-slate-800" dir="rtl">
            <div className="max-w-4xl mx-auto">
                
                {/* Fixed Animations */}
                {activeAnim === 'success-check' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/20 backdrop-blur-sm">
                        <div className="text-[150px] animate-bounce">✅</div>
                    </div>
                )}
                {activeAnim === 'confetti' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/20 backdrop-blur-sm">
                        <div className="text-[150px] animate-spin">🎉</div>
                    </div>
                )}

                <header className="text-center mb-10">
                    <h1 className="text-5xl font-black text-pink-600 mb-6 drop-shadow-sm">העולם של שוהם 🎡</h1>
                    <div className="flex flex-wrap justify-center gap-3">
                        <NavBtn icon="🎓" label="למידה" target="learn" />
                        <NavBtn icon="📖" label="ספריה" target="library" />
                        <NavBtn icon="⏳" label="דקדוק" target="grammar" action={() => { setView('grammar'); setGrammarSolved(false); }} />
                        <NavBtn icon="🧩" label="מחסן מילים" target="completion" />
                        <NavBtn icon="🔗" label="אנלוגיות" target="analogies" />
                        <NavBtn icon="📚" label="אנסין" target="story" action={() => { setView('story'); setStoryMode('read'); setStoryQuestionIndex(0); }} />
                        <NavBtn icon="🏆" label="בוחן" target="quiz" action={startQuiz} />
                    </div>
                </header>

                {/* Main Views */}
                <main className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-pink-400 min-h-[450px] flex flex-col justify-center transition-all">
                    
                    {/* 🎓 LEARN VIEW */}
                    {view === 'learn' && (
                        <div className="text-center">
                            <h2 className="text-6xl font-black text-slate-900 mb-10" dir="ltr">{currentWord.en}</h2>
                            {step === 1 ? (
                                <div className="space-y-6">
                                    <button onClick={() => speak(currentWord.en)} className="w-24 h-24 bg-pink-500 text-white rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg hover:scale-110 active:scale-95 transition-all">🔊</button>
                                    <button onClick={() => {
                                        const others = wordsData.filter(x => x.he !== currentWord.he).sort(() => 0.5 - Math.random()).slice(0, 3);
                                        setOptions([...others, currentWord].sort(() => 0.5 - Math.random()));
                                        setStep(2);
                                    }} className="px-10 py-4 bg-white border-4 border-pink-400 text-pink-600 font-black text-2xl rounded-2xl hover:bg-pink-500 hover:text-white transition-all">אני מכירה את המילה ✨</button>
                                </div>
                            ) : step === 2 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {options.map((opt, i) => (
                                        <button key={i} onClick={() => {
                                            if (opt.he === currentWord.he) { playSound('success'); setStep(3); }
                                            else { playSound('error'); setFeedback({type:'error', message: 'לא נכון, נסי שוב'}); }
                                        }} className="p-6 bg-pink-50 border-2 border-pink-200 rounded-2xl font-bold text-xl hover:bg-pink-500 hover:text-white transition-all">{opt.he}</button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <p className="text-xl font-bold text-slate-500">עכשיו תורך! אמרי את המילה באנגלית:</p>
                                    <button onClick={handleSpeech} className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all ${isListening ? 'bg-rose-400 scale-110 animate-pulse' : 'bg-pink-500 text-white text-5xl'}`}>🎤</button>
                                    {feedback && <p className={`font-bold ${feedback.type === 'success' ? 'text-green-500' : 'text-rose-500'}`}>{feedback.message}</p>}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ⏳ GRAMMAR VIEW */}
                    {view === 'grammar' && (
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-blue-600 mb-8">אתגר הדקדוק (Past Simple)</h2>
                            <div className="text-3xl font-black mb-10 p-8 bg-blue-50 rounded-2xl border-2 border-blue-100" dir="ltr">{grammarData[grammarIndex].prompt}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                {grammarData[grammarIndex].options.map((opt, i) => (
                                    <button key={i} onClick={() => {
                                        if (i === grammarData[grammarIndex].correct) { playSound('success'); setGrammarSolved(true); triggerAnim('success-check'); }
                                        else playSound('error');
                                    }} className="p-6 bg-white border-2 border-blue-200 rounded-2xl font-bold text-xl hover:bg-blue-500 hover:text-white transition-all">{opt}</button>
                                ))}
                            </div>
                            {grammarSolved && (
                                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-4 animate-in fade-in">
                                    <p className="text-green-800 font-bold text-lg mb-4">💡 {grammarData[grammarIndex].rule}</p>
                                    <button onClick={() => { setGrammarIndex((grammarIndex + 1) % grammarData.length); setGrammarSolved(false); }} className="bg-blue-500 text-white px-8 py-2 rounded-xl font-bold">לשאלה הבאה ➜</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 🧩 WORD BANK VIEW */}
                    {view === 'completion' && (
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-pink-700 mb-6">מחסן מילים</h2>
                            <div className="bg-slate-100 p-6 rounded-2xl border-2 border-slate-200 mb-8">
                                <p className="text-xs font-bold text-slate-400 mb-3 text-right">מחסן מילים:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {completionData[compIndex].bank.map((w, i) => (
                                        <button key={i} onClick={() => {
                                            if (w === completionData[compIndex].correct) { playSound('success'); triggerAnim('success-check'); setTimeout(() => setCompIndex((compIndex + 1) % completionData.length), 1500); }
                                            else playSound('error');
                                        }} className="bg-white border-2 border-pink-200 px-6 py-2 rounded-xl font-bold text-pink-600 hover:bg-pink-500 hover:text-white transition-all">{w}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-2xl font-bold p-8 bg-rose-50 rounded-2xl border-2 border-rose-100 leading-loose" dir="ltr">
                                {completionData[compIndex].sentence.replace('_______', '_____')}
                            </div>
                        </div>
                    )}

                    {/* 📚 UNSEEN VIEW */}
                    {view === 'story' && (
                        <div>
                            <h2 className="text-4xl font-black text-center text-orange-600 mb-8">{storiesData[storyIndex].title}</h2>
                            {storyMode === 'read' ? (
                                <div className="space-y-8">
                                    <div className="text-xl md:text-2xl leading-loose bg-orange-50 p-8 rounded-2xl border-2 border-orange-100 shadow-inner" dir="ltr">
                                        {storiesData[storyIndex].content.map((p, i) => <p key={i} className="mb-4">{renderStoryText(p)}</p>)}
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <button onClick={() => speak(storiesData[storyIndex].audio)} className="bg-white border-2 border-orange-400 text-orange-600 px-8 py-3 rounded-xl font-bold">🔊 הקרא לי</button>
                                        <button onClick={() => setStoryMode('questions')} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg">📝 התחל שאלות</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200">
                                    <p className="text-center text-slate-500 font-bold mb-4">שאלה {storyQuestionIndex + 1} מתוך 3</p>
                                    <h3 className="text-2xl font-black text-center mb-8" dir="ltr">{storiesData[storyIndex].questions[storyQuestionIndex].q}</h3>
                                    <div className="flex flex-col gap-4 max-w-md mx-auto">
                                        {storiesData[storyIndex].questions[storyQuestionIndex].options.map((opt, i) => (
                                            <button key={i} onClick={() => {
                                                if (i === storiesData[storyIndex].questions[storyQuestionIndex].correct) {
                                                    playSound('success'); triggerAnim('success-check');
                                                    if (storyQuestionIndex < 2) setStoryQuestionIndex(prev => prev + 1);
                                                    else { triggerAnim('confetti'); setView('learn'); }
                                                } else playSound('error');
                                            }} className="p-4 bg-white border-2 border-blue-200 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all text-center">{opt}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 🏆 QUIZ VIEW */}
                    {view === 'quiz' && (
                        <div className="text-center">
                            <p className="text-slate-400 font-bold mb-4">שאלה {quizIndex + 1} מתוך 10</p>
                            <h2 className="text-6xl font-black mb-12" dir="ltr">{quizSet[quizIndex].q}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {quizSet[quizIndex].options.map((opt, i) => (
                                    <button key={i} onClick={() => {
                                        const isCorrect = opt === quizSet[quizIndex].correct;
                                        if (isCorrect) setQuizScore(prev => prev + 1);
                                        playSound(isCorrect ? 'success' : 'error');
                                        if (quizIndex < 9) setQuizIndex(prev => prev + 1);
                                        else { triggerAnim('confetti'); setView('learn'); }
                                    }} className="p-6 bg-pink-50 border-2 border-pink-100 rounded-2xl font-bold text-xl hover:bg-pink-500 hover:text-white transition-all">{opt}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 📖 LIBRARY VIEW */}
                    {view === 'library' && (
                        <div>
                            <h2 className="text-3xl font-black text-center text-rose-500 mb-8">הספריה למבחן 📚</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-2">
                                {wordsData.map((w, i) => (
                                    <div key={i} onClick={() => { setActiveWordIndex(i); setView('learn'); setStep(1); }} className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${masteredIndexes.includes(i) ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-100'}`}>
                                        <p className="font-black" dir="ltr">{w.en}</p>
                                        <p className="text-sm text-slate-500">{w.he}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 🃏 MATCH VIEW (SKELETON - USES SAME LOGIC) */}
                    {view === 'analogies' && (
                         <div className="text-center">
                             <h2 className="text-3xl font-black text-fuchsia-700 mb-8">אנלוגיות עבר פשוט</h2>
                             <div className="flex justify-center items-center gap-6 text-3xl font-black bg-pink-50 p-8 rounded-2xl border-2 border-pink-100 mb-10" dir="ltr">
                                 <span>{analogiesData[analogyIndex].word1}</span>
                                 <span className="text-pink-300">➜</span>
                                 <span>{analogiesData[analogyIndex].word2}</span>
                             </div>
                             <div className="text-xl text-slate-400 font-bold mb-4">בדיוק כמו ש...</div>
                             <div className="flex justify-center items-center gap-6 text-3xl font-black bg-fuchsia-50 p-8 rounded-2xl border-4 border-fuchsia-100 mb-10" dir="ltr">
                                 <span>{analogiesData[analogyIndex].word3}</span>
                                 <span className="text-fuchsia-300">➜</span>
                                 <span className="border-b-4 border-fuchsia-400 min-w-[100px]">?</span>
                             </div>
                             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                 {analogiesData[analogyIndex].options.map((opt, i) => (
                                     <button key={i} onClick={() => {
                                         if (opt === analogiesData[analogyIndex].correct) { playSound('success'); triggerAnim('success-check'); setTimeout(() => setAnalogyIndex((analogyIndex + 1) % analogiesData.length), 1500); }
                                         else playSound('error');
                                     }} className="p-4 bg-white border-2 border-fuchsia-200 rounded-xl font-bold hover:bg-fuchsia-500 hover:text-white transition-all">{opt}</button>
                                 ))}
                             </div>
                         </div>
                    )}

                </main>

                <footer className="mt-8 text-center text-slate-400 font-bold">
                    <p>התקדמות כללית: {Math.round((masteredIndexes.length / wordsData.length) * 100)}%</p>
                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-pink-400 h-full transition-all duration-1000" style={{ width: `${(masteredIndexes.length / wordsData.length) * 100}%` }}></div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
