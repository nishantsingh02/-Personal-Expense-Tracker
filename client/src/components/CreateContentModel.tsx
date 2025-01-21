import { useState } from "react";
import { CrossIcon } from "./Icons/CrossIcon";
import { Button } from "./Icons/Button";
import { Input } from "./Icons/Input";
import { useRef } from "react";

//import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("youtube");
  const [error, setError] = useState<string | null>(null); // Added error state
/*
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      setError("Title and Link are required."); // Error for missing fields
      return;
    }
  

    try {
      // Send POST request to create content
      await axios.post(
        `${BACKEND_URL}/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Updated to include Bearer prefix
          },
        }
      );

      setError(null); // Clear any previous errors
      onClose(); // Close the model after successful submission
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating content:", error.message);
      } else {
        console.error("Error creating content:", error);
      }
      setError("Failed to create content. Please check your inputs or token.");
    }
  }
*/
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed left-0 flex justify-center">
            <span className="bg-white opacity-100 p-4 rounded fixed">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input reference={titleRef} placeholder={"Title"} />
                <Input reference={linkRef} placeholder={"Amount"} />
                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                <div>
                  <h1>Date</h1>
                  <div className="flex p-4 gap-2 justify-center">
                    <Button
                      text="Yesterday"
                      variant={type === ContentType.Youtube ? "primary" : "secondary"}
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    ></Button>
                    <Button
                      text="Tomorrow"
                      variant={type === ContentType.Twitter ? "primary" : "secondary"}
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    ></Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button /*onClick={}*/ variant="primary" text="Submit" />
              </div>
            </span>
          </div>
          <div className="flex flex-col justify-center md:flex flex-row justify-center"></div>
        </div>
      )}
    </div>
  );
}

