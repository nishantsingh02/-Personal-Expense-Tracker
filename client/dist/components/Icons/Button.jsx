"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
};
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";
function Button({ variant, text, startIcon, onClick, fullWidth }) {
    return (<button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center " : ""} `}>
       <div className="pr-2">
        {startIcon}

       </div>
        {text}
    </button>);
}
exports.Button = Button;
