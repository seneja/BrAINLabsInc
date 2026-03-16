export interface AcademicQualification {
    degree: string;
    institution: string;
    period: string;
    details?: string;
}

export interface CareerExperience {
    role: string;
    institution: string;
    period: string;
    details?: string[];
}

export interface Publication {
    title: string;
    authors: string;
    venue: string;
    year: string;
    doi?: string;
    details?: string;
    type: 'journal' | 'conference' | 'book' | 'presentation' | 'under_review';
}

export interface TeamMember {
    id: string; // Slug for routing
    name: string;
    position: string;
    university: string;
    country: string;
    researchInterests: {
        theoretical?: string[];
        applied?: string[];
    };
    contact: string;
    linkedin?: string;
    website?: string;
    image?: string;
    status: 'current' | 'past';
    bio?: string;
    summary?: string;
    academicQualifications?: AcademicQualification[];
    careerSummary?: {
        academic?: CareerExperience[];
        industry?: CareerExperience[];
        volunteer?: CareerExperience[];
    };
    honoursAndAwards?: string[];
    memberships?: string[];
    ongoingResearch?: string[];
    publications?: Publication[];
}

export const team: TeamMember[] = [
    {
        id: "mahima-weerasinghe",
        name: "Dr. Mahima Weerasinghe",
        position: "Researcher / Lead – Neuroinformatics",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: {
            theoretical: ["Computational Neuroscience", "Artificial Neural Networks"],
            applied: ["AI in Health", "AI in Agriculture"]
        },
        contact: "mahima.w@sliit.lk",
        linkedin: "https://www.linkedin.com/in/mahimaweerasinghe/",
        image: "/assets/images/mahima-weerasinghe.jpeg",
        status: "current",
        summary: "Dr. Mahima Weerasinghe is a Senior Lecturer and Principal Researcher at BrAIN Labs, specializing in Neuromorphic Computational Data Modelling and Spiking Neural Networks.",
        academicQualifications: [
            {
                degree: "Doctor of Philosophy",
                institution: "Auckland University of Technology, New Zealand",
                period: "2019 – 2023",
                details: "Thesis title: “Neuromorphic Computational Data Modelling Techniques for Spatiotemporal Brain Data”"
            },
            {
                degree: "Master of Science in Applied Electronics",
                institution: "University of Colombo, Sri Lanka",
                period: "2012 – 2016",
                details: "Thesis title: 3D Measurement Test Bench for Luminaires"
            },
            {
                degree: "Bachelor of Engineering Honours in Electronic Engineering (First Class)",
                institution: "Sheffield Hallam University, UK (Affiliated with SLIIT)",
                period: "2009 - 2012"
            }
        ],
        careerSummary: {
            academic: [
                {
                    role: "Senior Lecturer (Higher Grade)",
                    institution: "SLIIT, Sri Lanka",
                    period: "Apr 2024 - Present"
                },
                {
                    role: "Head of Department - Data Science",
                    institution: "SLTC, Sri Lanka",
                    period: "Jan 2023 - Mar 2024",
                    details: ["Module owner – Artificial Intelligence, Bionics, and Neural Networks", "Principal Researcher - BrAIN Labs"]
                },
                {
                    role: "Lecturer (Contract)",
                    institution: "Auckland University of Technology, New Zealand",
                    period: "May 2021 - Nov 2021"
                },
                {
                    role: "Research Assistant",
                    institution: "KEDRI Labs, AUT, New Zealand",
                    period: "Jun 2019 – May 2020",
                    details: ["Machine learning analysis for predicting success in knee arthroplasty", "Machine learning analysis for predicting youth wellbeing"]
                }
            ],
            industry: [
                {
                    role: "Manager - Training and Development",
                    institution: "Singer (Sri Lanka) PLC",
                    period: "Dec 2016 - Apr 2019",
                    details: ["Researcher - Strategic Business Unit for Data Driven Decision Making"]
                },
                {
                    role: "Engineer",
                    institution: "Singer (Sri Lanka) PLC",
                    period: "Mar 2012 - Dec 2016"
                }
            ],
            volunteer: [
                {
                    role: "Director Training and Leadership Development",
                    institution: "Rotaract District 3220 Sri Lanka and Maldives",
                    period: "Jun 2016 – Jun 2017"
                }
            ]
        },
        honoursAndAwards: [
            "Knowledge Engineering and Discovery Research Institute scholarship, AUT, New Zealand, 2019",
            "Major Successful Project Award at the 30th Singer Management Conference for the QR Code-based Knowledge Sharing System",
            "Major Successful Project Award at the 29th Singer Management Conference for the First ever Corporate Rotaract Club initiative"
        ],
        memberships: [
            "Member of the Institution of Engineering and Technology",
            "Member of the Rotary International"
        ],
        ongoingResearch: [
            "Interpretable Neural Networks for Cancer Prediction in Collaboration with Auckland University of Technology and Lincoln University Christchurch"
        ],
        publications: [
            {
                title: "Mental Stress Recognition on the fly using SNNs",
                authors: "M. Weerasinghe, G. Y. Wang and J. Whalley, Mark Crook- Ramsey",
                venue: "Nature Scientific Reports",
                year: "2023",
                doi: "10.1038/s41598-023-xxxx",
                type: "journal"
            },
            {
                title: "Incorporating Structural Plasticity Approaches in Spiking Neural Networks for EEG Modelling",
                authors: "M. Weerasinghe, J. I. Espinosa-Ramos, G. Y. Wang and D. Parry",
                venue: "IEEE Access",
                year: "2021",
                doi: "10.1109/ACCESS.2021.3099492",
                type: "journal"
            },
            {
                title: "Emotional Stress Classification using SNNs",
                authors: "M. Weerasinghe, G. Y. Wang and D. Parry",
                venue: "Psychology and Neuroscience",
                year: "2022",
                type: "journal"
            },
            {
                title: "Ensemble plasticity and network adaptability in SNNs",
                authors: "M. Weerasinghe, D. Parry, G. Y. Wang and J. Whalley",
                venue: "Neurocomputing",
                year: "Under Review",
                type: "under_review"
            }
        ]
    },
    {
        id: "dharshana-kasthurirathna",
        name: "Dr. Dharshana Kasthurirathna",
        position: "Senior Researcher / Mentor",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: {
            theoretical: ["Network Science", "Game Theory", "Information Theory"],
            applied: ["Machine Learning", "Distributed Systems", "Parallel Computing"]
        },
        contact: "dharshana.k@sliit.lk",
        linkedin: "https://www.linkedin.com/in/dharshana-kasthurirathna-a4a3275/",
        image: "/assets/images/dharshana_kasthurirathna.jpeg",
        status: "current",
        academicQualifications: [
            {
                degree: "PhD in Complex Systems",
                institution: "University of Sydney",
                period: "2015"
            },
            {
                degree: "MSc in Computer Science",
                institution: "University of Colombo",
                period: "2011"
            },
            {
                degree: "BSc in Computer Science and Engineering",
                institution: "University of Moratuwa",
                period: "2007"
            }
        ],
        careerSummary: {
            academic: [
                {
                    role: "Senior Lecturer (HG)",
                    institution: "Dept. of Software Engineering, SLIIT",
                    period: "Present"
                },
                {
                    role: "Research Engineer",
                    institution: "LirneAsia",
                    period: "Past"
                }
            ],
            industry: [
                {
                    role: "Software Engineer",
                    institution: "Various",
                    period: "7 years"
                }
            ]
        },
        honoursAndAwards: [
            "Outstanding Academic Performer award by the Computer Science & Engineering Society, University of Moratuwa, Sri Lanka"
        ],
        ongoingResearch: [
            "Supervising an MPhil candidate on User centric knowledge graphs",
            "Principle investigator of a research lab on Financial analytics in collaboration with the industry",
            "Involved in a research project on agricultural analytics"
        ],
        publications: [
            {
                title: "Emergence of scale-free characteristics in socio-ecological systems with bounded rationality",
                authors: "Dharshana Kasthurirathna, Mahendra Piraveenan",
                venue: "Scientific Reports",
                year: "2015",
                type: "journal"
            },
            {
                title: "Modeling networked systems using the topologically distributed bounded rationality framework",
                authors: "Dharshana Kasthurirathna, Mahendra Piraveenan, Shahadat Uddin",
                venue: "Complexity",
                year: "2016",
                doi: "10.1002/cplx.21789",
                type: "journal"
            }
        ]
    },
    {
        id: "kapila-dissanayaka",
        name: "Dr. Kapila Dissanayaka",
        position: "Researcher / Lead – Explainable AI",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: {
            theoretical: ["Optical Sensing and Instrumentation", "Laser Applications"],
            applied: ["Deep Learning for Astrophysics", "Nanofluidics", "IoT", "AI Assisted Systems"]
        },
        contact: "kapila.d@sliit.lk",
        linkedin: "https://www.linkedin.com/in/kapila-d-dissanayaka/",
        image: "/assets/images/kapila_dissanayaka.jpeg",
        status: "current",
        academicQualifications: [
            {
                degree: "Ph.D. in Physics",
                institution: "The University of Tennessee Knoxville, USA",
                period: "2014–2019"
            },
            {
                degree: "M.Sc. in Engineering Technology",
                institution: "Middle Tennessee State University, USA",
                period: "2012–2014"
            },
            {
                degree: "B.Sc. (Hons) in Engineering Physics",
                institution: "University of Colombo, Sri Lanka",
                period: "2005–2009"
            }
        ],
        careerSummary: {
            academic: [
                {
                    role: "Senior Lecturer (Higher Grade)",
                    institution: "SLIIT, Sri Lanka",
                    period: "April 2023 - Present"
                },
                {
                    role: "Assistant Professor of Physics",
                    institution: "Motlow College, USA",
                    period: "Aug. 2022"
                },
                {
                    role: "Lecturer of Physics",
                    institution: "Motlow College, USA",
                    period: "2019–2022"
                }
            ]
        },
        honoursAndAwards: [
            "Outstanding paper award for Galaxy Morphology Classification, Colombo Sri Lanka, 2024",
            "Graduate Research Assistantship Award, UTSI, USA, 2016–2019"
        ],
        memberships: [
            "Member of IEEE",
            "Member of Institute of Physics-England (IOP)",
            "Member of Optica",
            "Member of American Physical Society (APS)"
        ],
        ongoingResearch: [
            "Development of Parkinson’s disease stage detection and monitoring system (AI Based Mobile Application)",
            "Development of cardiovascular health management system (AI Based Mobile Application)",
            "Deep Learning for Galaxy Morphology and resolution upscaling"
        ],
        publications: [
            {
                title: "Three-dimensional feedback-driven trapping of a single nanoparticle or molecule",
                authors: "K.D. Dissanayaka, B.K. Canfield, and L.M. Davis",
                venue: "Optics Express",
                year: "2019",
                doi: "10.1364/OE.27.029759",
                type: "journal"
            }
        ]
    },
    {
        id: "jeewaka-perera",
        name: "Mr. Jeewaka Perera",
        position: "Researcher",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: {
            theoretical: ["Neural Network Architectures", "Multi-Objective Optimization"],
            applied: ["Deep Reinforcement Learning", "Machine Learning"]
        },
        contact: "jeewaka.p@sliit.lk",
        linkedin: "https://www.linkedin.com/in/jeewakaperera/",
        image: "/assets/images/jeewaka_perera.jpeg",
        status: "current",
        academicQualifications: [
            {
                degree: "MSc. in Computer Science",
                institution: "California State University, Fresno, USA",
                period: "2020"
            },
            {
                degree: "BSc. in Computer Science",
                institution: "California State University, Fresno, USA",
                period: "2018"
            }
        ],
        careerSummary: {
            academic: [
                {
                    role: "Lecturer - Faculty of Computing",
                    institution: "SLIIT",
                    period: "June 2021- Present"
                },
                {
                    role: "Editorial Assistant",
                    institution: "ICTer Journal",
                    period: "March 2021 - Present"
                }
            ]
        },
        ongoingResearch: [
            "Multi-Objective Combinatorial Optimization Using Multi-Objective Deep Graph Reinforcement Learning"
        ]
    },
    {
        id: "asiri-gawesha",
        name: "Mr. Asiri Gawesha",
        position: "Graduate Research Assistant / MPhil Student",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: {
            theoretical: ["Machine Learning", "Deep Learning"],
            applied: ["Computer Vision", "Mobile app development", "Neural network optimization for edge devices"]
        },
        contact: "asiri.g@sliit.lk",
        linkedin: "https://www.linkedin.com/in/asiri-gawesha-090617168/",
        image: "/assets/images/asiri_gawesha.jpeg",
        status: "current",
        academicQualifications: [
            {
                degree: "BSc(Hons) in Electrical and Electronic Engineering",
                institution: "SLIIT",
                period: "2021",
                details: "Second Class Honours"
            }
        ],
        careerSummary: {
            academic: [
                {
                    role: "Research Assistant, CSAAT Project",
                    institution: "SLIIT, Sri Lanka",
                    period: "Aug 2021 to present"
                }
            ]
        },
        honoursAndAwards: [
            "Sangeeth Visharad (Instrumental-Violin), Bhathkande Sangit Vidyapith, India - 2014"
        ],
        ongoingResearch: [
            "Federated Learning Models for Distributed Mobile Computing - CSAAT project"
        ]
    },
    {
        id: "dinuka-sahabandu",
        name: "Dr. Dinuka Sahabandu",
        position: "Researcher / Lead – Efficient AI",
        university: "University of Washington",
        country: "USA",
        researchInterests: { theoretical: ["Optimization", "Reinforcement Learning"], applied: ["Efficient Machine Learning", "AI Ethics", "Security in ML"] },
        contact: "dinuka.s@sliit.lk",
        linkedin: "https://www.linkedin.com/in/dinuka-sahabandu-48898726b/",
        image: "/assets/images/dinuka-sahabandu.jpeg",
        status: "current"
    },
    {
        id: "madhumini-gunaratne",
        name: "Ms. Madhumini Gunaratne",
        position: "Graduate Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: { theoretical: ["Computational Neuroscience"], applied: ["AI in Health"] },
        contact: "madhumini.g@sliit.lk",
        image: "/assets/images/madhumini_gunaratne.jpeg",
        status: "past"
    },
    {
        id: "sanka-mohottala",
        name: "Mr. Sanka Mohottala",
        position: "Academic Instructor / MPhil Student",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: { 
            theoretical: ["Computer Vision", "Graph Neural Networks"], 
            applied: ["Image Processing", "Biomedical Engineering", "Brain-Inspired NN"] 
        },
        contact: "sanka.m@sliit.lk",
        linkedin: "https://www.linkedin.com/in/sankamohottala/",
        website: "https://scholar.google.com/citations?user=SLIIT_SCHOLAR_ID",
        image: "/assets/images/sanka_mohottala.jpeg",
        status: "current",
        publications: [
            {
                title: "Evaluation of machine learning models in student academic performance prediction",
                authors: "AGR Sandeepa, S Mohottala",
                venue: "5th International Conference on Advanced Research in Computing (ICARC)",
                year: "2025",
                type: "conference"
            },
            {
                title: "Graph neural network based child activity recognition",
                authors: "S Mohottala, P Samarasinghe, D Kasthurirathna, C Abhayaratne",
                venue: "IEEE International Conference on Industrial Technology (ICIT)",
                year: "2022",
                type: "conference"
            },
            {
                title: "2D pose estimation based child action recognition",
                authors: "S Mohottala, S Abeygunawardana, P Samarasinghe, D Kasthurirathna",
                venue: "TENCON 2022 - IEEE Region 10 Conference",
                year: "2022",
                type: "conference"
            },
            {
                title: "Model development for child developmental milestone assessment",
                authors: "M Mudannayake, G Kumari, S Abeygunawardana, N Amaranayake, S Mohottala",
                venue: "4th International Conference on Advancements in Computing (ICAC)",
                year: "2022",
                type: "conference"
            },
            {
                title: "Spatio-temporal graph neural network based child action recognition using data-efficient methods: A systematic analysis",
                authors: "S Mohottala, A Gawesha, D Kasthurirathna, P Samarasinghe",
                venue: "Computer Vision and Image Understanding",
                year: "2025",
                type: "journal"
            },
            {
                title: "Assessing the Efficacy of Machine Learning Algorithms in Predicting Critical Properties of Gold Nanoparticles for Pharmaceutical Applications",
                authors: "H Fernando, S Mohottala, M Jayanetti, C Thambiliyagodage",
                venue: "BioNanoScience",
                year: "2025",
                type: "journal"
            }
        ]
    },
    {
        id: "chethiya-galkaduwa",
        name: "Mr. Chethiya Galkaduwa",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: { theoretical: ["Machine Learning"], applied: ["Artificial Intelligence"] },
        contact: "chethiya.g@sliit.lk",
        linkedin: "https://www.linkedin.com/in/chethiya-galkaduwa/",
        image: "/assets/images/chethiya-galkaduwa.jpeg",
        status: "past"
    },
    {
        id: "nandun-samarasekara",
        name: "Mr. Nandun Samarasekara",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: { 
            theoretical: ["Machine Learning", "Neuroinformatics"], 
            applied: ["Artificial Intelligence", "EEG-based Mindfulness", "Explainable AI"] 
        },
        contact: "it24102080@my.sliit.lk",
        linkedin: "https://www.linkedin.com/in/nandun-samarasekara-5564162b8/",
        image: "/assets/images/nandun-samarasekara.jpeg",
        status: "current",
        academicQualifications: [
            {
                degree: "BSc in Information Technology, Specializing in Data Science",
                institution: "SLIIT",
                period: "Jul 2024 – Jul 2028 (Expected)"
            },    
        ],
        careerSummary: {
            academic: [
                {
                    role: "Research Assistant",
                    institution: "BrAINLabs Inc",
                    period: "Mar 2026 - Present",
                    details: ["Brain-inspired AI systems", "Explainable, efficient, and scalable ML techniques"]
                },
            ]
        },
        ongoingResearch: [
            "Integration of artificial intelligence (AI) with electroencephalography (EEG)-based mindfulness meditation"
        ]
    },
    {
    id: "hasitha-erandika",
    name: "Mr. Hasitha Erandika",
    position: "Research Assistant",
    university: "Sri Lanka Institute of Information Technology",
    country: "Sri Lanka",
    researchInterests: {
        theoretical: ["Machine Learning", "Bio-Inspired Computing"],
        applied: ["EEG-Based Cognitive Analysis", "AI for Human Wellbeing", "Autonomous Systems"]
    },
    contact: "wickramasinghe.erandika@gmail.com",
    linkedin: "https://www.linkedin.com/in/hasitha-erandika/",
    image: "/assets/images/hasitha-erandika.jpeg",
    status: "current",
    summary: "Hasitha Erandika is an undergraduate Research Assistant at BrAIN Labs, SLIIT, specializing in EEG signal analysis, mindfulness research, and AI-assisted brain data interpretation. He is currently contributing to ongoing research in EEG-based mindfulness and cognitive load analysis using machine learning and bio-inspired computing approaches.",
    academicQualifications: [
        {
            degree: "Bachelor of Science Honours in Information Technology (Artificial Intelligence)",
            institution: "Sri Lanka Institute of Information Technology, Sri Lanka",
            period: "2024 – 2028 (Expected)",
            details: "Specialization in Artificial Intelligence — Active undergraduate researcher from 2nd year"
        }
    ],
    careerSummary: {
        academic: [
            {
                role: "Research Assistant",
                institution: "BrAIN Labs Inc. & SLIIT Research, Sri Lanka",
                period: "2025 – Present",
                details: [
                    "Active contributor to ongoing EEG + mindfulness + AI research",
                    "AI-assisted EEG signal interpretation and human wellbeing analytics"
                ]
            }
        ],
        industry: [
            {
                role: "IT & Web solution Associate (Part-Time)",
                institution: "A2Z Engineering (Pvt) Ltd, Sri Lanka",
                period: "2024 – Dec 2025",
                details: [
                    "Practical software and systems development",
                    "Solar electrical system design and implementation"
                ]
            }
        ],
    },
    ongoingResearch: [
        "EEG-Based Mindfulness and Cognitive Load Analysis using AI — BrAIN Labs Inc. & SLIIT Research (Ongoing)"
    ],
    publications: []
},
    {
    "id": "savini-kommalage",
    "name": "Ms. Savini Kommalage",
    "position": "Research Assistant",
    "university": "Sri Lanka Institute of Information Technology",
    "country": "Sri Lanka",
    "researchInterests": {
        "theoretical": [
            "Curriculum Learning",
            "Reinforcement Learning",
            "Explainable Artificial Intelligence"
        ],
        "applied": [
            "Human Behaviour Understanding Frameworks",
            "Efficient AI",
            "Edge AI"
        ]
    },
    "contact": "it24100641@my.sliit.lk",
    "linkedin": "www.linkedin.com/in/savini-kommalage",
    "image": "/assets/images/savini-kommalage.jpeg",
    "status": "current",
},
    {
        id: "krishmal-dinidu",
        name: "Mr. Krishmal Dinidu",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: { theoretical: ["Machine Learning","Neuro Science"], applied: ["Artificial Intelligence"] },
        contact: "krishmaldinidu5466@gmail.com",
        linkedin: "https://www.linkedin.com/in/krishmal-dinindu-a933b4349/",
        image: "/assets/images/krishmal-dinindu.jpeg",
        status: "current",
        summary: "Krishmal Dinidu is an undergraduate Research Assistant at BrAIN Labs, Sri Lanka Institute of Information Technology (SLIIT), focusing on the analysis of Spiking Neural Networks (SNN). He actively contributes to research projects involving SNN and their applications in neural computing.",
        academicQualifications: [
            {
                degree: "Bachelor of Science Honours in Information Technology (Artificial Intelligence)",
                institution: "Sri Lanka Institute of Information Technology, Sri Lanka",
                period: "2024 – 2028 (Expected)",
                details: "Specialization in Artificial Intelligence — Active undergraduate researcher from 2nd year"
            }
        ],
        careerSummary: {
            academic: [
                {
                    role: "Research Assistant",
                    institution: "BrAIN Labs Inc. & SLIIT Research, Sri Lanka",
                    period: "2025 – Present",
                    details: [
                        "Working on Spiking Neural Network Research"
                    ],
                }
            ],
        },
        ongoingResearch: [
            "Working on Spiking Neural Network Research"
        ],
        publications: []
},
    {
        id: "hasitha-hirushan",
        name: "Mr. Hasitha Hirushan",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: { theoretical: ["Machine Learning"], applied: ["Artificial Intelligence"] },
        contact: "hasitha.h@sliit.lk",
        linkedin: "https://www.linkedin.com/in/hasitha-hirushan/",
        image: "/assets/images/hasitha-hirushan.jpeg",
        status: "current"
    }
];