import { FaLinkedinIn, FaGithub, FaPinterest } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiSubstack } from "react-icons/si";
import quote1Image from "../../assets/quote1.jpeg";
import "./MainContent.css";

interface Tile {
  id: string;
  type: "quote" | "read-listen" | "socials";
  title?: string;
  content?: string;
  imageUrl?: string;
  links?: Array<{ name: string; url: string; icon?: string }>;
}

const dummyData: {
  personalPitch: string;
  tiles: Tile[];
} = {
  personalPitch:
    "Hi, I'm Meredith Heller, a growth-minded software engineer obsessed with building products users actually come back to. Grounded in empathy and ambition, I turn bold ideas into lasting user value.",
  tiles: [
    {
      id: "quote",
      type: "quote",
      imageUrl: quote1Image,
    },
    {
      id: "read-listen",
      type: "read-listen",
      title: "What's inspiring me",
      content: "The Design of Everyday Things",
    },
    {
      id: "socials",
      type: "socials",
      links: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/meredith-heller/" },
        { name: "GitHub", url: "https://github.com/meredithheller" },
        { name: "Substack", url: "https://substack.com/@meredithheller" },
        { name: "Instagram", url: "https://www.instagram.com/meredithaheller/" },
        { name: "Pinterest", url: "https://www.pinterest.com/meredithaheller/" },
        { name: "ShopMy", url: "https://shopmy.us/shop/meredithheller?tab=collections" },
      ],
    },
  ],
};

export function MainContent() {
  const { personalPitch, tiles } = dummyData;

  return (
    <div className="main-content">
      <div className="main-content-inner">
        {/* Personal Pitch */}
        <div className="personal-pitch">
          <p className="personal-pitch-text">{personalPitch}</p>
        </div>

        {/* Tiles */}
        <div className="tiles-container">
          {tiles
            .filter((tile) => tile.type === "quote")
            .map((tile) => (
              <div key={tile.id} className={`tile tile-${tile.type}`}>
                {tile.imageUrl && (
                  <img
                    src={tile.imageUrl}
                    alt="Inspirational quote"
                    className="tile-image"
                  />
                )}
              </div>
            ))}
          <div className="tiles-bottom-row">
            {tiles
              .filter((tile) => tile.type !== "quote")
              .map((tile) => (
                <div key={tile.id} className={`tile tile-${tile.type}`}>
                  {tile.type === "read-listen" && (
                    <div className="tile-content">
                      {tile.title && <h3 className="tile-title">{tile.title}</h3>}
                      {tile.content && <p className="tile-text">{tile.content}</p>}
                    </div>
                  )}
                  {tile.type === "socials" && tile.links && (
                    <div className="tile-content">
                      <h3 className="tile-title">Connect</h3>
                      <div className="socials-list">
                        {tile.links.map((link) => {
                          let IconComponent;
                          if (link.name === "LinkedIn") {
                            IconComponent = FaLinkedinIn;
                          } else if (link.name === "GitHub") {
                            IconComponent = FaGithub;
                          } else if (link.name === "Substack") {
                            IconComponent = SiSubstack;
                          } else if (link.name === "Instagram") {
                            IconComponent = AiFillInstagram;
                          } else if (link.name === "Pinterest") {
                            IconComponent = FaPinterest;
                          }

                          return (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-link"
                              aria-label={link.name}
                            >
                              {IconComponent ? (
                                <IconComponent className="social-icon" />
                              ) : (
                                <span className="social-icon-shopmy">SM</span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

