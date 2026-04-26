import React, { useState, useEffect, useRef } from 'react';

// --- Advanced 7th-8th Grade Words ---
const wordsData = [
  // Phrasal Verbs
  { en: "Give up", he: "להתייאש / להשתמט" },
  { en: "Look forward to", he: "ציפייה לקידום / תקווה" },
  { en: "Put off", he: "לדחות / להתנגד" },
  { en: "Carry on", he: "להמשיך / לעמוד בעמדה" },
  { en: "Come across", he: "להיתקל בו / להימצא" },
  { en: "Figure out", he: "להבין / לחשוב" },
  { en: "Break down", he: "להתנתק / להישבר" },
  { en: "Bring up", he: "להעלות / לגדל" },

  // Connectors & Abstract Concepts
  { en: "Although", he: "אף על פי שלא" },
  { en: "However", he: "עם זאת" },
  { en: "Therefore", he: "לכן / בגלל זה" },
  { en: "Meanwhile", he: "בינתיים / באותו זמן" },
  { en: "Eventually", he: "בסוף / בסופו של דבר" },
  { en: "Opportunity", he: "הזדמנות" },
  { en: "Essential", he: "חיוני / הכרחי" },
  { en: "Achieve", he: "להשיג / לעלות" },

  // Complex Adjectives & Verbs
  { en: "Persistent", he: "עקשן / ניצור" },
  { en: "Vulnerable", he: "חלוש / בסכנה" },
  { en: "Resilient", he: "חוסן / יכול להתאושש" },
  { en: "Ambitious", he: "שאפתני" },
  { en: "Contemplate", he: "לחשוב בעמוקות" },
  { en: "Acknowledge", he: "להודות / להכיר" },
  { en: "Persevere", he: "להמשיך להשתדל" },
  { en: "Accomplish", he: "להשלים / להגשים" },
  { en: "Determine", he: "להחליט / לקבוע" },
  { en: "Remarkable", he: "ראוי להערה / מעניין" },
  { en: "Reluctant", he: "לא רוצה / סרוג" },
  { en: "Profound", he: "עמוק / משמעותי" },
  { en: "Inevitable", he: "בלתי נמנע" },
  { en: "Advocate", he: "לתמוך בעד / תומך" },
  { en: "Meticulous", he: "זהיר מאוד / מדויק" },
  { en: "Perceive", he: "להבחין / להרגיש" },
  { en: "Flourish", he: "לשגשג / להתפתח" },
  { en: "Compromise", he: "פשרה / להסכים" },
  { en: "Reluctance", he: "אי-רצון / קושי" },
  { en: "Diligent", he: "חרוץ / שקדן" }
];

// --- Builder Data (7th-8th Grade Advanced) ---
const builderData = [
    // Compound Words
    { type: "compound", part1: "Sun", part1Meaning: "שמש", part2: "Flower", part2Meaning: "פרח", word: "Sunflower", options: ["כלנית", "חמנייה", "ורד"], correct: 1, explanation: "פרח השמש - חמנייה שפונה אל השמש." },
    { type: "compound", part1: "Snow", part1Meaning: "שלג", part2: "Man", part2Meaning: "איש", word: "Snowman", options: ["גשם", "חורף", "איש שלג"], correct: 2, explanation: "איש שעשוי משלג = איש שלג." },
    { type: "compound", part1: "Bed", part1Meaning: "מיטה", part2: "Room", part2Meaning: "חדר", word: "Bedroom", options: ["סלון", "חדר שינה", "מטבח"], correct: 1, explanation: "החדר שבו נמצאת המיטה = חדר שינה." },
    { type: "compound", part1: "Rain", part1Meaning: "גשם", part2: "Bow", part2Meaning: "קשת", word: "Rainbow", options: ["קשת בענן", "מטריה", "שלולית"], correct: 0, explanation: "הקשת שמופיעה אחרי הגשם = קשת בענן." },
    { type: "compound", part1: "Note", part1Meaning: "פתק", part2: "Book", part2Meaning: "ספר", word: "Notebook", options: ["מחשב", "מחברת", "מכתב"], correct: 1, explanation: "ספר שכותבים בו פתקים/הערות = מחברת." },
    { type: "compound", part1: "Play", part1Meaning: "לשחק", part2: "Ground", part2Meaning: "אדמה", word: "Playground", options: ["גן שעשועים", "כדורגל", "פארק מים"], correct: 0, explanation: "המקום (אדמה) שבו משחקים = גן שעשועים." },
    { type: "compound", part1: "Class", part1Meaning: "שיעור", part2: "Room", part2Meaning: "חדר", word: "Classroom", options: ["הפסקה", "כיתה", "בית ספר"], correct: 1, explanation: "החדר שבו לומדים את השיעור = כיתה." },
    { type: "compound", part1: "Water", part1Meaning: "מים", part2: "Melon", part2Meaning: "מלון", word: "Watermelon", options: ["תפוח", "אבטיח", "ענבים"], correct: 1, explanation: "פרי שמלא במים = אבטיח." },

    // Advanced Prefixes
    { type: "prefix", prefix: "Un", root: "Happy", rootMeaning: "שמח", word: "Unhappy", options: ["עצוב / לא שמח", "מאוד שמח", "צוחק"], correct: 0, explanation: "הקידומת Un הופכת את המילה לשלילית. לא-שמח = עצוב." },
    { type: "prefix", prefix: "Re", root: "Read", rootMeaning: "לקרוא", word: "Reread", options: ["לכתוב", "לקרוא שוב", "לשכוח"], correct: 1, explanation: "הקידומת Re אומרת 'לעשות שוב'." },
    { type: "prefix", prefix: "Dis", root: "Agree", rootMeaning: "להסכים", word: "Disagree", options: ["להסכים מאוד", "לא להסכים", "להתווכח"], correct: 1, explanation: "הקידומת Dis מציינת הפך או חוסר הסכמה." },
    { type: "prefix", prefix: "Mis", root: "Understand", rootMeaning: "להבין", word: "Misunderstand", options: ["להבין בצורה שגויה", "להבין במהירות", "להבין לעומק"], correct: 0, explanation: "הקידומת Mis אומרת 'לעשות בצורה שגויה'." },
    { type: "prefix", prefix: "Over", root: "Think", rootMeaning: "לחשוב", word: "Overthink", options: ["לחשוב מעט", "לחשוב יותר מידי", "לא לחשוב"], correct: 1, explanation: "הקידומת Over אומרת 'יותר מידי' או 'יתר על המידה'." },
    { type: "prefix", prefix: "Under", root: "Stand", rootMeaning: "לעמוד", word: "Understand", options: ["לעמוד תחת", "להבין", "להיות מתחת"], correct: 1, explanation: "Under במשמעות רחוקה אומרת 'להבין' - כמו 'עמידה בתוך'." },
    { type: "prefix", prefix: "Pre", root: "Plan", rootMeaning: "לתכנן", word: "Preplan", options: ["תכנון מראש", "תכנון חוזר", "ביטול תכנון"], correct: 0, explanation: "הקידומת Pre אומרת 'לפני' או 'מראש'." },
    { type: "prefix", prefix: "Non", root: "Fiction", rootMeaning: "בדיוני", word: "Nonfiction", options: ["ספרות בדיוני", "ספרות מציאותית", "סיפור בדיוני"], correct: 1, explanation: "הקידומת Non אומרת 'לא' או 'ללא'." }
];

