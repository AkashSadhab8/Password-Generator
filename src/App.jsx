import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%^&*-_~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-[80%] md:w-[60%] flex flex-col items-center justify-center shadow-md rounded-lg py-8 p-6 sm:p-12 gap-8 bg-dark text-orange-500 font-semibold">
          <h1 className="text-3xl font-extrabold text-center ">
            Password Generator
          </h1>
          <div className="flex shadow rounded-full overflow-hidden ">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-3 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className=" bg-blue-700 text-white px-4 font-extrabold"
            >
              COPY
            </button>
          </div>
          <div className="flex flex-col gap-3 items-start justify-start md:grid md:grid-cols-4 text-sm md:gap-x-2">
            <div className="flex flex-row-reverse md:flex-row items-center gap-x-2 col-span-2">
              <input
                type="range"
                min={8}
                max={40}
                value={length}
                className="h-1 w-16 md:w-24 rounded-full cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-2 col-span-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-2 col-span-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full border-t border-solid flex items-center flex-col lg:flex-row lg:justify-between border-dark px-6 py-6 lg:px-32 text-dark">
        <span>{new Date().getFullYear()} &copy;&nbsp;All Rights Reserved.</span>
        <div className="py-3">
          Built with ❤️ by&nbsp;
          <a href="/" target="_blank" className="hover:text-primary ">
            akashcreation
          </a>
        </div>
        <a
          href="https://www.instagram.com/mr_sadhab/"
          target="_blank"
          className="hover:text-primary"
        >
          Say Hello!👋🏼
        </a>
      </footer>
    </>
  );
}

export default App;
