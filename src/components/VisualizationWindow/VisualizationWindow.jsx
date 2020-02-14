import React from "react";
import { Vega } from "react-vega";
import ContainerDimensions from "react-container-dimensions";

import { Card, Main } from "./components";

export const VisualizationWindow = ({ visualizationSpecification }) => {
  return (
    <Main>
      <ContainerDimensions>
        {({ width, height }) => {
          const spec = {
            ...visualizationSpecification,
            height: height * 0.8,
            width: width * 0.8
          };
          return (
            <Card>
              <Vega spec={spec} />
            </Card>
          );
        }}
      </ContainerDimensions>
    </Main>
  );
};
