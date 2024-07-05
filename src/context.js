import React, {useContext, useState, useEffect} from "react";


const API_URL = `https://www.omdbapi.com/?apikey=727bbdc1&s=titanic`

const AppContext = React.createContext();

const AppProvider = ({ children }) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [isError, setIsError] = useState({show:"false", message:""});

    const getMovies = async(url) =>{
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
        } catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        getMovies(API_URL);
    }, [])
    

    return  <AppContext.Provider value={{isLoading, isError, movies}}>{children}</AppContext.Provider>
};

//Global Custom Hook
const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };