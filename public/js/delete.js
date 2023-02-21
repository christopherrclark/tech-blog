const handleDelete = function(event) {
  event.preventDefault();
  const id = event.target.getAttribute('data-id');
  const response = confirm('Are you sure you want to delete this post?');
  if (response) {
    fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    }).then(() => {
      location.reload();
    });
  }
};