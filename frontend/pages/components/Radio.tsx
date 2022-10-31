import React from "react";
import firebaseCollection from "../../../firebaseCollection";

export interface IRadioItem {
    name: string;
    value: firebaseCollection;
}

interface IRadioProps {
    items: IRadioItem[];
    // onChange: (value: firebaseCollection) => void;
}

export default function Radio(props: IRadioProps) {
    return (
        <>
            {props.items.map((item, index) => (
                <div key={`radio-${index}`}>
                    <label htmlFor="collection">{item.name}</label>
                    <input
                        type="radio"
                        id={`collection-${index}`}
                        name="collection"
                        value={item.value}
                        defaultChecked={index === 0}
                        // onClick={() => props.onChange(item.value)}
                    />
                </div>
            ))}
        </>
    );
}
