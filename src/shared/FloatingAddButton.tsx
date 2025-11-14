import React from "react";
import { Link } from "react-router-dom";

export default function FloatingAddButton({ link = "/add" }: { link?: string }) {
  return (
    <Link to={link} className="fab" title="Add">
      ＋
    </Link>
  );
}
