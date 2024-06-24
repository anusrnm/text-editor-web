// static/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const tabs = document.querySelectorAll('.edit-file');
    const editors = document.querySelectorAll('.editor-container');

    // Function to show editor for selected file
    const showEditor = fileId => {
        editors.forEach(editor => {
            if (editor.id === `editor-${fileId}`) {
                editor.style.display = 'block';
                // Initialize ACE Editor for the selected file
                const aceEditor = ace.edit(editor.id);
                aceEditor.setTheme("ace/theme/monokai");
                aceEditor.getSession().setMode("ace/mode/text");
                aceEditor.getSession().setUseWrapMode(true); // Optional: wrap lines
                // Optional: Fetch file content and set in ACE Editor
                fetch(`/get_file_content/${fileId}`)
                    .then(response => response.text())
                    .then(data => {
                        aceEditor.setValue(data, -1); // Set file content
                    })
                    .catch(error => console.error('Error fetching file content:', error));
            } else {
                editor.style.display = 'none';
            }
        });
    };

    // Add click event listener to each edit link
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const fileId = this.dataset.fileId;
            showEditor(fileId);
        });
    });

    // Handle form submissions via AJAX for dynamic content update
    editors.forEach(editor => {
        editor.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = this.parentElement; // Assuming form is the direct parent
            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('File saved successfully.');
                } else {
                    alert('Failed to save file.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save file.');
            });
        });
    });
});
