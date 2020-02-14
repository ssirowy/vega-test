import React, { useState } from "react";
import { Vega } from "react-vega";
import Select from "react-select";
import InputRange from "react-input-range";
import {
  AppGrid,
  Card,
  Channel,
  Fields,
  Group,
  Header,
  HeaderGroup,
  HeaderTitle,
  Heading,
  Label,
  Main,
  PositionChannel,
  SideBar
} from "./components";

import {
  channel,
  dataSetForName,
  dataSetsOptionsFromDataSets,
  defaultSpec,
  fieldOptionsForSchema,
  positionChannel,
  markOptions,
} from "./lib";

import { useChannel, usePositionChannel } from './hooks'

import "react-input-range/lib/css/index.css";

import { dataSets } from "./data";

export const App = () => {

  const dataSetOptions = dataSetsOptionsFromDataSets(dataSets)

  const [dataSetOption, setDataSetOption] = useState(dataSetOptions[0])

  const {data, schema} = dataSetForName(dataSets, dataSetOption.value)

  const [selectedMark, setMarkOption] = useState(markOptions[0]);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(100);

  const [xChannel, setXChannel] = usePositionChannel(schema)
  const [yChannel, setYChannel] = usePositionChannel(schema)

  const [colorChannel, setColorChannel] = useChannel(schema)
  const [sizeChannel, setSizeChannel] = useChannel(schema)
  const [shapeChannel, setShapeChannel] = useChannel(schema)
  const [tooltipChannel, setTooltipChannel] = useChannel(schema)

  const fieldOptions = fieldOptionsForSchema(schema);

  const spec = {
    ...defaultSpec(),
    mark: selectedMark && selectedMark.value,
    width,
    height,
    data,
    encoding: {
      x: positionChannel(xChannel),
      y: positionChannel(yChannel),
      color: channel(colorChannel),
      shape: channel(shapeChannel),
      size: channel(sizeChannel),
      tooltip: channel(tooltipChannel)
    }
  };

  return (
    <AppGrid>
      <Header>
        <HeaderGroup>
          <Select
            value={dataSetOption}
            onChange={setDataSetOption}
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
        <Heading>Settings</Heading>
        <Group>
          <Label>Width</Label>
          <InputRange
            maxValue={600}
            minValue={50}
            value={width}
            onChange={setWidth}
          />
        </Group>
        <Group>
          <Label>Height</Label>
          <InputRange
            maxValue={600}
            minValue={50}
            value={height}
            onChange={setHeight}
          />
        </Group>
      </SideBar>
      <Main>
        <Card>
          <Vega spec={spec} />
        </Card>
      </Main>
    </AppGrid>
  );
};
