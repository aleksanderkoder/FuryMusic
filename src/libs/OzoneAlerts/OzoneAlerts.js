class Ozone {
  static fire(
    icon,
    message,
    position,
    type = "notification",
    confirmButtonText = "Confirm",
    cancelButtonText = "Cancel",
    onConfirm = function () {},
    onCancel = function () {}
  ) {
    // Creates essential elements
    const el = document.createElement("div");
    el.className = "Ozone";
    const divIcon = document.createElement("div");
    divIcon.className = "OzoneIcon";
    const divMessage = document.createElement("div");
    divMessage.className = "OzoneMessage";

    // Appends elements to parent element
    el.appendChild(divIcon);
    el.appendChild(divMessage);

    // Sets message based on parameter "message"
    divMessage.innerHTML = "<p>" + message + "</p>";

    // Handles icon selection based on parameter "icon"
    if (icon == "success") {
      divIcon.innerHTML = '<i style=" color: white;" class="fas fa-check"></i>';
    } else if (icon == "error") {
      divIcon.innerHTML = '<i style="color: white;" class="fas fa-times"></i>';
    } else if (icon == "info") {
      divIcon.innerHTML = '<i style="color: white;" class="fas fa-info"></i>';
    }
    // Creates Ozone instance of type "dialog" based on "type" parameter
    if (type == "dialog") {
      // Necessary changes to styling for dialog
      el.style.flexDirection = "column";
      divIcon.style.position = "relative"; 
      divIcon.style.left = "0px";
      divIcon.style.marginTop = "15px";

      // Creates necessary table elements for dialog
      const divControls = document.createElement("div");
      divControls.className = "OzoneControls";

      const btnConfirm = document.createElement("button");
      btnConfirm.id = "OzoneBtnConfirm";
      btnConfirm.innerHTML = confirmButtonText;
      const btnCancel = document.createElement("button");
      btnCancel.id = "OzoneBtnCancel";
      btnCancel.innerHTML = cancelButtonText;

      // Appends elements to parent element
      el.appendChild(divControls);
      divControls.appendChild(btnConfirm);
      divControls.appendChild(btnCancel);

      // Handles functions on dialog button click
      btnConfirm.onclick = function () {
        onConfirm();
        removeOzoneAlert(el);
      };

      btnCancel.onclick = function () {
        onCancel();
        removeOzoneAlert(el);
      };
    }

    // Handles position based on parameter "position"
    switch (position) {
      case "top-left":
        el.style.left = 0;
        el.style.top = 0;
        break;

      case "top-right":
        el.style.right = 0;
        el.style.top = 0;
        break;

      case "top-middle":
        el.style.left = 0;
        el.style.right = 0;
        el.style.marginLeft = "auto";
        el.style.marginRight = "auto";
        break;

      case "bottom-left":
        el.style.left = 0;
        el.style.bottom = 0;
        break;

      case "bottom-middle":
        el.style.left = 0;
        el.style.right = 0;
        el.style.bottom = 0;
        el.style.marginLeft = "auto";
        el.style.marginRight = "auto";
        break;

      case "bottom-right":
        el.style.right = 0;
        el.style.bottom = 0;
        break;

      case "center":
        el.style.left = 0;
        el.style.right = 0;
        el.style.marginLeft = "auto";
        el.style.marginRight = "auto";
        el.style.marginTop = "20%";
        break;
    }

    // Handles animations upon creation and deletion of Ozone element
    setTimeout(() => {
      el.style.animation = "ozpulse 2s infinite";
    }, 1000);

    // Finally appends Ozone alert element to document body
    document.body.appendChild(el);

    // Handles behavior of Ozone alert upon deletion based on type
    if (type == "notification") {
      setTimeout(() => {
        el.style.animation = "ozfadeOut ease 1s";
      }, 7000);

      setTimeout(() => {
        el.parentNode.removeChild(el);
      }, 8000);
    }

    // Function that removes a given Ozone-element with a fadeOut-effect
    function removeOzoneAlert(element) {
      element.style.animation = "ozfadeOut ease 0.5s";
      setTimeout(() => {
        element.parentNode.removeChild(element);
      }, 500);
    }
  }
}
