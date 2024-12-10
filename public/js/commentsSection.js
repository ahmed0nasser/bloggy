const btnId = "editBtn";
const commentsSection = document.getElementById("commentsSection");
let isEditing = false;

commentsSection.onclick = (event) => {
  if (isEditing) return;

  const editBtn = event.target;
  if (!editBtn.id?.startsWith(btnId)) return;

  // lock editing
  isEditing = true;
  // hide comment control buttons
  editBtn.parentElement.classList.add("hidden");
  // extract commentIndex
  const commentIndex = Number(editBtn.id.slice(btnId.length));
  // get commentBody element
  const commentBody = document.getElementById(`commentBody${commentIndex}`);
  // get editing form
  const editForm = editBtn.nextElementSibling;
  // show editing form
  editForm.classList.remove("hidden");
  commentBody.replaceWith(editForm);

  function endEditing() {
    isEditing = false;
    editForm.replaceWith(commentBody);
    editBtn.after(editForm);
    editForm.classList.add("hidden");
    editBtn.parentElement.classList.remove("hidden");
    editForm.elements.cancel.removeEventListener("click", endEditing);
  }
  // end editing on cancel button click
  editForm.elements.cancel.addEventListener("click", endEditing);
};