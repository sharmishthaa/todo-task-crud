import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  backTo?: string | null;
};

export default function Header({ title, backTo = "/" }: Props) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        {backTo ? (
          <Link to={backTo} className="back">
            ←
          </Link>
        ) : <div className="back-placeholder" />}
        <div className="title">{title}</div>
        <div className="right-placeholder" />
      </div>
    </header>
  );
}
