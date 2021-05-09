import { ChangeEvent, FC } from "react";
import "./UploadButton.scss";

type TUploadButtonProps = {
  allowedFileTypes?: string;
  multiple?: boolean;
  onSelect?: (selected: string[]) => void;
};

const UploadButton: FC<TUploadButtonProps> = ({
  allowedFileTypes = ".jpg, .jpeg, .png,",
  multiple = false,
  onSelect,
}) => {
  //Handle selected upload file(s)
  const handleSelection = async (event: ChangeEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = [...(event.target as any).files];

    if (files) {
      let base64Files: string[] = [];
      for (const file of files) {
        const base64File: string = await getBase64OfSelection(file);
        base64Files.push(base64File);
      }
      onSelect && onSelect(base64Files);
    }
  };

  //Convert file to base64
  const getBase64OfSelection = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      let baseURL: string = "";

      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result as string;
        resolve(baseURL);
      };
    });
  };

  return (
    <input
      type="file"
      multiple={multiple}
      accept={allowedFileTypes}
      onChange={(e) => handleSelection(e)}
    />
  );
};

export default UploadButton;
