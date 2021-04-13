import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { backend } from "../../apis/backend";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { avatarUploaded } from "../auth/authSlice";

export default function ProfileAvatarForm() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      setSelectedFile(files[0]);
      setIsSelectedFile(true);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isSelectedFile && selectedFile) {
      let formData = new FormData();
      formData.append("avatar", selectedFile);

      try {
        const response = await backend.post("/profile/upload/avatar", formData);
        toast.success("Avatar was uploaded.");
        dispatch(avatarUploaded(response.data));
      } catch (ex) {
        toast.error(ex.response.data);
      } finally {
        setIsSelectedFile(false);
      }
    }
  };
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="avatar">Upload photo</label>
            <input
              id="avatar"
              accept=".jpg, .jpeg"
              type="file"
              name="avatar"
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={!isSelectedFile}>
            Submit
          </button>
        </form>
      </Container>
    </div>
  );
}
