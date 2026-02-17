/* ================================
   30 DAYS OF QURANIC AYAHS
   Spiritually meaningful verses for Ramadan
   ================================ */

const AYAHS_DATA = [
    // Day 1
    {
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
        transliteration: "Ya ayyuhal-ladhina amanu kutiba 'alaykumus-siyamu kama kutiba 'alal-ladhina min qablikum la'allakum tattaqun",
        translation: "O you who have believed, fasting is prescribed for you as it was prescribed for those before you, that you may become righteous.",
        reference: "Surah Al-Baqarah (2:183)"
    },
    
    // Day 2
    {
        arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ",
        transliteration: "Shahru Ramadanal-ladhi unzila fihil-Qur'anu hudan lin-nasi wa bayyinatin minal-huda wal-furqan",
        translation: "The month of Ramadan in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion.",
        reference: "Surah Al-Baqarah (2:185)"
    },
    
    // Day 3
    {
        arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
        transliteration: "Wa idha sa'alaka 'ibadi 'anni fa'inni qarib, ujibu da'watad-da'i idha da'ani, falyastajību li walyū'minū bi la'allahum yarshudūn",
        translation: "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be rightly guided.",
        reference: "Surah Al-Baqarah (2:186)"
    },
    
    // Day 4
    {
        arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        transliteration: "Inna Allaha ma'as-sabireen",
        translation: "Indeed, Allah is with the patient.",
        reference: "Surah Al-Baqarah (2:153)"
    },
    
    // Day 5
    {
        arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
        transliteration: "Fadhkuruni adhkurkum washkuru li wa la takfurun",
        translation: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
        reference: "Surah Al-Baqarah (2:152)"
    },
    
    // Day 6
    {
        arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
        transliteration: "Wa qala Rabbukumu d'uni astajib lakum",
        translation: "And your Lord says: Call upon Me; I will respond to you.",
        reference: "Surah Ghafir (40:60)"
    },
    
    // Day 7
    {
        arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
        transliteration: "Wasta'inu bis-sabri was-salah, wa innaha lakabīratun illa 'alal-khashi'een",
        translation: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive.",
        reference: "Surah Al-Baqarah (2:45)"
    },
    
    // Day 8
    {
        arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
        transliteration: "Inna Allaha la yughayyiru ma biqawmin hatta yughayyiru ma bi'anfusihim",
        translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
        reference: "Surah Ar-Ra'd (13:11)"
    },
    
    // Day 9
    {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
        transliteration: "Wa may-yattaqil-laha yaj'al lahu makhrajaw-wa yarzuqhu min haythu la yahtasib",
        translation: "And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.",
        reference: "Surah At-Talaq (65:2-3)"
    },
    
    // Day 10
    {
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        transliteration: "Fa inna ma'al 'usri yusra, inna ma'al 'usri yusra",
        translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
        reference: "Surah Ash-Sharh (94:5-6)"
    },
    
    // Day 11
    {
        arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ",
        transliteration: "Walladhina jahadu fina lanahdiyannahum subulana, wa innallaha lama'al-muhsineen",
        translation: "And those who strive for Us - We will surely guide them to Our ways. And indeed, Allah is with the doers of good.",
        reference: "Surah Al-Ankabut (29:69)"
    },
    
    // Day 12
    {
        arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        transliteration: "Ala bidhikrillahi tatma'innul-qulub",
        translation: "Verily, in the remembrance of Allah do hearts find rest.",
        reference: "Surah Ar-Ra'd (13:28)"
    },
    
    // Day 13
    {
        arabic: "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا",
        transliteration: "Wasbir lihukmi Rabbika fa'innaka bi-a'yunina",
        translation: "And be patient for the decision of your Lord, for indeed, you are in Our eyes.",
        reference: "Surah At-Tur (52:48)"
    },
    
    // Day 14
    {
        arabic: "وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ هُوَ خَيْرًا وَأَعْظَمَ أَجْرًا",
        transliteration: "Wa ma tuqaddimū li'anfusikum min khayrin tajidūhu 'indallahi huwa khayraw-wa a'dhama ajra",
        translation: "And whatever good you put forward for yourselves - you will find it with Allah. It is better and greater in reward.",
        reference: "Surah Al-Muzzammil (73:20)"
    },
    
    // Day 15
    {
        arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
        transliteration: "Qul ya 'ibadiya alladhina asrafu 'ala anfusihim la taqnatu mir-rahmatillah, innallaha yaghfirudh-dhunūba jamī'a",
        translation: "Say: O My servants who have transgressed against themselves, despair not of the mercy of Allah. Indeed, Allah forgives all sins.",
        reference: "Surah Az-Zumar (39:53)"
    },
    
    // Day 16
    {
        arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
        transliteration: "Wa huwa ma'akum ayna ma kuntum",
        translation: "And He is with you wherever you are.",
        reference: "Surah Al-Hadid (57:4)"
    },
    
    // Day 17
    {
        arabic: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ",
        transliteration: "Innama yuwaffas-sabirūna ajrahum bighayri hisab",
        translation: "Indeed, the patient will be given their reward without account.",
        reference: "Surah Az-Zumar (39:10)"
    },
    
    // Day 18
    {
        arabic: "وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ",
        transliteration: "Wa dhakkir fa'inna adh-dhikra tanfa'ul-mu'mineen",
        translation: "And remind, for indeed, the reminder benefits the believers.",
        reference: "Surah Adh-Dhariyat (51:55)"
    },
    
    // Day 19
    {
        arabic: "وَلَذِكْرُ اللَّهِ أَكْبَرُ",
        transliteration: "Wa ladhikrullahi akbar",
        translation: "And the remembrance of Allah is greater.",
        reference: "Surah Al-Ankabut (29:45)"
    },
    
    // Day 20
    {
        arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا",
        transliteration: "Innal-ladhina amanu wa 'amilus-salihat kanat lahum jannatul-firdawsi nuzula",
        translation: "Indeed, those who have believed and done righteous deeds - they will have the Gardens of Paradise as a lodging.",
        reference: "Surah Al-Kahf (18:107)"
    },
    
    // Day 21 - Laylatul Qadr begins
    {
        arabic: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ",
        transliteration: "Inna anzalnahu fi laylatul-qadr, wa ma adraka ma laylatul-qadr, laylatul-qadri khayrum-min alfi shahr",
        translation: "Indeed, We sent it down during the Night of Decree. And what can make you know what is the Night of Decree? The Night of Decree is better than a thousand months.",
        reference: "Surah Al-Qadr (97:1-3)"
    },
    
    // Day 22
    {
        arabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
        transliteration: "Faman ya'mal mithqala dharratin khayray-yarah, wa may-ya'mal mithqala dharratin sharray-yarah",
        translation: "So whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.",
        reference: "Surah Az-Zalzalah (99:7-8)"
    },
    
    // Day 23
    {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanataw-wa fil-akhirati hasanataw-wa qina 'adhabannar",
        translation: "Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.",
        reference: "Surah Al-Baqarah (2:201)"
    },
    
    // Day 24
    {
        arabic: "وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ",
        transliteration: "Wa'bud Rabbaka hatta ya'tiyakal-yaqeen",
        translation: "And worship your Lord until there comes to you the certainty (death).",
        reference: "Surah Al-Hijr (15:99)"
    },
    
    // Day 25
    {
        arabic: "وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ",
        transliteration: "Wa tūbū ilallahi jamī'an ayyuhal-mu'minūna la'allakum tuflihūn",
        translation: "And turn to Allah in repentance, all of you, O believers, that you might succeed.",
        reference: "Surah An-Nur (24:31)"
    },
    
    // Day 26
    {
        arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        transliteration: "Hasbunallahu wa ni'mal-wakeel",
        translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
        reference: "Surah Al-Imran (3:173)"
    },
    
    // Day 27 - Most likely Laylatul Qadr
    {
        arabic: "تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ",
        transliteration: "Tanazzalul-mala'ikatu war-ruhu fiha bi'idhni Rabbihim min kulli amr, salamun hiya hatta matla'il-fajr",
        translation: "The angels and the Spirit descend therein by permission of their Lord for every matter. Peace it is until the emergence of dawn.",
        reference: "Surah Al-Qadr (97:4-5)"
    },
    
    // Day 28
    {
        arabic: "وَمَا النَّصْرُ إِلَّا مِنْ عِندِ اللَّهِ الْعَزِيزِ الْحَكِيمِ",
        transliteration: "Wa man-nasru illa min 'indillahil-'Azizil-Hakeem",
        translation: "And victory is not but from Allah, the Exalted in Might, the Wise.",
        reference: "Surah Al-Imran (3:126)"
    },
    
    // Day 29
    {
        arabic: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ",
        transliteration: "Wasbir wa ma sabruka illa billah",
        translation: "And be patient, and your patience is not but through Allah.",
        reference: "Surah An-Nahl (16:127)"
    },
    
    // Day 30 - Last day of Ramadan
    {
        arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
        transliteration: "Wa qur-Rabbi zidni 'ilma",
        translation: "And say: My Lord, increase me in knowledge.",
        reference: "Surah Ta-Ha (20:114)"
    }
];