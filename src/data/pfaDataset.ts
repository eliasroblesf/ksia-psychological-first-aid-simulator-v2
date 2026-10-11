import { Phase, Scenario } from '../types/pfa';

export const PFA_PHASES: Phase[] = [
  {
    id: 'phase1',
    title: {
      en: 'PHASE 1: On-Scene Practical Help & Crisis Response',
      ar: 'المرحلة 1: المساعدة العملية الميدانية والاستجابة للأزمات'
    },
    subtitle: {
      en: 'Immediate Physical Safety, Grounding & Sensory Regulation',
      ar: 'السلامة الجسدية الفورية، التثبيت النفسي والتنظيم الحسي'
    },
    description: {
      en: 'Master acute on-scene engagement during seismic, mechanical, and fire emergencies. Learn word-for-word calming scripts, respectful fatality communications, and neurodivergent sensory protocols.',
      ar: 'إتقان التدخل الميداني الحاد أثناء حالات الطوارئ الزلزالية والميكانيكية والحرائق. تعلم نصوص التهدئة الحرفية، الإبلاغ المحترم عن الوفيات، وبروتوكولات التنوع العصبي الحسي.'
    }
  },
  {
    id: 'phase2',
    title: {
      en: 'PHASE 2: Post-Crisis Self-Care, Processing & Human Support',
      ar: 'المرحلة 2: الرعاية الذاتية بعد الحادث والدعم الإنساني'
    },
    subtitle: {
      en: 'Responder Resilience, Operational AAR Separation & Saudi Referral Pathways',
      ar: 'مرونة المسعف، فصل مراجعة العمليات AAR وقنوات الإحالة السعودية'
    },
    description: {
      en: 'Process moral distress, normalize post-CPR survivor guilt, separate operational after-action reviews from voluntary emotional care, and utilize Saudi MOH 937 & NCMHP confidential networks.',
      ar: 'معالجة الضيق الأخلاقي، تطبيع شعور الذنب بعد الإنعاش، فصل المراجعات التشغيلية عن الدعم النفسي الطوعي، واستثمار شبكات وزارة الصحة 937 والمركز الوطني للصحة النفسية.'
    }
  }
];

