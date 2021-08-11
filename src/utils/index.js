import React from "react";
import { Heading, IllustratedMessage, Content } from "@adobe/react-spectrum";

const renderEmptyState = () => {
  return (
    <IllustratedMessage>
      <Heading>No results</Heading>
      <Content>No results found</Content>
    </IllustratedMessage>
  );
};

export { renderEmptyState };
