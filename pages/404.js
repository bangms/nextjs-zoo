const Error = ({statusCode}) => {
    return(
        <>
            <h2>
                {
                    statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'
                }
            </h2>
        </>
    )
}

// Error.getInitialProps = ({res, err}) => {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404
//     return { statusCode }
// }

export default Error