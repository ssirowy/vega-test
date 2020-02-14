import React from 'react'
import Select from "react-select";
import { Label } from '../Label'
import { InsetContainer } from '../InsetContainer'
import { Group } from '../Group'

export const Channel = ({ channel, setChannel, name, fields }) => {
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
                    </InsetContainer>
                )
            }
        </Group>
    )
}
