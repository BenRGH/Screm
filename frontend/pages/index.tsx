import Head from "next/head";
import React from "react";
import styled from "styled-components";

import UploadForm from "./components/UploadForm";

const Container = styled.div`
    padding: 0 2rem;
`;

const Main = styled.div`
    min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function Home() {
    return (
        <Container>
            <Head>
                <title>Screm Upload</title>
                <meta name="description" content="Upload page for Screm bot" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Main>
                <h1>Screm Bot Upload</h1>
                <UploadForm />
            </Main>
        </Container>
    );
}