export const PFA_SCENARIOS: Scenario[] = [
  {
    id: '101',
    phaseId: 'phase1',
    title: {
      en: 'Earthquake / Tremor Word-for-Word Script',
      ar: 'سيناريو الكلمات المباشرة أثناء السيزميك / الهزة'
    },
    category: {
      en: 'Module 1: Practical Needs & Safety Scripts',
      ar: 'الوحدة 1: الاحتياجات العملية ونصوص السلامة'
    },
    imageUrl: '/src/assets/images/ksia_tremor_photo_1791744021627.jpg',
    description: {
      en: 'Following a sudden tremor in the airport office, papers have fallen and an employee sits huddled on the carpet, trembling uncontrollably against a damaged partition. As an Emergency Response Team member, how do you approach?',
      ar: 'عقب هزة أرضية مفاجئة في مكاتب المطار، تناثرت الأوراق وتجلس موظفة متقوقعة على الأرض ترتجف بشدة بجوار حاجز مكتبي متضرر. كمسعف من فريق الطوارئ، كيف تتقرب منها؟'
    },
    options: [
      {
        id: 'A',
        text: {
          en: "Ask them immediately: 'Can you describe step by step what you felt when the building shook, and tell me if anyone else in your aisle was hurt?'",
          ar: "سؤالها فوراً: 'هل يمكنكِ وصف ما شعرتِ به خطوة بخطوة أثناء اهتزاز المبنى، وإخباري إذا كان هناك مصابون آخرون في ممرك؟'"
        },
        correct: false
      },
      {
        id: 'B',
        text: {
          en: "Approach calmly and state: 'Hello, I am with the airport safety team. We are in a safe zone now. Take your time, and let me offer you some water.'",
          ar: "الاقتراب بهدوء والقول: 'أهلاً، أنا من فريق سلامة المطار. نحن في مكان آمن الآن. خذي وقتكِ بهدوء، ودعيني أقدم لكِ بعض الماء النظيف.'"
        },
        correct: true
      },
      {
        id: 'C',
        text: {
          en: "Stand beside them and insist: 'The building structure has been declared safe, so please stand up right away and walk quickly to the outer parking lot.'",
          ar: "الوقوف بجانبها والإصرار: 'هيكل المبنى اعتُبر آمناً تماماً، لذا تفضلي بالوقوف فوراً والتحرك سريعاً نحو مواقف السيارات الخارجية.'"
        },
        correct: false
      }
    ],
    explanation: {
      en: 'WHO PFA scripts emphasize identity, safety, unpressured physical presence, and meeting immediate practical needs (water and shelter) without forcing trauma disclosure.',
      ar: 'تركز نصوص منظمة الصحة العالمية على الهوية، السلامة، الوجود الهادئ، وتلبية الاحتياجات العملية الفورية دون إجبار على سرد تفاصيل الصدمة.'
    },
    whatToSay: {
      en: '"Assalamu Alaikum / Hello. My name is [Your Name] with the KSIA Emergency Team. You are physically safe right here with me. You do not have to speak or explain anything. Take slow breaths. Can I offer you a bottle of water, a jacket, or help you sit down?"',
      ar: '"السلام عليكم، أنا [اسمك] من فريق الاستجابة للطوارئ بمطار الملك سلمان. أنت الآن في مكان آمن معي. لست بحاجة للحديث أو تفسير ما حدث. خذ نفساً عميقاً بهدوء. هل تسمح لي بإحضار ماء، أو مساعدتك في الجلوس بهدوء؟"'
    },
    whatNotToSay: {
      en: '"Calm down!", "Stop shaking, you\'re fine!", "Why are you panicking over nothing?", or demanding immediate forensic recounts of the tremors.',
      ar: '"اهدأ فوراً!"، "توقف عن الرجفة، لم يحدث شيء كبير!"، "لماذا تبالغ؟"، أو إجباره على سرد تفاصيل الانهيار فوراً.'
    },
    culturalRationale: {
      en: 'Trembling is an autonomic neurobiological freeze/discharge response. Commanding someone to "calm down" triggers secondary humiliation and exacerbates amygdala panic. In Saudi workplace culture, providing respectful proximity, unhurried presence, water, and acknowledging dignity stabilizes the nervous system.',
      ar: 'الارتجاف هو رد فعل عصبي لا إرادي لجهاز الإنذار في الجسم. أمره بالهدوء يولد شعوراً بالإحراج ويزيد استثارة المخ. في بيئة العمل السعودية، الاحترام وتوفير مساحة آمنة وتقديم الماء وحفظ الكرامة يعيد الاستقرار العصبي بسرعة.'
    }
  },
  {
    id: '102',
    phaseId: 'phase1',
    title: {
      en: 'Respectful Fatality Notification (Single Colleague)',
      ar: 'الإبلاغ المحترم عن وفاة زميل'
    },
    category: {
      en: 'Module 2: Fatality Communication & Mass Casualty Sensitivity',
      ar: 'الوحدة 2: التواصل بشأن الوفيات وحساسية الحوادث الكبرى'
    },
    imageUrl: '/src/assets/images/ksia_grief_photo_1791744035064.jpg',
    description: {
      en: 'In a quiet airport briefing room, you are seated facing a close coworker of an employee who passed away during an emergency resuscitation attempt. How do you deliver this painful news?',
      ar: 'في غرفة هادئة بمجمع إدارة المطار، تجلس أمام زميلة مقربة لموظف توفي أثناء محاولات الإنعاش الطبي الطارئة. كيف تنقل هذا الخبر المؤلم؟'
    },
    options: [
      {
        id: 'A',
        text: {
          en: "Speak with direct compassion: 'I am deeply sorry to share this. Despite all medical efforts, our colleague has died.' Allow quiet silence and offer family contact.",
          ar: "التحدث برحمة ومباشرة: 'يؤسفني جداً إبلاغكِ بهذا الخبر. رغم كل المحاولات الطبية، توفي زميلنا.' إتاحة وقت للصمت وعرض التواصل مع الأسرة."
        },
        correct: true
      },
      {
        id: 'B',
        text: {
          en: "Use gentle indirect phrasing: 'Our colleague has peacefully gone to sleep in the medical wing.' Urge them to stay strong and look for the positive side.",
          ar: "استخدام عبارات غير مباشرة: 'لقد نام زميلنا بسلام في الجناح الطبي.' مع حثها على البقاء قوية والتركيز على الجوانب الإيجابية."
        },
        correct: false
      },
      {
        id: 'C',
        text: {
          en: "Advise them that official clinical details are still being verified, and suggest they head back to their desk until corporate management releases an update.",
          ar: "إبلاغها بأن التفاصيل الطبية لا تزال قيد التدقيق، واقتراح العودة إلى مكتبها ومتابعة عملها لحين صدور بيان من الإدارة."
        },
        correct: false
      }
    ],
    explanation: {
      en: 'Direct, honest language avoids cognitive confusion. Respecting Islamic grief practices means allowing tearful silence, avoiding forced optimism, and focusing on family support.',
      ar: 'الصدق والمباشرة يمنعان التشتت. احترام تقاليد الحزن الإسلامية يعني السماح بالصمت والبكاء، تجنب التفاؤل المصنوع، والتركيز على دعم الأسرة.'
    },
    whatToSay: {
      en: '"Inna lillahi wa inna ilayhi raji\'un. I have very sad and painful news to share with you. Despite the medical team\'s utmost efforts with CPR, [Colleague\'s Name] has passed away. I am sitting right here with you. Take all the time you need. Would you like me to reach out to your family or a trusted companion?"',
      ar: '"إنا لله وإنا إليه راجعون. يؤسفني جداً أن أشاركك هذا الخبر المؤلم. بالرغم من كل محاولات الإنعاش الطبي المكثفة، توفي الزميل [الاسم]. أنا موجود بجانبك تماماً. خذ وقتك في الصمت، وهل تود أن أتواصل مع أفراد أسرتك أو شخص مقرب؟"'
    },
    whatNotToSay: {
      en: '"We lost him somewhere in the clinic" (ambiguity), "He\'s just resting", "Be a man and don\'t cry", "Crying shows weak faith", or forced cheerful cliches.',
      ar: '"فقدناه في الممر" (تضليل وغموض)، "هو نائم فقط"، "كن قوياً ولا تبكِ"، "البكاء ضعف إيمان"، أو العبارات الإيجابية المصطنعة.'
    },
    culturalRationale: {
      en: 'In Islamic and Saudi traditions, tears and quiet grief are natural human compassion (Rahmah), as demonstrated by the Prophet Muhammad (PBUH). Euphemisms cause cognitive shock and false hope. Direct compassionate truthfulness paired with patient accompaniment (Sabr) honors the deceased and supports healthy bereavement.',
      ar: 'في الثقافة الإسلامية والسعودية، الدموع والحزن الطبيعي رحمة إنسانية وليست اعتراضاً على القدر. المصطلحات الغامضة تسبب صدمة إدراكية وآمالاً زائفة. الصدق الرحيم، المقترن بالصبر والوقوف إلى جانب المفجوع، يحفظ كرامة المتوفى ويحمي تماسك المكلوم.'
    }
  },
  {
    id: '103',
    phaseId: 'phase1',
    title: {
      en: 'Autism & Sensory Overload Support During Alarms',
      ar: 'دعم التنوع العصبي والفرط الحسي أثناء الإنذارات'
    },
    category: {
      en: 'Module 3: Sensory, Language & Cultural Choice',
      ar: 'الوحدة 3: التنوع الحسي، اللغة والخصوصية الثقافية'
    },
    imageUrl: '/src/assets/images/ksia_sensory_photo_1791744047429.jpg',
    description: {
      en: 'High-decibel sirens echo through the airport corridor and bright amber emergency strobe lights flash overhead. An employee with sensory sensitivity is crouched covering their ears in visible distress. How should you assist?',
      ar: 'تدوي صفارات الإنذار في ممر المطار وتومض أضواء الطوارئ الصفراء في السقف. تجلس موظفة تعاني من فرط الحساسية الحسية مغطية أذنيها في ضيق شديد. كيف تقدم لها المساعدة؟'
    },
    options: [
      {
        id: 'A',
        text: {
          en: "Hold their arm firmly to help them stand up quickly, and guide them directly through the crowd toward the central terminal evacuation doors.",
          ar: "الإمساك بذراعها بلطف لمساعدتها على الوقوف سريعاً، وتوجيهها للمشي وسط الممر نحو أبواب الإخلاء الرئيسية بالمبنى."
        },
        correct: false
      },
      {
        id: 'B',
        text: {
          en: "Position yourself right in front of them with direct eye contact, giving repetitive loud verbal directions to explain exactly where the emergency stairs lead.",
          ar: "الوقوف أمامها مباشرة مع النظر في عينيها بثبات، وتكرار التعليمات الصوتية بصوت مرتفع لتوضيح مسار الدرج في حالات الطوارئ."
        },
        correct: false
      },
      {
        id: 'C',
        text: {
          en: "Lower stimulation by keeping a calm distance, avoid forced eye contact, use a clear gesture or written note, and guide them to a dim, quiet stairwell.",
          ar: "تقليل المؤثرات بالحفاظ على مسافة هادئة، تجنب فرض التواصل البصري، استخدام إشارة بسيطة أو كتابة، ومرافقتها نحو درج مظلل وهادئ."
        },
        correct: true
      }
    ],
    explanation: {
      en: 'Sensory overload requires reducing stimulation, respecting body space, avoiding eye contact pressure, and moving quietly to low-decibel staging areas.',
      ar: 'تتطلب حالات الفرط الحسي تقليل المثيرات، احترام المساحة الشخصية، تجنب ضغط التواصل البصري، والنقل بهدوء لمناطق قليلة الضوضاء.'
    },
    whatToSay: {
      en: 'Use a low, grounded voice or written badge/phone screen: "I am with security/ERT. Quiet zone is this way. Walk with me when ready. No rush."',
      ar: 'استخدم نبرة خافتة وهادئة أو كتابة على ورقة/شاشة: "أنا معك من فريق السلامة. هناك مكان هادئ في هذا الاتجاه. تحرك معي عندما تشعر بالاستعداد. لا عجلة."'
    },
    whatNotToSay: {
      en: 'Screaming commands, grabbing arms, forcing the person to stare into your eyes, or physically unblocking their ears.',
      ar: 'الصراخ بالأوامر، مسك الذراع فجأة، إجبار الشخص على التحديق في عينيك، أو نزع يديه عن أذنيه بالقوة.'
    },
    culturalRationale: {
      en: 'Saudi workplace neurodiversity inclusion (MHRSD / APDA guidelines) mandates protecting sensory-sensitive employees during airport emergency evacuations. Unsolicited physical touch breaches both bodily autonomy and cultural decorum. Reducing auditory and visual stimuli restores nervous regulation without physical restraint.',
      ar: 'توجيهات الشمول الوظيفي بالمملكة تدعو لحماية الموظفين ذوي الحساسيات الحسية والتنوع العصبي. اللمس القسري يخالف الآداب والحدود الشخصية، ويثير نوبات الذعر الدفاعي. خفض المثيرات وتوفير ممر هادئ يحقق الإخلاء الآمن باحترام كامل.'
    }
  },
  {
    id: '201',
    phaseId: 'phase2',
    title: {
      en: 'Processing Guilt After Unsuccessful CPR Attempt',
      ar: 'معالجة شعور الذنب بعد محاولة إنعاش قلبي غير ناجحة'
    },
    category: {
      en: 'Module 4: Responder Self-Care & De-escalation',
      ar: 'الوحدة 4: الرعاية الذاتية للمسعف وخفض التوتر'
    },
    imageUrl: '/src/assets/images/ksia_responder_photo_1791744062116.jpg',
    description: {
      en: 'In the airport crew rest lounge hours after a critical incident, a first responder sits with their head in their hands, overwhelmed by guilt and repeatedly questioning their CPR efforts after a colleague died. How do you support them?',
      ar: 'في استراحة طاقم المطار بعد ساعات من حادثة حرجة، يجلس مسعف واضعاً رأسه بين يديه، يثقله شعور بالذنب وتكرار التساؤل عن جهوده في الإنعاش بعد وفاة زميل. كيف تسانده؟'
    },
    options: [
      {
        id: 'A',
        text: {
          en: "Open the monitor logs together right away to clinically demonstrate that their CPR chest compression rate met every standard hospital benchmark.",
          ar: "فتح سجلات جهاز الإنعاش معاً فوراً لإثبات أن معدل الضغطات الصدرية حقق المعايير الطبية المعتمدة بنجاح من الناحية الفنية."
        },
        correct: false
      },
      {
        id: 'B',
        text: {
          en: "Listen with empathy, validate that feeling heavy is a natural stress response after an acute crisis, and offer confidential peer or counseling support.",
          ar: "الاستماع بتعاطف، والتأكيد على أن الشعور بالثقل رد فعل طبيعي بعد الأزمات الحادة، وعرض مساندة الأقران أو الاستشارة المتخصصة بسرية."
        },
        correct: true
      },
      {
        id: 'C',
        text: {
          en: "Encourage them to sign up for the next emergency duty shift right away so that staying active helps them push the painful memories out of mind.",
          ar: "تشجيعه على استلام نوبة طوارئ قادمة على الفور حتى يساعده الاندماج في مهام جديدة على إبعاد الذكريات المؤلمة عن ذهنه."
        },
        correct: false
      }
    ],
    explanation: {
      en: 'Post-incident distress and guilt after cardiac arrest events are common acute stress reactions. Supportive, non-judgmental validation preserves responder mental health.',
      ar: 'الشعور بالذنب بعد حالات التوقف القلبي هو رد فعل طبيعي للضغط الحاد. التقبل والمساندة البدون أحكام تحمي الصحة النفسية للمسعف.'
    },
    whatToSay: {
      en: '"What you did today took immense bravery and compassion. Out-of-hospital cardiac arrest survival is clinically low, even under perfect technique. Feeling heavy, second-guessing your compressions, or feeling replay loops is a completely normal reaction of a caring responder. You are not alone, and we stand with you."',
      ar: '"ما قمت به اليوم يعكس شجاعة وإنسانية عالية. توقف القلب المفاجئ تحدٍ طبي بالغ الصعوبة حتى بأفضل تطبيق. مشاعر ثقل القلب واستعادة المشهد هي استجابة بشرية طبيعية جداً لحدث صادم. أنت لم تقصر في واجبك، ونحن نقف بجانبك بكل تقدير."'
    },
    whatNotToSay: {
      en: '"Maybe if you pressed harder he would be alive", "You hesitated on the AED", "Pull yourself together", or blaming the responder.',
      ar: '"لو أنك ضغطت أسرع لكان حياً"، "ترددت في جهاز الصدمات"، "كن رجلاً وانسَ الأمر"، أو إلقاء اللوم التقني والشخصي.'
    },
    culturalRationale: {
      en: 'In Saudi responder culture, high personal dedication can easily manifest as acute moral distress or self-blame. Grounding the responder in compassionate reassurance affirms both medical reality and faith in Qadar (divine decree), insulating them from post-traumatic burnout.',
      ar: 'التفاني العالي لدى المسعفين في مطارات المملكة قد ينقلب إلى جلد ذات ولوم مفرط. طمأنة المسعف وتأكيد بذل السبب الطبي مع الإيمان بالقدر يخفف عبء الصدمة الأخلاقية ويقي من الاحتراق النفسي والاكتئاب اللاحق.'
    }
  },
  {
    id: '202',
    phaseId: 'phase2',
    title: {
      en: 'Separating Operational AAR from Emotional Support',
      ar: 'فصل مراجعة العمليات AAR عن الدعم النفسي الفردي'
    },
    category: {
      en: 'Module 5: Operational AAR vs. Emotional Support',
      ar: 'الوحدة 5: فصل مراجعة العمليات عن الدعم النفسي'
    },
    imageUrl: '/src/assets/images/ksia_aar_photo_1791744075184.jpg',
    description: {
      en: 'The incident commander convenes the team in the airport briefing room around a whiteboard showing the incident timeline, communications, and logistical flows. How should this session be managed?',
      ar: 'يعقد قائد الحدث اجتماعاً للفريق في قاعة الإيجاز حول سبورة توضح الجدول الزمني للحادث، والاتصالات، والمسارات اللوجستية. كيف تدار هذه الجلسة؟'
    },
    options: [
      {
        id: 'A',
        text: {
          en: "Keep the After-Action Review strictly focused on operational workflows and equipment, while making personal emotional debriefing private and voluntary.",
          ar: "حصر مراجعة ما بعد الحدث AAR بدقة على إجراءات العمل والمعدات التشغيلية، مع جعل الدعم النفسي والعاطفي خاصاً وطوعياً."
        },
        correct: true
      },
      {
        id: 'B',
        text: {
          en: "Ask each team member in turn to explain their personal emotional grief out loud so the entire group can achieve shared psychological closure together.",
          ar: "مطالبة كل موظف في الفريق بالتحدث بصوت مسموع عن حزنه وتأثره العاطفي حتى يحقق الجميع تعافياً نفسياً جماعياً مشتركاً."
        },
        correct: false
      },
      {
        id: 'C',
        text: {
          en: "Use the whiteboard timeline to identify exactly which team members experienced communication gaps and log those incidents in their performance files.",
          ar: "استخدام الجدول الزمني على السبورة لتحديد الموظفين الذين واجهوا فجوات في الاتصال وتدوين تلك الملاحظات في تقارير تقييم الأداء."
        },
        correct: false
      }
    ],
    explanation: {
      en: 'WHO guidelines explicitly mandate separating technical operational learning (AAR) from clinical/psychological support to prevent secondary traumatization.',
      ar: 'توصي معايير منظمة الصحة العالمية بفصل التعلم التقني (AAR) عن الدعم النفسي الفردي لمنع الصدمات الثانوية.'
    },
    whatToSay: {
      en: '"In this AAR, we examine our workflows, radio communications, and logistics: what went well, what surprised us, and what SOPs need updating. No one is on trial. If anyone desires a quiet space to discuss emotional impact, our confidential peer PFA leads are available one-on-one afterward."',
      ar: '"في جلسة AAR اليوم، نركز حصراً على مسار الإجراءات، شبكات الاتصال اللاسلكي، واللوجستيات: ما الذي نجح وما الإجراءات التي تحتاج تحسيناً. لسنا في جلسة محاكمة. ولمن يرغب بدعم نفسي أو تفريغ عاطفي، الجلسات الفردية السرية متاحة اختيارياً بعد الاجتماع."'
    },
    whatNotToSay: {
      en: '"Everyone around the table must now recount their deepest emotional breakdown or cry on camera for company records."',
      ar: '"يجب على الجميع الآن البكاء والتحدث عن صدماتهم أمام المدراء لإثبات إنسانيتهم أو لتوثيق الملف."'
    },
    culturalRationale: {
      en: 'Clinical research and IASC guidelines demonstrate that forced group psychological debriefing (CISD) can re-traumatize participants and violate workplace boundaries. In Saudi corporate settings, separating technical logistics reviews from private, confidential psychological support preserves workplace dignity and encourages voluntary help-seeking.',
      ar: 'أثبتت أبحاث الصحة النفسية الدولية أن التفريغ النفسي الجماعي الإجباري قد يفاقم أعراض الصدمة ويحرج الموظف أمام زملائه. في بيئات العمل بالمملكة، الفصل الصارم بين تقييم الأداء التقني والدعم النفسي الخاص يحفظ هيبة وخصوصية الفرد ويشجع على الاستشفاء التلقائي.'
    }
  },
  {
    id: '203',
    phaseId: 'phase2',
    title: {
      en: 'Saudi Institutional Support Pathways & Confidentiality',
      ar: 'مسارات الدعم المؤسسي بالمملكة والسرية'
    },
    category: {
      en: 'Module 6: Referral Networks & Saudi Resources',
      ar: 'الوحدة 6: شبكات الإحالة والموارد المعتمدة بالمملكة'
    },
    imageUrl: '/src/assets/images/ksia_support_photo_1791744087692.jpg',
    description: {
      en: 'Three days after an incident, an airport employee is sitting at their desk holding their smartphone, wanting psychological guidance but worried that requesting help might harm their workplace security badge or reputation. How do you advise them?',
      ar: 'بعد ثلاثة أيام من الحادث، تجلس موظفة في مكتبها حاملة هاتفها، ترغب في استشارة نفسية لكنها تخشى أن يؤثر طلب المساعدة على تصريحها الأمني بالمطار أو سمعتها المهنية. بماذا تنصحها؟'
    },
    options: [
      {
        id: 'A',
        text: {
          en: "Recommend that they first submit an official notification through airport human resources so leadership can formally approve specialized wellbeing leave.",
          ar: "نصحها بتقديم إشعار رسمي أولاً عبر إدارة الموارد البشرية بالمطار حتى تعتمد القيادة إجازة الدعم النفسي والرفاهية بشكل نظامي."
        },
        correct: false
      },
      {
        id: 'B',
        text: {
          en: "Advise them to monitor their stress on their own for several weeks first, seeking professional consultation only if symptoms continue to worsen.",
          ar: "نصحها بمراقبة مستوى الضغوط بنفسها لعدة أسابيع أولاً، وتأجيل الاستشارة المتخصصة لحين ملاحظة تفاقم مستمر في الأعراض."
        },
        correct: false
      },
      {
        id: 'C',
        text: {
          en: "Reassure them of strict medical privacy, describe it as resilience support, and guide them to confidential channels like MOH 937 or the NCMHP Qareebon platform.",
          ar: "طمأنتها بالسرية الطبية التامة، وتسمية الدعم برعاية المرونة المهنية، وتوجيهها إلى قنوات سرية مثل خط 937 أو تطبيق قريبون."
        },
        correct: true
      }
    ],
    explanation: {
      en: "Recent Saudi mental health literature highlights stigma and privacy concerns. Utilizing non-stigmatizing terminology ('Wellbeing') and linking with MOH 937 / NCMHP ensures safe help-seeking.",
      ar: "تؤكد الدراسات السعودية الأخيرة على أهمية السرية. استخدام مصطلحات غير وصمية ('الرفاهية') والربط مع 937 والمركز الوطني يضمن طلب المساعدة بآمان."
    },
    whatToSay: {
      en: '"Your decision to seek resilience support is a mark of professional maturity and strength. Your medical privacy is absolute and legally protected under Saudi Health Law. HR and management have no visibility into your counseling. You can dial MOH 937 directly from your phone (Ext. 1 for Psychological Counseling) or use the National Center for Mental Health Promotion (NCMHP) Qareebon platform completely free and anonymous."',
      ar: '"طلبك لدعم الرفاهية خطوة تدل على وعي ونضج مهني عالٍ. خصوصيتك الطبية محمية تماماً بموجب الأنظمة الصحية السعودية. لا يحق للإدارة أو الموارد البشرية الاطلاع على استشاراتك. يمكنك الاتصال فوراً بخط وزارة الصحة 937 (تحويلة 1 للاستشارات النفسية) أو تطبيق (قريبون) التابع للمركز الوطني للصحة النفسية بسرية تامة ومجاناً."'
    },
    whatNotToSay: {
      en: '"I have to log your name in the emergency psychological risk register for HR", or "Seeking mental health help will hurt your airport security badge renewal."',
      ar: '"يجب أن أسجل اسمك في كشف الاضطرابات النفسية للموارد البشرية"، أو "زيارة الطبيب النفسي قد تؤثر على تصريحك الأمني بالمطار".'
    },
    culturalRationale: {
      en: 'Social stigma regarding psychological vulnerability in the Arabian Gulf is best overcome through structural privacy, framing support as performance recovery / resilience, and directing individuals to trusted governmental platforms like MOH 937 and NCMHP (Qareebon) where consultation remains 100% confidential and independent of airport employer hierarchies.',
      ar: 'تبديد القلق والوصمة الاجتماعية في بيئة العمل يتحقق بالسرية النظامية المؤكدة، وتسمية الدعم بـ (الرفاهية والمرونة النفسية)، والإحالة إلى القنوات الرسمية المستقلة كمركز 937 وتطبيق قريبون، بعيداً عن السجلات الإدارية أو ملفات الموظف.'
    }
  }
];

