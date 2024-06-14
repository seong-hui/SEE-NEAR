import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styled from "styled-components";
import { axiosChatbotAudio, axiosChatbotDefault, axiosPostCreate, axiosPostUpdate } from "./api/axios/axiosCustom";


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

const Chatbot: React.FC<Props> = ({
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
  const [timerId, setTimerId] = useState<number | null>(null);
  const [postId, setPostId] = useState<number | null>(null);

  const startRecording = () => {
    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setCount(0);
        setStream(stream);
        setMediaRecorder(recorder);
        setAudioUrl(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const stopRecording = useCallback(() => {
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
    const data = await axiosPostCreate()
    setPostId(data.id);
  }, [setPostId]);

  const endConversation = useCallback(async () => {
    resetTranscript();
    if (timerId) {
      clearInterval(timerId);
    }
    try {
      if (postId){
        const data = await axiosPostUpdate(postId);
        setPostId(null);
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, [postId, resetTranscript, timerId]);

  const sendMessage = useCallback(async () => {
    try {
      if (audioUrl && transcript && transcript.trim() !== '') {
        const textData = await axiosChatbotDefault(transcript, audioUrl);
        const audioData = await axiosChatbotAudio()
        setReturnText(textData.text);
        set_return_AudioUrl(audioData);
        resetTranscript();
      }
    } catch (error) {
      console.error(error);
    }
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
          } else {
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
    setCount(0)
  }, [transcript])

  useEffect(() => {
    if (listening && mediaRecorder) {
      mediaRecorder.ondataavailable = (e) => {
        setAudioUrl(e.data);
      };
    }
  }, [listening, mediaRecorder]);

  useEffect(() => {
    if (audioUrl) {
      sendMessage();
    }
  }, [audioUrl])

  useEffect(() => {
    if (return_audioUrl) {
      setIsRecording(false);
      const audioBlob = new Blob([return_audioUrl], { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(url);
      audioElement.setAttribute('crossorigin', 'anonymous');
      audioElement.addEventListener('canplaythrough', () => {
        audioElement.play().then(() => {
          // Playback started successfully
        }).catch((error) => {
          console.error(error);
        });
      });
      audioElement.addEventListener('error', (error) => {
        console.error(error);
      });
      audioElement.addEventListener('ended', () => {
        setTimeout(() => {
          startRecording();
          setIsRecording(true);
        }, 1000);
      });
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

export default Chatbot;
