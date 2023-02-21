const editPostHandler = async (event) => {
  event.preventDefault();
const title = document.querySelector('#edit-title').value.trim();
const content = document.querySelector('#edit-content').value.trim();
const location = document.location.pathname.split('/')[3];


console.log(location);

if (content && title) {
   const response = await fetch(`/api/posts/${location}`, {
    method: 'PUT',
    body: JSON.stringify({ title,content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

}
document.querySelector("#edit-btn").addEventListener("click", editPostHandler);