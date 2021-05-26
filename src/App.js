import './App.css';
import {useEffect, useState} from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const users = {
    'karl': '8c20fbeb78deaf5ad84080cfa48c0dd8',
    'john': 'e4105e5a4b313300a6776f41740dd0cc',
    'mike': 'e87855e1bc64d3bfa9300ed97d2c47e9',
};

function App() {
    const [visitorId, setVisitorId] = useState(null);
    const [valid, setValid] = useState(null);

    useEffect(() => {
        (async () => {
            const agent = await FingerprintJS.load();
            const fingerprint = await agent.get();
            setVisitorId(fingerprint.visitorId);
            console.log(fingerprint);
        })();
    }, []);

    const checkUserId = (e) => {
        if (e.target.value && users[e.target.value]) {
            setValid(users[e.target.value] === visitorId);
        } else {
            setValid(null);
        }
    }

    return (
        <div className="App">
            <h1>Welcome!</h1>
            <label>Enter your username</label><br/>
            <input type="text" name="username" onChange={checkUserId}/>
            {valid === true ? (
                <p>Your username matches your visitor ID!</p>
            ) : valid === false ? (
                <p>Your username <strong>does not</strong> match your visitor ID. We'll need additional verification.</p>
            ) : (
                <p>Enter your username to check your fingerprint.</p>
            )}
        </div>
    );
}

export default App;
