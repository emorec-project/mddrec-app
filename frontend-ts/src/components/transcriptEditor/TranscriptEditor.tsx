//@ts-ignore
import { TranscriptEditor } from "@bbc/react-transcript-editor"
import React, { useState } from "react";

import {
  loadLocalSavedData,
  isPresentInLocalStorage,
  localSave
} from "./local-storage.ts";
//@ts-ignore
import style from "./TranscriptEditor.css";
import DEMO_TRANSCRIPT from "../../data/transcriptExampleData.json"

const DEMO_TITLE ="TED Talk | Kate Darling - Why we have an emotional connection to robots"
const DEMO_MEDIA_URL = "https://download.ted.com/talks/KateDarling_2018S-950k.mp4"

const TEditor = ({transcriptJson,videoLink,videoTitle}) => {
  const [data,setData] = useState({
    transcriptData: transcriptJson,
    mediaUrl: videoLink,
    isTextEditable: true,
    spellCheck: false,
    sttType: "bbckaldi",
    // analyticsEvents: [],
    title: videoTitle,
    fileName: "",
    autoSaveData: {},
    autoSaveContentType: "draftjs",
    autoSaveExtension: "json"
  })
  const transcriptEditorRef = React.createRef()
  const loadDemo = () => {
    if(isPresentInLocalStorage(DEMO_MEDIA_URL)){
      const transcriptDataFromLocalStorage = loadLocalSavedData(DEMO_MEDIA_URL)
      const newData = {...data}
      newData.transcriptData = transcriptDataFromLocalStorage
      newData.mediaUrl = DEMO_MEDIA_URL
      newData.title = DEMO_TITLE
      newData.sttType = 'draftjs'
      //@ts-ignore
      setData(newData);
    }
    else{
      const newData = {...data}
      newData.transcriptData = DEMO_TRANSCRIPT
      newData.mediaUrl = DEMO_MEDIA_URL
      newData.title = DEMO_TITLE
      newData.sttType = 'bbckaldi'
      //@ts-ignore
      setData(newData);
    }
   
  };

  const handleLoadMedia = files => {
    const file = files[0];
    const videoNode = document.createElement("video");
    const canPlay = videoNode.canPlayType(file.type);

    if (canPlay) {
      const fileURL = URL.createObjectURL(file);
      const newData = {...data}
      newData.mediaUrl = fileURL
      newData.fileName = file.name
      //@ts-ignore
      setData(newData);
    } else {
      alert("Select a valid audio or video file.");
    }
  };

  const handleLoadMediaUrl = () => {
    const fileURL = prompt("Paste the URL you'd like to use here:");
    const newData = {...data}
    newData.mediaUrl = fileURL
    //@ts-ignore
    setData(newData);
  };

  const handleLoadTranscriptJson = files => {
    const file = files[0];

    if (file.type === "application/json") {
      const fileReader = new FileReader();
      
      fileReader.onload = event => {
        //@ts-ignore
        console.log(JSON.parse(event.target.result))
        const newData = {...data}
        //@ts-ignore
        newData.transcriptData = JSON.parse(event.target.result)
        //@ts-ignore
        setData(newData);
      };

      fileReader.readAsText(file);
    } else {
      alert("Select a valid JSON file.");
    }
  };

  const handleIsTextEditable = e => {
    const newData = {...data}
    newData.isTextEditable = e.target.checked
    setData(newData);
  };


  const handleSpellCheck = e => {
    const newData = {...data}
    newData.spellCheck = e.target.checked
    setData(newData);
  };

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
    const newData = {...data}
    newData.title = newTitle
    //@ts-ignore
    setData(newData);
  };

  const handleChangeTranscriptName = value => {
    const newData = {...data}
    newData.fileName = value
    //@ts-ignore
    setData(newData);
  };

  const handleAutoSaveChanges = newAutoSaveData => {
    // console.log("handleAutoSaveChanges", newAutoSaveData);
    const newData = {...data}
    newData.autoSaveData = newAutoSaveData.data
    newData.autoSaveExtension = newAutoSaveData.ext
    //@ts-ignore
    setData(newData);
    console.log(newAutoSaveData.data)
    // Saving to local storage 
    //TODO: parse newData and save it the the mongo doc
    // localSave(newAutoSaveData.data.mediaUrl, newAutoSaveData.data.fileName, newAutoSaveData.data);
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
            onChange={e => handleLoadTranscriptJson(e.target.files)}
          />
          <label htmlFor="transcriptFile">From Computer</label>
          {data.transcriptData !== null ? (
            <label className={style.fileNameLabel}>Transcript loaded.</label>
          ) : null}
        </section>

        <section className={style.demoNavItem}>
          {/* <label className={style.sectionLabel}>Export Transcript</label> */}
          
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
        // handleAnalyticsEvents={handleAnalyticsEvents}
        title={data.title}
        ref={transcriptEditorRef}
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

