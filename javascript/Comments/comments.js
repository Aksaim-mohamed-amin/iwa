const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const newCommentBtn = document.getElementById('new-comment-btn');

likeBtn.addEventListener('click', () => {
    const numLikes = parseInt(document.getElementById('num-likes').textContent);
    if (!likeBtn.classList.contains('clicked')) {
        document.getElementById('num-likes').textContent = `${numLikes + 1} Likes`;
        likeBtn.style.color = 'red';
        likeBtn.classList.add('clicked');
    } else {
        document.getElementById('num-likes').textContent = `${numLikes - 1} Likes`;
        likeBtn.style.color = 'black';
        likeBtn.classList.remove('clicked');
    }
});

dislikeBtn.addEventListener('click', () => {
    const numDislikes = parseInt(document.getElementById('num-dislikes').textContent);
    if (!dislikeBtn.classList.contains('clicked')) {
        document.getElementById('num-dislikes').textContent = `${numDislikes + 1} Dislikes`;
        dislikeBtn.style.color = 'red';
        dislikeBtn.classList.add('clicked');
    } else {
        document.getElementById('num-dislikes').textContent = `${numDislikes - 1} Dislikes`;
        dislikeBtn.style.color = 'black';
        dislikeBtn.classList.remove('clicked');
    }
});

newCommentBtn.addEventListener('click', () => {
    const newComment = document.getElementById('new-comment');
    if (newComment.value) {
        const commentWrapper = document.createElement('div');
        commentWrapper.className = 'comment-wraper';

        const userPic = document.createElement('div');
        userPic.className = 'user-pic';

        const userImage = document.createElement('img');
        userImage.src = 'fake_user.avif';
        userPic.appendChild(userImage);

        const comment = document.createElement('p');
        comment.className = 'comment';
        comment.textContent = newComment.value;

        commentWrapper.appendChild(userPic);
        commentWrapper.appendChild(comment);

        const inputWrapper = document.querySelector('.wraper');
        document.querySelector('.comments')q.insertBefore(commentWrapper, inputWrapper);

        newComment.value = '';
    }
});