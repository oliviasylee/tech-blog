const editCommentFormHandler = async (event) => {
    event.preventDefault();
    
    const id = window.location.pathname.split('/').pop();
    const comment = document.querySelector('#typeComment').value.trim();

    if ( comment && id) {
        const response = await fetch(`/api/comments/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ comment }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update a comment.');
        }
      }
    };
    
  document
      .querySelector('#editComment')
      .addEventListener('click', editCommentFormHandler);
    