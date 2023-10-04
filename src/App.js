import React from 'react';
import TwinMakerScene from './TwinMakerScene.tsx';
import './App.css';  // 필요하다면 스타일 파일을 추가하세요.

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>AWS IoT TwinMaker Demo</h1>
            </header>
            <TwinMakerScene />
        </div>
    );
}

export default App;
