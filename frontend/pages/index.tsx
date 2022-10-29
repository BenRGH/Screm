import Head from "next/head";
import styled from "styled-components";
import Radio from "./components/Radio";

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

const Form = styled.form`
    display: flex;
    flex-direction: column;

    input {
        margin-bottom: 1rem;
    }
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
                <Form>
                    <Radio
                        items={[
                            { name: "Tom", value: "tom" },
                            { name: "Screm", value: "screm" },
                        ]}
                    />

                    <label htmlFor="upload">Choose a file:</label>
                    <input type="file" id="upload" name="filename" />
                    <input type="submit" value="Submit" />
                </Form>
            </Main>
        </Container>
    );
}
