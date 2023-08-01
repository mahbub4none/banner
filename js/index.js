let primary_content = `<div class="min-h-screen flex items-center grid-cols-2">
  <div class="w-full bg-blue-200">
    <h2 class="text-center text-blue-400 font-bold text-2xl uppercase mb-10">Fill out our form</h2>
    <div class="bg-white p-10 mx-auto lg:w-full">
      <form action="">
        <div id="field-carrier" class="mb-5"></div>

        <div class="mb-5">
          <button id="add-image" data-el="image" type="button" class="add-field bg-green-500 text-white font-bold p-4 rounded-lg">Add Image</button>
          <button id="add-title" data-el="title" type="button" class="add-field bg-blue-500 text-white font-bold p-4 rounded-lg">Add Title</button>
          <button id="add-description" data-el="description" type="button" class="add-field bg-red-500 text-white font-bold p-4 rounded-lg">Add Description</button>
        </div>
      </form>
    </div>
  </div>
  <div class="w-full bg-white-200">
    <h2 class="text-center text-blue-400 font-bold text-2xl uppercase mb-10">Preview</h2>
    <div class="bg-white p-10 mx-auto lg:w-full">
        <div id="preview-carrier" class="mb-5 p-5"></div>
        
        <div class="mb-5">
          <button id="download" type="button" class="bg-green-500 text-white font-bold p-4 rounded-lg">Download Image</button>
        </div>
    </div>
  </div>
</div>`;

let app = document.getElementById('app');
app.innerHTML = primary_content;

