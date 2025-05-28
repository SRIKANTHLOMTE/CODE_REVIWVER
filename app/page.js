"use client";
import Image from "next/image";

import Editor from "react-simple-code-editor";
import rehypeHighlight from "rehype-highlight"
import { useEffect ,useState,useRef} from "react";
import 'prismjs/themes/prism-tomorrow.css';
import Markdown from "react-markdown";
import Prism from "prismjs";
import linkdin from "@/public/linkdin.svg"
import Up from "@/public/up.svg"
export default function Home() {
   const [code, setCode] = useState("Enter Your Code here...");
   const [chat, setchat] = useState("")
   const [prompt, setprompt] = useState("")
   const [mode, setmode] = useState("Simple")
   const [airesponse, setairesponse] = useState('');
   useEffect(() => {
    Prism.highlightAll(); 
  }, [code]);
  useEffect(() => {
    Prism.highlightAll(); 
  }, [airesponse]);
  const askai=async(e)=>{
       e.preventDefault()

       const data ={
        prompt:code+prompt,
        mode:mode
       }
        setprompt("Analyzing....")
        try {
           const res=await fetch("http://localhost:3000/api/ai-response",{
          credentials:"include",
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
       }) 
       const response=await res.json();
       if(response.success){
           console.log(response);
              setairesponse(response.data);
              setprompt("Responded")
       }else{
        alert("Some eroor occured");
        setprompt("Error Occured")
       }
        }
        catch(e) {
          alert("Server is Busy")
          setprompt("Try Reloading")
        }
  }
  return (
    <>
      <div className="bg-slate-800 h-[92vh] text-white flex justify-around p-2 max-[550px]:flex-col">
        <div className="w-[49%] max-[550px]:w-full hover:shadow-purple-600 shadow-md h-full overflow-y-auto custom-scrollbar rounded-md bg-slate-700">
  
       <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.javascript, "javascript")
        }
        padding={10}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 15,
          overflowY: "auto", 
          border:"0px",      
          width: "100%",
          color: "#f8f8f2", 
          backgroundColor: "transparent",
          outline:"none",
          boxShadow:"none"
        }}
      />
        
        </div>
        <div className="w-[49%] max-[550px]:w-full hover:shadow-pink-500 shadow-md rounded-md h-full bg-slate-600">
          <div className="h-[86%] overflow-y-auto  no-scroll text-wrap">
    
          <div className="p-2 text-xl whitespace-pre-wrap break-words w-full">
             {
              airesponse.length==0?(
                <>
                 <p className="text-4xl text-center font-serif max-[750px]:text-2xl">Welcome to the AI Code Reviewer</p>
              <p className="text-center font-sans">Select the mode before sending response</p>
              <p className="text-center font-sans">Feel Free to Contribute</p>
                </>
              ):(
                <Markdown
                rehypePlugins={[rehypeHighlight]}
                >{airesponse}</Markdown>
              )
             }
          </div>


          <div className="absolute bottom-4 w-[49%] max-[550px]:w-[97%] flex items-center justify-center">
           <div  className="rounded-md bg-gray-400 w-[90%] p-1 gap-2 hover:shadow-purple-700 shadow-md text-wrap">
           <textarea
  id="auto-resize-textarea "
  rows={1} 
  placeholder="Type your text here..."
  value={prompt}
  className="w-full p-2 pb-1 rounded-md  outline-none resize-none overflow-auto text-slate-900 placeholder:text-slate-600 bg-gray-400 leading-relaxed max-h-[10rem]"
  onInput={(e) => {
    e.target.style.height = 'auto'; 
    e.target.style.height = `${e.target.scrollHeight}px`;
  }}
  onChange={(e)=>setprompt(e.target.value)}
></textarea>

         <div className="flex justify-between">
            <select onChange={(e)=>setmode(e.target.value)} className="text-slate-300 cursor-pointer font-bold font-sans rounded-md outline-none bg-slate-600" id="">
              <option value="Simple">Simple</option>
              <option value="Sarcastic">Sarcastic</option>
              <option value="Professional">Professional</option>
              <option value="Dude">Dude</option>
            </select>
             <Image
            src={Up}
            height={16}
            width={35}
            onClick={askai}
            alt="send"
            className="rounded-lg bg-slate-500  hover:invert hover:cursor-pointer hover:bg-yellow-50"
            >

            </Image>
         </div>
          
           </div>
          </div>

          </div>
        </div>
      </div>
    </>
  );
}
