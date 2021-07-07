import { useEffect, useState } from "react";
import { getCombos } from '../helpers/getCombos';

export const useFetchCombos = () => {
    
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect( () => {

        getCombos()
            .then(lista => {

                setState({
                    data: lista,
                    loading: false
                });

            })

    }, []);

    return state;

}