// --- Analogies Data (Advanced 7th-8th Grade) ---
const analogiesData = [
    // Basic relationships (original)
    { word1: "Dog", word2: "Animal", relation: "סוג של...", word3: "Apple", options: ["Food", "Drink", "Color", "Toy"], correct: "Food" },
    { word1: "Big", word2: "Small", relation: "הפכים (Opposites)", word3: "Hot", options: ["Cold", "Warm", "Red", "Sun"], correct: "Cold" },
    { word1: "Happy", word2: "Sad", relation: "הפכים (Opposites)", word3: "Fast", options: ["Slow", "Run", "Jump", "Play"], correct: "Slow" },
    { word1: "Boy", word2: "Girl", relation: "זכר ונקבה", word3: "Man", options: ["Woman", "Baby", "Father", "Mother"], correct: "Woman" },
    { word1: "Day", word2: "Night", relation: "הפכים", word3: "Sun", options: ["Moon", "Star", "Sky", "Tree"], correct: "Moon" },
    { word1: "Eye", word2: "See", relation: "איבר והפעולה שלו", word3: "Ear", options: ["Listen", "Speak", "Eat", "Run"], correct: "Listen" },
    { word1: "White", word2: "Black", relation: "צבעים הופכיים", word3: "Good", options: ["Bad", "Happy", "Clean", "Dirty"], correct: "Bad" },
    { word1: "Drink", word2: "Water", relation: "פעולה ומה שעושים איתו", word3: "Eat", options: ["Pizza", "Book", "Pen", "Table"], correct: "Pizza" },

    // Advanced relationships
    { word1: "Optimism", word2: "Hope", relation: "רגשות מופשטים דומים", word3: "Courage", options: ["Fear", "Strength", "Wisdom", "Doubt"], correct: "Strength" },
    { word1: "Author", word2: "Novel", relation: "יוצר ויצירה", word3: "Composer", options: ["Song", "Music", "Orchestra", "Symphony"], correct: "Symphony" },
    { word1: "Reluctance", word2: "Hesitation", relation: "תחושות דומות", word3: "Perseverance", options: ["Weakness", "Confidence", "Determination", "Doubt"], correct: "Determination" },
    { word1: "Root", word2: "Tree", relation: "חלק מכל", word3: "Page", options: ["Book", "Paper", "Ink", "Cover"], correct: "Book" }
];

// --- Sentence Completion Data (Advanced 7th-8th Grade Context-Heavy) ---
const completionData = [
    { sentence: "I eat an _______ every morning because it is healthy.", options: ["Apple", "Book", "Dog", "Shoe"], correct: "Apple" },
    { sentence: "Please _______ the door, it is very cold outside.", options: ["Close", "Open", "Buy", "Run"], correct: "Close" },
    { sentence: "My _______ has four legs and says 'Woof!'.", options: ["Dog", "Fish", "Bird", "Teacher"], correct: "Dog" },
    { sentence: "I need a _______ to write my name on the paper.", options: ["Pen", "Chair", "Tree", "Apple"], correct: "Pen" },
    { sentence: "When I am thirsty after running, I drink _______.", options: ["Water", "Bread", "Cake", "Cheese"], correct: "Water" },
    { sentence: "I am very tired today. I want to _______ in my bed.", options: ["Sleep", "Jump", "Run", "Eat"], correct: "Sleep" },
    { sentence: "The _______ is yellow and it makes the day hot.", options: ["Sun", "Moon", "Snow", "Rain"], correct: "Sun" },
    { sentence: "I like to _______ a good story book before I go to sleep.", options: ["Read", "Write", "Listen", "Speak"], correct: "Read" },
    { sentence: "I use my eyes to see, and my _______ to listen to music.", options: ["Ear", "Nose", "Hand", "Foot"], correct: "Ear" },
    { sentence: "My shirt is _______ because I played in the mud.", options: ["Dirty", "Clean", "New", "White"], correct: "Dirty" },

    // Advanced completions
    { sentence: "Despite her initial _______, she eventually found confidence speaking in public.", options: ["enthusiasm", "trepidation", "joy", "knowledge"], correct: "trepidation" },
    { sentence: "His _______ attitude about climate change contradicts the scientific evidence.", options: ["concerned", "optimistic", "dismissive", "passionate"], correct: "dismissive" }
];

