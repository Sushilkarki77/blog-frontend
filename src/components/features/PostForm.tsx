import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Post } from "../../interfaces/Interfaces";
import { validateCommaSeparatedValues } from "../../utils/Utils";

type PostFormProps = {
  post?: Partial<Post>;
  onSubmit: (data: Omit<Post, 'id'>) => void;
};

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit }) => {
  const [title, setTitle] = useState<string>(post?.title || "");
  const [content, setContent] = useState<string>(post?.content || "");
  const [author, setAuthor] = useState<string>(post?.author || "");
  const [tags, setTags] = useState<string>(post?.tags?.toString() || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setAuthor(post.author || "");
      setTags(post.tags?.toString() || "");
    }
  }, [post]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const handleAuthor = (e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);
  const handleSetTags = (e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!tags.trim()) newErrors.tags = "Tags are required";

    if (!validateCommaSeparatedValues(tags)) {
      newErrors.tags = validateCommaSeparatedValues(tags).error || '';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        title,
        content,
        author,
        tags: tags.split(",").map((tag) => tag.trim()),
        bookmarked: false,
        date: new Date().toDateString()
      });
      setTitle("");
      setContent("");
      setAuthor("");
      setTags("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 w-full">
      
      <label className="block mt-4 mb-2 font-medium">Title</label>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

     
      <label className="block mt-4 mb-2 font-medium">Content</label>
      <textarea
        value={content}
        onChange={handleContentChange}
        className={`w-full px-3 h-30 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}

    
      <label className="block mt-4 mb-2 font-medium">Author</label>
      <input
        type="text"
        value={author}
        onChange={handleAuthor}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}

     
      <label className="block mt-4 mb-2 font-medium">Tags (comma separated)</label>
      <input
        type="text"
        value={tags}
        onChange={handleSetTags}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.tags ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}

     
      <button
        type="submit"
        className="btn btn-primary mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
