function MultiSelector(max) {

    // How many elements?
    this.count = 0;
    // How many elements?
    this.id = 0;
    // Số file tối đa
    if (max) {
        this.max = max;
    } else {
        this.max = -1;
    };

    /**
    * Thêm mới một file input
    */
    this.addElement = function (element) {

        // Make sure it's a file input element
        if (element.tagName == 'INPUT' && element.type == 'file') {

            var _idName = this.id;
            // Element name -- what number am I?
            element.name = 'file_' + this.id;
            element.id = 'file_' + this.id++;

            // Add reference to this object
            element.multi_selector = this;

            // What to do when a file is selected
            element.onchange = function () {
                var ktra = true;
                var shortName = element.value.match(/[^\/\\]+$/);
                shortName = shortName + '';
                var shortName1 = shortName.substring(0, shortName.lastIndexOf('.'));
                var extend = shortName.substring(shortName.lastIndexOf('.')).toLowerCase();
                if ((extend != '.png') && (extend != '.jpg') && (extend != '.gif') && (extend != '.jpeg')) {
                    ktra = false;
                }


                if (document.getElementById('name_' + _idName)) {
                    this.multi_selector.addListRow(this, _idName, true, ktra);
                    return;
                } else {
                    if (!ktra) {
                        alert("Ảnh không đúng định dạng");
                    }
                }


                var new_div = document.createElement('div');
                // New file input
                var new_element = document.createElement('input');
                new_element.type = 'file';
                new_element.accept = 'image/*';

                new_div.appendChild(new_element);
                // Add new element
                this.parentNode.parentNode.appendChild(new_div);

                // Apply 'update' to element
                this.multi_selector.addElement(new_element);

                // Update list
                if (ktra)
                    this.multi_selector.addListRow(this, _idName, false, ktra);
                else {
                    element.parentNode.parentNode.removeChild(element.parentNode);
                    element.multi_selector.count--;
                    element.multi_selector.current_element.disabled = false;
                }

            };
            // If we've reached maximum number, disable input element
            if (this.max != -1 && this.count >= this.max) {
                element.disabled = true;
            };

            // File element counter
            this.count++;
            // Most recent element
            this.current_element = element;

        } else {
            // This can only be applied to file input elements!
            alert('Error: not a file input element');
        };

    };

    /**
    * Add a new row to the list of files
    */
    this.addListRow = function (element, nameID, edit, ktra) {

        var shortName = element.value.match(/[^\/\\]+$/);
        shortName = shortName + '';
        var shortName1 = shortName.substring(0, shortName.lastIndexOf('.'));
        var extend = shortName.substring(shortName.lastIndexOf('.'));


        if (edit) {
            if (!ktra) {
                alert("Ảnh không đúng định dạng");                
                // Remove element from form
                element.parentNode.parentNode.removeChild(element.parentNode);


                // Decrement counter
                element.multi_selector.count--;

                // Re-enable input element (if it's disabled)
                element.multi_selector.current_element.disabled = false;
                return false;
            }
            document.getElementById('name_' + nameID).value = shortName1;
            document.getElementById('span_extend' + nameID).innerHTML = extend;
            return;
        }
        if (!ktra) {
            alert("Ảnh không đúng định dạng");
            return;
        }

        // Row div
        var new_row = document.createElement('span');

        // Delete button
        var new_row_button = document.createElement('input');
        new_row_button.type = 'button';
        new_row_button.value = ' Delete ';

        // References
        new_row.element = element;

        // Delete function
        new_row_button.onclick = function () {

            // Remove element from form
            this.parentNode.element.parentNode.parentNode.removeChild(this.parentNode.element.parentNode);

            // Decrement counter
            this.parentNode.element.multi_selector.count--;

            // Re-enable input element (if it's disabled)
            this.parentNode.element.multi_selector.current_element.disabled = false;

            // Appease Safari
            //    without it Safari wants to reload the browser window
            //    which nixes your already queued uploads
            return false;
        };

        var new_span = document.createElement("span");
        new_span.style.padding = "8px";
        new_span.innerHTML = "Tên ảnh: ";

        // Set row value
        //new_row.innerHTML = element.value;
        new_row.appendChild(new_span);



        var new_name = document.createElement("input");
        new_name.type = 'text';
        new_name.name = 'name_' + nameID;
        new_name.id = 'name_' + nameID;
        new_name.value = shortName1;

        new_row.appendChild(new_name);


        var new_span1 = document.createElement("span");
        new_span1.style.padding = "5px";
        new_span1.id = 'span_extend' + nameID;
        new_span1.style.width = "30px";
        new_span1.style.display = "inline-block";
        new_span1.innerHTML = extend;

        new_row.appendChild(new_span1);

        // Add button
        new_row.appendChild(new_row_button);

        if (element.nextSibling) {
            element.parentNode.insertBefore(new_row, element.nextSibling);
        } else {
            element.parentNode.appendChild(new_row);
        }
    };

};