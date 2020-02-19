import React from 'react'
import Select from "react-select";
import { availableTimeUnits, typeForField } from '../../lib'

import { Label } from '../Label'
import { InsetContainer } from '../InsetContainer'
import { Group } from '../Group'

export const PositionChannel = ({ channel, setChannel, fieldOptions, name, schema }) => {

    const isQuantitative = channel.field && typeForField(schema, channel.field.value).type === "number";
    const isDate = channel.field && typeForField(schema, channel.field.value).type === "date";

    return (
        <Group>
            <Label>{name}</Label>
            <Select
                value={channel.field}
                onChange={setChannel.field}
                options={fieldOptions}
                isSearchable
                isClearable
            />
            {channel.field && (
                <InsetContainer>
                    {!isDate && (
                        <Select
                            value={channel.type}
                            onChange={setChannel.type}
                            options={channel.typeOptions}
                        />
                    )}
                    {isQuantitative && (
                        <Select
                            value={channel.aggregateOption}
                            onChange={setChannel.aggregateOption}
                            options={channel.aggregateOptions}
                        />
                    )}
                    {isDate && (
                        <Select
                            value={channel.timeUnitOption}
                            onChange={setChannel.timeUnitOption}
                            options={availableTimeUnits}
                        />
                    )}
                </InsetContainer>
            )}
        </Group>
    )

}