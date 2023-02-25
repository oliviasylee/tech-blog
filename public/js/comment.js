const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#typeComment').value.trim();
  
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create a new comment.');
      }
    }
  };
  
document
    .querySelector('.newComment')
    .addEventListener('submit', commentFormHandler);
  