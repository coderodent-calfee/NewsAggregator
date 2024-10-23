import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetButton from './components/GetButton';
import Menu from './components/Menu';

function App() {
    const [count, setCount] = useState(0)
    const [data, setData] = useState({});

    // communications between child components pass through here
    const handleSearchResults = (data)=>{
        setData({ data: data });
    };
    
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <GetButton />
                    <Menu searchResults={handleSearchResults} data={data} />
            </div>
        </>
    )
}

export default App
