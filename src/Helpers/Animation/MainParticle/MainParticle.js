import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadImageShape } from "tsparticles-shape-image";
import assets from "../assets";
import swingImage1 from "../assets/Vector1.svg"
import swingImage2 from "../assets/Vector2.svg"




export default function MainParticle() {

  const [particleImage, setParticleImage] = useState(assets);

  async function particlesInit(engine) {
    await loadColorUpdater(engine);
    await loadCircleShape(engine);
    await loadBaseMover(engine);
    await loadSizeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadImageShape(engine);
   
  }

  return (
    <>
    <div className="swingMain">
    <div className="swingVector1">
      <img src={swingImage1} alt="2"/>
    </div>
    </div>
    <Particles
      init={particlesInit}
      options={{
        fpsLimit: 120,
        fullScreen:false,
        background: {
          "image": "url('https://s4.aconvert.com/convert/p3r68-cdx67/a6ewk-k8b0r.jpg')",
          "size":"cover",
          
        },
        particles: {
          color: { value: "#ffffff" },
          move: {
            direction: "none",
            enable: true,
            outModes: "out",
            random: false,
            speed: 0.8,
            straight: false
          },
          number: { density: { enable: true, area: 800 }, value: 20 },
          opacity: {
            value: 0.9
          },
          shape: {
            type: "image",
            image: particleImage.map(val => ({
              src : val,
            }))
          },
          size: {
            value: { min: 10, max: 50 }
          }
        }
      }}
    />
    </>
  );
}


// {
//   src:
//     "https://www.pngall.com/wp-content/uploads/10/Binance-Coin-Crypto-Logo-PNG-Background.png"
// }