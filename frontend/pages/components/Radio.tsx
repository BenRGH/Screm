import React from "react";

export interface IRadioItem {
    name: string;
    value: string;
}

interface IRadioProps {
    items: IRadioItem[];
}

export default function Radio(props: IRadioProps) {
    return (
        <>
            {props.items.map((item, index) => (
                <>
                    <label htmlFor="upload-type">{item.name}</label>
                    <input
                        type="radio"
                        id={`upload-type-${index}`}
                        name="upload-type"
                        value={item.value}
                    />
                </>
            ))}
        </>
    );
}
