import React from "react";
import styled from "styled-components";
import axios from "axios";

import firebaseCollection from "../../../firebaseCollection";
import Radio from "./Radio";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Field = styled.div`
    margin-bottom: 1rem;
`;

interface IUploadFormProps {}

function UploadForm(props: IUploadFormProps) {
    const [files, setFiles] = React.useState<FileList | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFiles(event.target.files);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const body = new FormData();
        // @ts-ignore
        body.append("collection", event.target.collection.value);

        if (files) {
            for (var i = 0; i < files.length; i++) {
                body.append(`file-${i}`, files[i]);
            }
        }

        const res = await axios.post("/api/upload", body);
        const result = await res.data;
        alert(`Result: ${result.data}`);
    };

    return (
        <Form method="post" onSubmit={onSubmit} encType="multipart/form-data">
            <Field>
                <label>Type</label>
                <Radio
                    items={[
                        { name: "Tom", value: firebaseCollection.tom },
                        {
                            name: "Screm",
                            value: firebaseCollection.screm,
                        },
                    ]}
                />
            </Field>

            <Field>
                <label htmlFor="upload">Choose a file:</label>
                <input
                    type="file"
                    id="upload"
                    name="files"
                    onChange={onFileChange}
                    multiple
                    required
                />
            </Field>
            <input type="submit" value="Submit" />
        </Form>
    );
}

export default UploadForm;
