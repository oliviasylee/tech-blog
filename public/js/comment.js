const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#typeComment').value.trim();
    const post_id = window.location.pathname.split('/').pop();
    // Splits the URL string by / and returns an array of the resulting substrings. Then the last element of that array is assigned as the post_id.
    // const post_id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    //   ];
    
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create a new comment.');
      }
    }
  };
  
document
    .querySelector('.newComment')
    .addEventListener('submit', commentFormHandler);
  