import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const AboutTourSection: React.FC<{ description: string }> = ({
  description,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => setExpanded(!expanded);

  const words = description.trim().split(" ");
  const shortText = words.slice(0, 60).join(" ");
  const isLong = words.length > 60;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        <InfoOutlinedIcon className="text-[#C22A54]" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          About the Tour
        </h2>
      </div>

      <AnimatePresence initial={false}>
        <motion.p
          key={expanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-gray-700 overflow-hidden"
        >
          {expanded || !isLong ? description : `${shortText}...`}
        </motion.p>
      </AnimatePresence>

      {isLong && (
        <button
          onClick={toggleText}
          className="flex items-center text-[#C22A54] text-sm font-medium hover:underline"
        >
          {expanded ? (
            <>
              Show Less <ExpandLessIcon fontSize="small" className="ml-1" />
            </>
          ) : (
            <>
              Show More <ExpandMoreIcon fontSize="small" className="ml-1" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AboutTourSection;
