import React from "react";
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
  author?: string;
  url?: string;
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
      content: "Your Boyfriend's Ex-Girlfriend",
      author: "Sithara Ranasinghe",
      url: "https://substack.com/@sitarasgarden/p-160002554",
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

  // Highlight specific words in the pitch
  const highlightWords = ["empathy", "ambition", "growth-minded"];
  const renderHighlightedText = (text: string) => {
    const words = text.split(/(\s+)/);
    return words.map((word, index) => {
      // Remove punctuation for comparison
      const cleanWord = word.replace(/[.,!?;:]/g, "").toLowerCase();
      const punctuation = word.match(/[.,!?;:]/g);
      if (highlightWords.includes(cleanWord)) {
        return (
          <React.Fragment key={index}>
            <span className="pitch-highlight">
              {word.replace(/[.,!?;:]/g, "")}
            </span>
            {punctuation && punctuation.join("")}
          </React.Fragment>
        );
      }
      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  return (
    <div className="main-content">
      <div className="main-content-inner">
        {/* Personal Pitch */}
        <div className="personal-pitch">
          <p className="personal-pitch-text">
            {renderHighlightedText(personalPitch)}
          </p>
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
              .map((tile) => {
                if (tile.type === "read-listen" && tile.url) {
                  return (
                    <a
                      key={tile.id}
                      href={tile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`tile tile-${tile.type} tile-link`}
                    >
                      <div className="tile-content">
                        {tile.title && <h3 className="tile-title">{tile.title}</h3>}
                        {tile.content && <p className="tile-text">{tile.content}</p>}
                        {tile.author && <p className="tile-author">{tile.author}</p>}
                      </div>
                    </a>
                  );
                }
                return (
                  <div key={tile.id} className={`tile tile-${tile.type}`}>
                    {tile.type === "read-listen" && (
                      <div className="tile-content">
                        {tile.title && <h3 className="tile-title">{tile.title}</h3>}
                        {tile.content && <p className="tile-text">{tile.content}</p>}
                        {tile.author && <p className="tile-author">{tile.author}</p>}
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
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

