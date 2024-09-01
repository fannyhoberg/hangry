import React, { useState } from "react";
import { Establishment } from "../types/Establishment.types";
import "../assets/scss/App.scss";
import { User } from "../types/User.types";

interface CollapsibleSectionProps {
  title: string;
  children: Establishment[] | User[];
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-container">
      <button className="collapsible-header" onClick={toggleCollapse}>
        <span className="collapsible-icon">{isOpen ? "▲" : "▼"}</span>
        {title}
      </button>
      <div className={`collapsible-content ${isOpen ? "open" : ""}`}>
        <ul>
          {children &&
            children.map((child) => (
              <li key={child._id}>{child.name ? child.name : child.email}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CollapsibleSection;