// --- Multi-Story Data with Tooltip Parsing Format ---
// Format: [[Word|Hebrew Translation|Hebrew Pronunciation|StyleCategory]]
const storiesData = [
    {
        title: "A Good Book 📖",
        content: [
            "[[Shoham|שוהם|שוהם|learned]] [[always|תמיד|אלווייז|learned]] likes to [[read|לקרוא|ריד|learned]] a [[good|טוב|גוד|learned]] [[book|ספר|בוק|learned]].",
            "One [[morning|בוקר|מורנינג|learned]], she goes to the [[library|ספרייה|לייבררי|new]] to find a [[new|חדש|ניו|learned]] [[story|סיפור|סטורי|learned]]. She sits on a [[chair|כיסא|צ'ייר|learned]] and [[listens|מקשיבה|ליסנס|learned]] to the [[quiet|שקט|קווייט|new]] room.",
            "It is a very [[beautiful|יפה|ביוטיפול|learned]] [[day|יום|דיי|learned]]!"
        ],
        audio: "Shoham always likes to read a good book. One morning, she goes to the library to find a new story. She sits on a chair and listens to the quiet room. It is a very beautiful day!"
    },
    {
        title: "A Trip to the Park 🌳",
        content: [
            "It is a [[beautiful|יפה|ביוטיפול|learned]] [[day|יום|דיי|learned]]. Shoham and her [[mother|אמא|מאת'ר|learned]] walk to the [[park|פארק|פארק|new]]. The [[sun|שמש|סאן|learned]] is [[yellow|צהוב|יילו|learned]] and [[hot|חם|הוט|learned]].",
            "Shoham sees a [[small|קטן|סמול|learned]] [[bird|ציפור|בירד|learned]] in a [[tree|עץ|טרי|learned]]. The bird is [[blue|כחול|בלו|learned]]. She also sees a [[black|שחור|בלאק|learned]] [[cat|חתול|קאט|learned]] [[under|מתחת|אנדר|learned]] a [[table|שולחן|טייבל|learned]].",
            "They sit on a [[chair|כיסא|צ'ייר|learned]] and [[eat|אוכלים|איט|learned]] a [[pizza|פיצה|פיצה|learned]]. It is very [[good|טוב|גוד|learned]]! Shoham [[loves|אוהבת|לאבס|learned]] the park."
        ],
        audio: "It is a beautiful day. Shoham and her mother walk to the park. The sun is yellow and hot. Shoham sees a small bird in a tree. The bird is blue. She also sees a black cat under a table. They sit on a chair and eat a pizza. It is very good! Shoham loves the park."
    },
    {
        title: "The Magic Snowman ⛄",
        content: [
            "It is [[cold|קר|קוֹלְד|learned]] today. There is [[white|לבן|ווַיְיט|learned]] [[snow|שלג|סְנוֹו|learned]] everywhere. Shoham wants to build a [[snowman|איש שלג|סְנוֹו־מֶן|compound]].",
            "She gives him a [[red|אדום|רֶד|learned]] hat and a carrot for a [[nose|אף|נוֹאוּז|learned]]. Suddenly, the snowman starts to [[speak|לדבר|סְפִּיק|learned]]! 'Hello Shoham,' he says.",
            "They [[run|רצים|רָאן|learned]] and [[jump|קופצים|גָ'אמְפ|learned]] together in the snow. They become good [[friends|חברים|פְרֶנְדְס|learned]]. Shoham will [[never|אף פעם|נֶבֶר|learned]] [[forget|לשכוח|פוֹרְגֶט|learned]] this amazing day."
        ],
        audio: "It is cold today. There is white snow everywhere. Shoham wants to build a snowman. She gives him a red hat and a carrot for a nose. Suddenly, the snowman starts to speak! Hello Shoham, he says. They run and jump together in the snow. They become good friends. Shoham will never forget this amazing day."
    },
    {
        title: "The Lost Puppy 🐶",
        content: [
            "Shoham is walking home from [[school|בית ספר|סקול|learned]]. She hears a [[sad|עצוב|סאד|learned]] noise. She looks [[behind|מאחורי|ביהיינד|learned]] a [[big|גדול|ביג|learned]] [[tree|עץ|טרי|learned]].",
            "She finds a [[small|קטן|סמול|learned]], [[dirty|מלוכלך|דירטי|learned]] [[dog|כלב|דוג|learned]]. He is very [[tired|עייף|טיירד|learned]] and [[hungry|רעב|האנגרי|new]].",
            "Shoham takes the puppy home. She gives him [[water|מים|ווטר|learned]] and [[food|אוכל|פוד|new]]. Now, the puppy is [[clean|נקי|קלין|learned]] and very [[happy|שמח|האפי|learned]]!"
        ],
        audio: "Shoham is walking home from school. She hears a sad noise. She looks behind a big tree. She finds a small, dirty dog. He is very tired and hungry. Shoham takes the puppy home. She gives him water and food. Now, the puppy is clean and very happy!"
    },
    {
        title: "The Big Test 📝",
        content: [
            "Tomorrow is a [[big|גדול|ביג|learned]] [[day|יום|דיי|learned]]. There is a math [[test|מבחן|טסט|learned]] at [[school|בית ספר|סקול|learned]].",
            "Shoham sits on her [[chair|כיסא|צ'ייר|learned]] and takes her [[pencil|עיפרון|פנסיל|learned]] and [[notebook|מחברת|נוטבוק|compound]]. She starts to [[read|לקרוא|ריד|learned]] and [[write|לכתוב|רייט|learned]].",
            "It is [[late|מאוחר|לייט|new]] at [[night|לילה|נייט|learned]], but she wants to get a [[good|טוב|גוד|learned]] grade. Finally, she goes to [[sleep|לישון|סליפ|learned]]. She is ready!"
        ],
        audio: "Tomorrow is a big day. There is a math test at school. Shoham sits on her chair and takes her pencil and notebook. She starts to read and write. It is late at night, but she wants to get a good grade. Finally, she goes to sleep. She is ready!"
    },

    {
        title: "Finding Her Voice 💪",
        content: [
            "Shoham had always been [[quiet|שקט|קווייט|learned]]. When her [[teacher|מורה|טיצ'ר|new]] asked questions in class, she felt [[nervous|עצבני|נרווס|new]] and [[worried|דאוג|וררייד|new]]. All the other students could [[speak|לדבר|ספיק|learned]] [[confidently|בביטחון|קונפידנטלי|new]], but not her.",
            "One [[day|יום|דיי|learned]], she had an [[idea|רעיון|אידיאה|new]] about the [[project|פרויקט|פרוג'קט|new]]. She wanted to [[share|לשתף|שר|new]] it, but her [[heart|לב|הארט|learned]] was [[beating|פוקד|ביטינג|new]] so [[fast|מהיר|פאסט|learned]]. She [[took|לקח|טוק|learned]] a [[deep|עמוק|דיפ|new]] [[breath|נשימה|ברת|new]] and [[raised|הרים|ריזד|new]] her [[hand|יד|האנד|learned]].",
            "The other students [[listened|הקשיבו|ליסנד|learned]] carefully. Her [[teacher|מורה|טיצ'ר|new]] [[smiled|חיך|סמיילד|learned]] and said, 'Wonderful idea, Shoham!' That [[day|יום|דיי|learned]], she [[discovered|גילתה|דיסקאוו'רד|new]] something [[important|חשוב|ימפורטנט|new]] about herself."
        ],
        audio: "Shoham had always been quiet. When her teacher asked questions in class, she felt nervous and worried. All the other students could speak confidently, but not her. One day, she had an idea about the project. She wanted to share it, but her heart was beating so fast. She took a deep breath and raised her hand. The other students listened carefully. Her teacher smiled and said, Wonderful idea, Shoham! That day, she discovered something important about herself."
    },

    {
        title: "The Competition 🏆",
        content: [
            "Shoham [[trained|אומנה|טרייnd|new]] hard for the [[math|מתמטיקה|מאת|new]] [[competition|תחרות|קומפטישן|new]]. She [[practiced|התרגלה|פראקטיסד|new]] every [[night|לילה|נייט|learned]]. When the [[day|יום|דיי|learned]] came, she was [[ready|מוכנה|רדי|learned]].",
            "But when she [[saw|ראתה|סו|learned]] the [[difficult|קשה|דיפיקלט|new]] [[problems|בעיות|פרובלמס|new]], her [[mind|מוח|מיינד|new]] felt [[blank|ריק|בלאנק|new]]. She didn't win the [[competition|תחרות|קומפטישן|new]]. She felt [[disappointed|מאוכזבת|דיסאפוינטד|new]].",
            "Later, her [[mother|אמא|מאדר|learned]] told her something [[important|חשוב|ימפורטנט|new]]: 'You tried your [[best|הטוב|בסט|new]]. That's what really [[matters|חשוב|מטרס|new]].' Shoham [[realized|הבינה|ריאליזד|new]] that [[failing|כישלון|פיילינג|new]] once doesn't mean you should [[give up|להתייאש|גיב אפ|new]]."
        ],
        audio: "Shoham trained hard for the math competition. She practiced every night. When the day came, she was ready. But when she saw the difficult problems, her mind felt blank. She didn't win the competition. She felt disappointed. Later, her mother told her something important: You tried your best. That's what really matters. Shoham realized that failing once doesn't mean you should give up."
    },

    {
        title: "Different Paths 🌈",
        content: [
            "Shoham and her [[best|הטוב|בסט|new]] [[friend|חברה|פרנד|learned]] Noa did everything together. They played the [[same|אותו|סיים|new]] [[games|משחקים|גיימס|learned]] and had the [[same|אותו|סיים|new]] [[interests|תחומי עניין|אינטרסטס|new]].",
            "One [[day|יום|דיי|learned]], Noa told Shoham that she wanted to join the [[art|אמנות|ארט|new]] [[club|מועדון|קלוב|new]], while Shoham preferred the [[science|מדע|סיינס|new]] [[club|מועדון|קלוב|new]]. For the [[first|ראשון|פרסט|new]] [[time|זמן|טיים|learned]], they had [[different|שונה|דיפרנט|new]] [[paths|נתיבות|פאתס|new]].",
            "Shoham felt [[sad|עצוב|סאד|learned]], but she [[learned|למדה|לרנד|learned]] something [[valuable|יקר|וואליואבל|new]]: You can still be [[best|הטוב|בסט|new]] [[friends|חברים|פרנדס|learned]] even when you have [[different|שונה|דיפרנט|new]] [[interests|תחומי עניין|אינטרסטס|new]]. [[Friendship|חברות|פרנדשיפ|new]] is [[strong|חזק|סטרונג|new]] enough to [[survive|להתמודד|סערווייוו|new]] different [[choices|בחירות|צ'ויסיס|new]]."
        ],
        audio: "Shoham and her best friend Noa did everything together. They played the same games and had the same interests. One day, Noa told Shoham that she wanted to join the art club, while Shoham preferred the science club. For the first time, they had different paths. Shoham felt sad, but she learned something valuable: You can still be best friends even when you have different interests. Friendship is strong enough to survive different choices."
    }
];

