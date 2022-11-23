import Document, { Html, Head, Main, NextScript } from 'next/document'
import Default from '../Components/Default/Default'

class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx)
    //     return { ...initialProps }
    // }

    render() {

        return (
            <Html>
                <Head>
                    <meta name="description" content="inizoo" />
                    {/* Open Graph : 콘텐츠의 요약내용이 SNS에 게시되는데 최적화된 데이터를 
                가지고 갈 수 있도록 설정하는 것 */}

                    <meta property="og:type" content="website" />
                    {/* <meta property="og:url" content="https://example.com/page.html" /> */}
                    <meta property="og:title" content="inizoo" />
                    <meta property="og:locale" content="ko_KR" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                </Head>
                <body id="fade">
                    {/* <Default /> */}
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument