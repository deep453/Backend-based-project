import { useEffect } from "react";
import api from "../api/axios";

function Home() {

    useEffect(() => {
        console.log(api.defaults.baseURL);
    }, []);

    return (
        <h1 className="text-4xl text-center mt-20">
            Home Page
        </h1>
    );
}

export default Home;