// --- Reading & Vowel Patterns for Easy, Scaffolded Learning ---
const readingPatternsData = [
  {
    pattern: "Short A",
    sound: "like in 'cat'",
    hebrew: "צליל קצר כמו בקול הגרון",
    words: [
      { word: "cat", breakdown: "C-A-T", hebrew: "חתול" },
      { word: "hat", breakdown: "H-A-T", hebrew: "כובע" },
      { word: "map", breakdown: "M-A-P", hebrew: "מפה" },
      { word: "and", breakdown: "A-N-D", hebrew: "וגם" }
    ]
  },
  {
    pattern: "Short E",
    sound: "like in 'pen'",
    hebrew: "צליל קצר כמו בטיפול",
    words: [
      { word: "pen", breakdown: "P-E-N", hebrew: "עט" },
      { word: "bed", breakdown: "B-E-D", hebrew: "מיטה" },
      { word: "leg", breakdown: "L-E-G", hebrew: "רגל" },
      { word: "net", breakdown: "N-E-T", hebrew: "רשת" }
    ]
  },
  {
    pattern: "Short I",
    sound: "like in 'sit'",
    hebrew: "צליל קצר וגבוה",
    words: [
      { word: "sit", breakdown: "S-I-T", hebrew: "ישב" },
      { word: "big", breakdown: "B-I-G", hebrew: "גדול" },
      { word: "zip", breakdown: "Z-I-P", hebrew: "רוכסן" },
      { word: "win", breakdown: "W-I-N", hebrew: "ניצחון" }
    ]
  },
  {
    pattern: "Short O",
    sound: "like in 'dog'",
    hebrew: "צליל עגול וקצר",
    words: [
      { word: "dog", breakdown: "D-O-G", hebrew: "כלב" },
      { word: "box", breakdown: "B-O-X", hebrew: "קופסה" },
      { word: "hot", breakdown: "H-O-T", hebrew: "חם" },
      { word: "pot", breakdown: "P-O-T", hebrew: "סיר" }
    ]
  },
  {
    pattern: "Short U",
    sound: "like in 'cup'",
    hebrew: "צליל עמוק וקצר",
    words: [
      { word: "cup", breakdown: "C-U-P", hebrew: "כוס" },
      { word: "run", breakdown: "R-U-N", hebrew: "רוץ" },
      { word: "sun", breakdown: "S-U-N", hebrew: "שמש" },
      { word: "bug", breakdown: "B-U-G", hebrew: "חרק" }
    ]
  },
  {
    pattern: "Long A (with silent E)",
    sound: "like in 'cake' - A_E",
    hebrew: "צליל ארוך כשה-E שקט בסוף",
    words: [
      { word: "cake", breakdown: "C-A-K-E", hebrew: "עוגה", note: "E שקט בסוף" },
      { word: "name", breakdown: "N-A-M-E", hebrew: "שם", note: "E שקט בסוף" },
      { word: "make", breakdown: "M-A-K-E", hebrew: "עשה", note: "E שקט בסוף" },
      { word: "late", breakdown: "L-A-T-E", hebrew: "מאוחר", note: "E שקט בסוף" }
    ]
  },
  {
    pattern: "Long E (EA combination)",
    sound: "like in 'read' - EA",
    hebrew: "צליל ארוך עם שתי אותיות",
    words: [
      { word: "read", breakdown: "R-EA-D", hebrew: "קרא", note: "EA יחד" },
      { word: "team", breakdown: "T-EA-M", hebrew: "צוות", note: "EA יחד" },
      { word: "eat", breakdown: "EA-T", hebrew: "אכול", note: "EA יחד" },
      { word: "seat", breakdown: "S-EA-T", hebrew: "כיסא", note: "EA יחד" }
    ]
  },
  {
    pattern: "Long O (OA combination)",
    sound: "like in 'boat' - OA",
    hebrew: "צליל ארוך עם שתי אותיות",
    words: [
      { word: "boat", breakdown: "B-OA-T", hebrew: "סירה", note: "OA יחד" },
      { word: "coat", breakdown: "C-OA-T", hebrew: "מעיל", note: "OA יחד" },
      { word: "road", breakdown: "R-OA-D", hebrew: "דרך", note: "OA יחד" },
      { word: "goat", breakdown: "G-OA-T", hebrew: "עז", note: "OA יחד" }
    ]
  },
  {
    pattern: "OU combination",
    sound: "like in 'house' - OU",
    hebrew: "צליל שמע בגרון",
    words: [
      { word: "house", breakdown: "H-OU-S-E", hebrew: "בית", note: "OU יחד" },
      { word: "mouse", breakdown: "M-OU-S-E", hebrew: "עכבר", note: "OU יחד" },
      { word: "loud", breakdown: "L-OU-D", hebrew: "חזק", note: "OU יחד" },
      { word: "cloud", breakdown: "CL-OU-D", hebrew: "ענן", note: "OU יחד" }
    ]
  },
  {
    pattern: "Vowel combinations (AI, EI, IE)",
    sound: "like in 'rain', 'vein', 'pie'",
    hebrew: "שתי אותיות שיוצרות צליל אחד",
    words: [
      { word: "rain", breakdown: "R-AI-N", hebrew: "גשם", note: "AI = EI" },
      { word: "day", breakdown: "D-AY", hebrew: "יום", note: "AY = AI" },
      { word: "pie", breakdown: "P-IE", hebrew: "עוגה", note: "IE צליל ארוך I" },
      { word: "fly", breakdown: "FL-Y", hebrew: "זבוב", note: "Y כמו vowel בסוף" }
    ]
  }
];

