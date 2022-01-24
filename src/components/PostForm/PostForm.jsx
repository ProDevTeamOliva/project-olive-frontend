import {
  Button,
  Box,
  Input,
  Text,
  Image,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import publicPostIcon from "../../img/icons/PublicPostIcon.png";
import FriendsPostIcon from "../../img/icons/FriendsPostIcon.png";
import GroupChatPostIcon from "../../img/icons/GroupChatPostIcon.png";
import { purpleButtonStyle } from "../../styles/Buttons/purpleButton";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { addPost } from "../../actions/postActions";
import * as React from "react";
import toBase64 from "../../operations/base64";
import { unStyledButton } from "../../styles/Buttons/unStyledButton";

function PostForm({ onClose, addPost }) {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const getPostTypeIcon = (postType) => {
    if (postType === "Public") {
      return publicPostIcon;
    }
    if (postType === "Friends") {
      return FriendsPostIcon;
    }
    if (postType === "Group") {
      return GroupChatPostIcon;
    }
    return null;
  };

  const initialData = {
    content: "",
    type: "Public",
  };

  const getHashtags = (val) => {
    const splittedContent = val.split(/[ ,.]/g);
    let hashtags = [];
    for (const idx in splittedContent) {
      if (splittedContent[idx].charAt(0) === "#") {
        hashtags.push(splittedContent[idx].slice(1).toLowerCase());
      }
    }
    return hashtags;
  };

  const handleSubmit = async (values) => {
    const hashtags = getHashtags(values.content);
    if (selectedFiles.length > 0) {
      let files64 = [];
      for (const file of selectedFiles) {
        const file64 = await toBase64(file);
        files64.push({ filename: file.name, picture: file64 });
      }
      addPost({
        content: values.content,
        tags: hashtags,
        type: values.type,
        pictures: files64,
      });
    } else {
      addPost({
        content: values.content,
        tags: hashtags,
        type: values.type,
        pictures: [],
      });
    }
    onClose();
  };
  const validateContent = (val) => {
    let error;
    if (!val) {
      error = "Content is required";
    }
    return error;
  };

  return (
    <Box p="20px">
      <Formik
        initialValues={initialData}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, initialValues: { content, type } }) => (
          <>
            <Form onSubmit={(values) => handleSubmit(values)}>
              <Field name="content" validate={validateContent}>
                {({ field, form }) => (
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("addPostContentPlaceHolder")}
                      height={"10vh"}
                      id="content"
                      name="content"
                    />
                    <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name={"type"}>
                {({ field, form }) => (
                  <FormControl
                    id={"type"}
                    isInvalid={!!form.errors["type"] && !!form.touched["type"]}
                  >
                    <FormLabel htmlFor={"type"}>{t("postType")}</FormLabel>
                    <RadioGroup
                      {...field}
                      id={"type"}
                      style={{ touchAction: "none" }}
                    >
                      {["Public", "Friends"].map((value, index) => (
                        <Radio
                          {...field}
                          value={value}
                          key={index}
                          style={{ touchAction: "none" }}
                        >
                          <Image
                            marginRight="10px"
                            boxSize="50"
                            src={getPostTypeIcon(value)}
                            borderRadius="full"
                          ></Image>{" "}
                          <Text fontSize="2xl">{t(value)}</Text>
                        </Radio>
                      ))}
                    </RadioGroup>
                    <FormErrorMessage>{form.errors["type"]}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                {...unStyledButton}
                onClick={() => document.getElementById("input-file").click()}
              >
                {t("selectFile")}
                <Input
                  variant="unstyled"
                  display="none"
                  type="file"
                  id="input-file"
                  accept="image/*"
                  name="file"
                  multiple
                  mt="2"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                ></Input>
              </Button>
              <label style={{ marginLeft: "20px" }}>
                {t("amountOfFilesUploaded")} {selectedFiles.length}
              </label>
              <Button {...purpleButtonStyle} type="submit" mb="20px" mt="20px">
                {t("submitPostAdd")}
              </Button>
            </Form>
          </>
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
