export const eventCategories = [
  { id: "all", label: "All events" },
  { id: "Conference", label: "Conferences" },
  { id: "Admissions", label: "Admissions" },
  { id: "Research", label: "Research" },
  { id: "Campus", label: "Campus" },
  { id: "Alumni", label: "Alumni" },
];

export const upcomingEvents = [
  {
    id: "info-session",
    day: "18",
    month: "Mar",
    year: "2026",
    category: "Admissions",
    title: "MBA Admissions Information Session",
    venue: "Online webinar",
    time: "6:00 PM IST",
    description:
      "Meet the admissions team and current students, walk through the application and get your questions answered live.",
    featured: true,
  },
  {
    id: "leadership-summit",
    day: "02",
    month: "Apr",
    year: "2026",
    category: "Conference",
    title: "Annual Leadership Summit",
    venue: "IIMB Campus, Auditorium",
    time: "9:00 AM IST",
    description:
      "Leaders from business, government and civil society debate the year's defining questions over a full day of sessions.",
  },
  {
    id: "research-colloquium",
    day: "21",
    month: "Apr",
    year: "2026",
    category: "Research",
    title: "Faculty Research Colloquium",
    venue: "IIMB Campus, Seminar Hall",
    time: "3:00 PM IST",
    description:
      "Faculty present work in progress across the institute's research areas, followed by open discussion.",
  },
  {
    id: "open-day",
    day: "09",
    month: "May",
    year: "2026",
    category: "Campus",
    title: "Campus Open Day",
    venue: "IIMB Campus",
    time: "10:00 AM IST",
    description:
      "Tour the campus, meet programme directors and experience a day in the life at IIMB.",
  },
  {
    id: "alumni-reunion",
    day: "23",
    month: "May",
    year: "2026",
    category: "Alumni",
    title: "Alumni Homecoming & Reunion",
    venue: "IIMB Campus Lawns",
    time: "11:00 AM IST",
    description:
      "Batches from across the decades return to campus for a day of nostalgia, networking and celebration.",
  },
  {
    id: "climate-finance-forum",
    day: "11",
    month: "Jun",
    year: "2026",
    category: "Research",
    title: "Climate Finance Forum",
    venue: "IIMB Campus, Conference Centre",
    time: "9:30 AM IST",
    description:
      "Investors, policy makers and scholars explore how capital markets can finance a fair low-carbon transition.",
  },
];

