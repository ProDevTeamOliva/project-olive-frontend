import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import InputComponent from "../Inputs/InputComponent";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const initialData = {
  comment: "",
};

function CommentForm({ addComment, onClose }) {
  const { t } = useTranslation();
  const languageValues = {
    addComment: t("addComment"),
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
  };

  const handleSubmit = (values) => {
    onClose();
    addComment(values);
  };

  return (
    <Box p="20px">
      <Formik initialValues={initialData} onSubmit={handleSubmit}>
        {({ handleSubmit, initialValues: { comment } }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <input type="file" onChange={onFileChange} />
              <button onClick={onFileUpload}>Upload!</button>
            </div>
            <InputComponent
              id="comment"
              type="text"
              value={comment}
              color="gray.700"
              borderColor="gray.100"
            />
            <Button type="submit" mb="10px" mt="30px" {...purpleButtonStyle}>
              {languageValues.addComment}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (idPost, comment) => alert(idPost, comment),
  };
};

export default connect(null, mapDispatchToProps)(CommentForm);
