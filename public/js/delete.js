const handleDelete = function(event) {
  event.preventDefault();
  console.log('click')
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

document
  .querySelectorAll('.delete')
  .forEach(button => button.addEventListener('click', handleDelete));
  
console.log("hello");
