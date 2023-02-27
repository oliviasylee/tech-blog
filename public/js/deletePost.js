const deleteHandler = async (event) => {
  event.preventDefault();

  const id = window.location.pathname.split('/').pop();

  if (id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ post_id: id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete a post.');
    }
  }
};

document
  .querySelector('#deleteButton')
  .addEventListener('click', deleteHandler);