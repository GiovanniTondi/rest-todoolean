
function addInsertListener() {

    var btn = $('#addBtn');
    btn.click(addTask);

    $('#addTask').keyup(function() {
        var key = event.which;
        if (key == 13) addTask();
    });
}

function addDeleteListener() {

    $(document).on('click', '.delete', function () {

        var id = $(this).data('id');
        deleteTask(id);
    })
}

function getData() {

    $.ajax({
        url: 'http://157.230.17.132:3031/todos',
        method: 'GET',
        success: function(data) {

            printTasks(data);
        },
        error: function(err) {
            console.log('Error',err);
        }
    });
}

function printTasks(tasks) {

    var target = $('#tasks > ul');
    target.html('');

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        target.append(`<li class="task">${task.text}<i data-id=${task.id} class="fas fa-trash-alt delete"></i></li>`);
    }
}

function addTask() {

    var target = $('#addTask')
    var text = target.val();
    target.val('');

    $.ajax({
        url: 'http://157.230.17.132:3031/todos',
        method: 'POST',
        data: {
            text: text
        },
        success: function(data) {

            getData();
        },
        error: function(err) {
            console.log('Error',err);
        }
    });
}

function deleteTask(id) {

    $.ajax({
        url: `http://157.230.17.132:3031/todos/${id}`,
        method: 'DELETE',
        success: function(data) {

            getData();
        },
        error: function(err) {
            console.log('Error',err);
        }
    });
}

function init() {

    getData();
    addInsertListener();
    addDeleteListener();
}

$(document).ready(init);
