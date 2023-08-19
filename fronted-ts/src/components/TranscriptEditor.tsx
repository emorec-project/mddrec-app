//@ts-ignore
import { TranscriptEditor } from "@bbc/react-transcript-editor"
//@ts-ignore
import sttJsonAdapter from "@bbc/react-transcript-editor/sttJsonAdapter"

import React from 'react'
import DEMO_TRANSCRIPT from "../temp_data/transcriptExampleData.json"
const DEMO_TITLE ="TED Talk | Kate Darling - Why we have an emotional connection to robots"
const DEMO_MEDIA_URL = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4"

const TEditor = () => {
  console.log(DEMO_TRANSCRIPT)
  return (
    <>
      <h1>Transcript Editor</h1>
      <TranscriptEditor
        transcriptData={DEMO_TRANSCRIPT}
        mediaUrl={DEMO_MEDIA_URL}
        isEditable={true}
        sttJsonType={"bbckaldi"}
        title={DEMO_TITLE}
        mediaType={ 'video' }
      />
    </>
  );
};

export default TEditor;
