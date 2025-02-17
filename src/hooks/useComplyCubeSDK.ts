import {useEffect} from "react";
import {useRequestVerificationMutation} from "../store/verification/api.ts";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../store";

declare global {
    interface Window {
        ComplyCube: any;
    }
}

export function useComplyCubeSDK(containerId: string, token?: string) {
    const [requestVerification] = useRequestVerificationMutation()
    const history = useHistory()
    const sessionId = useSelector((state: RootState) => state.auth.sessionId)
    useEffect(() => {
        let complyCube: any
        if (!token) return
        const initializeComplyCube = () => {
            complyCube = window.ComplyCube.mount({
                token,
                containerId,
                stages: [
                    'intro',
                    'documentCapture',
                    {
                        name: 'faceCapture',
                        options: {
                            mode: 'photo'
                        }
                    },
                    'completion'
                ],
                onComplete: function(data: {
                    "documentCapture": {
                        "documentId": string,
                        "documentType": string
                    },
                    "faceCapture": {
                        "livePhotoId": string
                    }
                }) {
                    requestVerification({
                        documentId: data.documentCapture.documentId,
                        documentType:  data.documentCapture.documentType,
                        livePhotoId: data.faceCapture.livePhotoId
                    })
                },
                onModalClose: function() {
                    history.push(`/verification/${sessionId}/status`)
                },
                onError: function ({ type, message }: any) {
                    if (type === 'token_expired') {

                    } else {
                        console.error(message);
                    }
                }
            });
        };

        if (!window.ComplyCube) {
            const script = document.createElement('script');
            script.src = 'https://assets.complycube.com/web-sdk/v1/complycube.min.js';
            script.async = true;
            script.onload = initializeComplyCube;
            document.body.appendChild(script);
        } else {
            initializeComplyCube();
        }


        return () => {
            complyCube?.unmount?.()

            const script = document.querySelector('script[src*="complycube.js"]');
            if (script) {
                script.remove();
                delete window.ComplyCube;
            }
        };
    }, [token, sessionId]);
}