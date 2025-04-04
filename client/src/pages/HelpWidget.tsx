// import React, { useState } from "react";

// const HelpWidget: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const formKey = "helpFormData";

//   const [formData, setFormData] = useState(() => {
//     const saved = localStorage.getItem(formKey);
//     return saved
//       ? JSON.parse(saved)
//       : {
//           name: "",
//           email: "",
//           phone: "",
//           adults: "1",
//           children: "0",
//           destination: "",
//         };
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { name, email, phone } = formData;
//     if (!name || !email || !phone) {
//       alert("Please fill in Name, Email, and Phone.");
//       return;
//     }

//     localStorage.setItem(formKey, JSON.stringify(formData));
//     console.log("Form submitted:", formData);
//     setIsOpen(false);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Floating Button */}
//       {!isOpen && (
//         <div className="relative">
//           <button
//             onClick={() => setIsOpen(true)}
//             className="bg-[#C22A54] hover:bg-[#E53E3E] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-bounce"
//           >
//             💬 Need Help?
//           </button>
//           {!localStorage.getItem("helpFormData") && (
//             <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
//           )}
//         </div>
//       )}

//       {/* Chat Form */}
//       {isOpen && (
//         <div className="bg-white shadow-xl rounded-xl w-80 p-4 animate-slide-up transition-all duration-300">
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="font-bold text-[#C22A54]">Let us help you!</h4>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-gray-500 hover:text-[#C22A54]"
//             >
//               ✕
//             </button>
//           </div>
//           <form className="space-y-2" onSubmit={handleSubmit}>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               placeholder="Name"
//               className="w-full border px-2 py-1 rounded text-sm"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               placeholder="Email"
//               className="w-full border px-2 py-1 rounded text-sm"
//               required
//             />
//             <input
//               name="phone"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               placeholder="Phone"
//               className="w-full border px-2 py-1 rounded text-sm"
//               required
//             />
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 name="adults"
//                 value={formData.adults}
//                 onChange={(e) =>
//                   setFormData({ ...formData, adults: e.target.value })
//                 }
//                 placeholder="Adults"
//                 className="w-1/2 border px-2 py-1 rounded text-sm"
//               />
//               <input
//                 type="number"
//                 min={0}
//                 name="children"
//                 value={formData.children}
//                 onChange={(e) =>
//                   setFormData({ ...formData, children: e.target.value })
//                 }
//                 placeholder="Children"
//                 className="w-1/2 border px-2 py-1 rounded text-sm"
//               />
//             </div>
//             <input
//               name="destination"
//               value={formData.destination}
//               onChange={(e) =>
//                 setFormData({ ...formData, destination: e.target.value })
//               }
//               placeholder="Preferred Destination"
//               className="w-full border px-2 py-1 rounded text-sm"
//             />
//             <button
//               type="submit"
//               className="w-full bg-[#C22A54] text-white py-1.5 text-sm rounded-full"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HelpWidget;

import React, { useEffect, useState } from "react";

type CTAStyle = "friendly" | "playful" | "conversion";

const ctaPresets: Record<
  CTAStyle,
  { label: string; icon: string; button: string; header: string }
> = {
  friendly: {
    label: "🎯 Friendly & Helpful",
    icon: "💬",
    button: "💬 Need Help?",
    header: "We're here to help 😊",
  },
  playful: {
    label: "✨ Playful & Creative",
    icon: "✨",
    button: "✨ Let's Plan Something Fun!",
    header: "Adventure? Let’s go 🚀",
  },
  conversion: {
    label: "🛫 Conversion-Focused",
    icon: "🛫",
    button: "🛫 Book Faster Now!",
    header: "Plan fast, travel faster! ✈️",
  },
};

const HelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ctaStyle, setCtaStyle] = useState<CTAStyle>("friendly");
  const formKey = "helpFormData";

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(formKey);
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          phone: "",
          adults: "1",
          children: "0",
          destination: "",
        };
  });

  useEffect(() => {
    const savedStyle = localStorage.getItem("ctaStyle") as CTAStyle;
    if (savedStyle && ctaPresets[savedStyle]) {
      setCtaStyle(savedStyle);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      alert("Please fill in Name, Email, and Phone.");
      return;
    }

    localStorage.setItem(formKey, JSON.stringify(formData));
    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  const handleCTAChange = (style: CTAStyle) => {
    setCtaStyle(style);
    localStorage.setItem("ctaStyle", style);
  };

  const cta = ctaPresets[ctaStyle];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#C22A54] hover:bg-[#E53E3E] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-bounce"
          >
            {cta.button}
          </button>
        </div>
      )}

      {/* Chat Form */}
      {isOpen && (
        <div className="bg-white shadow-xl rounded-xl w-80 p-4 animate-slide-up transition-all duration-300">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-[#C22A54]">{cta.header}</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-[#C22A54]"
            >
              ✕
            </button>
          </div>

          {/* CTA Style Switcher */}
          <div className="mb-3">
            <label className="text-xs text-gray-500">Widget Tone</label>
            <select
              value={ctaStyle}
              onChange={(e) => handleCTAChange(e.target.value as CTAStyle)}
              className="w-full mt-1 border px-2 py-1 rounded text-sm"
            >
              {Object.entries(ctaPresets).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          {/* Form */}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
              className="w-full border px-2 py-1 rounded text-sm"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full border px-2 py-1 rounded text-sm"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Phone"
              className="w-full border px-2 py-1 rounded text-sm"
              required
            />
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                name="adults"
                value={formData.adults}
                onChange={(e) =>
                  setFormData({ ...formData, adults: e.target.value })
                }
                placeholder="Adults"
                className="w-1/2 border px-2 py-1 rounded text-sm"
              />
              <input
                type="number"
                min={0}
                name="children"
                value={formData.children}
                onChange={(e) =>
                  setFormData({ ...formData, children: e.target.value })
                }
                placeholder="Children"
                className="w-1/2 border px-2 py-1 rounded text-sm"
              />
            </div>
            <input
              name="destination"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              placeholder="Preferred Destination"
              className="w-full border px-2 py-1 rounded text-sm"
            />
            <button
              type="submit"
              className="w-full bg-[#C22A54] text-white py-1.5 text-sm rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HelpWidget;