function includeEventLister(elementType) {
  
  if (elementType == 'title') {
    // add event listener to appended element
    document.getElementById('title').addEventListener('keyup', function(e){
      let letter = this.value;
      document.getElementById('title-preview').innerHTML = letter;
    })
  } else if (elementType == 'image') {
    // add event listener to appended element
    document.getElementById('image').addEventListener('change', function(e){
      previewImage(e);
    })
  } else {
    // add event listener to appended element
    document.getElementById('description').addEventListener('keyup', function(e){
      let letter = this.value;
      document.getElementById('description-preview').innerHTML = letter;
    })
  }

  return;
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * 
 * @param {t} t is the 'this' element on which the click event called
 * @returns void
 */
function addElement(t) {
  let elementType = t.dataset.el; // get data-el value which is our target element identifier
  
  let titleField = `<div id="`+elementType+`-carrier">
  <label for="title" class="block mb-2 font-bold text-gray-600">Title</label>
  <input type="text" id="title" name="title" placeholder="Put in your title." class="border border-red-300 shadow p-3 w-full rounded mb-2" />
  </div>`;
  
  let titlePreview = `<h1 class="text-3xl font-bold mb-2" id="title-preview"></h1>`;
  
  let descriptionField = `<div id="`+elementType+`-carrier">
  <label for="title" class="block mb-2 font-bold text-gray-600">Description</label>
  <textarea id="description" name="description" placeholder="Write the description" class="border border-red-300 shadow p-3 w-full rounded mb-2" ></textarea>
  </div>`;
  
  let descPreview = `<p class="mb-2" id="description-preview"></p>`;
  
  let imageField = `<div id="`+elementType+`-carrier">
  <label for="title" class="block mb-2 font-bold text-gray-600">Image</label>
  <input type="file" id="image" name="image" placeholder="Put in your title." class="border border-red-300 shadow p-3 w-full rounded mb-2" />
  </div>`;
  
  let imagePreview = `<img id="image-preview" class="mb-2 w-full" />`;

  let field, preview;
  if (elementType == 'title') {
    field = titleField;
    preview = titlePreview;
  } else if (elementType == 'image') {
    field = imageField;
    preview = imagePreview;
  } else {
    field = descriptionField;
    preview = descPreview;
  }

  // Append element into the carrier

  let lastChild = document.getElementById("field-carrier").lastChild;
  
  if (lastChild == null) {
    document.getElementById("field-carrier").innerHTML += field;
  } else {
    let fieldDOM  = new DOMParser().parseFromString(field, "text/html");
    insertAfter(lastChild, fieldDOM.documentElement);
  }
  
  document.getElementById("preview-carrier").innerHTML += preview;
  
  // Updating the button
  t.innerText = "Remove "+elementType;
  t.classList.remove("add-field");
  t.classList.add("remove-field");
  
  includeEventLister(elementType);

  return;
}

/**
 * 
 * @param {t} t is the 'this' element on which the click event is called
 * @returns 
 */
function removeElement(t) {
  let elementType = t.dataset.el; // get data-el value which is our target element identifier
  document.getElementById(elementType+'-carrier').remove();
  
  document.getElementById(elementType+'-preview').remove();
  
  // Updating the button
  t.innerText = "Add "+elementType;
  t.classList.add("add-field");
  t.classList.remove("remove-field");

  return;
}

/**
 * Create an arrow function that will be called when an image is selected.
 */
const previewImage = (event) => {
    /**
     * Get the selected files.
     */
    const imageFiles = event.target.files;
    /**
     * Count the number of files selected.
     */
    const imageFilesLength = imageFiles.length;
    /**
     * If at least one image is selected, then proceed to display the preview.
     */
    if (imageFilesLength > 0) {
        /**
         * Get the image path.
         */
        const imageSrc = URL.createObjectURL(imageFiles[0]);
        /**
         * Select the image preview element.
         */
        const imagePreviewElement = document.querySelector("#image-preview");
        /**
         * Assign the path to the image preview element.
         */
        imagePreviewElement.src = imageSrc;
        /**
         * Show the element by changing the display value to "block".
         */
        imagePreviewElement.style.display = "block";
    }
};

document.querySelectorAll('button').forEach(item => {
  item.addEventListener('click', function(){
    if(this.classList.contains("add-field")) {
      addElement(this);
    } else if (this.classList.contains("remove-field")) {
      removeElement(this);
    }
  })
})


// const { body } = document;

// const targetImg = document.createElement("img");
// body.appendChild(targetImg);

// const canvas = document.createElement("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = canvas.height = 500;

// function onNewImageLoad(e) {
//   ctx.drawImage(e.target, 0, 0);
//   targetImg.src = canvas.toDataURL();
// }


// // Download banner image
// document.getElementById("download").addEventListener("click", function() {
//   let htmlToDownload = document.getElementById("preview-carrier");
    
//   var anchorTag = document.createElement("a");
//   document.body.appendChild(anchorTag);

//   const newImg = document.createElement("img");
//   newImg.addEventListener("load", onNewImageLoad);
//   // console.log(newImg)
//   // ctx.drawImage(newImg.target, 0, 0);
//   newImg.src =
//     "data:image/svg+xml," +
//     encodeURIComponent(
//       `<svg xmlns="http://www.w3.org/2000/svg" width="${htmlToDownload.offsetWidth}" height="${htmlToDownload.offsetHeight}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${new XMLSerializer().serializeToString(htmlToDownload)}</div></foreignObject></svg>`
//     );

//     // document.getElementById("previewImg").appendChild(canvas);
//     anchorTag.download = "filename.jpg";
//     anchorTag.href = canvas.toDataURL();
//     anchorTag.target = '_blank';
    // anchorTag.click();
    
// });

// -------------- Using Blob and URL ---------------------------
// function downloadHtmlAsImage() {
//   const htmlToDownload = document.getElementById("preview-carrier");

//   // Create an SVG element with the same size as the HTML content
//   const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${htmlToDownload.offsetWidth}" height="${htmlToDownload.offsetHeight}">
//                 <foreignObject width="100%" height="100%">
//                   ${new XMLSerializer().serializeToString(htmlToDownload)}
//                 </foreignObject>
//               </svg>`;

//   // Create a canvas element to render the SVG
//   const canvas = document.createElement("canvas");
//   canvas.width = htmlToDownload.offsetWidth;
//   canvas.height = htmlToDownload.offsetHeight;
//   const ctx = canvas.getContext("2d");

//   // Create an image from the SVG
//   const img = new Image();
//   img.onload = function () {
//     // Draw the image on the canvas
//     ctx.drawImage(img, 0, 0);
    
//     // Convert the canvas to a data URL (PNG format)
//     const dataUrl = canvas.toDataURL("image/png");

//     // Create a hidden link to trigger the download
//     const link = document.createElement("a");
//     link.download = "html_image.png"; // Set the image file name
//     link.href = dataUrl; // Set the data URL as the link's href

//     // Trigger the download
//     link.click();
//   };
//   img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
// }

// // Download banner image
// document.getElementById("download").addEventListener("click", downloadHtmlAsImage);

// --- Using html2canvas -------------//

let addLib = document.createElement("script");
addLib.src = 'https://html2canvas.hertzen.com/dist/html2canvas.js';
addLib.type = 'text/javascript';  
document.head.appendChild(addLib); 

document.getElementById("download").addEventListener("click", function() {
  html2canvas(document.getElementById("preview-carrier")).then(function (canvas) {			
  var anchorTag = document.createElement("a");
  document.body.appendChild(anchorTag);
    // document.getElementById("previewImg").appendChild(canvas);
    anchorTag.download = "filename.jpg";
    anchorTag.href = canvas.toDataURL();
    anchorTag.target = '_blank';
    anchorTag.click();
  });
});