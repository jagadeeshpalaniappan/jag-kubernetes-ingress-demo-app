import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "./useFetch";

function AddPost() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const url = "/api/v1/posts";
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(url, options);
      if (res.status === 200 || res.status === 201) {
        const json = await res.json();
        console.log("Post Added Successfully", json);
        setSuccess(true);
      } else {
        console.log("Failed to add post");
        setError(true);
      }
    } catch (err) {
      console.log("Failed to add post", err);
      setError(true);
    }
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="container-fluid my-3">
      {success && (
        <div class="alert alert-success" role="alert">
          Post created successfully
        </div>
      )}
      {error && (
        <div class="alert alert-danger" role="alert">
          Error while creating post
        </div>
      )}
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div class="form-group">
          <label for="title">Title*</label>
          <input
            type="text"
            name="title"
            class="form-control"
            ref={register({ required: true })}
            id="title"
            aria-describedby="title"
          />
          {errors.title && (
            <small className="form-text text-muted">Title is required</small>
          )}
        </div>

        <div class="form-group">
          <label for="title">Body</label>
          <input
            type="text"
            name="body"
            class="form-control"
            ref={register}
            id="body"
            aria-describedby="body"
          />
        </div>

        <div class="form-group">
          <label for="authorId">AuthorId*</label>
          <input
            type="text"
            name="authorId"
            class="form-control"
            id="authorId"
            aria-describedby="authorId"
            defaultValue="jag1"
            ref={register({ required: true })}
          />
          {errors.authorId && (
            <small className="form-text text-muted">AuthorId is required</small>
          )}
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPost;