export const pastEvents = [
  {
    id: "past-alumni-2025",
    category: "Alumni",
    title: "Alumni Homecoming 2025",
    dateLabel: "December 2025",
    year: "2025",
    image:
      "https://readdy.ai/api/search-image?query=Alumni%20reuniting%20outdoors%20on%20a%20green%20campus%20lawn%2C%20warm%20handshakes%20and%20laughter%2C%20golden%20afternoon%20light%2C%20celebratory%20reunion%20atmosphere%2C%20warm%20neutral%20tones&width=1200&height=800&seq=iimb-past-alumni&orientation=landscape",
    summary:
      "Batches from across the decades returned to a sunlit campus for a day of nostalgia and reconnection, closing with a gala dinner under the trees.",
    recap:
      "The annual Alumni Homecoming brought together more than 700 graduates spanning 28 batches for a full day on campus. The morning opened with a welcome from the Director and a walkthrough of the new learning centre, followed by informal batch meetups in the courtyards. Alumni mentors hosted career circles for current students, while a photo wall traced the institute's journey across five decades. The evening closed with a gala dinner on the lawns, string lights overhead and a live band carrying the celebration late into the night.",
    highlights: [
      "700+ alumni across 28 graduating batches",
      "Mentorship circles connecting alumni with current students",
      "A five-decade photo wall and evening gala dinner",
      "New learning centre opened for guided alumni tours",
    ],
    stat: "700+ alumni",
    statLabel: "Representing 28 batches",
  },
  {
    id: "past-research-2025",
    category: "Research",
    title: "Research Colloquium 2025",
    dateLabel: "November 2025",
    year: "2025",
    image:
      "https://readdy.ai/api/search-image?query=Academic%20presenting%20research%20on%20a%20screen%20to%20a%20small%20attentive%20seminar%20audience%2C%20bright%20lecture%20hall%2C%20scholarly%20atmosphere%2C%20warm%20neutral%20palette&width=1200&height=800&seq=iimb-past-colloquium&orientation=landscape",
    summary:
      "Faculty from every area presented new work, with doctoral students joining roundtables on methodology and publishing. Twenty-two papers were discussed over two days.",
    recap:
      "Over two packed days, faculty from every academic area presented twenty-two working papers to peers, doctoral students and visiting scholars. Sessions covered strategy, finance, marketing, public policy and information systems, each followed by a candid roundtable on methods and publication. A dedicated doctoral track gave early-career researchers a stage to test ideas, and the colloquium closed with a panel on building research collaborations across disciplines.",
    highlights: [
      "22 working papers presented over two days",
      "Doctoral track for early-career researchers",
      "Roundtables on methodology and publishing",
      "Closing panel on cross-disciplinary collaboration",
    ],
    stat: "22 papers",
    statLabel: "Presented over two days",
  },
  {
    id: "past-openday-2025",
    category: "Campus",
    title: "Campus Open Day 2025",
    dateLabel: "September 2025",
    year: "2025",
    image:
      "https://readdy.ai/api/search-image?query=Diverse%20visitors%20and%20students%20walking%20together%20on%20a%20green%20campus%20pathway%20lined%20with%20trees%2C%20soft%20daylight%2C%20welcoming%20campus%20tour%20atmosphere%2C%20warm%20tones&width=1200&height=800&seq=iimb-past-openday&orientation=landscape",
    summary:
      "Families and prospective students explored the campus, sat in on mini-lectures and met programme directors face to face on a bright September morning.",
    recap:
      "Campus Open Day welcomed 1,200 visitors for a first-hand look at life at IIMB. Guided student-led tours wound through the academic blocks, hostels, library and sports facilities, while mini-lectures gave a taste of classroom teaching. Programme directors hosted open Q&amp;A desks throughout the morning, and current students shared honest perspectives on everything from coursework to campus culture. The library and innovation lab stayed open late for visitors who wanted to linger.",
    highlights: [
      "1,200 visitors across families and prospective students",
      "Student-led tours of academic and residential life",
      "Mini-lectures and programme-director Q&A desks",
      "Innovation lab and library open for exploration",
    ],
    stat: "1,200 visitors",
    statLabel: "Explored the campus",
  },
  {
    id: "past-leadership-2025",
    category: "Conference",
    title: "Leadership Summit 2025",
    dateLabel: "April 2025",
    year: "2025",
    image:
      "https://readdy.ai/api/search-image?query=Panellists%20seated%20on%20a%20warmly%20lit%20conference%20stage%20in%20front%20of%20an%20audience%2C%20business%20forum%20atmosphere%2C%20editorial%20event%20photography%2C%20warm%20neutral%20tones&width=1200&height=800&seq=iimb-past-summit&orientation=landscape",
    summary:
      "More than forty speakers and 900 attendees spent a day unpacking leadership in an age of uncertainty, closing with a student-led debate on the future of work.",
    recap:
      "The Annual Leadership Summit gathered 900 attendees and more than forty speakers for a day built around one question: how do you lead when the ground keeps shifting? Keynotes from industry and civil-society leaders were interspersed with panels on resilience, talent and trust. A student-led debate on the future of work closed the programme, and the day wrapped with a networking reception that kept conversations going well past the last session.",
    highlights: [
      "900+ attendees and 40+ speakers across 12 sessions",
      "Keynotes spanning business, government and civil society",
      "Panels on resilience, talent and organisational trust",
      "Student-led closing debate on the future of work",
    ],
    stat: "900+ attendees",
    statLabel: "Across 12 sessions",
  },
  {
    id: "past-admissions-2024",
    category: "Admissions",
    title: "Admissions Open House 2024",
    dateLabel: "October 2024",
    year: "2024",
    image:
      "https://readdy.ai/api/search-image?query=Prospective%20students%20in%20a%20bright%20auditorium%20listening%20to%20a%20presentation%2C%20informational%20session%2C%20engaged%20audience%2C%20warm%20soft%20lighting%2C%20neutral%20palette&width=1200&height=800&seq=iimb-past-admissions&orientation=landscape",
    summary:
      "Prospective candidates filled the auditorium for a full walkthrough of the application, interviews and scholarship options, followed by open Q&A with current students.",
    recap:
      "Two packed sessions drew 450 prospective candidates to the auditorium for a transparent walkthrough of the admissions journey. The admissions team demystified every stage of the application, from essays and recommendations to interviews, while the financial-aid office outlined scholarship and loan options. Current students then took over for an unfiltered Q&amp;A on work-life balance, placements and what they wish they'd known before applying.",
    highlights: [
      "450 candidates across two sessions",
      "Stage-by-stage walkthrough of the application",
      "Scholarship and financial-aid guidance",
      "Unfiltered student Q&A on campus life",
    ],
    stat: "450 candidates",
    statLabel: "Across two sessions",
  },
  {
    id: "past-openday-2024",
    category: "Campus",
    title: "Campus Open Day 2024",
    dateLabel: "September 2024",
    year: "2024",
    image:
      "https://readdy.ai/api/search-image?query=Guided%20campus%20tour%20group%20walking%20along%20a%20tree-lined%20pathway%2C%20visitors%20listening%20to%20a%20student%20guide%2C%20soft%20daylight%2C%20welcoming%20atmosphere%2C%20warm%20tones&width=1200&height=800&seq=iimb-past-openday24&orientation=landscape",
    summary:
      "Guided tours, live mini-lectures and conversations with programme directors gave visitors an honest feel for daily life on campus.",
    recap:
      "Nearly a thousand visitors joined Campus Open Day 2024, exploring the grounds on student-led tours and sitting in on live mini-lectures across disciplines. Programme directors were on hand all morning to answer questions, and current students shared candid reflections on hostel life, clubs and campus traditions. The sustainability walk through the green campus was a visitor favourite, ending at the herb garden.",
    highlights: [
      "980 visitors on guided campus tours",
      "Live mini-lectures across disciplines",
      "One-to-one time with programme directors",
      "Sustainability walk and campus-traditions showcase",
    ],
    stat: "980 visitors",
    statLabel: "Toured the campus",
  },
  {
    id: "past-summit-2024",
    category: "Conference",
    title: "Leadership Summit 2024",
    dateLabel: "June 2024",
    year: "2024",
    image:
      "https://readdy.ai/api/search-image?query=Business%20leaders%20in%20discussion%20on%20a%20modern%20conference%20stage%2C%20professional%20forum%20setting%2C%20warm%20stage%20lighting%2C%20editorial%20event%20photography&width=1200&height=800&seq=iimb-past-summit24&orientation=landscape",
    summary:
      "A full day of keynotes and panels on resilient organisations, bringing together executives, faculty and students around a shared set of questions.",
    recap:
      "The 2024 Leadership Summit convened 36 speakers over ten sessions to explore what makes organisations resilient under pressure. Executives, faculty and students shared the floor, moving from macroeconomic uncertainty to the practicalities of team culture and change. Breakout workshops let attendees apply the ideas in small groups, and the summit closed with a synthesis session that drew threads across the entire day.",
    highlights: [
      "36 speakers across 10 sessions",
      "Hands-on breakout workshops on team culture",
      "Mixed audience of executives, faculty and students",
      "Closing synthesis on organisational resilience",
    ],
    stat: "36 speakers",
    statLabel: "Over 10 sessions",
  },
  {
    id: "past-research-2024",
    category: "Research",
    title: "Research Colloquium 2024",
    dateLabel: "March 2024",
    year: "2024",
    image:
      "https://readdy.ai/api/search-image?query=Scholars%20in%20conversation%20around%20a%20seminar%20table%20with%20notes%20and%20a%20presentation%20screen%2C%20academic%20collaborative%20mood%2C%20warm%20neutral%20palette&width=1200&height=800&seq=iimb-past-colloquium24&orientation=landscape",
    summary:
      "Two days of working papers and roundtables turned the campus into a workshop, with doctoral students presenting alongside senior faculty.",
    recap:
      "Nineteen working papers across six research areas were presented over two workshop-style days. The format favoured discussion over presentation, with generous time for feedback and debate. Doctoral students presented alongside senior faculty, and a methodology clinic offered practical guidance on data, ethics and publishing. The colloquium ended with commitments to three cross-area research collaborations.",
    highlights: [
      "19 papers across six research areas",
      "Workshop format with extended discussion",
      "Doctoral students presenting with senior faculty",
      "Methodology clinic on data, ethics and publishing",
    ],
    stat: "19 papers",
    statLabel: "Across six research areas",
  },
  {
    id: "past-alumni-2023",
    category: "Alumni",
    title: "Alumni Reunion 2023",
    dateLabel: "December 2023",
    year: "2023",
    image:
      "https://readdy.ai/api/search-image?query=Former%20classmates%20embracing%20at%20an%20outdoor%20reunion%20gathering%20with%20string%20lights%2C%20nostalgic%20warm%20evening%2C%20celebratory%20mood%2C%20editorial%20photography&width=1200&height=800&seq=iimb-past-alumni23&orientation=landscape",
    summary:
      "Milestone batches gathered on the lawns for an evening of memories and music, celebrating friendships forged on campus decades earlier.",
    recap:
      "Alumni Reunion 2023 returned 600 graduates from 21 batches to campus for an evening celebration under the stars. Milestone batches were honoured, an open-mic session brought laughter and a few happy tears, and a live band kept the lawns buzzing. Alumni had the chance to revisit old haunts and sign the reunion guestbook before the night wound down with dessert and endless photographs.",
    highlights: [
      "600+ alumni from 21 batches",
      "Milestone batch honours and open-mic memories",
      "Live music on the lawns under string lights",
      "Reunion guestbook and campus nostalgia walk",
    ],
    stat: "600+ alumni",
    statLabel: "Across 21 batches",
  },
  {
    id: "past-summit-2023",
    category: "Conference",
    title: "Leadership Summit 2023",
    dateLabel: "May 2023",
    year: "2023",
    image:
      "https://readdy.ai/api/search-image?query=Panel%20discussion%20on%20a%20warmly%20lit%20auditorium%20stage%20with%20microphones%20and%20a%20moderator%2C%20professional%20conference%20atmosphere%2C%20editorial%20event%20photography&width=1200&height=800&seq=iimb-past-summit23&orientation=landscape",
    summary:
      "Panels on technology, talent and trust drew a packed auditorium, with a student debate closing the programme on a high note.",
    recap:
      "The 2023 Leadership Summit packed the auditorium for eleven sessions built around technology, talent and trust. Industry leaders and faculty debated how automation is reshaping work and what it means for leadership. A lively student debate on ethical technology closed the programme, and a networking reception gave attendees space to turn conversation into connection.",
    highlights: [
      "800+ attendees across 11 sessions",
      "Panels on technology, talent and trust",
      "Student debate on ethical technology",
      "Evening networking reception",
    ],
    stat: "800+ attendees",
    statLabel: "Across 11 sessions",
  },
];

