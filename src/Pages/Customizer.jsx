  import React, { useState, useEffect } from 'react';
  import { AnimatePresence, motion } from 'framer-motion';
  import config from '../config/config';
  import state from '../Store';
  import { downloadCanvasToImage, reader } from '../config/helpers';
  import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
  import { fadeAnimation, slideAnimation } from '../config/motion';
  import { AIPicker } from '../Components/AIPicker';
  import { ColorPicker } from '../Components/ColorPicker'
  import { FilePicker } from '../Components/FilePicker.jsx'
  import { Tab } from '../Components/Tab';
  import Index from '../../Canvas/index.jsx';
  import { useSelector } from 'react-redux';

  const Customizer = () => {
    
    const theme = useSelector((state) => state.theme.mode);
    const [file, setFile] = useState('');

    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
      logoShirt: true,
      stylishShirt: false,
    })

    // show tab content depending on the activeTab
    const generateTabContent = () => {
      switch (activeEditorTab) {  
        case "colorpicker":
          return <ColorPicker />
        case "filepicker":
          return <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        case "aipicker":
          return <AIPicker 
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        default:
          return null;
      }
    }

    const handleSubmit = async (type) => {
      if(!prompt) return alert("Please enter a prompt");

      try {
        setGeneratingImg(true);

        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt,
          })
        })

        const data = await response.json();

        handleDecals(type, `data:image/png;base64,${data.data[0].b64_json}`);

      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false);
        setActiveEditorTab("");
      }
    }

    const handleDecals = (type, result) => {
      const decalType = DecalTypes[type];

      state[decalType.stateProperty] = result;

      if(!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab)
      }
    }

    const handleActiveFilterTab = (tabName) => {
      switch (tabName) {
        case "logoShirt":
            state.isLogoTexture = !activeFilterTab[tabName];
          break;
        case "stylishShirt":
            state.isFullTexture = !activeFilterTab[tabName];
          break;
        default:
          state.isLogoTexture = true;
          state.isFullTexture = false;
          break;
      }

      // after setting the state, activeFilterTab is updated

      setActiveFilterTab((prevState) => {
        return {
          ...prevState,
          [tabName]: !prevState[tabName]
        }
      })
    }

    const readFile = (type) => {
      reader(file)
        .then((result) => {
          handleDecals(type, result);
          setActiveEditorTab("");
        })
    }

    return (
      <AnimatePresence>
        
          <div   className={`${
          theme === "dark" ? "bg-texture bg-gray-900 text-white " : "bg-texture"
        }`}>
            <motion.div
              key="custom"
              className="absolute top-0 left-0 z-10 "
              {...slideAnimation('left')}
            >
              <div className="flex items-center min-h-screen">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Tab 
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}

                  {generateTabContent()}
                </div>
              </div>
            </motion.div>
            <motion.div
              className='filtertabs-container'
              {...slideAnimation("up")}
            >
              {FilterTabs.map((tab) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}
            </motion.div>
            <Index className='Customizer'/>
          </div>
      </AnimatePresence>
    )
  }

  export default Customizer