export interface TeamMember {
    name: string;
    position: string;
    university: string;
    country: string;
    researchInterests: string[];
    contact: string;
    linkedin?: string;
    website?: string;
    image?: string;
    status: 'current' | 'past';
}

export const team: TeamMember[] = [
    {
        name: "Dr. Mahima Weerasinghe",
        position: "Researcher / Lead – Neuroinformatics",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Computational Neuroscience",
            "Artificial Neural Networks",
            "AI in Health",
            "AI in Agriculture"
        ],
        contact: "mahima.w@sliit.lk",
        linkedin: "https://www.linkedin.com/in/mahimaweerasinghe/",
        image: "/assets/images/mahima-weerasinghe.jpeg",
        status: "current"
    },
    {
        name: "Dr. Dinuka Sahabandu",
        position: "Researcher / Lead – Efficient AI",
        university: "University of Washington",
        country: "USA",
        researchInterests: [
            "Optimization",
            "Reinforcement Learning",
            "Efficient Machine Learning",
            "AI Ethics",
            "Security in Machine Learning"
        ],
        contact: "dinuka.s@sliit.lk",
        linkedin: "https://www.linkedin.com/in/dinuka-sahabandu-48898726b/",
        image: "/assets/images/dinuka-sahabandu.jpeg",
        status: "current"
    },
    {
        name: "Dr. Dharshana Kasthurirathna",
        position: "Senior Researcher / Mentor",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Evolutionary Game Theory",
            "AI Ethics",
            "Security in Machine Learning",
            "Machine Learning"
        ],
        contact: "dharshana.k@sliit.lk",
        linkedin: "https://www.linkedin.com/in/dharshana-kasthurirathna-a4a3275/",
        image: "/assets/images/dharshana_kasthurirathna.jpeg",
        status: "current"
    },
    {
        name: "Dr. Kapila Dissanayaka",
        position: "Researcher / Lead – Explainable AI",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Computational Neuroscience",
            "Artificial Neural Networks",
            "AI in Health",
            "AI in Agriculture"
        ],
        contact: "kapila.d@sliit.lk",
        linkedin: "https://www.linkedin.com/in/kapila-d-dissanayaka/",
        image: "/assets/images/kapila_dissanayaka.jpeg",
        status: "current"
    },
    {
        name: "Mr. Jeewaka Perera",
        position: "Researcher",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Reinforcement Learning",
            "Bio-Inspired Machine Learning",
            "AI Ethics",
            "Security in Machine Learning",
            "Machine Learning"
        ],
        contact: "jeewaka.p@sliit.lk",
        linkedin: "https://www.linkedin.com/in/jeewakaperera/",
        image: "/assets/images/jeewaka_perera.jpeg",
        status: "current"
    },
    {
        name: "Ms. Madhumini Gunaratne",
        position: "Graduate Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Computational Neuroscience",
            "Artificial Neural Networks",
            "AI in Health",
            "AI in Agriculture"
        ],
        contact: "madhumini.g@sliit.lk",
        image: "/assets/images/madhumini_gunaratne.jpeg",
        status: "past"
    },
    {
        name: "Mr. Asiri Gawesha",
        position: "Graduate Research Assistant / MPhil Student",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Computational Optimization in Machine Learning",
            "Federate Learning",
            "Edge AI",
            "Computer Vision"
        ],
        contact: "asiri.g@sliit.lk",
        linkedin: "https://www.linkedin.com/in/asiri-gawesha-090617168/",
        image: "/assets/images/asiri_gawesha.jpeg",
        status: "current"
    },
    {
        name: "Mr. Sanka Mohottala",
        position: "Academic Instructor / MPhil Student",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Computer Vision",
            "Graph Neural Networks",
            "Applications of Deep Learning in Scientific Domains",
            "Brain-Inspired Neural Networks"
        ],
        contact: "sanka.m@sliit.lk",
        linkedin: "https://www.linkedin.com/in/sankamohottala/",
        image: "/assets/images/sanka_mohottala.jpeg",
        status: "current"
    },
    {
        name: "Mr. Chethiya Galkaduwa",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Machine Learning",
            "Artificial Intelligence"
        ],
        contact: "chethiya.g@sliit.lk",
        linkedin: "https://www.linkedin.com/in/chethiya-galkaduwa/",
        image: "/assets/images/chethiya-galkaduwa.jpeg",
        status: "past"
    },
    {
        name: "Mr. Nandun Samarasekara",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Machine Learning",
            "Artificial Intelligence"
        ],
        contact: "nandun.s@sliit.lk",
        linkedin: "https://www.linkedin.com/in/nandun-samarasekara-5564162b8/",
        image: "/assets/images/nandun-samarasekara.jpeg",
        status: "current"
    },
    {
        name: "Mr. Hasitha Erandika",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Machine Learning",
            "Artificial Intelligence"
        ],
        contact: "hasitha.e@sliit.lk",
        linkedin: "https://www.linkedin.com/in/hasitha-erandika/",
        image: "/assets/images/hasitha-erandika.jpeg",
        status: "current"
    },
    {
        name: "Ms. Savini Kommalage",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Machine Learning",
            "Artificial Intelligence"
        ],
        contact: "savini.k@sliit.lk",
        linkedin: "https://www.linkedin.com/in/savini-kommalage/",
        image: "/assets/images/savini-kommalage.jpeg",
        status: "current"
    },
    {
        name: "Mr. Krishmal Dinindu",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Machine Learning",
            "Artificial Intelligence"
        ],
        contact: "krishmal.d@sliit.lk",
        linkedin: "https://www.linkedin.com/in/krishmal-dinidu-a933b4349/",
        image: "/assets/images/krishmal-dinindu.jpeg",
        status: "current"
    },
    {
        name: "Mr. Hasitha Hirushan",
        position: "Research Assistant",
        university: "Sri Lanka Institute of Information Technology",
        country: "Sri Lanka",
        researchInterests: [
            "Machine Learning",
            "Artificial Intelligence"
        ],
        contact: "hasitha.h@sliit.lk",
        linkedin: "https://www.linkedin.com/in/hasitha-hirushan/",
        image: "/assets/images/hasitha-hirushan.jpeg",
        status: "current"
    }
];
