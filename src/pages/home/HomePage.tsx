import config from "../../secret"

const HomePage: React.FC = () => {
    const test = config.GOOGLE_CLIENT_ID
    return (
        <div>
            {test}
        </div>
    )
}

export default HomePage