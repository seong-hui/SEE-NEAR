import React, { useState } from "react";

interface PromptData {
  prompt: string | null;
  bot: any;
}

type SetListFunction = React.Dispatch<React.SetStateAction<PromptData[]>>;
type SetLoeadingFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface PromptSubmitProps {
  setList: SetListFunction;
  list: PromptData[];
  isloading: boolean;
  setIsLoading: SetLoeadingFunction;
}

const PromptSubmit: React.FC<PromptSubmitProps> = ({
  list,
  setList,
  isloading,
  setIsLoading,
}) => {
  const [prompt, setPrompt] = useState<string | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/talk/", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setList([...list, { prompt, bot: data }]);
      console.log(list);
      setIsLoading(false);
      setPrompt(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 w-full mb-1">
      <form onSubmit={submitHandler} className="relative">
        {isloading && (
          <label className="bg-[#d2cfcf] text-white px-2 w-full">
            Asking...
          </label>
        )}
        <input
          className="w-full py-3 pl-2 pr-[50px] outline-none rounded-b-sm"
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Enter prompt"
        />
        <button
          disabled={isloading}
          type="submit"
          className="absolute right-4 bottom-0 top-0"
        ></button>
      </form>
    </div>
  );
};

export default PromptSubmit;
