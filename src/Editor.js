import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";

import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import last from "lodash/last";

import usePromise from 'react-use-promise';

import jsonURL from "json-url"

import {
  AppGrid,
  Channel,
  FieldContent,
  Fields,
  Group,
  Header,
  HeaderGroup,
  HeaderTitle,
  Heading,
  Logo,
  PositionChannel,
  SwapButton,
  VisualizationWindow
} from "./components";

import {
  channel,
  dataSetFromString,
  dataSetForName,
  dataSetsOptionsFromDataSets,
  defaultSpec,
  fieldOptionsForSchema,
  positionChannel,
  markOptions
} from "./lib";

import { useChannel, usePositionChannel, useQueryParam } from "./hooks";

import "react-input-range/lib/css/index.css";

import { dataSets as initialDataSets } from "./data";

export const Editor = () => {

  const queryParamData = useQueryParam('data')

  const [dataJSON] = usePromise(
    () => {
      if (queryParamData) {
        return jsonURL('lzw').decompress(queryParamData)
      }
      else {
        return new Promise(resolve => resolve(""))
      }
    },
    [queryParamData]
  );

  const [dataSets, setDataSets] = useState(initialDataSets)
  const [dataSetOptions, setDataSetOptions] = useState(dataSetsOptionsFromDataSets(dataSets))
  const [dataSetOption, setDataSetOption] = useState(dataSetOptions[0]);

  const { data, schema } = dataSetForName(dataSets, dataSetOption.value);

  const [selectedMark, setMarkOption] = useState(markOptions[0]);

  const [xChannel, setXChannel, clearX] = usePositionChannel(schema);
  const [yChannel, setYChannel, clearY] = usePositionChannel(schema);

  const [rowChannel, setRowChannel, clearRowChannel] = useChannel(schema);
  const [columnChannel, setColumnChannel, clearColumnChannel] = useChannel(
    schema
  );

  const [colorChannel, setColorChannel, clearColor] = useChannel(schema);
  const [sizeChannel, setSizeChannel, clearSize] = useChannel(schema);
  const [shapeChannel, setShapeChannel, clearShape] = useChannel(schema);
  const [tooltipChannel, setTooltipChannel, clearTooltip] = useChannel(schema);

  const fieldOptions = fieldOptionsForSchema(schema);

  useEffect(() => {
    if (dataJSON) {
       importData(dataJSON)
    }
  }, [dataJSON]);

  const swapPositions = () => {
    setXChannel.all(yChannel);
    setYChannel.all(xChannel);
  };

  const swapTrellis = () => {
    setColumnChannel.all(rowChannel);
    setRowChannel.all(columnChannel);
  };

  const encoding = pickBy(
    {
      x: positionChannel(xChannel),
      y: positionChannel(yChannel),
      color: channel(colorChannel),
      shape: channel(shapeChannel),
      size: channel(sizeChannel),
      tooltip: channel(tooltipChannel),
      row: channel(rowChannel),
      column: channel(columnChannel)
    },
    identity
  );

  const spec = {
    ...defaultSpec(),
    mark: selectedMark && selectedMark.value,
    data,
    encoding
  };

  const handelDataSetChange = option => {
    setDataSetOption(option);

    clearX();
    clearY();
    clearColor();
    clearSize();
    clearShape();
    clearTooltip();
    clearRowChannel();
    clearColumnChannel();
  };

  const importData = (dataString) => {
    const dataSet = dataSetFromString(dataString)
    const newDataSets = [...dataSets, dataSet]
    const newOptions = dataSetsOptionsFromDataSets(newDataSets)
    setDataSets(newDataSets)
    setDataSetOptions(newOptions)

    handelDataSetChange(last(newOptions))
  }

  return (
    <AppGrid>
      <Header>
        <Flex>
          <Logo />
          <HeaderTitle>Visualization builder</HeaderTitle>
        </Flex>
        <HeaderGroup>
          <Select
            value={dataSetOption}
            onChange={handelDataSetChange}
            options={dataSetOptions}
            isSearchable
          />
        </HeaderGroup>
      </Header>
      <Fields>
        <DatasetTitle>{dataSetOption.label}</DatasetTitle>
        <FieldContent>
          <Group>
            <PositionChannel
              channel={xChannel}
              setChannel={setXChannel}
              fieldOptions={fieldOptions}
              schema={schema}
              name="Independent"
            />
            <SwapButtonContainer>
              <SwapButton onClick={swapPositions} />
            </SwapButtonContainer>
            <PositionChannel
              channel={yChannel}
              setChannel={setYChannel}
              fieldOptions={fieldOptions}
              schema={schema}
              name="Dependent"
            />
          </Group>
          <Group>
            <Heading>Facet</Heading>
            <Channel
              channel={rowChannel}
              setChannel={setRowChannel}
              fields={fieldOptions}
              schema={schema}
              name="Row"
            />
            <SwapButtonContainer>
              <SwapButton onClick={swapTrellis} />
            </SwapButtonContainer>
            <Channel
              channel={columnChannel}
              setChannel={setColumnChannel}
              fields={fieldOptions}
              schema={schema}
              name="Column"
            />
          </Group>
          <Group>
            <Heading>Visual mark</Heading>
            <Group>
              <Select
                value={selectedMark}
                onChange={setMarkOption}
                options={markOptions}
                schema={schema}
                placeholder="Choose a mark"
                isClearable
              />
            </Group>
            <Channel
              channel={colorChannel}
              setChannel={setColorChannel}
              fields={fieldOptions}
              schema={schema}
              name="Color"
            />
            <Channel
              channel={sizeChannel}
              setChannel={setSizeChannel}
              fields={fieldOptions}
              schema={schema}
              name="Size"
            />
            <Channel
              channel={shapeChannel}
              setChannel={setShapeChannel}
              fields={fieldOptions}
              schema={schema}
              name="Shape"
            />
            <Channel
              channel={tooltipChannel}
              setChannel={setTooltipChannel}
              fields={fieldOptions}
              schema={schema}
              name="Tooltip"
            />
          </Group>
        </FieldContent>
      </Fields>
      {/* <SideBar>
        <Heading>Chart Style</Heading>
        <ChartStyle>Fill me in later</ChartStyle>
      </SideBar> */}
      <VisualizationWindow visualizationSpecification={spec} />
    </AppGrid>
  );
};

const Flex = styled.div`
   display: flex;
`

const ChartStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  height: 100%;
`;

const SwapButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -24px;
  margin-bottom: -24px;
`;

const DatasetTitle = styled.div`
   color: #6C43E0;
   font-size: 20px;
   margin-left: 16px;
   margin-top: 8px;
`
