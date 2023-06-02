const commentForm = async (event) => {
    event.preventDefault();

    const commentUsername = $('#comment-username').val();
    const commentText = $('#comment-text').val();
    const id = $('#blog-id').val();
    
    const commentData = {
      username: commentUsername,
      comment: commentText,
    };

    console.log(commentData);

    const response = await fetch(`/api/post-comment/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Comment posted!');
      document.location.replace(`/api/blog-page/${id}`);
    } else {
      alert('Failed to post comment');
    }
  };

  $('#comment-form').submit(commentForm);