export const SAUDI_EMERGENCY_RESOURCES = [
  {
    name: { en: 'Saudi Ministry of Health Helpline (MOH)', ar: 'مركز الاتصال الموحد لوزارة الصحة' },
    code: '937',
    description: {
      en: '24/7 Free confidential telephone consultations with certified medical psychologists (Dial 937 -> Press 1).',
      ar: 'استشارات طبية ونفسية هاتفية سرية على مدار الساعة مع أطباء وأخصائيين معتمدين (اتصل 937 ثم اضغط 1).'
    },
    badge: 'MOH 24/7'
  },
  {
    name: { en: 'National Center for Mental Health Promotion (NCMHP)', ar: 'المركز الوطني لتعزيز الصحة النفسية' },
    code: '920033360 / Qareebon App',
    description: {
      en: 'Specialized national tele-counseling hotline and "Qareebon" text/audio confidential mobile application.',
      ar: 'مركز الاستشارات النفسية الوطني وتطبيق (قريبون) للاستشارات النصية والصوتية التخصصية.'
    },
    badge: 'NCMHP'
  },
  {
    name: { en: 'KSIA Emergency Response & Security Operations (EROC)', ar: 'مركز عمليات الطوارئ والأمن بمطار الملك سلمان' },
    code: 'KSIA EROC Ext. 911 / Internal Speed Dial',
    description: {
      en: 'Immediate tactical evacuation, incident triage, paramedic dispatch, and ERT crisis coordination inside the Admin Complex.',
      ar: 'الإخلاء الميداني السريع، فرز الحالات، توجيه المسعفين وتنسيق الاستجابة داخل مجمع إدارة المطار.'
    },
    badge: 'KSIA ERT'
  }
];
