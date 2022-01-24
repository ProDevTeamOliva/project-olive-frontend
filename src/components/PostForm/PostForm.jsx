import {
  Button,
  Box,
  Input,
  HStack,
  TagLabel,
  TagCloseButton,
  Tag,
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

function PostForm({ onClose, addPost }) {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tags, setTags] = useState([]);

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
    type: "",
    tags,
  };

  const handleSubmit = async (values) => {
    if (selectedFiles.length > 0) {
      let files64 = [];
      for (const file of selectedFiles) {
        const file64 = await toBase64(file);
        files64.push({ filename: file.name, picture: file64 });
      }
      addPost({
        content: values.content,
        tags,
        type: values.type,
        pictures: files64,
      });
    } else {
      addPost({
        content: values.content,
        tags,
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

  const handleTagsInput = (e) => {
    if (!tags.includes(e.target[0].value)) {
      setTags([...tags, e.target[0].value]);
    }
    e.preventDefault();
  };
  const deleteTag = (name) => {
    setTags(tags.filter((tag) => tag !== name));
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
                      placeholder="Share what's on your mind ?"
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
                    <FormLabel htmlFor={"type"}>Post TYPE</FormLabel>
                    <RadioGroup {...field} id={"type"}>
                      {["Public", "Friends"].map((value, index) => (
                        <Radio {...field} value={value} key={index}>
                          <Image
                            marginRight="10px"
                            boxSize="50"
                            src={getPostTypeIcon(value)}
                            borderRadius="full"
                          ></Image>{" "}
                          <Text fontSize="2xl">{value}</Text>
                        </Radio>
                      ))}
                    </RadioGroup>
                    <FormErrorMessage>{form.errors["type"]}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button type="submit" mb="20px" mt="20px">
                Submit
              </Button>
            </Form>
            <Form onSubmit={(e) => handleTagsInput(e)}>
              <Input placeholder="What about some tags ??" />
              <Button type="submit">Add Tag</Button>
              <HStack spacing={4}>
                {tags.map((tag, index) => (
                  <Tag
                    size={"20"}
                    key={index}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => deleteTag(tag)} />
                  </Tag>
                ))}
              </HStack>
            </Form>
          </>
        )}
      </Formik>
      <Input
        type="file"
        accept="image/*"
        multiple
        {...purpleButtonStyle}
        onChange={(e) => setSelectedFiles(e.target.files)}
      />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (values) => dispatch(addPost(values)),
  };
};

export default connect(null, mapDispatchToProps)(PostForm);
