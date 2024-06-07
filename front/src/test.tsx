// import React, { useState, useEffect, useCallback } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import axios from "axios";

// interface Props {
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setList: React.Dispatch<
//     React.SetStateAction<{ prompt: string | null; bot: any }[]>
//   >;
//   list: { prompt: string | null; bot: any }[];
// }

// const Chatbot: React.FC<Props> = ({
//   isLoading,
//   setIsLoading,
//   setList,
//   list,
// }) => {
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//     null
//   );
//   const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
//   const [return_audioUrl, set_return_AudioUrl] = useState<string>("");
//   const [count, setCount] = useState<number>(0);

//   const startRecording = () => {
//     SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         const recorder = new MediaRecorder(stream);
//         recorder.start();
//         setStream(stream);
//         setMediaRecorder(recorder);
//         setAudioUrl(null); // Reset audio URL
//       })
//       .catch((error) => {
//         console.error("Error accessing microphone:", error);
//       });
//   };

//   const stopRecording = useCallback(() => {
//     SpeechRecognition.stopListening();
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//     if (stream) {
//       stream.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }
//   }, [mediaRecorder, stream]);

//   const startConversation = async () => {
//     startRecording();
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/startConversation/"
//       );
//       const message = response.data.message;
//       console.log(message);
//     } catch (error) {
//       console.error("Error starting conversation:", error);
//     }
//   };

//   const endConversation = useCallback(async () => {
//     stopRecording();
//     setList([]);
//     resetTranscript();
//     setCount(0);

//     try {
//       // Send GET request to the backend
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/endConversation/"
//       );
//       // Extract message from response
//       const message = response.data.message;
//       console.log(message); // Print the message

//       // const response2 = await axios.get('http://127.0.0.1:8000/api/getSummary/');
//       // // Extract message from response
//       // const message2 = response2.data.message;
//       // console.log(message2); // Print the message
//       // // Clear conversation list and reset transcript
//     } catch (error) {
//       console.error("Error ending conversation:", error);
//     }
//   }, [resetTranscript, setList, stopRecording]);

//   // useEffect(() => {
//   //   if (listening){
//   //     const id = setInterval(() => {
//   //       setCount((count) => count + 1);
//   //     }, 1000);

//   //     if (transcript){
//   //       if(count === 3 && listening) {
//   //         clearInterval(id);
//   //         console.log(transcript);
//   //         console.log("자동 보내기");
//   //         stopRecording();
//   //         setCount(0);
//   //       };
//   //     } else{
//   //       if(count === 10 && listening) {
//   //         clearInterval(id);
//   //         console.log(transcript);
//   //         // console.log("종료");
//   //         endConversation();
//   //         setCount(0);
//   //       };
//   //     }

//   //     return () => clearInterval(id);
//   //   }
//   // }, [count, listening, transcript, endConversation, stopRecording]);

//   useEffect(() => {
//     if (listening) {
//       const id = setInterval(() => {
//         setCount((count) => {
//           const newCount = count + 1;
//           if (transcript) {
//             if (newCount === 3) {
//               clearInterval(id);
//               console.log(transcript);
//               console.log("자동 보내기");
//               stopRecording();
//               setCount(0);
//             }
//           } else {
//             if (newCount === 10) {
//               clearInterval(id);
//               console.log(transcript);
//               endConversation();
//             }
//           }
//           return newCount;
//         });
//       }, 1000);

//       return () => clearInterval(id);
//     }
//   }, [listening, transcript, endConversation, stopRecording]);

//   useEffect(() => {
//     setCount(0);
//   }, [transcript]);

//   useEffect(() => {
//     const sendMessage = async () => {
//       try {
//         if (audioUrl && transcript && transcript.trim() !== "") {
//           setList((prevList) => [
//             ...prevList,
//             { prompt: transcript, bot: null },
//           ]);

//           const formData = new FormData();
//           formData.append("text", transcript);
//           formData.append("audio", audioUrl);
//           const response = await axios.post(
//             "http://127.0.0.1:8000/api/chatbot/",
//             formData,
//             { responseType: "blob" }
//           );

//           if (response.status === 200) {
//             set_return_AudioUrl(response.data);
//           } else {
//             console.error("Failed to get audio file:", response.statusText);
//           }

//           resetTranscript();
//         }
//       } catch (error) {
//         console.error("Error sending data:", error);
//       }
//     };

//     if (audioUrl) {
//       sendMessage();
//     }
//   }, [audioUrl, resetTranscript, setList, transcript]);

//   useEffect(() => {
//     if (listening && mediaRecorder) {
//       mediaRecorder.ondataavailable = (e) => {
//         setAudioUrl(e.data);
//       };
//     }
//   }, [listening, mediaRecorder]);

//   useEffect(() => {
//     if (return_audioUrl) {
//       const audioBlob = new Blob([return_audioUrl], { type: "audio/wav" });
//       const url = URL.createObjectURL(audioBlob);
//       const audioElement = new Audio(url);

//       audioElement.setAttribute("crossorigin", "anonymous");

