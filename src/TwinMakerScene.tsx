import React, { useState, useEffect } from 'react';
import { initialize } from '@iot-app-kit/source-iottwinmaker';
import { SceneViewer } from '@iot-app-kit/scene-composer';
import { fromCognitoIdentity } from "@aws-sdk/credential-providers";
import { IoTTwinMakerClient } from '@aws-sdk/client-iottwinmaker';

const TwinMakerScene = () => {
    const [sceneLoader, setSceneLoader] = useState<any>(null);
    const [queries, setQueries] = useState([]);
    const [viewport, setViewport] = useState({
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date()
    });

    useEffect(() => {
        const credentials = fromCognitoIdentity({
            identityId: "us-west-2:6707b039-990a-495c-a23f-c8a039eb9617",
            // ... (other required parameters if any)
        });

        const iotTwinMakerClient = new IoTTwinMakerClient({
            region: 'us-west-2',
            credentials,
        });

        const { s3SceneLoader } = initialize('2023_twin', {
            awsCredentials: credentials,
            awsRegion: 'us-west-2',
            iotTwinMakerClient,
        });

        setSceneLoader(s3SceneLoader('C302'));
    }, []);

    if (!sceneLoader) {
        return <div>Loading...</div>;
    }

    return (
        <SceneViewer
            sceneLoader={sceneLoader}
            queries={queries}
            viewport={viewport}
        />
    );
}

export default TwinMakerScene;