export const pastEventYears = [
  ...new Set(pastEvents.map((event) => event.year)),
].sort((a, b) => Number(b) - Number(a));

export const speakers = [
  {
    id: "sp-1",
    name: "Dr. Anjali Menon",
    role: "Professor of Strategy",
    organisation: "IIM Bangalore",
    topic: "Leading through uncertainty",
    event: "Leadership Summit 2026",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20confident%20Indian%20woman%20academic%20in%20her%20fifties%20wearing%20a%20formal%20blazer%2C%20neutral%20studio%20background%2C%20warm%20soft%20lighting%2C%20editorial%20headshot&width=600&height=600&seq=iimb-sp-anjali&orientation=squarish",
  },
  {
    id: "sp-2",
    name: "Rahul Deshpande",
    role: "Chief Executive Officer",
    organisation: "Meridian Capital",
    topic: "Financing the climate transition",
    event: "Climate Finance Forum",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20Indian%20businessman%20in%20his%20forties%20in%20a%20dark%20suit%2C%20subtle%20smile%2C%20neutral%20warm%20studio%20background%2C%20editorial%20headshot&width=600&height=600&seq=iimb-sp-rahul&orientation=squarish",
  },
  {
    id: "sp-3",
    name: "Dr. Kavita Rao",
    role: "Director, Centre for Public Policy",
    organisation: "IIM Bangalore",
    topic: "Policy for inclusive growth",
    event: "Leadership Summit 2026",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20Indian%20woman%20policy%20researcher%20in%20her%20sixties%20with%20glasses%2C%20formal%20attire%2C%20neutral%20warm%20studio%20background%2C%20editorial%20headshot&width=600&height=600&seq=iimb-sp-kavita&orientation=squarish",
  },
  {
    id: "sp-4",
    name: "Arjun Nair",
    role: "Founder & Chief Scientist",
    organisation: "Lumen AI",
    topic: "Building responsible AI products",
    event: "Research Colloquium",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20young%20Indian%20male%20technology%20founder%20in%20a%20smart%20casual%20shirt%2C%20confident%20expression%2C%20neutral%20warm%20studio%20background%2C%20editorial%20headshot&width=600&height=600&seq=iimb-sp-arjun&orientation=squarish",
  },
  {
    id: "sp-5",
    name: "Meera Iyer",
    role: "Managing Partner",
    organisation: "Anchor Ventures",
    topic: "Backing the next generation",
    event: "Alumni Homecoming",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20poised%20Indian%20woman%20venture%20capitalist%20in%20her%20forties%20wearing%20an%20elegant%20blouse%2C%20neutral%20warm%20studio%20background%2C%20editorial%20headshot&width=600&height=600&seq=iimb-sp-meera&orientation=squarish",
  },
  {
    id: "sp-6",
    name: "Dr. Samuel Fernandes",
    role: "Professor of Economics",
    organisation: "IIM Bangalore",
    topic: "Markets, data and trust",
    event: "Climate Finance Forum",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20distinguished%20Indian%20male%20economics%20professor%20with%20grey%20hair%20in%20a%20formal%20shirt%2C%20neutral%20warm%20studio%20background%2C%20editorial%20headshot&width=600&height=600&seq=iimb-sp-samuel&orientation=squarish",
  },
];