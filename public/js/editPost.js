const editPostFormHandler = async (event) => {
    event.preventDefault();
    console.log("commentFormHandler called"); 
  
    const id = window.location.pathname.split('/').pop();

    const title = document.querySelector('#typeTitle').value.trim();
    const contents = document.querySelector('#typeContents').value.trim();

    if (title && contents && id) {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, contents }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update a post.');
        }
      }
    };
    
  document
      .querySelector('#editPost')
      .addEventListener('click', editPostFormHandler);
    