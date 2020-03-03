import React, { useState } from "react";

import styled from "styled-components";

export const FieldMenu = () => {

    const fields = [
      {
        name: "Date",
        description: "Date description"
      },
      {
        name: "Precipitation",
        description: "Precipitation description"
      },
      {
        name: "Temp max",
        description: "Temp max description"
      }
    ];
  const [field, setField] = useState(fields[0]);

  return (
    <FieldMenuWrapper>
      <SearchInput placehodler="Search fields" />
      <SplitPanes>
        <FieldPane>
          <Fields>
            {fields.map((field, index) => (
              <Field key={index} onMouseEnter={() => setField(field)}>
                {field.name}
              </Field>
            ))}
          </Fields>
        </FieldPane>
        <ValuesPane>
          <FieldHeader>
            <FieldTitle>{field.name}</FieldTitle>
            <FieldType>Metric</FieldType>
          </FieldHeader>
          <FieldDescription>{field.description}</FieldDescription>
          <SampleDataContainer>
            <SampleDataTitle>Sample data</SampleDataTitle>
          </SampleDataContainer>
        </ValuesPane>
      </SplitPanes>
    </FieldMenuWrapper>
  );
};

const SearchInput = styled.input`
  font-size: 13px;
  height: 36px;
  width: 100%;
`;

const SplitPanes = styled.div`
  display: flex;
`;

const Pane = styled.div`
 // flex-grow: 1;
  padding: 4px;
  width: 50%;
`;

const FieldPane = styled(Pane)`
  border-right: 1px solid #e3e3e3;
`;

const FieldType = styled.div`
  color: #707781;
  font-size: 11px;  
  text-transform: uppercase;
`
const FieldHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const SampleDataContainer = styled.div`
  background-color: #FBFBFC;
`

const SampleDataTitle = styled.div`
  color: #939BA5;
  font-size: 11px;
`

const Fields = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const Field = styled.li`
  border-left: 2px solid #e0f2ff;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 28px;
  padding-left: 8px;
  &:hover {
    background-color: #f7fcff;
    border-left: 2px solid #0059b3;
  }
`;

const ValuesPane = styled(Pane)``;

const FieldTitle = styled.div`
  font-size: 18px;
`;

const FieldDescription = styled.div`
  font-size: 12px;
  line
`

const FieldMenuWrapper = styled.div`
  background-color: white;
  border: 1px solid #dee1e5;
  border-radius: 0px 4px 4px 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 16px 16px 0 16px;
  width: 500px;
  z-index: 1;
`;