//       // Wait for the audio to be fully loaded before playing
//       audioElement.addEventListener("canplaythrough", () => {
//         audioElement
//           .play()
//           .then(() => {
//             // Playback started successfully
//           })
//           .catch((error) => {
//             console.error("Error playing audio:", error);
//           });
//       });
//       // Handle audio loading errors
//       audioElement.addEventListener("error", (error) => {
//         console.error("Error loading audio:", error);
//       });

//       audioElement.addEventListener("ended", () => {
//         setTimeout(() => {
//           startRecording(); // Start recording after a delay
//         }, 3000); // 3-second delay
//       });
//     }
//   }, [return_audioUrl]);

//   return (
//     <div>
//       <p>
//         <button onClick={startConversation}>대화 시작</button>
//       </p>
//       <p>
//         <button onClick={endConversation}>대화 종료</button>
//       </p>
//       <p>입력: {transcript}</p>
//       <p>timer: {count}</p>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { localInstance } from "./api/axios/axiosInstance";

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setList: React.Dispatch<
    React.SetStateAction<{ prompt: string | null; bot: any }[]>
  >;
  list: { prompt: string | null; bot: any }[];
  isChatActive: boolean;
}

const Chatbot: React.FC<Props> = ({
  isLoading,
  setIsLoading,
  setList,
  list,
  isChatActive,
}) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
  const [return_audioUrl, set_return_AudioUrl] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [timerId, setTimerId] = useState<number | null>(null); // 타이머 아이디를 상태로 관리
  const [postId, setPostId] = useState<number | null>(null);

  const startRecording = () => {
    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setStream(stream);
        setMediaRecorder(recorder);
        setAudioUrl(null); // Reset audio URL
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
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

  const startConversation = async () => {
    startRecording();
    try {
      const response = await localInstance.get(
        "http://127.0.0.1:8000/api/startConversation/"
      );
      // const response = await axios.get('http://127.0.0.1:8000/api/startConversation/');
      // const message = response.data.message;
      setPostId(response.data.id);
      // console.log(message); 
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const endConversation = useCallback(async () => {
    stopRecording();
    setList([]);
    resetTranscript();
    setCount(0);
    if (timerId) { // timerId가 존재할 때만 clearInterval 호출
      clearInterval(timerId);
    }
    try {
      const url = 'http://127.0.0.1:8000/conv/posts/update/'
      const response = await localInstance.put(url + postId + '/', null,{});
      const message = response.data.message;
      console.log(message);
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  }, [resetTranscript, setList, stopRecording, timerId]);

  useEffect(() => {
    if (listening) {
      const id = setInterval(() => {
        setCount((count) => {
          const newCount = count + 1;
          if (transcript) {
            if (newCount === 2) {
              clearInterval(id);
              console.log(transcript);
              console.log("자동 보내기");
              stopRecording();
              setCount(0);
            }
          } else {
            if (newCount === 10) {
              clearInterval(id);
              console.log(transcript);
              endConversation();
            }
          }
          return newCount;
        });
      }, 1000);
      setTimerId((id: number | null) => id); // 타이머 아이디 설정
      return () => clearInterval(id);
    }
  }, [listening, transcript, endConversation, stopRecording, timerId]);

  useEffect(() => {
    setCount(0)
  }, [transcript])

  useEffect(() => {
    const sendMessage = async () => {
      try {
        if (audioUrl && transcript && transcript.trim() !== '') {
          setList(prevList => [...prevList, { prompt: transcript, bot: null }]);
          const formData = new FormData();
          formData.append('text', transcript);
          formData.append("audio", audioUrl);
          const response = await localInstance.post(
            "http://127.0.0.1:8000/api/chatbot/",
            formData,
            { responseType: "blob" }
          );
          if (response.status === 200) {
            set_return_AudioUrl(response.data);
          } else {
            console.error('Failed to get audio file:', response.statusText);
          }
          resetTranscript();
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    if (audioUrl) {
      sendMessage();
    }
  }, [audioUrl, resetTranscript, setList, transcript]);

  useEffect(() => {
    if (listening && mediaRecorder) {
      mediaRecorder.ondataavailable = (e) => {
        setAudioUrl(e.data);
      };
    }
  }, [listening, mediaRecorder]);

  useEffect(() => {
    if (return_audioUrl) {
      const audioBlob = new Blob([return_audioUrl], { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(url);
      audioElement.setAttribute('crossorigin', 'anonymous');
      audioElement.addEventListener('canplaythrough', () => {
        audioElement.play().then(() => {
          // Playback started successfully
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      });
      audioElement.addEventListener('error', (error) => {
        console.error('Error loading audio:', error);
      });
      audioElement.addEventListener('ended', () => {
        setTimeout(() => {
          startRecording();
        }, 3000);
      });
    }
  }, [return_audioUrl]);
  useEffect(() => {
    if (isChatActive) {
      startConversation();
    } else if (!isChatActive) {
      endConversation();
    }
  }, [isChatActive]);

  return (
    <>
      {isChatActive && (
        <div>
          {/* <p>
            <button onClick={startConversation}>대화 시작</button>
          </p>
          <p>
            <button onClick={endConversation}>대화 종료</button>
          </p> */}
          <p>입력: {transcript}</p>
          <p>timer: {count}</p>
        </div>
      )}
    </>
  );
};

export default Chatbot;
