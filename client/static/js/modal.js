const modal = document.querySelector('#modal');
const modalHeader = modal.querySelector('h2');
const modalContent = modal.querySelector('article');
const modalExit = modal.querySelector('i a');

const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'title', placeholder: 'Title' } },
    { tag: 'input', attributes: { type: 'text', name: 'name', placeholder: 'Your name' } },
    { tag: 'textarea', attributes: { name: 'story', placeholder: 'Your story' } },
    { tag: 'input', attributes: { type: 'submit', value: 'Publish' } }
]

async function loadModalFor(category, id) {
    modalContent.innerHTML = '';
    modal.style.display = 'block';
    if (id === 'new') {
        renderNewPostForm();
    } else {
        const data = await getItem(category, id);
        renderPostModal(data);
        //category === 'posts' ? renderPostModal(data) : renderAuthorModal(data);
    }
}

function renderPostModal(post) {
    modalHeader.textContent = `${post.title} - ${post.name}`;
    //const authorLink = createItemLink(book.author);
    //const abstract = document.createElement('p');
    //abstract.textContent = post.story;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Post';
    deleteBtn.onclick = () => deletePost(post.id);
    const datetime = document.createElement('p');
    let datetimeString = post.date;
    datetimeString = datetimeString.replace('T', ' ');
    datetimeString = datetimeString.substring(0, 19);
    datetime.textContent = datetimeString;
    modalContent.appendChild(datetime);
    modalContent.appendChild(document.createElement('br'));
    const story = document.createElement('p');
    story.textContent = post.story;
    modalContent.appendChild(story);
    //modalContent.appendChild(authorLink);
    //modalContent.appendChild(abstract);
    modalContent.appendChild(deleteBtn);
    modalExit.href = `#posts`;
}

/*
function renderAuthorModal(author) {
    modalHeader.textContent = author.name;
    const list = document.createElement('ul');
    const bookLinks = author.books.map(createItemLink);
    bookLinks.forEach(link => {
        const li = document.createElement('li');
        li.appendChild(link);
        list.appendChild(li);
    })
    modalContent.appendChild(list);
    modalExit.href = `#authors`;
}
*/

function renderNewPostForm(){
    modalHeader.textContent = 'Add a Post';
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        form.appendChild(field);
    })
    form.onsubmit = postPost;
    modalContent.appendChild(form);
    modalExit.href = `#posts`;
}

function createItemLink(data){
    console.log(data);
    const link = document.createElement('a');
    link.href = `#${data.path.substring(1)}`;
    link.textContent = data.name || data.title;
    return link;
}