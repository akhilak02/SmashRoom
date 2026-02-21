// import React, { useState, useRef, useEffect } from "react";
// import "./index.css";

// const objects = [
//   "glass",
//   "bottle",
//   "car",
//   "person",
//   "computer",
//   "phone",
//   "robot",
// ];

// const objectImages = {
//   glass: [
//     "/images/glass/stage0.jpg",
//     "/images/glass/stage1.jpg",
//     "/images/glass/stage2.jpg",
//     "/images/glass/stage3.jpeg",
//     "/video/glass.mp4",
//   ],
//   car: [
//     "/images/car/stage0.jpeg",
//     "/images/car/stage1.jpeg",
//     "/images/car/stage2.jpeg",
//     "/images/car/stage3.jpeg",
//     "/images/car/stage4.jpeg",
//   ],
//   phone: [
//     "/images/phone/stage0.jpeg",
//     "/images/phone/stage1.jpeg",
//     "/images/phone/stage2.jpeg",
//     "/images/phone/stage3.jpeg",
//     "/images/phone/stage4.jpeg",
//   ],
//   computer: [
//     "/images/computer/stage0.jpeg",
//     "/images/computer/stage1.jpeg",
//     "/images/computer/stage2.jpeg",
//     "/images/computer/stage3.jpeg",
//     "/images/computer/stage4.jpeg",
//   ],
// };

// // Sounds
// const objectSounds = {
//   glass: "/sounds/glass_breaking.mp3",
//   car: "/sounds/car_distroy.mp3",
//   person: "/sounds/person_hit.mp3",
//   computer: "/sounds/computer_hit.mp3",
//   phone: "/sounds/phone_hit.mp3",
// };
// const hammerSound = "/sounds/hammer_swing.mp3";
// const lastStageSound = "/sounds/glass_shattered.mp3"; // only for glass
// const hammerImage = "/images/hammer/hammer.png";

// // Emoji stages
// const emojiStages = ["😡", "😤", "😱", "😄"];

// function App() {
//   const [searchText, setSearchText] = useState("");
//   const [selectedObject, setSelectedObject] = useState(null);
//   const [damage, setDamage] = useState(0);
//   const [shake, setShake] = useState(false);
//   const [swing, setSwing] = useState(false);
//   const [emojis, setEmojis] = useState([]);
//   const [showIntro, setShowIntro] = useState(true);

//   const soundRefs = useRef({});
//   const hammerRef = useRef(null);
//   const lastStageRef = useRef(null);

//   const filteredObjects = objects.filter((obj) =>
//     obj.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   useEffect(() => {
//     if (showIntro) {
//       const timer = setTimeout(() => setShowIntro(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [showIntro]);

//   const handleSelectObject = (obj) => {
//     setSelectedObject(obj);
//     setDamage(0);
//     setShowIntro(false); // hide intro
//   };

//   const handleHit = () => {
//     if (!selectedObject) return;

//     // Initialize sounds
//     if (!hammerRef.current) hammerRef.current = new Audio(hammerSound);
//     if (!soundRefs.current[selectedObject])
//       soundRefs.current[selectedObject] = new Audio(
//         objectSounds[selectedObject],
//       );
//     if (!lastStageRef.current) lastStageRef.current = new Audio(lastStageSound);

//     // Play hammer sound
//     hammerRef.current.currentTime = 0;
//     hammerRef.current.play().catch(console.log);

//     // Play object sound
//     const hitSound = soundRefs.current[selectedObject];
//     hitSound.currentTime = 0;
//     hitSound.play().catch(console.log);

//     // Update damage
//     setDamage((prev) => {
//       const newDamage = Math.min(
//         prev + 1,
//         objectImages[selectedObject].length - 1,
//       );

//       // Last stage glass sound
//       if (
//         selectedObject === "glass" &&
//         newDamage === objectImages[selectedObject].length - 1
//       ) {
//         lastStageRef.current.currentTime = 0;
//         lastStageRef.current.play().catch(console.log);
//       }

//       // Add multiple falling emojis
//       const emojiIndex = Math.min(newDamage, emojiStages.length - 1);
//       const newEmojis = Array.from({ length: 7 }, () => ({
//         id: Date.now() + Math.random(),
//         symbol: emojiStages[emojiIndex],
//         left: Math.random() * 80 + 10 + "%",
//         size: Math.random() * 2 + 5 + "rem",
//         duration: 3 + Math.random() * 2 + "s",
//       }));
//       setEmojis((prev) => [...prev, ...newEmojis]);

//       return newDamage;
//     });

//     setShake(true);
//     setSwing(true);
//     setTimeout(() => {
//       setShake(false);
//       setSwing(false);
//     }, 300);
//   };

//   const handleEnter = (e) => {
//     if (e.key === "Enter" && filteredObjects.length > 0) {
//       handleSelectObject(filteredObjects[0]);
//     }
//   };

//   const damagePercent = selectedObject
//     ? ((damage + 1) / objectImages[selectedObject].length) * 100
//     : 0;

