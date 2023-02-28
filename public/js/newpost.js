const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#typeTitle').value.trim();
    const contents = document.querySelector('#typeContents').value.trim();
  
    if (title && contents) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create a new post.');
      }
    }
  };
  
document
    .querySelector('.newPost')
    .addEventListener('submit', newPostFormHandler);