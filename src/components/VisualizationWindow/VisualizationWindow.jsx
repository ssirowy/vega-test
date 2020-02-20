import React from "react";
import { Vega } from "react-vega";
// import { compile } from 'vega-lite'
import ContainerDimensions from "react-container-dimensions";

import { Card, Main } from "./components";

/*
const signals = [
  {
    "name": "signal_tooltip",
    "on": [
      {"events": "shape:click", "update": "warn(datum)"}
    ]
  }
]
*/

export const VisualizationWindow = ({ visualizationSpecification }) => {

  /*
  const specWithSignals = {
    ...visualizationSpecification,
    signals,
  }

  if (visualizationSpecification) {
    const spec = compile(specWithSignals).spec
  }s
  */

  return (
    <Main>
      <ContainerDimensions>
        {({ width, height }) => {
          const spec = {
            ...visualizationSpecification,
            //height: height * 0.8,
            //width: width * 0.8
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
