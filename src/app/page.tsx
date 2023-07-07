"use client";
import React, { useState } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";
function Page() {
  const [prompt, setPrompt] = useState("");

  const Submitter = async (e: any) => {
    e.preventDefault();
    console.log(prompt);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div id="main-cont">
      <div id="logo-container">
        <Image id="logo" src={logo} alt="logo" />
      </div>
      <div id="form-container">
        <form onSubmit={(e) => Submitter(e)} id="formulario">
          <textarea
            id="input-prompt"
            placeholder="escribe tu prompt"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
          <div id="button-container">
            <button id="button-gen">Generar Imagen</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
