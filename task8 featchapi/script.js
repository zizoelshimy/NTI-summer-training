const postsContainer = document.getElementById('posts');
const errorContainer = document.getElementById('error');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementById('closeBtn');

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch posts.');
    }
    return response.json();
  })
  .then(posts => {
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'post';

      const title = document.createElement('h2');
      title.textContent = post.title;

      const body = document.createElement('p');
      body.textContent = post.body.substring(0, 50) + '...'; // this will display only the first 50 characters of the body and to display the last clice of the body

      postElement.appendChild(title);
      postElement.appendChild(body);

      postElement.addEventListener('click', () => {
        modalTitle.textContent = post.title;
        modalBody.textContent = post.body;
        modal.style.display = 'block';
      });

      postsContainer.appendChild(postElement);
    });
  })
  .catch(error => {
    errorContainer.textContent = error.message;
  });

// when i press x the post details will close
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

// Close modal when clicking outside the modal
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
