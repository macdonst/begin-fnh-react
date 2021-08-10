import React from "react";
import { Link as RSLink } from "@adobe/react-spectrum";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, ...props }) => {
  return (
    <RSLink isQuiet>
      <RouterLink {...props}>{children}</RouterLink>
    </RSLink>
  );
};
export default Link;
