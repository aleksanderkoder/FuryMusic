class Ozone 
      {
        static fire(icon, message, position, type = "notification", confirmButtonText = "Confirm", cancelButtonText = "Cancel", onConfirm = function() {}, onCancel = function () {}) 
        {

          // Destroys already existing Ozone instance when new instance is created
          let expired; 
          if(expired = document.getElementById("Ozone"))
          {
            expired.parentNode.removeChild(expired); 
          }
          

          console.log("Firing Ozone..."); 

          // Creates essential elements
          const el = document.createElement("div");
          el.id = "Ozone";
          const content = document.createElement("table");
          content.id = "OzoneTable"; 
          const contentRow1 = document.createElement("tr");
          const contentData1 = document.createElement("td");
          const contentData2 = document.createElement("td");
          contentData2.style.width = "100%";

          // Creates necessary remaining html elements
          el.appendChild(content);
          content.appendChild(contentRow1);
          contentRow1.appendChild(contentData1);

          // Handles message based on parameter "message"
          contentData2.innerHTML = message;

          // Handles icon selection based on parameter "icon"
          if (icon == "success") 
          {
            contentData1.innerHTML =
              '<i style=" color: white;" class="fas fa-check"></i>';
          } 
          else if (icon == "error") 
          {
            contentData1.innerHTML =
              '<i style="color: white;" class="fas fa-times"></i>';
          } 
          else if (icon == "info") 
          {
            contentData1.innerHTML =
              '<i style="color: white;" class="fas fa-info"></i>';
          }

          // Creates Ozone instance of type "notification" based on "type" parameter
          if (type == "notification") 
          {
            // Appends second table data 
            contentRow1.appendChild(contentData2);
          }
          else if (type == "dialog")  // Creates Ozone instance of type "dialog" based on "type" parameter
          {
            content.style.padding = "10px"; 
            contentData2.style.padding = "15px";

            // Creates necessary table elements for dialog
            const contentRow2 = document.createElement("tr");
            const contentRow3 = document.createElement("tr");
            const contentData3 = document.createElement("td");
            const contentData4 = document.createElement("td");

             
            const btnConfirm = document.createElement("button")
            btnConfirm.id = "OzoneBtnConfirm"; 
            btnConfirm.innerHTML = confirmButtonText; 
            const btnCancel = document.createElement("button")
            btnCancel.id = "OzoneBtnCancel";
            btnCancel.innerHTML = cancelButtonText;

            // Appends elements to parent element
            content.appendChild(contentRow2);
            content.appendChild(contentRow3);
            contentRow2.appendChild(contentData2);
            contentRow2.appendChild(contentData2);
            contentRow3.appendChild(contentData3);
            contentRow3.appendChild(contentData4);
            contentData3.appendChild(btnConfirm);
            contentData3.appendChild(btnCancel);
             
          }
                       
          // Handles position based on parameter "position"
          switch (position)
          {
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
          setTimeout(function () {
            el.style.animation = "ozpulse 2s infinite";
          }, 1000);

          // Finally appends alert box element to document
          document.body.appendChild(el);
          
          // Handles behavior of Ozone-alert upon deletion based on type
          if (type == "notification")
          {
            setTimeout(function () 
            {
              el.style.animation = "ozfadeOut ease 1s";
            }, 7000);

            setTimeout(function () 
            {
              if(expired != null)
                el.parentNode.removeChild(el);
            }, 8000); 
          }
          else if (type == "dialog")
          {
            OzoneBtnConfirm.onclick = function () 
            {
              onConfirm(); 
              removeOzoneAlert(el); 
            }

            OzoneBtnCancel.onclick = function () 
            {
              onCancel(); 
              removeOzoneAlert(el);
            }
          }
          
          // Function that removes a given Ozone-element with a fadeOut-effect
          function removeOzoneAlert(element)
          {
            element.style.animation = "ozfadeOut ease 0.5s";
            setTimeout(function () 
            {            
                element.parentNode.removeChild(element);
            }, 500);
          }
        }
      }
