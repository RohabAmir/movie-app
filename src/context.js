import React, {useContext, useState, useEffect} from "react";


export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [isError, setIsError] = useState({show:"false", message:""});
    const [query, setQuery] = useState("");  // This is now empty initially.
    const [initialLoad, setInitialLoad] = useState(true); // To manage the initial load.

    const getMovies = async(url) =>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovies(data.Search);
                setIsError({
                    show:"false",
                    message: ""
                })
            }else{
                setIsError({
                    show:"true",
                    message: data.Error
                })
            }
        }catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        // Trigger the initial load or any subsequent loads.
        if (initialLoad) {
            getMovies(`${API_URL}&s=batman`);
            setInitialLoad(false);  // Prevent further initial loads.
        } else {
            // When query is cleared, reload initial movies; otherwise, search for the current query.
            const searchQuery = query.trim() === "" ? "batman" : query;
            const timeout = setTimeout(() => {
                getMovies(`${API_URL}&s=${searchQuery}`);
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [query, initialLoad]);
    

    return  <AppContext.Provider value={{isLoading, isError, movies, query, setQuery}}>{children}</AppContext.Provider>
};

//Global Custom Hook
const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };