import Head from "next/head";

interface SeoProps {
    title: string;
}

const Seo = ({title}: SeoProps) => {
    const titleMessage = `${title} | Next 푸드`;
    return (
        <Head>
            <title>{titleMessage}</title>
        </Head>
    )
}

export default Seo;