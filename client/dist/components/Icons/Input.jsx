"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
function Input({ placeholder, reference }) {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="px-4 py-2 m-2"></input>
    </div>;
}
exports.Input = Input;
