import React, { useState } from "react";
import { Establishment } from "../types/Establishment.types";
import "../assets/scss/App.scss";
import { Admin, User } from "../types/User.types";

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

  console.log("children", children);

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
              <li key={child._id}>
                {/* Render image if photo exists */}
                {/* {child.photoUrls && (
                  <img
                    src={child.photoUrls || "https://via.placeholder.com/200"}
                    alt={child.name || "User photo"}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                )} */}

                {/* Render name and email conditionally */}
                {child.name && child.email
                  ? `${child.name}, ${child.email}`
                  : child.name
                  ? child.name
                  : child.email}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CollapsibleSection;
