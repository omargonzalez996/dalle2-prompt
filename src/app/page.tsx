"use client";
import { OpenAIApi } from "openai";
import { configuration } from "./api/route";
import React, { useState } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";

const openai = new OpenAIApi(configuration);

function Page() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const GenerateImage = async () => {
    setLoading(true);
    console.log("Generating...");
    if (!prompt) {
      setLoading(false);
      return console.log("you need a prompt");
    }
    try {
      const aiResponse = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });

      const imageUrl = aiResponse.data.data[0].url;

      setImage(String(imageUrl));
      setPrompt("");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div id="main-cont">
      <div id="logo-container">
        <Image id="logo" src={logo} alt="logo" />
      </div>
      <div id="form-container">
        <div id="formulario">
          <textarea
            id="input-prompt"
            placeholder="escribe tu prompt"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
          <div id="button-container">
            <button id="button-gen" onClick={(e) => GenerateImage(e)}>
              {loading ? "Loading..." : "Generate image"}
            </button>
          </div>
          {image && (
            <>
              <img className="result-image" src={image} alt="ai-generated" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
