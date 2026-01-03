import React, { useState } from 'react';
import type { Page } from '../types';
import { PAGE_COLORS } from '../types';

interface PageContentProps {
  activePage: Page;
  contentState: 'visible' | 'fading-out' | 'fading-in';
}

// Props for the individual content components like AccueilContent, EpisodesContent etc.
interface ContentComponentProps {
  titleClass: string;
  pClass: string;
  color: string;
}

const PageTitle: React.FC<{ children: React.ReactNode; className?: string; color?: string }> = ({ children, className = '', color }) => (
  <h1
    className={`text-4xl md:text-5xl font-bold font-handwriting mb-6 text-center ${className}`}
    style={{ color: color }}
  >
    {children}
  </h1>
);

const Paragraph: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-lg leading-relaxed mb-4 text-left md:text-justify ${className}`}>
    {children}
  </p>
);

const EPISODES = [
  {
    id: 1,
    title: "Épisode 1 : Les dendrimères, les taxis des médicaments, avec Valérie Marvaud (CNRS, Sorbonne Université)",
    thumbnail: "/images/Minia1.jpg",
    description: "Les dendrimères sont de grosses molécules sphériques capables de transporter des médicaments anticancéreux jusqu’aux cellules malades. Contrairement à la chimiothérapie classique, qui peut aussi endommager des cellules saines, les dendrimères ciblent uniquement les cellules cancéreuses, ce qui rend le traitement plus précis et limite les effets secondaires.",
    videoUrl: "https://www.youtube.com/watch?v=48bw7BomU04",
    videoId: "48bw7BomU04"
  },
  {
    id: 2,
    title: "Épisode 2 : Les fluorophores, les enquêteurs de la phagocytose, avec Sophie Michelis (ENS-PSL)",
    thumbnail: "/images/Minia2.jpg",
    description: "Les fluorophores sont des molécules fluorescentes qui servent à observer le comportement des cellules. Ils permettent notamment d’étudier comment les cellules immunitaires détruisent les bactéries, un processus appelé phagocytose. Quand les fluorophores se mettent à briller, cela montre que les cellules immunitaires ont bien avalé les bactéries.",
    videoUrl: "https://www.youtube.com/watch?v=_FUinKCgroo",
    videoId: "_FUinKCgroo"
  },
  {
    id: 3,
    title: "Épisode 3 : Les microglies, les aspirateurs des rails, avec Camille Paoletti (IBENS)",
    thumbnail: "/images/Minia3.jpg",
    description: "La maladie d’Alzheimer est une maladie neurodégénérative caractérisée, entre autres, par l’accumulation de déchets autour des neurones. Normalement, ces déchets sont éliminés par les cellules immunitaires du cerveau, appelées microglies, chargées du nettoyage. Mais avec l’âge, ces microglies deviennent moins efficaces, ce qui favorise l’accumulation de ces déchets.",
    videoUrl: "https://www.youtube.com/watch?v=Nsm7d8l8m0c",
    videoId: "Nsm7d8l8m0c"
  },
  {
    id: 4,
    title: "Épisode 4 : Les pansements antibactériens, avec Mathilde Lepoitevin (ENS-PSL)",
    thumbnail: "/images/Minia4.jpg",
    description: "Les molécules photosensibles peuvent détruire les bactéries, sans risque de résistance comme dans le cas des antibiotiques. Pour éviter qu’elles ne s’autodétruisent, on peut enfermer des molécules photosensibles dans une structure poreuse appelée MOF (Metal Organic Framework). Cela permet de créer de super pansements antibactériens.",
    videoUrl: "https://www.youtube.com/watch?v=gN4qvjIFMHc",
    videoId: "gN4qvjIFMHc"
  },
  {
    id: 5,
    title: "Épisode 5 : Les caoutchoucs recyclables, avec Sophie Norvez (ESPCI)",
    thumbnail: "/images/Minia5.jpg",
    description: "Le caoutchouc est un polymère, c’est-à-dire une longue chaîne de petits motifs répétés. Pour lui donner de la solidité et de l’élasticité, on relie ces chaînes par des ponts chimiques. Dans le caoutchouc classique, ces liaisons sont irréversibles, ce qui le rend non recyclable. En les remplaçant par des liaisons réversibles, qui se défont et se reforment, on obtient un caoutchouc capable de se réparer et d’être recyclé.",
    videoUrl: "https://www.youtube.com/watch?v=NRI7WDuJRHA",
    videoId: "NRI7WDuJRHA"
  },
];

const EpisodeCard: React.FC<{ episode: typeof EPISODES[0]; color: string }> = ({ episode, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const colonIndex = episode.title.indexOf(':');
  const hasColon = colonIndex !== -1;
  const prefix = hasColon ? episode.title.substring(0, colonIndex + 1) : episode.title;
  const suffix = hasColon ? episode.title.substring(colonIndex + 1) : '';

  return (
    <div className="bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-stone-200 shadow-sm mb-8 transition-transform hover:shadow-md">
      <h3
        className="text-2xl font-handwriting mb-4"
        style={{ color: color }}
      >
        {hasColon ? <><span className="font-bold">{prefix}</span>{suffix}</> : prefix}
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Area */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative group">
            {!isPlaying ? (
              <button
                onClick={() => setIsPlaying(true)}
                className="w-full h-full relative"
                aria-label={`Regarder ${episode.title}`}
              >
                <img
                  src={episode.thumbnail}
                  alt={`Miniature ${episode.title}`}
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-brand-secondary border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${episode.videoId}?autoplay=1`}
                title={episode.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
        </div>

        {/* Description & Link Area */}
        <div className="flex flex-col justify-between w-full">
          <div>

            <p className="text-stone-600 leading-relaxed text-left md:text-justify mb-4">
              {episode.description}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

const AccueilContent: React.FC<ContentComponentProps> = ({ titleClass, pClass, color }) => (
  <>
    <PageTitle className={titleClass} color={color}>Bienvenue sur Maman chercheuse !</PageTitle>
    <Paragraph className={pClass}>
      La recherche, c’est trop compliqué ? Les sciences, c’est réservé aux hommes ? <br /> <b>Maman Chercheuse prouve le contraire.</b>
    </Paragraph>
    <Paragraph className={pClass}>
      Cette chaîne de vulgarisation rend accessibles des thématiques de recherche scientifique menées par des femmes, à travers des vidéos graphiques et ludiques. Chaque épisode est conçu en collaboration avec une chercheuse experte du sujet.
    </Paragraph>
    <Paragraph className={pClass}>
      <b>L’objectif :</b> rendre la recherche accessible à toutes et tous et valoriser les femmes scientifiques.
    </Paragraph>
    <Paragraph className={pClass}>
      Chaque épisode prend la forme d’un dialogue entre une mère chercheuse et sa fille. Accessibles dès 13-14 ans, les vidéos s’adressent au grand public, petits et grands. Portée par la voix d’une petite fille, Maman Chercheuse entend aussi inspirer les jeunes, et en particulier les jeunes filles, à se projeter dans les sciences.
    </Paragraph>

    <div className={`mt-8 flex flex-col items-center gap-4 ${pClass}`}>
      <h3 className="text-2xl font-handwriting" style={{ color }}>Retrouvez-nous sur les réseaux :</h3>
      <div className="flex gap-6 items-center justify-center">
        <a
          href="https://www.youtube.com/@MamanChercheuse"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110 hover:rotate-3 duration-300"
          title="YouTube"
        >
          <img src="/images/logo_youtube.png" alt="YouTube" className="h-16 w-auto drop-shadow-sm invert" />
        </a>
        <a
          href="https://www.linkedin.com/company/maman-chercheuse/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110 hover:-rotate-3 duration-300"
          title="LinkedIn"
        >
          <img src="/images/logo_linkedin.png" alt="LinkedIn" className="h-16 w-auto drop-shadow-sm invert" />
        </a>
        <a
          href="https://www.instagram.com/maman_chercheuse/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110 hover:rotate-3 duration-300"
          title="Instagram"
        >
          <img src="/images/logo_instagram.png" alt="Instagram" className="h-16 w-auto drop-shadow-sm invert" />
        </a>
      </div>
    </div>
  </>
);

const EpisodesContent: React.FC<ContentComponentProps> = ({ titleClass, pClass, color }) => (
  <>
    <PageTitle className={titleClass} color={color}>Nos Épisodes</PageTitle>
    <div className={pClass}>
      {EPISODES.map(episode => (
        <EpisodeCard key={episode.id} episode={episode} color={color} />
      ))}
    </div>
  </>
);

const CHERCHEUSES = [
  {
    id: 1,
    name: "Valérie Marvaud",
    affiliation: "CNRS, Sorbonne Université (IPCM)",
    image: "/images/1 Marvaud.jpg",
    description: "Valérie Marvaud est directrice de recherche au CNRS à l'Institut Parisien de Chimie Moléculaire (Sorbonne Université). Elle travaille dans le domaine de la chimie inorganique supramoléculaire, en particulier la chimie de coordination avec la conception de composés hétéro-poly-métalliques. Ses thématiques de recherche portent sur les molécules à haut spin et les molécules-aimants, sur le photo-magnétisme, ainsi que sur les dendrimères magnétiques et les matériaux multifonctionnels."
  },
  {
    id: 2,
    name: "Sophie Michelis",
    affiliation: "ENS-PSL (LBM)",
    image: "/images/2 Michelis.jpg",
    description: "Sophie Michelis est docteure en chimie moléculaire. Sa thèse, réalisée au Laboratoire des Biomolécules (Département de chimie, ENS-PSL) sous la direction de Blaise Dumat et Jean-Maurice Mallet (CNRS), portait sur le développement de gouttelettes fluorescentes pour l’étude de la phagocytose. L’équipe s’inscrit dans le domaine de la chimie-biologie, à l’interface entre chimie organique et imagerie cellulaire par fluorescence, et développe notamment des sondes fluorescentes pour visualiser et analyser des processus biologiques à l’échelle cellulaire."
  },
  {
    id: 3,
    name: "Camille Paoletti",
    affiliation: "IBENS (Développement et plasticité du cerveau)",
    image: "/images/3 Paoletti.jpg",
    description: "Camille Paoletti est une doctorante au sein du laboratoire de Sonia Garel, où elle étudie le rôle des microglies — les cellules immunitaires du cerveau — dans son développement. Sonia Garel est professeure titulaire de la chaire « Neurobiologie et immunité » au Collège de France et dirige l’équipe « Développement et plasticité du cerveau » à l’Institut de biologie de l’École normale supérieure (IBENS). Ses recherches, à l’interface entre neurobiologie et immunologie, portent sur le développement des circuits neuronaux et sur la contribution des microglies à leur formation et leur plasticité."
  },
  {
    id: 4,
    name: "Mathilde Lepoitevin",
    affiliation: "ENS-PSL (IMAP)",
    image: "/images/4 Lepoitevin.jpg",
    description: "Mathilde Lepoitevin est maîtresse de conférences au Département de Chimie de l’École Normale Supérieure (ENS-PSL) au sein de l’Institut des Matériaux poreux de Paris (IMAP). Elle travaille dans le domaine de la chimie des matériaux poreux et hybrides, en particulier des Metal Organic Frameworks (MOF). Dans ses recherches, elle développe des nanoparticules de MOF pour des applications bio-médicales, la libération contrôlée de principes actifs et la conception de membranes hybrides."
  },
  {
    id: 5,
    name: "Sophie Norvez",
    affiliation: "ESPCI (C3M)",
    image: "/images/5 Norvez.jpg",
    description: "Sophie Norvez est professeure à l’ESPCI Paris-PSL, rattachée au laboratoire C3M (Chimie Moléculaire, Macromoléculaire, et Matériaux). Elle conçoit et étudie de nouveaux matériaux, comme des polymères souples et des gels. Elle a développé des caoutchoucs auto-cicatrisants, des membranes pour la purification de l’eau et pour les piles à combustible, ainsi que des hydrogels destinés à des applications biomédicales."
  },
];

const ResearcherCard: React.FC<{ researcher: typeof CHERCHEUSES[0]; color: string }> = ({ researcher, color }) => (
  <div className="bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-stone-200 shadow-sm mb-8 transition-transform hover:shadow-md">
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Image Area */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-sm relative">
          <img
            src={researcher.image}
            alt={researcher.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col w-full">
        <h3
          className="text-2xl font-handwriting mb-1"
          style={{ color: color }}
        >
          {researcher.name}
        </h3>
        <p className="text-sm font-bold text-stone-500 mb-4 font-sans uppercase tracking-wide">
          {researcher.affiliation}
        </p>
        <p className="text-stone-600 leading-relaxed text-left md:text-justify">
          {researcher.description}
        </p>
      </div>
    </div>
  </div>
);

const ChercheusesContent: React.FC<ContentComponentProps> = ({ titleClass, pClass, color }) => (
  <>
    <PageTitle className={titleClass} color={color}>Les Chercheuses</PageTitle>
    <div className={pClass}>
      <Paragraph>
        Découvrez les chercheuses dont le travail a inspiré les épisodes de "Maman chercheuse".
      </Paragraph>
      <div className="mt-8">
        {CHERCHEUSES.map(researcher => (
          <ResearcherCard key={researcher.id} researcher={researcher} color={color} />
        ))}
      </div>
    </div>
  </>
);

const AProposContent: React.FC<ContentComponentProps> = ({ titleClass, pClass, color }) => (
  <>
    <PageTitle className={titleClass} color={color}>À Propos de Nous</PageTitle>
    <Paragraph className={pClass}>
      Maman chercheuse est un projet de vulgarisation scientifique, lancé en 2024, mettant en avant les femmes dans la recherche en chimie, biologie, physique et plus encore.
    </Paragraph>
    <Paragraph className={pClass}>
      <b><u>Réalisation :</u></b> Sidonie Rosset.
    </Paragraph>
    <Paragraph className={pClass}>
      <b><u>Dessin :</u></b> Léonard Rosset.
    </Paragraph>
    <Paragraph className={pClass}>
      <b><u>Contact :</u></b> sidonie[at]maman-chercheuse.fr
    </Paragraph>
    <Paragraph className={pClass}>
      Merci à la Fondation de la Maison de la Chimie pour avoir financé ce projet, ainsi qu'à la Société de la Chimie de France pour nous avoir remis son prix de vulgarisation (section Île-de-France).
    </Paragraph>

    <div className={`mt-8 flex flex-wrap gap-8 items-center justify-center ${pClass}`}>
      <img
        src="/images/logo_fondation_maison_chimie.png"
        alt="Fondation de la Maison de la Chimie"
        className="h-20 w-auto object-contain"
      />
      <img
        src="/images/logo_scf.png"
        alt="Société Chimique de France"
        className="h-20 w-auto object-contain"
      />
    </div>
  </>
);


const PageContent: React.FC<PageContentProps> = ({ activePage, contentState }) => {
  let titleClass = 'opacity-0';
  let pClass = 'opacity-0';

  switch (contentState) {
    case 'fading-in':
      titleClass = 'animate-fade-in-title';
      pClass = 'animate-fade-in-p';
      break;
    case 'fading-out':
      titleClass = 'animate-fade-out-title';
      pClass = 'animate-fade-out-p';
      break;
    case 'visible':
      titleClass = 'opacity-100';
      pClass = 'opacity-100';
      break;
  }

  const renderContent = () => {
    const color = PAGE_COLORS[activePage];
    const props = { titleClass, pClass, color };
    switch (activePage) {
      case 'Accueil':
        return <AccueilContent {...props} />;
      case 'Épisodes':
        return <EpisodesContent {...props} />;
      case 'Chercheuses':
        return <ChercheusesContent {...props} />;
      case 'À propos':
        return <AProposContent {...props} />;
      default:
        return <AccueilContent {...props} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default PageContent;