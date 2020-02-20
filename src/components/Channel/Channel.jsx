import React from 'react'
import Select from "react-select";
import { Label } from '../Label'
import { InsetContainer } from '../InsetContainer'
import { Group } from '../Group'

import { typeForField } from '../../lib'


export const Channel = ({ channel, setChannel, name, fields, schema }) => {

    const isQuantitative = channel.field && typeForField(schema, channel.field.value).type === "number";
    const handleBinChange = event => setChannel.bin(event.target.checked)

    return (
        <Group>
            <Label>{name} by </Label>
            <Select
                value={channel.field}
                onChange={setChannel.field}
                options={fields}
                placeholder="a selected field"
                isSearchable
                isClearable
            />
            {
                channel.field && (
                    <InsetContainer>
                        <Select
                            value={channel.type}
                            onChange={setChannel.type}
                            options={channel.typeOptions}
                        />
                        {isQuantitative && (
                            <div><input type="checkbox" checked={channel.bin} onChange={handleBinChange} /> Bin?</div>
                        )}
                    </InsetContainer>
                )
            }
        </Group>
    )
}
