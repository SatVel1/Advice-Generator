import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

const App = () => {

    const[myAdvice, state] = useState([])
    const[prevAdvice, prevState] = useState([''])
    const [initial, firstNum] = useState([0])

    //   Executes at the render of the component
    useEffect(() => {
        fetchAdvice();
    }, []);

    const fetchAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {
                const { advice } = response.data.slip

                if(initial == 0){
                    prevState(advice);
                    firstNum(1);
                }

                if (prevAdvice == advice){
                    fetchAdvice();
                    console.log("Advice" + advice);
                    console.log("Prev Advice" + prevAdvice);
                }

                state(advice);
                prevState(advice);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className='app'>
            <div className='card'>
                <h1 className='heading'>{myAdvice}</h1>
                <button className="glow-on-hover" type="button" onClick={fetchAdvice}>GENERATE ADVICE</button>
            </div>
        </div>
    )
}

export default App
