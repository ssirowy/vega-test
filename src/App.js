import React, { useState } from "react";
import styled from 'styled-components'
import Select from "react-select";

import {
  AppGrid,
  Channel,
  Fields,
  Group,
  Header,
  HeaderGroup,
  HeaderTitle,
  Heading,
  Label,
  PositionChannel,
  SideBar,
  SwapButton,
  VisualizationWindow
} from "./components";

import {
  channel,
  dataSetForName,
  dataSetsOptionsFromDataSets,
  defaultSpec,
  fieldOptionsForSchema,
  positionChannel,
  markOptions
} from "./lib";

import { useChannel, usePositionChannel } from "./hooks";

import "react-input-range/lib/css/index.css";

import { dataSets } from "./data";

export const App = () => {
  const dataSetOptions = dataSetsOptionsFromDataSets(dataSets);

  const [dataSetOption, setDataSetOption] = useState(dataSetOptions[0]);

  const { data, schema } = dataSetForName(dataSets, dataSetOption.value);

  const [selectedMark, setMarkOption] = useState(markOptions[0]);

  const [xChannel, setXChannel, clearX] = usePositionChannel(schema);
  const [yChannel, setYChannel, clearY] = usePositionChannel(schema);

  const [colorChannel, setColorChannel, clearColor] = useChannel(schema);
  const [sizeChannel, setSizeChannel, clearSize] = useChannel(schema);
  const [shapeChannel, setShapeChannel, clearShape] = useChannel(schema);
  const [tooltipChannel, setTooltipChannel, clearTooltip] = useChannel(schema);

  const fieldOptions = fieldOptionsForSchema(schema);

  const swap = () => {
    setXChannel.all(yChannel)
    setYChannel.all(xChannel)
  }

  const spec = {
    ...defaultSpec(),
    mark: selectedMark && selectedMark.value,
    data,
    encoding: {
      x: positionChannel(xChannel),
      y: positionChannel(yChannel),
      color: channel(colorChannel),
      shape: channel(shapeChannel),
      size: channel(sizeChannel),
      tooltip: channel(tooltipChannel)
    },
  };

  const handelDataSetChange = (option) => {
    setDataSetOption(option)

    clearX(); clearY(); clearColor(); clearSize(); clearShape(); clearTooltip()
  }

  return (
    <AppGrid>
      <Header>
        <HeaderGroup>
          <Select
            value={dataSetOption}
            onChange={handelDataSetChange}
            options={dataSetOptions}
            isSearchable
          />
        </HeaderGroup>
        <HeaderTitle>Visualization builder</HeaderTitle>
        <HeaderGroup />
      </Header>
      <Fields>
        <Heading>Build</Heading>
        <PositionChannel
          channel={xChannel}
          setChannel={setXChannel}
          fieldOptions={fieldOptions}
          schema={schema}
          name="X"
        />
        <SwapButtonContainer>
         <SwapButton onClick={swap} />
        </SwapButtonContainer>
        <PositionChannel
          channel={yChannel}
          setChannel={setYChannel}
          fieldOptions={fieldOptions}
          schema={schema}
          name="Y"
        />
        <Channel
          channel={colorChannel}
          setChannel={setColorChannel}
          fields={fieldOptions}
          name="Color"
        />
        <Channel
          channel={sizeChannel}
          setChannel={setSizeChannel}
          fields={fieldOptions}
          name="Size"
        />
        <Channel
          channel={shapeChannel}
          setChannel={setShapeChannel}
          fields={fieldOptions}
          name="Shape"
        />
        <Channel
          channel={tooltipChannel}
          setChannel={setTooltipChannel}
          fields={fieldOptions}
          name="Tooltip"
        />
        <Group>
          <Label>Mark</Label>
          <Select
            value={selectedMark}
            onChange={setMarkOption}
            options={markOptions}
            placeholder="Choose a mark"
          />
        </Group>
      </Fields>
      <SideBar>
        <Heading>Chart Style</Heading>
        <ChartStyle>
          Fill me in later
        </ChartStyle>
      </SideBar>
      <VisualizationWindow visualizationSpecification={spec} />
    </AppGrid>
  );
};

const ChartStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  height: 100%;
`

const SwapButtonContainer = styled.div`
  display: flex; 
  justify-content: center;
  margin-top: -24px;
  margin-bottom: -24px;
`