//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
//       {/* Intro video */}
//       {showIntro && (
//         <video
//           src="/video/background.mp4"
//           autoPlay
//           muted
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         />
//       )}

//       {/* Main background after intro */}
//       {!showIntro && (
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 z-0"></div>
//       )}

//       {/* Smash Room Title */}
//       <h1 className="absolute top-10 text-5xl font-extrabold text-white z-20 drop-shadow-lg">
//         🔨 Smash Room
//       </h1>

//       {/* Search Bar */}
//       {!selectedObject && (
//         <div className="relative w-full md:w-96 mt-48 z-20">
//           <input
//             type="text"
//             placeholder="Search for an object..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             onKeyDown={handleEnter}
//             className="w-full p-4 rounded-3xl border-2 border-gray-300 shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-center text-lg placeholder-gray-500 transition-all"
//           />
//           {searchText && filteredObjects.length > 0 && (
//             <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden z-50">
//               {filteredObjects.map((obj) => (
//                 <div
//                   key={obj}
//                   onClick={() => handleSelectObject(obj)}
//                   className="px-4 py-3 hover:bg-blue-100 cursor-pointer transition-colors text-center font-medium"
//                 >
//                   {obj.toUpperCase()}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Selected Object */}
//       {selectedObject && (
//         <div className="flex flex-col items-center mt-32 z-20 transition-all duration-700 ease-out">
//           <div
//             className={`rounded-3xl shadow-2xl transition-transform duration-300 ${shake ? "animate-shake" : ""}`}
//           >
//             {objectImages[selectedObject][damage].endsWith(".mp4") ? (
//               <video
//                 src={objectImages[selectedObject][damage]}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-2xl shadow-xl transform perspective-1000"
//               />
//             ) : (
//               <img
//                 src={objectImages[selectedObject][damage]}
//                 alt={selectedObject}
//                 className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-2xl shadow-xl transform perspective-1000"
//               />
//             )}
//           </div>

//           <div className="mt-6 cursor-pointer">
//             <img
//               src={hammerImage}
//               alt="Hammer"
//               className={`w-20 h-20 md:w-24 md:h-24 transition-transform ${swing ? "swing" : ""}`}
//               onClick={handleHit}
//             />
//           </div>

//           <div className="w-72 h-3 bg-gray-300 rounded-full mt-4 overflow-hidden">
//             <div
//               className="h-full bg-red-500 rounded-full transition-all"
//               style={{ width: `${damagePercent}%` }}
//             ></div>
//           </div>

//           <button
//             onClick={() => {
//               setSelectedObject(null);
//               setSearchText("");
//             }}
//             className="mt-4 px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300 transition-colors"
//           >
//             ← Back
//           </button>
//         </div>
//       )}

//       {/* Falling Emojis */}
//       {emojis.map((emoji) => (
//         <span
//           key={emoji.id}
//           className="absolute"
//           style={{
//             left: emoji.left,
//             fontSize: emoji.size,
//             animation: `fall ${emoji.duration} linear forwards`,
//             top: 0,
//             pointerEvents: "none",
//           }}
//         >
//           {emoji.symbol}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef } from "react";
import "./index.css";

const objects = [
  "glass",
  "bottle",
  "car",
  "person",
  "computer",
  "phone",
  "robot",
];

const objectImages = {
  glass: [
    "/images/glass/stage0.jpg",
    "/images/glass/stage1.jpg",
    "/images/glass/stage2.jpg",
    "/images/glass/stage3.jpeg",
    "/video/glass.mp4",
  ],
  car: [
    "/images/car/stage0.jpeg",
    "/images/car/stage1.jpeg",
    "/images/car/stage2.jpeg",
    "/images/car/stage3.jpeg",
    "/images/car/stage4.jpeg",
  ],
  phone: [
    "/images/phone/stage0.jpeg",
    "/images/phone/stage1.jpeg",
    "/images/phone/stage2.jpeg",
    "/images/phone/stage3.jpeg",
    "/images/phone/stage4.jpeg",
  ],
  computer: [
    "/images/computer/stage0.jpeg",
    "/images/computer/stage1.jpeg",
    "/images/computer/stage2.jpeg",
    "/images/computer/stage3.jpeg",
    "/images/computer/stage4.jpeg",
  ],
};

// Sounds
const objectSounds = {
  glass: "/sounds/glass_breaking.mp3",
  car: "/sounds/car_distroy.mp3",
  person: "/sounds/person_hit.mp3",
  computer: "/sounds/computer_hit.mp3",
  phone: "/sounds/phone_hit.mp3",
};
const hammerSound = "/sounds/hammer_swing.mp3";
const lastStageSound = "/sounds/glass_shattered.mp3";
const hammerImage = "/images/hammer/hammer.png";

