import React, { useEffect } from "react";
import { getPosts } from "./services/posts";

export default function Test() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        console.log(res);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return <div></div>;
}
