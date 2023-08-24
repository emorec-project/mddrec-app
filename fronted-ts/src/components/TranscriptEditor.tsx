//@ts-ignore
import { TranscriptEditor } from "@bbc/react-transcript-editor"
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  loadLocalSavedData,
  isPresentInLocalStorage,
  localSave
} from "./local-storage.ts";
import DEMO_TRANSCRIPT from "../temp_data/transcriptExampleData.json"
//@ts-ignore
import style from "./TranscriptEditor.css";
// const style = require("./index.module.scss")

const DEMO_TITLE ="TED Talk | Kate Darling - Why we have an emotional connection to robots"
const DEMO_MEDIA_URL = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4"

const TEditor = () => {
  console.log(DEMO_TRANSCRIPT)
  const [data,setData] = useState({
    transcriptData: null,
    mediaUrl: null,
    isTextEditable: true,
    spellCheck: false,
    sttType: "bbckaldi",
    title: "",
    fileName: "",
    autoSaveData: {},
    autoSaveContentType: "draftjs",
    autoSaveExtension: "json"
  })
  
  const loadDemo = () => {
    if(isPresentInLocalStorage(DEMO_MEDIA_URL)){
      const transcriptDataFromLocalStorage = loadLocalSavedData(DEMO_MEDIA_URL)
      //@ts-ignore
      setData({
        transcriptData: transcriptDataFromLocalStorage,
        mediaUrl: DEMO_MEDIA_URL,
        title: DEMO_TITLE,
        sttType: 'draftjs'
      });
    }
    else{
      //@ts-ignore
      setData({
      transcriptData: DEMO_TRANSCRIPT,
        mediaUrl: DEMO_MEDIA_URL,
        title: DEMO_TITLE,
        sttType: "bbckaldi"
      });
    }
   
  };

  const handleLoadMedia = files => {
    const file = files[0];
    const videoNode = document.createElement("video");
    const canPlay = videoNode.canPlayType(file.type);

    if (canPlay) {
      const fileURL = URL.createObjectURL(file);
      //@ts-ignore
      setData({
        // transcriptData: DEMO_TRANSCRIPT,
        mediaUrl: fileURL,
        fileName: file.name
      });
    } else {
      alert("Select a valid audio or video file.");
    }
  };

  const handleLoadMediaUrl = () => {
    const fileURL = prompt("Paste the URL you'd like to use here:");
    //@ts-ignore
    setData({
      // transcriptData: DEMO_TRANSCRIPT,
      mediaUrl: fileURL
    });
  };

  // const handleLoadTranscriptJson = files => {
  //   const file = files[0];

  //   if (file.type === "application/json") {
  //     const fileReader = new FileReader();

  //     fileReader.onload = event => {
  //       //@ts-ignore
  //       setData({
  //         transcriptData: JSON.parse(event.target.result)
  //       });
  //     };

  //     fileReader.readAsText(file);
  //   } else {
  //     alert("Select a valid JSON file.");
  //   }
  // };

  const handleIsTextEditable = e => {
    //@ts-ignore
    setData({
      isTextEditable: e.target.checked
    });
  };


  const handleSpellCheck = e => {
    //@ts-ignore
    setData({
      spellCheck: e.target.checked
    });
  };

  
  const handleSttTypeChange = event => {
    //@ts-ignore
    setData({ [event.target.name]: event.target.value });
  };

  const handleExportFormatChange = event => {
    console.log(event.target.name, event.target.value);
    //@ts-ignore
    setData({ [event.target.name]: event.target.value });
  };

  // const exportTranscript = () => {
  //   console.log("export");
  //   // eslint-disable-next-line react/no-string-refs
  //   const { data, ext } = this.transcriptEditorRef.current.getEditorContent(
  //     data.exportFormat
  //   );
  //   let tmpData = data;
  //   if (ext === "json") {
  //     tmpData = JSON.stringify(data, null, 2);
  //   }
  //   if (ext !== "docx") {
  //     //@ts-ignore
  //     download(tmpData, `${data.mediaUrl}.${ext}`);
  //   }
  // };

  // https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
  const download = (content, filename, contentType) => {
    console.log("download");
    const type = contentType || "application/octet-stream";
    const link = document.createElement("a");
    const blob = new Blob([content], { type: type });

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    // Firefox fix - cannot do link.click() if it's not attached to DOM in firefox
    // https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    console.info("Cleared local storage.");
  };

 

  const handleChangeTranscriptTitle = newTitle => {
    //@ts-ignore
    setData({
      title: newTitle
    });
  };

  const handleChangeTranscriptName = value => {
    //@ts-ignore
    setData({ fileName: value });
  };

  const handleAutoSaveChanges = newAutoSaveData => {
    console.log("handleAutoSaveChanges", newAutoSaveData);
    const { data, ext } = newAutoSaveData;
    //@ts-ignore
    setData({ autoSaveData: data, autoSaveExtension: ext });
    // Saving to local storage 
    localSave(data.mediaUrl, data.fileName, data);
  };

  return (
    <div className={style.container}>
      
      <div className={style.demoNav}>
        <section className={style.demoNavItem}>
          <label className={style.sectionLabel}>Start</label>
          <button
            className={style.demoButton}
            onClick={() => loadDemo()}
          >
            Load Demo
          </button>
        </section>

        <section className={style.demoNavItem}>
          <label className={style.sectionLabel}>Load Media</label>
          <button onClick={() => handleLoadMediaUrl()}> From URL</button>
          <input
            type={"file"}
            id={"mediaFile"}
            onChange={e => handleLoadMedia(e.target.files)}
          />
          <label htmlFor="mediaFile">From Computer</label>
          {data.fileName !== "" ? (
            <label className={style.fileNameLabel}>
              {data.fileName}
            </label>
          ) : null}
        </section>

        <section className={style.demoNavItem}>
          <label className={style.sectionLabel}>Load Transcript</label>
          

          <input
            type={"file"}
            id={"transcriptFile"}
            // onChange={e => handleLoadTranscriptJson(e.target.files)}
          />
          <label htmlFor="transcriptFile">From Computer</label>
          {data.transcriptData !== null ? (
            <label className={style.fileNameLabel}>Transcript loaded.</label>
          ) : null}
        </section>

        <section className={style.demoNavItem}>
          <label className={style.sectionLabel}>Export Transcript</label>
          
          {/* <button onClick={() => exportTranscript()}>Export File</button> */}
        </section>

        <section className={style.demoNavItem}>
          <label className={style.sectionLabel}>
            Transcript Title
            <span className={style.titleLabel}>(Optional)</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={e => handleChangeTranscriptTitle(e.target.value)}
          />
        </section>

        <section className={style.demoNavItem}>
          <label className={style.sectionLabel}>Options</label>

          <div className={style.checkbox}>
            <label
              className={style.editableLabel}
              htmlFor={"textIsEditableCheckbox"}
            >
              Text Is Editable
            </label>
            <input
              id={"textIsEditableCheckbox"}
              type="checkbox"
              checked={data.isTextEditable}
              onChange={handleIsTextEditable}
            />
          </div>

          <div className={style.checkbox}>
            <label
              className={style.editableLabel}
              htmlFor={"spellCheckCheckbox"}
            >
              Spell Check
            </label>
            <input
              id={"spellCheckCheckbox"}
              type="checkbox"
              checked={data.spellCheck}
              onChange={handleSpellCheck}
            />
          </div>

          <button
            className={style.warningButton}
            onClick={() => clearLocalStorage()}
          >
            Clear Local Storage
          </button>
        </section>
      </div>

      <TranscriptEditor
        transcriptData={data.transcriptData}
        fileName={data.fileName}
        mediaUrl={data.mediaUrl}
        isEditable={data.isTextEditable}
        spellCheck={data.spellCheck}
        sttJsonType={data.sttType}
        title={data.title}
        // ref={this.transcriptEditorRef}
        handleAutoSaveChanges={handleAutoSaveChanges}
        autoSaveContentType={data.autoSaveContentType}
        mediaType={ 'video' }
      />



      <section style={{ height: "250px", width: "50%", float: "right" }}>
        <h3>
          Auto Save data:{" "}
          <code>
            {data.autoSaveContentType}| {data.autoSaveExtension}
          </code>
        </h3>
        <textarea
          style={{ height: "100%", width: "100%" }}
          //@ts-ignore
          value={
            data.autoSaveExtension === "json"
              ? JSON.stringify(data.autoSaveData, null, 2)
              : data.autoSaveData
          }
          disabled
        />
      </section>
    </div>
  );
  // return (
  //   <>
  //     <h1>Transcript Editor</h1>
  //     <TranscriptEditor
  //       transcriptData={DEMO_TRANSCRIPT}
  //       mediaUrl={DEMO_MEDIA_URL}
  //       isEditable={true}
  //       sttJsonType={"bbckaldi"}
  //       title={DEMO_TITLE}
  //       mediaType={ 'video' }
  //     />
  //   </>
  // );
};

export default TEditor;

