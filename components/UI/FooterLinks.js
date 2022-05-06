import React from "react";
import { IconContext } from "react-icons";
import { FaTwitter, FaGithub, FaLinkedin, FaGlobeEurope } from "react-icons/fa";

function FooterLinks() {
  const linkClasses = "flex items-center gap-1";
  return (
    <ul className="flex gap-2 text-sm">
      <IconContext.Provider value={{ size: "1.5rem" }}>
        <li className={linkClasses}>
          <FaTwitter />
          <a
            href="https://twitter.com/eduard_gavrila"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </li>
        <li className={linkClasses}>
          <FaGithub />
          <a
            href="https://github.com/edy-gavrila"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
        <li className={linkClasses}>
          <FaLinkedin />
          <a
            href="https://www.linkedin.com/in/eduard-gavrila-129951136/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li className={linkClasses}>
          <FaGlobeEurope />
          <a
            href="https://edy-gavrila.github.io/Portfolio/"
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        </li>
      </IconContext.Provider>
    </ul>
  );
}

export default FooterLinks;
