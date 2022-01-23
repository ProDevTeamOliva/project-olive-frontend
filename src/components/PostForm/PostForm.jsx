import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import InputComponent from "../Inputs/InputComponent";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { addPost } from "../../actions/postActions";

function PostForm({ onClose, addPost }) {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const onFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const initialData = {
    content: "",
    type: "",
    tags: [],
  };
  const inputColors = { color: "gray.700", borderColor: "gray.100" };

  const handleSubmit = (values) => {
    onClose();
    addPost(values);
  };

  return (
    <Box p="20px">
      <Formik initialValues={initialData} onSubmit={handleSubmit}>
        {({ handleSubmit, initialValues: { files } }) => (
          <Form onSubmit={handleSubmit}>
            <InputComponent
              id="files"
              type="file"
              onChange={onFileChange}
              {...inputColors}
              multiple={true}
            />
            <Button type="submit" mb="10px" mt="30px" {...purpleButtonStyle}>
              UPLOAD
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (values) => dispatch(addPost(values)),
  };
};

export default connect(null, mapDispatchToProps)(PostForm);
