import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styled from "styled-components";

interface Props {
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
    isViewActive: boolean;
    setIsViewActive: React.Dispatch<React.SetStateAction<boolean>>;
    isRecording: boolean;
    setIsRecording : React.Dispatch<React.SetStateAction<boolean>>;
    returnText: string;
    setReturnText : React.Dispatch<React.SetStateAction<string>>;
}

const ChatbotDev: React.FC<Props> = ({
    isChatActive,
    setIsChatActive,
    isViewActive,
    setIsViewActive,
    isRecording,
    setIsRecording,
    returnText,
    setReturnText,
}) => {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
    const [return_audioUrl, set_return_AudioUrl] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const [timerId, setTimerId] = useState<number | null>(null); // 타이머 아이디를 상태로 관리
    const [postId, setPostId] = useState<number | null>(null);

    const startRecording = () => {
        console.log("RECORDING START")
        SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
            const recorder = new MediaRecorder(stream);
            recorder.start();
            setCount(0);
            setStream(stream);
            setMediaRecorder(recorder);
            setAudioUrl(null); // Reset audio URL
        })
        .catch((error) => {
        console.error(error);
        });
    };

    const stopRecording = useCallback(() => {
        console.log("RECORDING STOP");
        SpeechRecognition.stopListening();
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        if (stream) {
            stream.getTracks().forEach((track) => {
            track.stop();
            });
        }
    }, [mediaRecorder, stream]);

    const startConversation = useCallback(async () => {
    try {
        console.log("POST CREATE API CALL");
        setPostId(1);
    } catch (error) {
        console.error(error);
    }
    }, [setPostId]);

    const endConversation = useCallback(async () => {
        resetTranscript();
        if (timerId) { // timerId가 존재할 때만 clearInterval 호출
            clearInterval(timerId);
        }
        try {
            if (postId) {
                console.log("POST UPDATE API CALL");
                setPostId(null);
            }
        } catch (error) {
            console.error(error);
        }
    }, [postId, resetTranscript, timerId]);

    const sendMessage = useCallback(async () => {
        try {
            if (audioUrl && transcript && transcript.trim() !== '') {
                console.log("CHATBOT TEXT API CALL")
                setReturnText("안녕하세요. 챗봇 응답 메시지 입니다")

                console.log("CHATBOT AUDIO API CALL")
                set_return_AudioUrl(return_audioUrl + "A");
                resetTranscript();
            }
        } catch (error) {
            console.error(error);
        };
    }, [resetTranscript, transcript, audioUrl]);

    useEffect(() => {
        if (listening) {
            const id = setInterval(() => {
                setCount((count) => {
                    const newCount = count + 1;
                    if (transcript) {
                        if (newCount === 2) {
                            clearInterval(id);
                            stopRecording();
                        }
                    } else if (!transcript) {
                        if (newCount === 10) {
                            clearInterval(id);
                            setIsChatActive(false);
                            setIsViewActive(false);
                            setIsRecording(false);
                        }
                    }
                    return newCount;
                });
            }, 1000);
            setTimerId((id: number | null) => id); // 타이머 아이디 설정
            return () => clearInterval(id);
        }
    }, [listening, transcript, count]);

    useEffect(() => {
        setCount(0);
    }, [transcript])

    useEffect(() => {
        if (listening && mediaRecorder) {
            mediaRecorder.ondataavailable = (e) => {
                setAudioUrl(e.data);
            };
        };
    }, [listening, mediaRecorder]);

    useEffect(() => {
    if (audioUrl) {
        sendMessage();
    }
    }, [audioUrl])

    useEffect(() => {
    if (return_audioUrl) {
        setIsRecording(false);
        console.log("AUDIO PLAY")
        setTimeout(() => {
            startRecording();
            setIsRecording(true);
        }, 3000);
    }
    }, [return_audioUrl]);

    useEffect(() => {
    if (isChatActive) {
        startConversation();
        startRecording();
        setIsRecording(true);
    } else if (!isChatActive) {
        stopRecording();
        setIsRecording(false);
        endConversation();
    }
    }, [isChatActive]);

    return (
    <>
        {isViewActive && (
            <TranscriptStyled>
                {isRecording ? (<p>{transcript}</p>) : (<p>{returnText}</p>)}
            </TranscriptStyled>
        )}
    </>
    );
};

const TranscriptStyled = styled.div`
font-size: 24px;
`

export default ChatbotDev;