import './App.css';
import {useEffect, useState} from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {
    const [visitorId, setVisitorId] = useState(null);

    useEffect(() => {
        (async () => {
            const agent = await FingerprintJS.load();
            const fingerprint = await agent.get();
            setVisitorId(fingerprint.visitorId);
            console.log(fingerprint);
        })();
    }, []);

    return (
        <div className="App">
            <h1>Welcome!</h1>
            {/*<label>Enter your username</label><br/>*/}
            {/*<input type="text" name="username" />*/}
            {visitorId ? (
                <p>Your visitor ID is <br/>{ visitorId }</p>
            ) : (
                <p>We are currently detecting your browser's fingerprint.</p>
            )}
        </div>
    );
}

export default App;
