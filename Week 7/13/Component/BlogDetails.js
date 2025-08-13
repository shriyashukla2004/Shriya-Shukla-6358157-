import React, { useState, useEffect } from 'react';

const BlogDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const [userRole, setUserRole] = useState('reader'); // reader, author, admin
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDrafts, setShowDrafts] = useState(false);

  const sampleBlogs = [
    { 
      id: 1, 
      title: 'React Learning', 
      author: 'Stephen Biz', 
      content: 'Welcome to learning React!', 
      status: 'published',
      date: '2024-01-15',
      views: 1250
    },
    { 
      id: 2, 
      title: 'Installation', 
      author: 'Schewzdenier', 
      content: 'You can install React from npm.', 
      status: 'published',
      date: '2024-01-20',
      views: 890
    },
    { 
      id: 3, 
      title: 'Advanced React Patterns', 
      author: 'Stephen Biz', 
      content: 'Exploring advanced patterns in React development.', 
      status: 'draft',
      date: '2024-01-25',
      views: 0
    },
    { 
      id: 4, 
      title: 'State Management', 
      author: 'Schewzdenier', 
      content: 'Understanding state management in React applications.', 
      status: 'published',
      date: '2024-01-30',
      views: 2100
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(sampleBlogs);
    }, 1000);
  }, [sampleBlogs]);

  // Method 1: Early return pattern
  const renderBlogList = () => {
    if (blogs.length === 0) {
      return <div className="loading">Loading blogs...</div>;
    }

    const filteredBlogs = showDrafts 
      ? blogs.filter(blog => blog.status === 'draft')
      : blogs.filter(blog => blog.status === 'published');

    if (filteredBlogs.length === 0) {
      return <p>No {showDrafts ? 'drafts' : 'published blogs'} available</p>;
    }

    return (
      <div className="blog-list">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>
            <p><strong>Author:</strong> {blog.author}</p>
            <p>{blog.content}</p>
            <p><strong>Date:</strong> {blog.date}</p>
            <p><strong>Views:</strong> {blog.views}</p>
            
            {/* Method 2: Conditional rendering with object mapping for status badges */}
            {renderStatusBadge(blog.status)}
            
            {/* Method 3: Conditional rendering based on user role */}
            {userRole === 'admin' && (
              <div className="admin-controls">
                <button onClick={() => handleEdit(blog)}>Edit</button>
                <button onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            )}
            
            {/* Method 4: Conditional rendering for authors */}
            {userRole === 'author' && blog.author === 'Stephen Biz' && (
              <button onClick={() => handleEdit(blog)}>Edit My Blog</button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Method 5: Switch statement for conditional rendering
  const renderUserControls = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="admin-panel">
            <h3>Admin Panel</h3>
            <button onClick={() => setShowDrafts(!showDrafts)}>
              {showDrafts ? 'Show Published' : 'Show Drafts'}
            </button>
            <button onClick={() => setUserRole('reader')}>Switch to Reader</button>
            <button onClick={() => setUserRole('author')}>Switch to Author</button>
          </div>
        );
      case 'author':
        return (
          <div className="author-panel">
            <h3>Author Panel</h3>
            <button onClick={() => setShowDrafts(!showDrafts)}>
              {showDrafts ? 'Show Published' : 'Show My Drafts'}
            </button>
            <button onClick={() => setUserRole('reader')}>Switch to Reader</button>
          </div>
        );
      case 'reader':
      default:
        return (
          <div className="reader-panel">
            <h3>Reader Panel</h3>
            <button onClick={() => setUserRole('author')}>Switch to Author</button>
            <button onClick={() => setUserRole('admin')}>Switch to Admin</button>
          </div>
        );
    }
  };

  // Method 6: Conditional rendering with object mapping
  const renderStatusBadge = (status) => {
    const statusConfig = {
      published: { className: 'status-published', text: 'Published' },
      draft: { className: 'status-draft', text: 'Draft' },
      pending: { className: 'status-pending', text: 'Pending Review' }
    };

    const config = statusConfig[status] || { className: 'status-unknown', text: 'Unknown' };

    return <span className={config.className}>{config.text}</span>;
  };

  // Method 7: Conditional rendering with function composition
  const renderBlogStats = () => {
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
    const draftBlogs = blogs.filter(blog => blog.status === 'draft').length;
    const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);

    return (
      <div className="blog-stats">
        <h3>Blog Statistics</h3>
        <p>Total Blogs: {totalBlogs}</p>
        <p>Published: {publishedBlogs}</p>
        <p>Drafts: {draftBlogs}</p>
        <p>Total Views: {totalViews}</p>
        
        {/* Method 8: Conditional rendering with logical operators and null */}
        {totalViews > 2000 && <p className="high-views">High traffic blog!</p>}
        {publishedBlogs === 0 && <p className="no-published">No published blogs yet</p>}
        {draftBlogs > publishedBlogs && <p className="many-drafts">Many drafts pending</p>}
      </div>
    );
  };

  // Method 9: Conditional rendering with array methods
  const renderTopAuthors = () => {
    const authorStats = blogs.reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + 1;
      return acc;
    }, {});

    const topAuthors = Object.entries(authorStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return topAuthors.length > 0 ? (
      <div className="top-authors">
        <h3>Top Authors</h3>
        {topAuthors.map(([author, count]) => (
          <p key={author}>{author}: {count} blogs</p>
        ))}
      </div>
    ) : null;
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setIsEditing(true);
  };

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  return (
    <div className="blog-details">
      <h2>Blog Details</h2>
      
      {renderUserControls()}
      
      <div className="blog-content">
        {renderBlogList()}
      </div>
      
      <div className="blog-sidebar">
        {renderBlogStats()}
        {renderTopAuthors()}
      </div>
      
      {/* Method 10: Conditional rendering with state */}
      {isEditing && selectedBlog && (
        <div className="edit-modal">
          <h3>Editing: {selectedBlog.title}</h3>
          <button onClick={() => setIsEditing(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails; 