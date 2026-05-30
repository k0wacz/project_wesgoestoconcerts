export interface Concert {
  tour: string;
  bands: string[];
  genre: string[];
  city: string;
  date: string;
  flyer: string;
  memory: string;
  average_price: string;
  venue: string;
}

export const concerts: Concert[] = [
  { 
    tour: "Millencolin - South America Tour 2010",
    bands: ["Millencolin","Take Of The Halter"],
    genre: ["skate punk","melodic hardcore","punk rock"],
    city: "Curitiba-PR",
    date: "12/11/2010",
    flyer: "src/assets/images/flyers/millencolin_2010.png",
    memory: "onde tudo começou",
    average_price: "R$ 60,00",
    venue: "Curitiba Master Hall"
  },

  { 
    tour: "Dead Throne Tour Latin America 2012",
    bands: ["The Devil Wears Prada","Whitechapel","Architects"],
    genre: ["metalcore","deathcore"],
    city: "Curitiba-PR",
    date: "22/04/2012",
    flyer: "src/assets/images/flyers/tdwp_2012.png",
    memory: "quando os the archies eram humildes para dormir no aeroporto",
    average_price: "R$ 60,00",
    venue: "Music Hall"
  },

  { 
    tour: "August Burns Red Latin America Tour",
    bands: ["August Burns Red","We Came As Romans","Anchor"],
    genre: ["metalcore","melodic metalcore","hardcore"],
    city: "Curitiba-PR",
    date: "01/12/2012",
    flyer: "src/assets/images/flyers/abr_2012_alt.png",
    memory: "era pra ser august burns red, the ghost inside e carnifex, but we have ghost inside at home",
    average_price: "R$ 70,00",
    venue: "Music Hall"
  },

  { 
    tour: "Festival dos Fanáticos",
    bands: ["The Offspring","Raimundos","Tequila Baby"],
    genre: ["punk rock","skate punk"],
    city: "Florianópolis-SC",
    date: "07/02/2014",
    flyer: "src/assets/images/flyers/offspring_2014.png",
    memory: "damn",
    average_price: "R$ 175",
    venue: "Music Park"
  },

  { 
    tour: "Millencolin - South America Tour 2015",
    bands: ["Millencolin","Colaterall"],
    genre: ["skate punk","melodic hardcore","punk rock"],
    city: "Curitiba-PR",
    date: "15/11/2015",
    flyer: "src/assets/images/flyers/millencolin_2015.png",
    memory: "how can mirrors be real if our eyes aren't real",
    average_price: "R$ 172,00",
    venue: "Vanilla Music Hall"
  },

  { 
    tour: "Millencolin - Part of the True Brew World Tour 2017",
    bands: ["Millencolin"],
    genre: ["skate punk","melodic hardcore"],
    city: "Curitiba-PR",
    date: "07/10/2017",
    flyer: "src/assets/images/flyers/millencolin_2017.png",
    memory: "nesse show do millencolin um cara deu stage dive direto na cabeça da jessica e caiu em cima de mim",
    average_price: "R$ 145,00",
    venue: "Spazio Van"
  },

  { 
    tour: "Curitiba HC Fest 2018",
    bands: ["Dead Fish","Zander","Pense","Gloria","Colligere","Menores Atos","Hateen","Chuva Negra","Deb And The Metals","No Reply","Colaterall","Hell2Pay","Crazy Bastards"],
    genre: ["hardcore","post-hardcore","emo","metalcore"],
    city: "Curitiba-PR",
    date: "21/04/2018",
    flyer: "src/assets/images/flyers/curitiba_hc_2018.png",
    memory: "festival com diversas bandas do cenário hardcore nacional",
    average_price: "R$ 60,00",
    venue: "Sociedade Abranches"
  },

  { 
    tour: "Less Than Jake - Latin American Tour 2018",
    bands: ["Less Than Jake","Abraskadabra"],
    genre: ["skate punk","punk rock"],
    city: "Curitiba-PR",
    date: "24/05/2018",
    flyer: "src/assets/images/flyers/lessthanjake_2018.png",
    memory: "kiwi kiwi kiwi tweet tweet tweet",
    average_price: "R$ 93,33",
    venue: "Hermes Bar"
  },

  { 
    tour: "We Are One Tour 2023",
    bands: ["Millencolin","Satanic Surfers","Cigar","MakeWar","All The Postcards"],
    genre: ["skate punk","melodic hardcore","punk rock"],
    city: "Curitiba-PR",
    date: "10/03/2023",
    flyer: "src/assets/images/flyers/millencolin_2023.png",
    memory: "eu juro que não é um erro, tem mais um show do millencolin aqui",
    average_price: "R$ 262,50",
    venue: "Tork N Roll"
  },

  { 
    tour: "I Wanna Be Tour 2024",
    bands: ["Simple Plan","A Day To Remember","The All-American Rejects","All Time Low","The Used","Asking Alexandria","NX Zero","Pitty","Boys Like Girls","Mayday Parade","Plain White T's","Fresno"],
    genre: ["pop punk","emo","post-hardcore","metalcore","alternative rock"],
    city: "Curitiba-PR",
    date: "03/03/2024",
    flyer: "src/assets/images/flyers/i_wanna_be_tour_2024.png",
    memory: "bring denis stoff back",
    average_price: "R$ 395",
    venue: "Estádio Couto Pereira"
  },

  { 
    tour: "John Wayne em Curitiba 2024",
    bands: ["John Wayne", "Heartlistener","Crowning Animals"],
    genre: ["metalcore","hardcore"],
    city: "Curitiba-PR",
    date: "04/05/2024",
    flyer: "src/assets/images/flyers/johnwayne_2024.png",
    memory: "tive que ir embora antes de john wayne",
    average_price: "R$ 100,00",
    venue: "Belvedere"
  },

  { 
    tour: "Blessthefall - Latin America Tour 2024",
    bands: ["Blessthefall","Crowning Animals"],
    genre: ["metalcore","post-hardcore"],
    city: "Curitiba-PR",
    date: "18/05/2024",
    flyer: "src/assets/images/flyers/blessthefall_2024.png",
    memory: "cabelo sedoso do elliot",
    average_price: "R$ 350",
    venue: "Jokers Pub"
  },

  { 
    tour: "Bring Me The Horizon Tour 2024",
    bands: ["Bring Me The Horizon","Motionless In White","Spiritbox","The Plot In You"],
    genre: ["metalcore","post-hardcore", "experimental"],
    city: "São Paulo-SP",
    date: "30/11/2024",
    flyer: "src/assets/images/flyers/bmth_2024.png",
    memory: "landon torres canta muito, courtney rainha, chris imovel em branco timido",
    average_price: "R$ 360,00",
    venue: "Allianz Parque"
  },

  { 
    tour: "Supercharged Worldwide In '25",
    bands: ["The Offspring","Sublime","Rise Against","The Damned","The Warning","Amyl and the Sniffers"],
    genre: ["punk rock","skate punk","alternative rock","hardcore punk"],
    city: "Curitiba-PR",
    date: "09/03/2025",
    flyer: "src/assets/images/flyers/offspring_2025.png",
    memory: "pedradas na pedreira paulo lemisnki",
    average_price: "R$ 506,00",
    venue: "Pedreira Paulo Leminski"
  },

  { 
    tour: "Silent Planet - South America Tour 2025",
    bands: ["Silent Planet","Declive","Heartlistener"],
    genre: ["metalcore","progressive metalcore","hardcore"],
    city: "Curitiba-PR",
    date: "13/04/2025",
    flyer: "src/assets/images/flyers/silentplanet_2025.png",
    memory: "andou descalçou no palco e comeu veggie burger no barba",
    average_price: "R$ 120,00",
    venue: "Belvedere Bar"
  },

  { 
    tour: "John Wayne em Curitiba 2025",
    bands: ["John Wayne","Heartlistener","Sufffer","Serena"],
    genre: ["metalcore","hardcore"],
    city: "Curitiba-PR",
    date: "24/05/2025",
    flyer: "src/assets/images/flyers/johnwayne_2025.png",
    memory: "skinny dude screams a lot",
    average_price: "R$ 100,00",
    venue: "Belvedere Bar"
  },

  { 
    tour: "Latin America Tour",
    bands: ["The Devil Wears Prada","Crowning Animals"],
    genre: ["metalcore","post-hardcore"],
    city: "Curitiba-PR",
    date: "16/08/2025",
    flyer: "src/assets/images/flyers/tdwp_2025.png",
    memory: "o carinha de bigode, de calça bege e sem camisa animando o mosh",
    average_price: "R$ 300,00",
    venue: "Jokers Club"
  },

  { 
    tour: "I Wanna Be Tour 2025",
    bands: ["Fall Out Boy","Yellowcard","Forfun","Dead Fish","Story Of The Year","Gloria","Good Charlotte","Fresno","The Veronicas","The Maine","Neck Deep","Fake Number"],
    genre: ["pop punk","emo","punk rock","post-hardcore"],
    city: "Curitiba-PR",
    date: "23/08/2025",
    flyer: "src/assets/images/flyers/i_wanna_be_tour_2025.png",
    memory: "aaaaaaaaafçlasklçfka",
    average_price: "R$ 445,50",
    venue: "Pedreira Paulo Leminski"
  },

  { 
    tour: "Latin America Tour 2025",
    bands: ["Strung Out","Belvedere","Authority Zero"],
    genre: ["skate punk","melodic hardcore","punk rock"],
    city: "Curitiba-PR",
    date: "12/09/2025",
    flyer: "src/assets/images/flyers/strungout_2025.png",
    memory: "nunca vi uma casa de show tocando musica",
    average_price: "R$ 270,00",
    venue: "Basement Cultural"
  },

  { 
    tour: "The Black Tour Latin America",
    bands: ["Imminence","Kryour"],
    genre: ["metalcore","post-hardcore","melodic death metal"],
    city: "São Paulo-SP",
    date: "25/09/2025",
    flyer: "src/assets/images/flyers/imminence_2025.png",
    memory: "eddie. berg. harald. barret. ",
    average_price: "R$ 340,00",
    venue: "Carioca Club"
  },

  { 
    tour: "Goin' South 2025",
    bands: ["Lagwagon","Cigar"],
    genre: ["skate punk","melodic hardcore"],
    city: "Curitiba-PR",
    date: "10/10/2025",
    flyer: "src/assets/images/flyers/lagwagon_2025.png",
    memory: "vagão de cigarro",
    average_price: "R$ 270,00",
    venue: "Tork n' Roll"
  }
  
];

export const cities = ["Curitiba-PR", "São Paulo-SP", "Florianópolis-SC"] as const;