const emojiStages = ["😡", "😤", "😱", "😄"];

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedObject, setSelectedObject] = useState(null);
  const [damage, setDamage] = useState(0);
  const [shake, setShake] = useState(false);
  const [swing, setSwing] = useState(false);
  const [emojis, setEmojis] = useState([]);

  const soundRefs = useRef({});
  const hammerRef = useRef(null);
  const lastStageRef = useRef(null);

  const filteredObjects = objects.filter((obj) =>
    obj.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSelectObject = (obj) => {
    setSelectedObject(obj);
  };

  const handleHit = () => {
    if (!selectedObject) return;

    if (!hammerRef.current) hammerRef.current = new Audio(hammerSound);
    if (!soundRefs.current[selectedObject])
      soundRefs.current[selectedObject] = new Audio(
        objectSounds[selectedObject],
      );
    if (!lastStageRef.current) lastStageRef.current = new Audio(lastStageSound);

    hammerRef.current.currentTime = 0;
    hammerRef.current.play().catch(console.log);

    const hitSound = soundRefs.current[selectedObject];
    hitSound.currentTime = 0;
    hitSound.play().catch(console.log);

    setDamage((prev) => {
      const newDamage = Math.min(
        prev + 1,
        objectImages[selectedObject].length - 1,
      );

      if (
        selectedObject === "glass" &&
        newDamage === objectImages[selectedObject].length - 1
      ) {
        lastStageRef.current.currentTime = 0;
        lastStageRef.current.play().catch(console.log);
      }

      // Add multiple falling emojis
      const emojiIndex = Math.min(newDamage, emojiStages.length - 1);
      const newEmojis = Array.from({ length: 7 }, () => ({
        id: Date.now() + Math.random(),
        symbol: emojiStages[emojiIndex],
        left: Math.random() * 80 + 10 + "%",
        size: Math.random() * 2 + 5 + "rem",
        duration: 3 + Math.random() * 2 + "s",
      }));
      setEmojis((prev) => [...prev, ...newEmojis]);

      return newDamage;
    });

    setShake(true);
    setSwing(true);
    setTimeout(() => {
      setShake(false);
      setSwing(false);
    }, 300);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && filteredObjects.length > 0) {
      handleSelectObject(filteredObjects[0]);
    }
  };

  const damagePercent = selectedObject
    ? ((damage + 1) / objectImages[selectedObject].length) * 100
    : 0;

  // Show video until user starts typing or selects object
  const showIntro = !selectedObject && searchText === "";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Intro video */}
      {showIntro && (
        <video
          src="/video/background.mp4"
          autoPlay
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Main background after intro */}
      {!showIntro && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 z-0"></div>
      )}

      {/* Smash Room Title */}
      <h1 className="absolute top-10 text-5xl font-extrabold text-white z-20 drop-shadow-lg">
        🔨 Smash Room
      </h1>

      {/* Search Bar */}
      {!selectedObject && (
        <div className="relative w-full md:w-96 mt-48 z-20">
          <input
            type="text"
            placeholder="Search for an object..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleEnter}
            className="w-full p-4 rounded-3xl border-2 border-gray-300 shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-center text-lg placeholder-gray-500 transition-all"
          />
          {searchText && filteredObjects.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden z-50">
              {filteredObjects.map((obj) => (
                <div
                  key={obj}
                  onClick={() => handleSelectObject(obj)}
                  className="px-4 py-3 hover:bg-blue-100 cursor-pointer transition-colors text-center font-medium"
                >
                  {obj.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Object */}
      {selectedObject && (
        <div className="flex flex-col items-center mt-32 z-20 transition-all duration-700 ease-out">
          <div
            className={`rounded-3xl shadow-2xl transition-transform duration-300 ${shake ? "animate-shake" : ""}`}
          >
            {objectImages[selectedObject][damage].endsWith(".mp4") ? (
              <video
                src={objectImages[selectedObject][damage]}
                autoPlay
                muted
                playsInline
                className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-2xl shadow-xl transform perspective-1000"
              />
            ) : (
              <img
                src={objectImages[selectedObject][damage]}
                alt={selectedObject}
                className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-2xl shadow-xl transform perspective-1000"
              />
            )}
          </div>

          <div className="mt-6 cursor-pointer">
            <img
              src={hammerImage}
              alt="Hammer"
              className={`w-20 h-20 md:w-24 md:h-24 transition-transform ${swing ? "swing" : ""}`}
              onClick={handleHit}
            />
          </div>

          <div className="w-72 h-3 bg-gray-300 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${damagePercent}%` }}
            ></div>
          </div>

          <button
            onClick={() => {
              setSelectedObject(null);
              setSearchText("");
            }}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-xl shadow hover:bg-gray-300 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Falling Emojis */}
      {emojis.map((emoji) => (
        <span
          key={emoji.id}
          className="absolute"
          style={{
            left: emoji.left,
            fontSize: emoji.size,
            animation: `fall ${emoji.duration} linear forwards`,
            top: 0,
            pointerEvents: "none",
          }}
        >
          {emoji.symbol}
        </span>
      ))}
    </div>
  );
}

export default App;