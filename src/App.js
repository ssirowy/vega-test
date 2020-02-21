import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import Modal from "react-modal";

import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import last from "lodash/last";

import {
  AddButton,
  AppGrid,
  ButtonGroup,
  Channel,
  FieldContent,
  Fields,
  Group,
  Header,
  HeaderGroup,
  HeaderTitle,
  Heading,
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

import { useChannel, usePositionChannel } from "./hooks";

import "react-input-range/lib/css/index.css";

import { dataSets as initialDataSets } from "./data";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export const App = () => {

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

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [importDataString, setImportData] = React.useState("")

  const fieldOptions = fieldOptionsForSchema(schema);

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

  const importData = () => {
    const dataSet = dataSetFromString(importDataString)
    const newDataSets = [...dataSets, dataSet]
    const newOptions = dataSetsOptionsFromDataSets(newDataSets)
    setDataSets(newDataSets)
    setDataSetOptions(newOptions)

    handelDataSetChange(last(newOptions))
    setImportData("")
    closeModal()
  }

  const handleDataImportChange = event => setImportData(event.target.value)

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
        <ButtonGroup>
          <AddButton onClick={openModal} />
        </ButtonGroup>
      </Header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Import data"
      >
        <Heading>Import data</Heading>
        <TextArea value={importDataString} onChange={handleDataImportChange} />
        <button onClick={importData}>Import</button>
      </Modal>
      <Fields>
        <FieldContent>
          <Heading>Variables</Heading>
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

const ChartStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  height: 100%;
`;

const TextArea = styled.textarea`
  height: 400px;
  width: 600px;
`

const SwapButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -24px;
  margin-bottom: -24px;
`;