const App = () => {
    // Load Lottie web component dynamically
    useEffect(() => {
        if (!customElements.get('dotlottie-wc')) {
            const script = document.createElement('script');
            script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js";
            script.type = "module";
            document.head.appendChild(script);
        }
    }, []);

    // --- Helper functions ---
    const getRandomUnmasteredIndex = (masteredList) => {
        const unmastered = wordsData.map((_, i) => i).filter(i => !masteredList.includes(i));
        if (unmastered.length > 0) {
            return unmastered[Math.floor(Math.random() * unmastered.length)];
        }
        return 0;
    };

    const getNextRandom = (curr, length) => {
        if (length <= 1) return 0;
        let next = curr;
        while (next === curr) next = Math.floor(Math.random() * length);
        return next;
    };

    // --- State Management ---
    const [view, setView] = useState('learn'); 
    
    const [masteredIndexes, setMasteredIndexes] = useState(() => {
        try {
            const saved = localStorage.getItem('shoham_mastered_words');
            return saved ? JSON.parse(saved).filter(i => i < wordsData.length) : [];
        } catch { return []; }
    });
    
    const [activeWordIndex, setActiveWordIndex] = useState(() => {
        const saved = localStorage.getItem('shoham_last_active_index');
        if (saved !== null) {
            const parsed = parseInt(saved);
            if (parsed >= 0 && parsed < wordsData.length) return parsed;
        }
        const initialMastered = []; 
        try {
            const s = localStorage.getItem('shoham_mastered_words');
            if(s) initialMastered.push(...JSON.parse(s).filter(i => i < wordsData.length));
        } catch(e) {}
        
        return getRandomUnmasteredIndex(initialMastered);
    });
    
    const [step, setStep] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [options, setOptions] = useState([]);
    const [activeAnim, setActiveAnim] = useState(null);

    // Quiz & Practice States
    const [quizSet, setQuizSet] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    
    const [builderIndex, setBuilderIndex] = useState(0);
    const [analogyIndex, setAnalogyIndex] = useState(0);
    const [compIndex, setCompIndex] = useState(0);
    const [storyIndex, setStoryIndex] = useState(0);
    const [readingPatternIndex, setReadingPatternIndex] = useState(0);
    const [wordInPatternIndex, setWordInPatternIndex] = useState(0);

    // Match Game State
    const [matchCards, setMatchCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);

    // Story Audio Mute State
    const [storyAudioMuted, setStoryAudioMuted] = useState(() => {
        try {
            const saved = localStorage.getItem('shoham_story_audio_muted');
            return saved ? JSON.parse(saved) : false;
        } catch { return false; }
    });

    const isProcessingRef = useRef(false);
    const currentWord = wordsData[activeWordIndex] || wordsData[0];

    useEffect(() => {
        localStorage.setItem('shoham_mastered_words', JSON.stringify(masteredIndexes));
        localStorage.setItem('shoham_last_active_index', activeWordIndex.toString());
    }, [masteredIndexes, activeWordIndex]);

    useEffect(() => {
        localStorage.setItem('shoham_story_audio_muted', JSON.stringify(storyAudioMuted));
    }, [storyAudioMuted]);

    const playSound = (type) => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            if (type === 'success') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
                oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); 
                gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            } else {
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            }
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch(e) {}
    };

    const triggerAnimation = (type) => {
        setActiveAnim(type);
        setTimeout(() => setActiveAnim(null), 1800);
    };

    const startQuiz = () => {
        const vocabQuestions = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 4).map(w => {
            const others = wordsData.filter(x => x.he !== w.he).sort(() => 0.5 - Math.random()).slice(0, 3);
            const opts = [...others.map(x => x.he), w.he].sort(() => 0.5 - Math.random());
            return { type: 'vocab', question: w.en, correct: w.he, options: opts };
        });
        const analogyQuestions = [...analogiesData].sort(() => 0.5 - Math.random()).slice(0, 3).map(a => {
            return { type: 'analogy', data: a, correct: a.correct, options: a.options };
        });
        const completionQuestions = [...completionData].sort(() => 0.5 - Math.random()).slice(0, 3).map(c => {
            return { type: 'completion', data: c, correct: c.correct, options: c.options };
        });

        const fullQuiz = [...vocabQuestions, ...analogyQuestions, ...completionQuestions].sort(() => 0.5 - Math.random());
        setQuizSet(fullQuiz);
        setQuizIndex(0);
        setQuizScore(0);
        setView('quiz');
        setFeedback(null);
    };

    const startMatchGame = () => {
        const selectedWords = [...wordsData].sort(() => 0.5 - Math.random()).slice(0, 6);
        let cards = [];
        selectedWords.forEach((w, index) => {
            cards.push({ id: `en-${index}`, text: w.en, type: 'en', pairId: index });
            cards.push({ id: `he-${index}`, text: w.he, type: 'he', pairId: index });
        });
        setMatchCards(cards.sort(() => 0.5 - Math.random()));
        setFlippedCards([]);
        setMatchedPairs([]);
        setView('match');
    };

    const handleCardClick = (card) => {
        if (flippedCards.length === 2 || flippedCards.some(c => c.id === card.id) || matchedPairs.includes(card.pairId)) return;
        
        const newFlipped = [...flippedCards, card];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            if (newFlipped[0].pairId === newFlipped[1].pairId) {
                playSound('success');
                setTimeout(() => {
                    setMatchedPairs(prev => [...prev, newFlipped[0].pairId]);
                    setFlippedCards([]);
                    if (matchedPairs.length + 1 === 6) { triggerAnimation('confetti'); }
                }, 500);
            } else {
                playSound('error');
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    useEffect(() => {
        if (view === 'learn' && step === 2) {
            const others = wordsData.filter(w => w.en !== currentWord.en).sort(() => 0.5 - Math.random()).slice(0, 3);
            setOptions([...others, currentWord].sort(() => 0.5 - Math.random()));
        }
    }, [step, activeWordIndex, view, currentWord]);

    const speakText = (text) => {
        // Check if story audio is muted (only applies to story audio, not other uses)
        if (storyAudioMuted && view === 'story') return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85; // קצב קצת יותר איטי ורגוע
        utterance.pitch = 1.15; // פיץ' קצת יותר גבוה ורך
        
        const voices = window.speechSynthesis.getVoices();
        
        // רשימת קולות מועדפים, טבעיים ונשיים יותר
        const priorityVoices = [
            "Microsoft Jenny Online", // קול טבעי מאוד של ווינדוס
            "Microsoft Aria Online", // קול טבעי של ווינדוס
            "Google US English", // גוגל כרום
            "Samantha", // מאק/אייפון
            "Karen", // מאק/אייפון
            "Victoria", // מאק/אייפון
            "Microsoft Zira" // ווינדוס קלאסי
        ];
        
        // 1. קודם נחפש קולות שמוגדרים כטבעיים או משופרים
        let selectedVoice = voices.find(v => 
            v.lang.startsWith('en') && 
            (v.name.includes("Premium") || v.name.includes("Enhanced") || v.name.includes("Online") || v.name.includes("Natural")) &&
            !v.name.toLowerCase().includes("male")
        );

        // 2. אם לא מצאנו, נחפש לפי הרשימה המועדפת שלנו
        if (!selectedVoice) {
            selectedVoice = voices.find(v => priorityVoices.some(p => v.name.includes(p)));
        }

        // 3. גיבוי - כל קול נשי באנגלית
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman')));
        }
        
        if (selectedVoice) utterance.voice = selectedVoice;
        window.speechSynthesis.speak(utterance);
    };

    const handleSpeechCapture = () => {
        if (isListening) return;
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) return alert("הדפדפן לא תומך בזיהוי קולי.");
        const rec = new Recognition();
        rec.lang = 'en-US';
        rec.continuous = false;
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        isProcessingRef.current = false;

        rec.onstart = () => setIsListening(true);

        rec.onend = () => {
            setIsListening(false);
            isProcessingRef.current = false;
        };

        rec.onerror = (e) => {
            setIsListening(false);
            isProcessingRef.current = false;
            if (e.error === 'no-speech') {
                setFeedback({ type: 'error', message: 'לא שמעתי כלום, נסי שוב 🎤' });
            } else if (e.error === 'not-allowed') {
                setFeedback({ type: 'error', message: 'נא לאשר גישה למיקרופון בדפדפן.' });
            } else {
                setFeedback({ type: 'error', message: 'שגיאת מיקרופון, נסי שוב.' });
            }
            setTimeout(() => setFeedback(null), 2500);
        };

        rec.onresult = (e) => {
            if (isProcessingRef.current) return;
            const transcript = e.results[0][0].transcript.toLowerCase().trim();
            const target = currentWord.en.toLowerCase().replace(/^to\s+/, "").trim();

            if (transcript.includes(target) || transcript === target) {
                isProcessingRef.current = true;
                setFeedback({ type: 'success', message: `מעולה! זיהיתי "${transcript}"` });
                playSound('success');
                triggerAnimation('success-check');

                setMasteredIndexes(prevMastered => {
                    const nextMastered = prevMastered.includes(activeWordIndex) ? prevMastered : [...prevMastered, activeWordIndex];

                    setTimeout(() => {
                        const unmastered = wordsData.map((_, i) => i).filter(i => !nextMastered.includes(i));

                        if (unmastered.length > 0) {
                            const randomNextIdx = unmastered[Math.floor(Math.random() * unmastered.length)];
                            setActiveWordIndex(randomNextIdx);
                        } else {
                            setFeedback({ type: 'success', message: "אלופה! סיימת את כל המאגר!" });
                        }

                        setStep(1);
                        setFeedback(null);
                        isProcessingRef.current = false;
                    }, 1800);

                    return nextMastered;
                });
            } else {
                setFeedback({ type: 'error', message: `שמעתי "${transcript}", נסי להגות ברור יותר.` });
                playSound('error');
            }
        };

        try {
            rec.start();
        } catch (e) {
            setIsListening(false);
            setFeedback({ type: 'error', message: 'לא ניתן להפעיל מיקרופון, נסי שוב.' });
            setTimeout(() => setFeedback(null), 2500);
        }
    };

    const checkTranslation = (he) => {
        if (he === currentWord.he) {
            playSound('success');
            setStep(3);
        } else {
            playSound('error');
            setFeedback({ type: 'error', message: "טעות, נסי שוב." });
            setTimeout(() => setFeedback(null), 1500);
        }
    };

    const handleQuizAnswer = (selected) => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        const target = quizSet[quizIndex];
        
        if (selected === target.correct) {
            setQuizScore(prev => prev + 1);
            playSound('success');
            triggerAnimation('success-check');
        } else {
            playSound('error');
        }
        
        setTimeout(() => {
            if (quizIndex < 9) setQuizIndex(prev => prev + 1);
            else setView('quiz-result');
            isProcessingRef.current = false;
        }, 1200);
    };

    const resetProgress = () => {
        if (confirm("האם לאפס התקדמות? הפעולה הזו תחזיר את כל המילים להיות 'לא נלמדו'.")) {
            setMasteredIndexes([]);
            localStorage.removeItem('shoham_mastered_words');
            localStorage.removeItem('shoham_last_active_index');
            
            const randomFirstIndex = Math.floor(Math.random() * wordsData.length);
            setActiveWordIndex(randomFirstIndex);
            
            setView('learn');
            setStep(1);
        }
    };

    // --- Story Content Parser ---
    const renderStoryText = (text) => {
        const parts = text.split(/(\[\[.*?\]\])/g);
        
        const typeStyles = {
            learned: "text-fuchsia-600 border-fuchsia-300",
            compound: "text-rose-600 border-rose-300",
            new: "text-pink-600 border-pink-300"
        };

        return parts.map((part, i) => {
            if (part.startsWith('[[') && part.endsWith(']]')) {
                const [word, he, pron, type] = part.slice(2, -2).split('|');
                const styleClass = typeStyles[type] || typeStyles.learned;
                
                return (
                    <span key={i} className={`relative group font-bold cursor-help inline-block border-b-2 transition-colors hover:bg-slate-50 rounded-sm px-1 ${styleClass}`}>
                        {word}
                        {/* Tooltip Bubble */}
                        <span className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-slate-800 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-xl flex flex-col items-center" dir="rtl">
                            <span className="font-black text-sm">{he}</span>
                            <span className="text-pink-300 text-xs mt-0.5" dir="rtl">{pron}</span>
                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></span>
                        </span>
                    </span>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    // --- UI Components ---
    const NavBtn = ({ icon, text, targetView, action }) => (
        <button
            onClick={() => { if(action) action(); else setView(targetView); }}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm border border-transparent ${view === targetView || (view.startsWith('quiz') && targetView==='quiz') ? 'bg-pink-500 text-white shadow-md scale-105 border-pink-600' : 'bg-white text-slate-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200'}`}
        >
            <span className="text-sm sm:text-base">{icon}</span> <span className="hidden sm:inline">{text}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-rose-50 text-slate-800 p-4 md:p-8 font-sans" dir="rtl">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={resetProgress} className="text-xs bg-white hover:bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold shadow-sm">איפוס 🔄</button>
                        <h1 className="text-4xl md:text-5xl font-black text-pink-600 drop-shadow-sm">העולם של שוהם 🎡</h1>
                        <div className="w-16"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <NavBtn icon="🎓" text="למידה" targetView="learn" />
                        <NavBtn icon="📖" text="ספריה" targetView="library" />
                        <NavBtn icon="🧩" text="הרכבה" targetView="builder" action={() => {setView('builder'); setBuilderIndex(Math.floor(Math.random() * builderData.length));}} />
                        <NavBtn icon="🔗" text="אנלוגיות" targetView="analogies" action={() => {setView('analogies'); setAnalogyIndex(Math.floor(Math.random() * analogiesData.length));}} />
                        <NavBtn icon="✍️" text="משפטים" targetView="completion" action={() => {setView('completion'); setCompIndex(Math.floor(Math.random() * completionData.length));}} />
                        <NavBtn icon="📚" text="סיפור" targetView="story" action={() => {setView('story'); setStoryIndex(Math.floor(Math.random() * storiesData.length));}}/>
                        <NavBtn icon="📖" text="קריאה" targetView="reading" action={() => {setView('reading'); setReadingPatternIndex(Math.floor(Math.random() * readingPatternsData.length)); setWordInPatternIndex(0);}} />
                        <NavBtn icon="🃏" text="זוגות" targetView="match" action={startMatchGame} />
                        <NavBtn icon="🏆" text="בוחן" targetView="quiz" action={startQuiz} />
                    </div>
                </header>

                {/* Animations Overlay */}
                {activeAnim === 'success-check' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/30 backdrop-blur-sm">
                        <dotlottie-wc src="https://lottie.host/21a44f7a-fb9f-4e6e-8ed5-647aa8455b43/jGVlPat0sl.lottie" style={{width: '300px', height: '300px'}} autoplay></dotlottie-wc>
                    </div>
                )}
                {activeAnim === 'confetti' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/30 backdrop-blur-sm">
                        <dotlottie-wc src="https://lottie.host/4c47d84e-6829-4be0-a686-d7a0817a318d/HgXH5VSCYu.lottie" style={{width:'100vw', height:'100vh'}} autoplay></dotlottie-wc>
                    </div>
                )}

                {/* --- MAIN LEARN VIEW --- */}
                {view === 'learn' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-pink-400 text-center relative min-h-[450px] flex flex-col justify-center transition-all">
                        {feedback && <div className={`absolute top-0 left-0 w-full p-3 rounded-t-[3rem] text-white font-bold transition-all ${feedback.type === 'success' ? 'bg-fuchsia-500' : 'bg-rose-500'}`}>{feedback.message}</div>}
                        <h2 className="text-6xl font-black text-pink-900 mb-8" dir="ltr">{currentWord.en}</h2>
                        
                        {step === 1 && (
                            <div className="space-y-6">
                                <button onClick={() => speakText(currentWord.en)} className="w-24 h-24 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg hover:scale-110 active:scale-95 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                </button>
                                <button onClick={() => setStep(2)} className="mt-8 px-10 py-5 bg-white border-4 border-pink-400 text-pink-600 font-black text-2xl rounded-2xl shadow-xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 block mx-auto w-full max-w-sm">
                                    אני מכירה, נעבור לתרגום ✨
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {options.map((opt, i) => (
                                    <button key={i} onClick={() => checkTranslation(opt.he)} className="p-6 bg-pink-50 border-2 border-pink-200 rounded-2xl font-bold text-xl text-pink-900 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                        {opt.he}
                                    </button>
                                ))}
                            </div>
                        )}
                        {step === 3 && (
                            <div className="space-y-6">
                                <p className="text-slate-500 font-bold">עכשיו תורך! אמרי את המילה באנגלית:</p>
                                <button onClick={handleSpeechCapture} className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all relative ${isListening ? 'bg-rose-400 scale-110' : 'bg-pink-500 hover:bg-pink-600'}`}>
                                    {isListening && <span className="absolute inset-0 rounded-full border-4 border-rose-300 animate-ping"></span>}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </button>
                                <p className="font-bold text-slate-400">{isListening ? "אני מקשיב..." : "לחצי על המיקרופון"}</p>
                            </div>
                        )}
                        <div className="w-full bg-pink-100 h-4 rounded-full mt-10 overflow-hidden">
                            <div className="bg-fuchsia-400 h-full transition-all duration-700" style={{width: `${(masteredIndexes.length / wordsData.length) * 100}%`}}></div>
                        </div>
                        <p className="text-pink-400 text-sm mt-2 font-bold">{masteredIndexes.length} מתוך {wordsData.length} מילים נלמדו</p>
                    </div>
                )}

                {/* --- LIBRARY --- */}
                {view === 'library' && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-peach-400 border-orange-300 transition-all">
                        <h2 className="text-3xl font-black text-rose-500 mb-6 text-center">הספריה של שוהם 📚</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                            {wordsData.map((w, idx) => {
                                const isM = masteredIndexes.includes(idx);
                                return (
                                    <div key={idx} onClick={() => { setActiveWordIndex(idx); setStep(1); setView('learn'); }} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${isM ? 'bg-fuchsia-50 border-fuchsia-300' : 'bg-rose-50 border-rose-100 hover:border-pink-400'}`}>
                                        <p className="font-black text-lg text-center text-slate-800" dir="ltr">{w.en}</p>
                                        <p className="text-sm text-center text-slate-600 mt-1">{w.he}</p>
                                        {isM && <span className="text-fuchsia-500 text-center block mt-1 font-bold">✓</span>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* --- MATCH GAME --- */}
                {view === 'match' && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-purple-400 text-center transition-all min-h-[500px]">
                        <h2 className="text-3xl font-black text-purple-700 mb-2">זוגות - מצא את ההתאמה 🃏</h2>
                        <p className="text-slate-500 font-bold mb-8">לחצי על קלף אנגלית והפירוש שלו בעברית</p>
                        
                        {matchedPairs.length === 6 ? (
                            <div className="py-20">
                                <h3 className="text-5xl font-black text-fuchsia-500 mb-6">ניצחון! 🎉</h3>
                                <button onClick={startMatchGame} className="px-8 py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600">שחקי שוב</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {matchCards.map((card, i) => {
                                    const isFlipped = flippedCards.some(c => c.id === card.id);
                                    const isMatched = matchedPairs.includes(card.pairId);
                                    return (
                                        <button 
                                            key={i} 
                                            onClick={() => handleCardClick(card)}
                                            disabled={isFlipped || isMatched}
                                            className={`h-24 md:h-32 rounded-2xl font-black text-xl md:text-2xl transition-all shadow-md flex items-center justify-center border-4 ${isMatched ? 'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-800 opacity-0 scale-95 cursor-default' : isFlipped ? 'bg-pink-100 border-pink-400 text-pink-900 scale-105' : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'}`}
                                            dir={card.type === 'en' ? 'ltr' : 'rtl'}
                                        >
                                            {card.text}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* --- BUILDER --- */}
                {view === 'builder' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-rose-400 text-center transition-all">
                        <h2 className="text-3xl font-black text-rose-600 mb-4">מילים מורכבות 🧩</h2>
                        <p className="text-slate-600 mb-8 font-bold text-lg">{builderData[builderIndex].explanation}</p>
                        <div className="flex justify-center items-center text-2xl md:text-5xl font-black gap-2 mb-8 bg-rose-50 p-6 rounded-3xl border-2 border-rose-100" dir="ltr">
                            <span className="text-rose-500">{builderData[builderIndex].type === 'prefix' ? builderData[builderIndex].prefix : builderData[builderIndex].part1}</span>
                            <span className="text-pink-300">+</span>
                            <span className="text-slate-700">{builderData[builderIndex].type === 'prefix' ? builderData[builderIndex].root : builderData[builderIndex].part2}</span>
                            <span className="text-pink-300 mx-2">=</span>
                            <span className="text-rose-700 underline decoration-rose-300">{builderData[builderIndex].word}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {builderData[builderIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => {
                                    if (i === builderData[builderIndex].correct) { 
                                        playSound('success'); 
                                        triggerAnimation('success-check'); 
                                        setTimeout(() => setBuilderIndex(prev => getNextRandom(prev, builderData.length)), 1500); 
                                    } else playSound('error');
                                }} className="p-6 bg-rose-50 border-2 border-rose-200 rounded-2xl font-bold text-xl text-rose-900 hover:bg-rose-500 hover:text-white transition-all shadow-sm">{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ANALOGIES --- */}
                {view === 'analogies' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-fuchsia-400 text-center transition-all">
                        <h2 className="text-3xl font-black text-fuchsia-800 mb-8">אנלוגיות - מה הקשר? 🔗</h2>
                        <div className="bg-fuchsia-50 px-6 py-2 rounded-full inline-block mb-8 font-bold text-fuchsia-800 text-lg">{analogiesData[analogyIndex].relation}</div>
                        
                        <div className="flex justify-center items-center gap-4 text-3xl md:text-4xl font-black bg-pink-50 p-6 rounded-2xl mb-4 border-2 border-pink-100 w-full max-w-lg mx-auto" dir="ltr">
                            <span className="text-slate-700">{analogiesData[analogyIndex].word1}</span><span className="text-fuchsia-400">↔️</span><span className="text-slate-700">{analogiesData[analogyIndex].word2}</span>
                        </div>
                        <div className="text-xl text-slate-400 font-bold mb-4">בדיוק כמו ש...</div>
                        <div className="flex justify-center items-center gap-4 text-3xl md:text-4xl font-black bg-fuchsia-100 p-6 rounded-2xl mb-10 border-4 border-fuchsia-200 w-full max-w-lg mx-auto" dir="ltr">
                            <span className="text-fuchsia-900">{analogiesData[analogyIndex].word3}</span><span className="text-fuchsia-400">↔️</span><span className="border-b-4 border-fuchsia-500 text-fuchsia-500 w-16 text-center">?</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {analogiesData[analogyIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => {
                                    if (opt === analogiesData[analogyIndex].correct) { 
                                        playSound('success'); 
                                        triggerAnimation('success-check'); 
                                        setTimeout(() => setAnalogyIndex(prev => getNextRandom(prev, analogiesData.length)), 1500); 
                                    } else playSound('error');
                                }} className="p-5 bg-white border-2 border-fuchsia-200 rounded-2xl font-black text-xl text-fuchsia-800 hover:bg-fuchsia-500 hover:text-white transition-all shadow-sm" dir="ltr">{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- COMPLETION --- */}
                {view === 'completion' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-pink-500 text-center transition-all">
                        <h2 className="text-3xl font-black text-pink-800 mb-8">השלמת משפטים ✍️</h2>
                        <div className="bg-pink-50 p-8 rounded-2xl border-2 border-pink-200 mb-10 text-2xl font-bold text-slate-800 leading-loose shadow-inner" dir="ltr">
                            {completionData[compIndex].sentence.split('_______')[0]}
                            <span className="inline-block border-b-4 border-pink-500 text-pink-600 px-4">?</span>
                            {completionData[compIndex].sentence.split('_______')[1]}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {completionData[compIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => {
                                    if (opt === completionData[compIndex].correct) { 
                                        playSound('success'); 
                                        triggerAnimation('success-check'); 
                                        setTimeout(() => setCompIndex(prev => getNextRandom(prev, completionData.length)), 1500); 
                                    } else playSound('error');
                                }} className="p-6 bg-white border-2 border-pink-200 rounded-2xl font-black text-xl text-pink-800 hover:bg-pink-500 hover:text-white transition-all shadow-sm" dir="ltr">{opt}</button>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- QUIZ --- */}
                {view === 'quiz' && (
                    <div className="bg-white rounded-[3rem] p-8 shadow-xl border-t-8 border-fuchsia-500 text-center transition-all">
                        <h2 className="text-xl font-bold text-fuchsia-700 mb-8">שאלה {quizIndex + 1} מתוך 10</h2>
                        
                        {quizSet[quizIndex].type === 'vocab' && (
                            <div className="mb-10">
                                <h3 className="text-6xl font-black text-slate-900" dir="ltr">{quizSet[quizIndex].question}</h3>
                            </div>
                        )}
                        {quizSet[quizIndex].type === 'analogy' && (
                            <div className="mb-10 flex flex-col items-center">
                                <div className="text-3xl font-black bg-slate-50 p-4 rounded-xl mb-4 border-2 border-slate-200 w-full max-w-sm flex justify-center gap-4" dir="ltr">
                                    <span>{quizSet[quizIndex].data.word1}</span> ↔️ <span>{quizSet[quizIndex].data.word2}</span>
                                </div>
                                <div className="text-3xl font-black text-fuchsia-700 bg-fuchsia-50 p-4 rounded-xl border-2 border-fuchsia-200 w-full max-w-sm flex justify-center gap-4" dir="ltr">
                                    <span>{quizSet[quizIndex].data.word3}</span> ↔️ <span className="border-b-4 border-fuchsia-400 min-w-[50px]">?</span>
                                </div>
                            </div>
                        )}
                        {quizSet[quizIndex].type === 'completion' && (
                            <div className="mb-10 text-2xl font-bold bg-fuchsia-50 p-6 rounded-2xl border-2 border-fuchsia-200" dir="ltr">
                                {quizSet[quizIndex].data.sentence.split('_______')[0]} <span className="border-b-4 border-fuchsia-500 px-4">?</span> {quizSet[quizIndex].data.sentence.split('_______')[1]}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quizSet[quizIndex].options.map((opt, i) => (
                                <button key={i} onClick={() => handleQuizAnswer(opt)} className="p-5 bg-pink-50 border-2 border-pink-100 rounded-2xl font-bold text-xl text-pink-900 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'quiz-result' && (
                    <div className="bg-white rounded-[3rem] p-12 shadow-xl border-t-8 border-fuchsia-500 text-center transition-all relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-black text-purple-900 mb-4">כל הכבוד! 🏆</h2>
                            <p className="text-2xl mb-4">הציון שלך:</p>
                            <div className="text-8xl font-black text-fuchsia-600 mb-8">{quizScore * 10}%</div>
                            <button onClick={() => setView('learn')} className="px-8 py-4 bg-fuchsia-500 text-white rounded-2xl font-bold text-xl hover:bg-fuchsia-600 transition-colors">המשך למידה</button>
                        </div>
                    </div>
                )}

                {/* --- MULTI STORY VIEW --- */}
                {view === 'story' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-rose-400 relative transition-all">
                        <h2 className="text-4xl font-black text-rose-600 mb-6 text-center">{storiesData[storyIndex].title}</h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm font-bold">
                            <span className="bg-fuchsia-100 text-fuchsia-800 px-3 py-1 rounded-full">מילים שלמדנו</span>
                            <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full">חיבורים</span>
                            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">חדשות</span>
                        </div>
                        
                        <div className="text-xl md:text-2xl leading-loose text-slate-800 bg-rose-50 p-6 md:p-8 rounded-2xl border-2 border-rose-200 shadow-inner" dir="ltr">
                            {storiesData[storyIndex].content.map((paragraph, idx) => (
                                <p key={idx} className="mb-4">
                                    {renderStoryText(paragraph)}
                                </p>
                            ))}
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-8 flex-wrap">
                            <button onClick={() => speakText(storiesData[storyIndex].audio)} className="px-8 py-4 bg-rose-400 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-rose-500 shadow-md transition-colors">
                                <span>{storyAudioMuted ? '🔇' : '🔊'}</span> {storyAudioMuted ? 'הקשיבי סיפור' : 'השמע סיפור'}
                            </button>
                            <button onClick={() => setStoryAudioMuted(!storyAudioMuted)} className="px-8 py-4 bg-white border-2 border-rose-400 text-rose-600 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-50 shadow-sm transition-colors">
                                <span>{storyAudioMuted ? '🔇' : '🔊'}</span> {storyAudioMuted ? 'הפעלת קול' : 'השתקת קול'}
                            </button>
                            <button onClick={() => setStoryIndex(prev => getNextRandom(prev, storiesData.length))} className="px-8 py-4 bg-white border-2 border-rose-400 text-rose-600 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-50 shadow-sm transition-colors">
                                <span>🎲</span> סיפור אחר
                            </button>
                        </div>
                    </div>
                )}

                {/* --- READING & VOWEL PATTERNS --- */}
                {view === 'reading' && (
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border-t-8 border-pink-400 text-center transition-all">
                        <h2 className="text-3xl font-black text-pink-800 mb-2">קריאה וניקוד אנגלית 📖</h2>
                        <p className="text-slate-600 mb-6 font-bold">דוגמה {readingPatternIndex + 1} מתוך {readingPatternsData.length}</p>

                        {/* Pattern name and description */}
                        <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-200 mb-6">
                            <h3 className="text-2xl font-black text-pink-900 mb-2">{readingPatternsData[readingPatternIndex].pattern}</h3>
                            <p className="text-lg font-bold text-pink-800 mb-2">{readingPatternsData[readingPatternIndex].sound}</p>
                            <p className="text-slate-700 font-semibold">{readingPatternsData[readingPatternIndex].hebrew}</p>
                        </div>

                        {/* Current word */}
                        {readingPatternsData[readingPatternIndex].words[wordInPatternIndex] && (
                            <div className="bg-blue-50 p-8 rounded-3xl border-4 border-blue-200 mb-8">
                                {/* English word */}
                                <p className="text-5xl font-black text-blue-900 mb-4" dir="ltr">
                                    {readingPatternsData[readingPatternIndex].words[wordInPatternIndex].word}
                                </p>

                                {/* Breakdown with colors */}
                                <p className="text-3xl font-bold text-slate-700 mb-4 tracking-widest" dir="ltr">
                                    {readingPatternsData[readingPatternIndex].words[wordInPatternIndex].breakdown}
                                </p>

                                {/* Hebrew translation */}
                                <p className="text-2xl font-bold text-slate-800 mb-3">
                                    {readingPatternsData[readingPatternIndex].words[wordInPatternIndex].hebrew}
                                </p>

                                {/* Note if exists */}
                                {readingPatternsData[readingPatternIndex].words[wordInPatternIndex].note && (
                                    <p className="text-lg font-bold text-pink-700 italic">
                                        💡 {readingPatternsData[readingPatternIndex].words[wordInPatternIndex].note}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap mb-6">
                            <button onClick={() => speakText(readingPatternsData[readingPatternIndex].words[wordInPatternIndex].word)} className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-pink-600 shadow-md transition-colors">
                                <span>🔊</span> שמע המילה
                            </button>
                            {wordInPatternIndex < readingPatternsData[readingPatternIndex].words.length - 1 ? (
                                <button onClick={() => setWordInPatternIndex(prev => prev + 1)} className="px-6 py-3 bg-white border-2 border-pink-400 text-pink-600 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-50 shadow-sm transition-colors">
                                    <span>➡️</span> המילה הבאה
                                </button>
                            ) : (
                                <button onClick={() => { setReadingPatternIndex(prev => getNextRandom(prev, readingPatternsData.length)); setWordInPatternIndex(0); }} className="px-6 py-3 bg-white border-2 border-pink-400 text-pink-600 rounded-xl font-bold flex items-center gap-2 hover:bg-pink-50 shadow-sm transition-colors">
                                    <span>🎲</span> דוגמה הבאה
                                </button>
                            )}
                        </div>

                        {/* Progress indicator */}
                        <p className="text-slate-600 font-semibold">מילה {wordInPatternIndex + 1} מתוך {readingPatternsData[readingPatternIndex].words.length}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;