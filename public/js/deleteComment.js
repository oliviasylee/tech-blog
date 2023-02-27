const deleteCommentHandler = async (event) => {
    event.preventDefault();
  
    const id = window.location.pathname.split('/').pop();
  
    if (id) {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete a comment.');
      }
    }
  };
  
  document
    .querySelector('#deleteComment')
    .addEventListener('click', deleteCommentHandler);