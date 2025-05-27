<div style="text-align: center;">
  <img src="./public/icon/android-chrome-192x192.png" alt="Bloggy Icon" align="center">
</div>

# Bloggy

Bloggy is a personal blog website that enables its admin to create, edit, and delete their blog posts and enables users to read, like, and comment on published blog posts.

## How to run

- Run local mongob instance
- Create .env file that contains:<br>
  `PORT`: server port.<br>
  `DB_CONNECTION_STRING`: mongodb connection string, `mongodb://127.0.0.1:27017/` for local instance.<br>
  `ADMIN_USERNAME`: admin username.<br>
  `ADMIN_PASSWORD`: admin password.<br>
- Output style.css file `npx tailwindcss -i ./config/input_tailwind.css -o ./public/css/style.css`
- Run the server `node --env-file=.env server.js`

## Preview

![Home page](./imgs/home.png)
![Login page](./imgs/login.png)
![User blogs page](./imgs/user-blogs.png)
![Admin blogs page](./imgs/admin-blogs.png)
![Blog page](./imgs/blog-read.png)
![New Blog page](./imgs/new-blog.png)
