'use client'
import { useEffect } from "react";

const BACKEND_URL="http://localhost:3000"
export default function Home() {
  useEffect(()=>{
    fetch(`${BACKEND_URL}/chat`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({
        "message":"Who is Gautam Gambhir?",
        "model":"deepseek/deepseek-r1-0528-qwen3-8b:free"
      })
    })
  },[])
  return (
    <div>

    </div>
  );
}
